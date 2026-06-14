'use server'

import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { upsertProfile } from '@/data/repositories/profiles.repo'
import { revalidatePath } from 'next/cache'

export interface ProfileFormData {
  currentRole?: string
  currentCompany?: string
  yearsExperience?: number
  industry?: string
  location?: string
  targetRole?: string
  targetTimeline?: string
  careerGoalShort?: string
  careerGoalLong?: string
  skills?: string[]
  workStyle?: string
  learningStyle?: string
  linkedinUrl?: string
  githubUrl?: string
  portfolioUrl?: string
  resumeText?: string
}

export async function saveProfile(data: ProfileFormData): Promise<{ ok: boolean; error?: string }> {
  try {
    const { userId } = await auth()
    if (!userId) redirect('/sign-in')

    await upsertProfile(userId, data)
    revalidatePath('/settings/profile')
    return { ok: true }
  } catch (err) {
    console.error('[saveProfile]', err)
    return { ok: false, error: 'Failed to save profile. Please try again.' }
  }
}
