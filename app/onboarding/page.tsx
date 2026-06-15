import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getProfile } from '@/data/repositories/profiles.repo'
import { OnboardingWizard } from './_components/OnboardingWizard'

export default async function OnboardingPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const profile = await getProfile(userId).catch(() => null)
  if (profile?.onboardingCompleted) redirect('/dashboard')

  return (
    <OnboardingWizard
      initialStep={profile?.onboardingStep ?? 0}
      initialData={{
        currentRole: profile?.currentRole ?? undefined,
        currentCompany: profile?.currentCompany ?? undefined,
        yearsExperience: profile?.yearsExperience ?? undefined,
        industry: profile?.industry ?? undefined,
        location: profile?.location ?? undefined,
        targetRole: profile?.targetRole ?? undefined,
        targetTimeline: profile?.targetTimeline ?? undefined,
        careerGoalShort: profile?.careerGoalShort ?? undefined,
        skills: (profile?.skills as string[] | undefined) ?? [],
        workStyle: profile?.workStyle ?? undefined,
        resumeText: profile?.resumeText ?? undefined,
        careerGoalLong: profile?.careerGoalLong ?? undefined,
      }}
    />
  )
}
