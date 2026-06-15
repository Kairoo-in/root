import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getProfile } from '@/data/repositories/profiles.repo'
import { AssessPageClient } from './_client'

export const metadata = { title: 'Assess Your Skills · Kairoo' }

export default async function AssessPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const profile = await getProfile(userId)

  return (
    <AssessPageClient
      prefillCurrentRole={profile?.currentRole ?? ''}
      prefillTargetRole={profile?.targetRole ?? ''}
      prefillSkills={(profile?.skills ?? []) as string[]}
    />
  )
}
