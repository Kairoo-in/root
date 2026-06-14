import { db } from '@/data/client'
import { usageEvents, roadmaps, goals } from '@/data/schema'
import { eq, and, gte, sql } from 'drizzle-orm'

export interface DerivedStats {
  xp: number
  level: number
  xpInLevel: number
  xpToNextLevel: number
  streak: number
  totalRuns: number
  roadmapCount: number
  weeklyActivity: number[]   // [Mon, Tue, Wed, Thu, Fri, Sat, Sun] counts for current week
  topFeatures: { featureId: string; count: number }[]
}

const XP_PER_RUN = 25
const XP_PER_LEVEL = 500

function toDateString(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function getWeekBounds(): { weekStart: Date; weekEnd: Date; weekDays: string[] } {
  const now = new Date()
  const dayOfWeek = now.getUTCDay() // 0=Sun
  const monday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - ((dayOfWeek + 6) % 7)))
  const weekDays: string[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setUTCDate(monday.getUTCDate() + i)
    weekDays.push(toDateString(d))
  }
  const weekEnd = new Date(monday)
  weekEnd.setUTCDate(monday.getUTCDate() + 7)
  return { weekStart: monday, weekEnd, weekDays }
}

export async function getDerivedStats(userId: string): Promise<DerivedStats> {
  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

  const [events, completedGoals, roadmapRows] = await Promise.all([
    db
      .select({ featureId: usageEvents.featureId, createdAt: usageEvents.createdAt })
      .from(usageEvents)
      .where(and(eq(usageEvents.userId, userId), gte(usageEvents.createdAt, ninetyDaysAgo))),
    db
      .select({ xpReward: goals.xpReward })
      .from(goals)
      .where(and(eq(goals.userId, userId), eq(goals.completed, true))),
    db
      .select({ id: sql<string>`id` })
      .from(roadmaps)
      .where(eq(roadmaps.userId, userId)),
  ])

  const totalRuns = events.length
  const goalXP = completedGoals.reduce((sum, g) => sum + (g.xpReward ?? 0), 0)
  const xp = totalRuns * XP_PER_RUN + goalXP
  const level = Math.floor(xp / XP_PER_LEVEL) + 1
  const xpInLevel = xp % XP_PER_LEVEL

  // Streak: count consecutive days (backwards from today) with at least 1 event
  const eventDays = new Set(events.map(e => toDateString(e.createdAt)))
  let streak = 0
  const today = new Date()
  const todayStr = toDateString(today)
  // If today has no events yet, start counting from yesterday
  let cursor = eventDays.has(todayStr) ? today : new Date(today.getTime() - 86400000)
  while (true) {
    const dayStr = toDateString(cursor)
    if (!eventDays.has(dayStr)) break
    streak++
    cursor = new Date(cursor.getTime() - 86400000)
    if (streak > 90) break
  }

  // Weekly activity (Mon–Sun)
  const { weekStart, weekDays } = getWeekBounds()
  const weekEvents = events.filter(e => e.createdAt >= weekStart)
  const weeklyActivity = weekDays.map(d => weekEvents.filter(e => toDateString(e.createdAt) === d).length)

  // Top 5 features by usage
  const featureCounts: Record<string, number> = {}
  for (const e of events) {
    if (e.featureId) featureCounts[e.featureId] = (featureCounts[e.featureId] ?? 0) + 1
  }
  const topFeatures = Object.entries(featureCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([featureId, count]) => ({ featureId, count }))

  return {
    xp,
    level,
    xpInLevel,
    xpToNextLevel: XP_PER_LEVEL,
    streak,
    totalRuns,
    roadmapCount: roadmapRows.length,
    weeklyActivity,
    topFeatures,
  }
}
