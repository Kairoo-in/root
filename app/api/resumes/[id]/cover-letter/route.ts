import { auth } from '@clerk/nextjs/server'
import { NextResponse, NextRequest } from 'next/server'
import { getResume } from '@/data/repositories/resumes.repo'
import { buildUserContext } from '@/engines/user-context'
import { generateStream } from '@/engines/ai/gateway'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { tone = 'professional' } = (await req.json()) as { tone?: string }

  const resume = await getResume(userId, id)
  if (!resume) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const userContext = await buildUserContext(userId)
  const contact = resume.sections?.contact
  const summary = resume.sections?.summary?.text ?? ''
  const experience = resume.sections?.experience?.slice(0, 3) ?? []
  const skills =
    resume.sections?.skills?.flatMap((s) => s.items).slice(0, 12).join(', ') ?? ''

  const prompt = `Write a compelling cover letter for this candidate.

CANDIDATE: ${contact?.name ?? 'The candidate'}
TARGET ROLE: ${resume.targetRole ?? 'the role'}
TARGET COMPANY: ${resume.targetCompany ?? 'the company'}
JOB DESCRIPTION: ${resume.jobDescription ?? 'Not provided'}

PROFESSIONAL SUMMARY: ${summary}
KEY SKILLS: ${skills}
RECENT EXPERIENCE: ${experience.map((e) => `${e.role} at ${e.company}: ${e.bullets.slice(0, 2).join('; ')}`).join('\n')}

USER PROFILE: ${userContext}

Tone: ${tone}

Write a 3-paragraph cover letter that:
1. Opens with a compelling hook about why this role/company
2. Highlights 2-3 most relevant achievements with metrics
3. Closes with enthusiasm and clear call to action

Do NOT use generic phrases like "I am writing to apply" or "please find attached".`

  const iterable = generateStream({
    messages: [{ role: 'user', content: prompt }],
    tier: 'balanced',
    maxOutputTokens: 800,
  })

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      try {
        for await (const chunk of iterable) {
          controller.enqueue(encoder.encode(chunk))
        }
      } catch (e) {
        controller.error(e)
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
