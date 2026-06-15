import { db } from '@/data/client'
import { interviewSessions, interviewExchanges } from '@/data/schema'
import { eq, desc, and } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import type {
  InterviewSession,
  InterviewExchange,
  SessionWithExchanges,
  CreateSessionRequest,
  SessionAssessment,
} from '@/types/interview'

// ── Sessions ──────────────────────────────────────────────────────────────────

export async function createSession(
  userId: string,
  data: CreateSessionRequest,
): Promise<InterviewSession> {
  const [session] = await db
    .insert(interviewSessions)
    .values({
      id: nanoid(),
      userId,
      title: data.title,
      type: data.type,
      targetRole: data.targetRole,
      targetCompany: data.targetCompany ?? null,
      personaId: data.personaId ?? null,
      difficulty: data.difficulty,
      questionCount: data.questionCount,
      status: 'in_progress',
      strengths: [],
      improvements: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning()
  return session as InterviewSession
}

export async function getUserSessions(
  userId: string,
  limit = 20,
): Promise<InterviewSession[]> {
  return db
    .select()
    .from(interviewSessions)
    .where(eq(interviewSessions.userId, userId))
    .orderBy(desc(interviewSessions.createdAt))
    .limit(limit) as Promise<InterviewSession[]>
}

export async function getSessionById(
  id: string,
  userId: string,
): Promise<InterviewSession | null> {
  const [session] = await db
    .select()
    .from(interviewSessions)
    .where(and(eq(interviewSessions.id, id), eq(interviewSessions.userId, userId)))
    .limit(1)
  return (session as InterviewSession) ?? null
}

export async function getSessionWithExchanges(
  id: string,
  userId: string,
): Promise<SessionWithExchanges | null> {
  const session = await getSessionById(id, userId)
  if (!session) return null
  const exchanges = await db
    .select()
    .from(interviewExchanges)
    .where(eq(interviewExchanges.sessionId, id))
    .orderBy(interviewExchanges.order)
  return { ...session, exchanges: exchanges as InterviewExchange[] }
}

export async function completeSession(
  id: string,
  userId: string,
  assessment: SessionAssessment,
): Promise<void> {
  await db
    .update(interviewSessions)
    .set({
      status: 'completed',
      overallScore: assessment.overallScore,
      strengths: assessment.strengths,
      improvements: assessment.improvements,
      updatedAt: new Date(),
    })
    .where(and(eq(interviewSessions.id, id), eq(interviewSessions.userId, userId)))
}

// ── Exchanges ─────────────────────────────────────────────────────────────────

export async function createExchange(
  sessionId: string,
  questionText: string,
  questionType: InterviewExchange['questionType'],
  order: number,
  keywords: string[],
): Promise<InterviewExchange> {
  const [exchange] = await db
    .insert(interviewExchanges)
    .values({
      id: nanoid(),
      sessionId,
      questionText,
      questionType,
      keywords,
      keywordsUsed: [],
      order,
      createdAt: new Date(),
    })
    .returning()
  return exchange as InterviewExchange
}

export async function updateExchangeWithFeedback(
  id: string,
  answer: string,
  aiFeedback: string,
  starScore: number,
  keywordsUsed: string[],
  duration: number,
): Promise<void> {
  await db
    .update(interviewExchanges)
    .set({ userAnswer: answer, aiFeedback, starScore, keywordsUsed, duration })
    .where(eq(interviewExchanges.id, id))
}

export async function getExchangeById(id: string): Promise<InterviewExchange | null> {
  const [exchange] = await db
    .select()
    .from(interviewExchanges)
    .where(eq(interviewExchanges.id, id))
    .limit(1)
  return (exchange as InterviewExchange) ?? null
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export interface InterviewStats {
  totalSessions: number
  avgScore: number | null
  completedSessions: number
}

export async function getInterviewStats(userId: string): Promise<InterviewStats> {
  const sessions = await getUserSessions(userId, 100)
  const completed = sessions.filter((s) => s.status === 'completed')
  const scores = completed.map((s) => s.overallScore).filter((s): s is number => s !== null)
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
  return {
    totalSessions: sessions.length,
    completedSessions: completed.length,
    avgScore,
  }
}

// ── Analytics ─────────────────────────────────────────────────────────────────

export interface WeaknessPatterns {
  avgScore: number
  topMissedKeywords: Array<{ keyword: string; count: number }>
  avgByType: Array<{ type: string; avg: number; count: number }>
  totalExchanges: number
}

// Get weakness patterns across all sessions for a user
export async function getWeaknessPatterns(userId: string): Promise<WeaknessPatterns> {
  const exchanges = await db
    .select()
    .from(interviewExchanges)
    .innerJoin(interviewSessions, eq(interviewExchanges.sessionId, interviewSessions.id))
    .where(eq(interviewSessions.userId, userId))
    .orderBy(desc(interviewSessions.createdAt))
    .limit(100)

  // Aggregate keyword misses
  const keywordMisses: Record<string, number> = {}
  let totalStarScore = 0
  let totalExchanges = 0
  const scoresByType: Record<string, number[]> = {}

  for (const row of exchanges) {
    const ex = row.interview_exchanges
    const sess = row.interview_sessions
    if (ex.starScore !== null) {
      totalStarScore += ex.starScore
      totalExchanges++
      if (!scoresByType[sess.type]) scoresByType[sess.type] = []
      scoresByType[sess.type].push(ex.starScore)
    }
    const missed = (ex.keywords ?? []).filter(k => !(ex.keywordsUsed ?? []).includes(k))
    missed.forEach(k => { keywordMisses[k] = (keywordMisses[k] ?? 0) + 1 })
  }

  const avgScore = totalExchanges > 0 ? Math.round(totalStarScore / totalExchanges) : 0
  const topMissedKeywords = Object.entries(keywordMisses)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([keyword, count]) => ({ keyword, count }))

  const avgByType = Object.entries(scoresByType).map(([type, scores]) => ({
    type,
    avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    count: scores.length,
  }))

  return { avgScore, topMissedKeywords, avgByType, totalExchanges }
}
