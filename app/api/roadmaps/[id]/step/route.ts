// app/api/roadmaps/[id]/step/route.ts
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { patchStepStatus } from '@/data/repositories/roadmaps.repo'

interface PatchBody {
  stepId: string
  phaseId: string
  status: 'todo' | 'in_progress' | 'done'
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const body: PatchBody | null = await req.json().catch(() => null)
  if (!body?.stepId || !body?.phaseId || !body?.status) {
    return NextResponse.json({ error: 'Missing stepId, phaseId, or status' }, { status: 400 })
  }

  const VALID_STATUSES = ['todo', 'in_progress', 'done'] as const
  if (!VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
  }

  const updated = await patchStepStatus(id, userId, body.phaseId, body.stepId, body.status)
  if (!updated) return NextResponse.json({ error: 'Roadmap not found' }, { status: 404 })

  return NextResponse.json({ ok: true })
}
