import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { AppShell } from '@/components/shells/AppShell'
import { getProfile } from '@/data/repositories/profiles.repo'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const profile = await getProfile(userId).catch(() => null)
  if (!profile?.onboardingCompleted) {
    redirect('/onboarding')
  }

  return <AppShell>{children}</AppShell>
}
