import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createRoadmap } from '@/data/repositories/roadmaps.repo'
import type { RoadmapPlanJson } from '@/types/roadmap'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null) as { title?: string; goal?: string; planJson?: unknown } | null
  const { title, goal, planJson } = body ?? {}

  if (!title || !goal || !planJson) {
    return NextResponse.json({ error: 'Missing title, goal, or planJson' }, { status: 400 })
  }

  const roadmap = await createRoadmap(userId, title, goal, planJson as RoadmapPlanJson)
  return NextResponse.json({ id: roadmap.id })
}
