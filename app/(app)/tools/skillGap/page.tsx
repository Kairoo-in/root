import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getSkillAssessments, getSkillAssessmentById } from '@/data/repositories/skillAssessments.repo'
import { getProfile } from '@/data/repositories/profiles.repo'
import { SkillGapDashboardClient } from './_client'

interface Props {
  searchParams: Promise<{ id?: string }>
}

export const metadata = { title: `Skill Gap Dashboard · ${process.env.NEXT_PUBLIC_APP_NAME || "Kairoo"}` }

export default async function SkillGapPage({ searchParams }: Props) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const { id } = await searchParams
  const [assessments, current, profile] = await Promise.all([
    getSkillAssessments(userId),
    id ? getSkillAssessmentById(id, userId) : Promise.resolve(null),
    getProfile(userId),
  ])

  // If no assessments and no id param, send to assess page
  if (assessments.length === 0 && !id) {
    redirect('/tools/skillGap/assess')
  }

  const active = current ?? assessments[0] ?? null

  return (
    <SkillGapDashboardClient
      assessments={assessments}
      active={active}
      learningStyle={profile?.learningStyle ?? null}
    />
  )
}
