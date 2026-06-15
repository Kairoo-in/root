'use client'

import { useMemo } from 'react'
import { TrendingUp } from 'lucide-react'
import { GlowingEffect } from '@/components/aceternity'
import type { SkillGap } from '@/types/skill-gap'
import { getSalaryDelta } from '@/data/content/skillResources'
import { cn } from '@/lib/utils'

interface SalaryImpactCardProps {
  gaps: SkillGap[]
  className?: string
}

export function SalaryImpactCard({ gaps, className }: SalaryImpactCardProps) {
  const totalImpact = useMemo(() => {
    let usd = 0
    let inr = 0
    gaps.filter(g => g.priority === 'critical' || g.priority === 'important').forEach(g => {
      const delta = getSalaryDelta(g.skill)
      if (delta) { usd += delta.usdDelta; inr += delta.inrDelta }
    })
    return { usd, inr }
  }, [gaps])

  const topSkills = gaps
    .map(g => ({ ...g, delta: getSalaryDelta(g.skill) }))
    .filter(g => g.delta)
    .sort((a, b) => (b.delta!.usdDelta - a.delta!.usdDelta))
    .slice(0, 4)

  if (topSkills.length === 0) return null

  return (
    <GlowingEffect color="var(--primary)" className={className}>
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-500" />
          <h3 className="font-semibold text-foreground">Salary Impact</h3>
        </div>
        <div className="mb-4 text-center">
          <p className="text-3xl font-bold text-emerald-500">
            +${Math.round(totalImpact.usd / 1000)}k/yr
          </p>
          <p className="text-sm text-muted-foreground">potential increase if you close all critical gaps</p>
        </div>
        <div className="space-y-2">
          {topSkills.map(({ skill, delta, priority }) => (
            <div key={skill} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={cn('h-2 w-2 rounded-full', priority === 'critical' ? 'bg-red-500' : 'bg-amber-500')} />
                <span className="text-sm text-foreground capitalize">{skill}</span>
              </div>
              <span className="text-sm font-medium text-emerald-500">
                +${Math.round(delta!.usdDelta / 1000)}k
              </span>
            </div>
          ))}
        </div>
      </div>
    </GlowingEffect>
  )
}
