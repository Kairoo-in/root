import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { getResume, updateResume } from '@/data/repositories/resumes.repo'
import { computeAtsScore } from '@/lib/resume-utils'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const resume = await getResume(userId, id)
  if (!resume) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json().catch(() => ({}))
  const jd: string = body.jobDescription ?? resume.jobDescription ?? ''

  if (!jd.trim()) {
    return NextResponse.json({ error: 'No job description provided' }, { status: 400 })
  }

  const { score, found, missing } = computeAtsScore(resume.sections, jd)

  await updateResume(userId, id, { atsScore: score, jobDescription: jd })

  return NextResponse.json({ score, found, missing })
}
