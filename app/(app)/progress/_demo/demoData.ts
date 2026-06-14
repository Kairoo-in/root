import type { DerivedStats } from '@/data/repositories/stats.repo'

export function getDemoProgressData(): DerivedStats {
  return {
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
}
