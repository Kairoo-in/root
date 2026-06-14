import { db } from '@/data/client'
import { goals } from '@/data/schema'
import { eq, and } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export type Goal = typeof goals.$inferSelect

function currentISOWeek(): string {
  const d = new Date()
  const utc = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const day = utc.getUTCDay() || 7
  utc.setUTCDate(utc.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil((((utc.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return `${utc.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`
}

const DEFAULT_GOALS = [
  { title: 'Complete an Interview Prep session', xpReward: 50 },
  { title: 'Generate or review a career roadmap', xpReward: 100 },
  { title: 'Run a Skill Gap Analysis', xpReward: 75 },
  { title: 'Analyse your resume with AI', xpReward: 50 },
  { title: 'Complete 3 AI tool sessions this week', xpReward: 150 },
]

export async function getOrSeedWeeklyGoals(userId: string): Promise<Goal[]> {
  const weekOf = currentISOWeek()
  const existing = await db
    .select()
    .from(goals)
    .where(and(eq(goals.userId, userId), eq(goals.weekOf, weekOf)))

  if (existing.length > 0) return existing

  const seeded = await db
    .insert(goals)
    .values(
      DEFAULT_GOALS.map(g => ({
        id: nanoid(),
        userId,
        weekOf,
        title: g.title,
        xpReward: g.xpReward,
        completed: false,
        createdAt: new Date(),
      })),
    )
    .returning()

  return seeded
}

export async function toggleGoal(goalId: string, userId: string): Promise<Goal | null> {
  const [current] = await db
    .select()
    .from(goals)
    .where(and(eq(goals.id, goalId), eq(goals.userId, userId)))
    .limit(1)

  if (!current) return null

  const [updated] = await db
    .update(goals)
    .set({ completed: !current.completed })
    .where(and(eq(goals.id, goalId), eq(goals.userId, userId)))
    .returning()

  return updated ?? null
}
