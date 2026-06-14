import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getDerivedStats } from '@/data/repositories/stats.repo'
import { ProgressPageClient } from './_components/ProgressPageClient'
import { getDemoProgressData } from './_demo/demoData'

export default async function ProgressPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const clerkUser = await currentUser()
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? ''
  const isDemo = email === 'demo@mreshank.com'

  if (isDemo) {
    return <ProgressPageClient stats={getDemoProgressData()} />
  }

  const stats = await getDerivedStats(userId).catch(() => null)
  return <ProgressPageClient stats={stats} />
}
