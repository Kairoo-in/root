import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createChatThread, getChatThreadsByFeature } from '@/data/repositories/chatThreads.repo'
import type { ChatMessage } from '@/data/schema'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json() as {
    featureId: string
    firstUserMessage: string
  }

  if (!body.featureId || !body.firstUserMessage?.trim()) {
    return NextResponse.json({ error: 'featureId and firstUserMessage required' }, { status: 400 })
  }

  const id = crypto.randomUUID()
  const title = body.firstUserMessage.slice(0, 60) + (body.firstUserMessage.length > 60 ? '…' : '')

  const firstMessage: ChatMessage = {
    id: crypto.randomUUID(),
    role: 'user',
    content: body.firstUserMessage,
    timestamp: new Date().toISOString(),
  }

  const thread = await createChatThread({
    id,
    userId,
    featureId: body.featureId,
    title,
    messages: [firstMessage],
  })

  return NextResponse.json(thread, { status: 201 })
}

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const featureId = req.nextUrl.searchParams.get('featureId')
  if (!featureId) return NextResponse.json({ error: 'featureId required' }, { status: 400 })

  const threads = await getChatThreadsByFeature(userId, featureId)
  return NextResponse.json(threads)
}
