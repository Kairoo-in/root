import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/data/client'
import { activityLog } from '@/data/schema'
import { eq, gte, and } from 'drizzle-orm'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const since = new Date()
  since.setDate(since.getDate() - 365)

  const activities = await db
    .select({ createdAt: activityLog.createdAt })
    .from(activityLog)
    .where(and(eq(activityLog.userId, userId), gte(activityLog.createdAt, since)))

  const heatmap: Record<string, number> = {}
  activities.forEach((a: { createdAt: Date }) => {
    const date = a.createdAt.toISOString().split('T')[0]
    heatmap[date] = (heatmap[date] ?? 0) + 1
  })

  return NextResponse.json(heatmap)
}
