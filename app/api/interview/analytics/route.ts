import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { getWeaknessPatterns } from '@/data/repositories/interview.repo'

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await getWeaknessPatterns(userId)
  return NextResponse.json(data)
}
