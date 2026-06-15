import { db } from '@/data/client'
import { activityLog } from '@/data/schema'
import { eq, desc } from 'drizzle-orm'
import { nanoid } from 'nanoid'

export type ActivityEntry = typeof activityLog.$inferSelect

export async function logActivity(
  userId: string,
  type: string,
  title: string,
  featureId?: string,
  payload?: Record<string, unknown>,
) {
  await db.insert(activityLog).values({
    id: nanoid(),
    userId,
    type,
    title,
    featureId: featureId ?? null,
    payloadJson: payload ?? null,
    createdAt: new Date(),
  })
}

export async function getRecentActivity(userId: string, limit = 8): Promise<ActivityEntry[]> {
  return db
    .select()
    .from(activityLog)
    .where(eq(activityLog.userId, userId))
    .orderBy(desc(activityLog.createdAt))
    .limit(limit)
}

export async function getAllActivity(userId: string): Promise<ActivityEntry[]> {
  return db
    .select()
    .from(activityLog)
    .where(eq(activityLog.userId, userId))
    .orderBy(desc(activityLog.createdAt))
}
