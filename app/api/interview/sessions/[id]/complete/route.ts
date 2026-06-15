import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import {
  getSessionWithExchanges,
  completeSession,
} from '@/data/repositories/interview.repo'
import { generate } from '@/engines/ai/gateway'
import { compose } from '@/engines/ai/prompts/compose'
import { buildSessionAssessmentPrompt } from '@/engines/ai/prompts/interview'
import { logActivity } from '@/data/repositories/activityLog.repo'

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id: sessionId } = await params
  const session = await getSessionWithExchanges(sessionId, userId)
  if (!session) return NextResponse.json({ error: 'Session not found' }, { status: 404 })

  if (session.status === 'completed') {
    return NextResponse.json({ session })
  }

  const prompt = buildSessionAssessmentPrompt(
    session.exchanges.map((e) => ({
      questionText: e.questionText,
      userAnswer: e.userAnswer,
      starScore: e.starScore,
      aiFeedback: e.aiFeedback,
    })),
    session.targetRole,
  )

  const messages = compose({ userPrompt: prompt })
  const result = await generate({ messages, tier: 'fast', maxOutputTokens: 512 })

  let assessment = { overallScore: 0, strengths: [] as string[], improvements: [] as string[], topActions: [] as string[] }
  if (result.ok) {
    try {
      assessment = JSON.parse(result.value.text ?? '{}')
    } catch {
      // use defaults
    }
  }

  await completeSession(sessionId, userId, assessment)
  await logActivity(userId, 'interview_completed', `Completed: ${session.title}`, 'interviewPrep', {
    sessionId,
    score: assessment.overallScore,
  })

  return NextResponse.json({ assessment })
}
