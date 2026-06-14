import type { DerivedStats } from '@/data/repositories/stats.repo'
import type { ActivityEntry } from '@/data/repositories/activityLog.repo'
import type { Goal } from '@/data/repositories/goals.repo'

export function getDemoDashboardData() {
  const stats: DerivedStats = {
    xp: 4250,
    level: 9,
    xpInLevel: 250,
    xpToNextLevel: 500,
    streak: 14,
    totalRuns: 143,
    roadmapCount: 4,
    weeklyActivity: [4, 7, 3, 8, 5, 2, 1],
    topFeatures: [
      { featureId: 'interview-coach', count: 38 },
      { featureId: 'resume-scorer', count: 29 },
      { featureId: 'skill-gap-analyser', count: 21 },
      { featureId: 'career-roadmap', count: 14 },
      { featureId: 'cover-letter', count: 11 },
    ],
  }

  const now = new Date()
  const activity: ActivityEntry[] = [
    { id: '1', userId: 'demo', type: 'ai_run', featureId: 'resume-scorer', title: 'Resume Scorer', payloadJson: null, createdAt: new Date(now.getTime() - 1000 * 60 * 45) },
    { id: '2', userId: 'demo', type: 'ai_run', featureId: 'interview-coach', title: 'Interview Coach', payloadJson: null, createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 3) },
    { id: '3', userId: 'demo', type: 'ai_run', featureId: 'skill-gap-analyser', title: 'Skill Gap Analyser', payloadJson: null, createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 26) },
    { id: '4', userId: 'demo', type: 'ai_run', featureId: 'career-roadmap', title: 'Career Roadmap', payloadJson: null, createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 50) },
  ]

  const goals: Goal[] = [
    { id: 'g1', userId: 'demo', title: 'Complete an Interview Prep session', xpReward: 50, completed: true, weekOf: '2026-W24', createdAt: new Date() },
    { id: 'g2', userId: 'demo', title: 'Generate or review a career roadmap', xpReward: 100, completed: true, weekOf: '2026-W24', createdAt: new Date() },
    { id: 'g3', userId: 'demo', title: 'Run a Skill Gap Analysis', xpReward: 75, completed: false, weekOf: '2026-W24', createdAt: new Date() },
    { id: 'g4', userId: 'demo', title: 'Analyse your resume with AI', xpReward: 50, completed: false, weekOf: '2026-W24', createdAt: new Date() },
    { id: 'g5', userId: 'demo', title: 'Complete 3 AI tool sessions this week', xpReward: 150, completed: false, weekOf: '2026-W24', createdAt: new Date() },
  ]

  return {
    stats,
    activity,
    goals,
    usedCredits: 57,
    maxCredits: 100,
    plan: 'pro' as const,
    breakdown: { career: 43, learning: 14 },
  }
}
