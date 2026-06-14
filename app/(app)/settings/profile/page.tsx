import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getProfile } from '@/data/repositories/profiles.repo'
import { ProfileForm } from './_components/ProfileForm'

export default async function ProfilePage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')

  const profile = await getProfile(userId).catch(() => null)

  return <ProfileForm profile={profile} />
}
