import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { getChatThreadById, deleteChatThread } from '@/data/repositories/chatThreads.repo'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const thread = await getChatThreadById(id, userId)
  if (!thread) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.json(thread)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  await deleteChatThread(id, userId)
  return new NextResponse(null, { status: 204 })
}
