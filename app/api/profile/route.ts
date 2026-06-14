import { auth } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'
import { upsertProfile, markOnboardingComplete } from '@/data/repositories/profiles.repo'
import { refreshContextSummary } from '@/engines/user-context'

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { completeOnboarding, ...profileData } = body

  await upsertProfile(userId, profileData)

  if (completeOnboarding) {
    await markOnboardingComplete(userId)
  }

  // Refresh cached context summary in background
  refreshContextSummary(userId).catch(console.error)

  return Response.json({ success: true })
}

export async function GET(_req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const { getProfile } = await import('@/data/repositories/profiles.repo')
  const profile = await getProfile(userId).catch(() => null)
  return Response.json({ profile })
}
