import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { createResume, listResumes } from '@/data/repositories/resumes.repo'
import { getProfile } from '@/data/repositories/profiles.repo'
import { buildEmptySections, buildSectionsFromProfile } from '@/lib/resume-utils'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const rows = await listResumes(userId)
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const { name, targetRole, targetCompany, jobDescription, templateId, fromProfile } =
    body as {
      name?: string
      targetRole?: string
      targetCompany?: string
      jobDescription?: string
      templateId?: string
      fromProfile?: boolean
    }

  let sections = buildEmptySections()

  if (fromProfile) {
    const profile = await getProfile(userId)
    if (profile) sections = buildSectionsFromProfile(profile)
  }

  const resume = await createResume(userId, {
    name: name ?? (fromProfile ? 'From Profile' : 'Untitled Resume'),
    targetRole,
    targetCompany,
    jobDescription,
    sections,
    templateId: (templateId as 'minimal' | 'modern' | 'executive' | 'creative') ?? 'minimal',
  })

  return NextResponse.json(resume, { status: 201 })
}
