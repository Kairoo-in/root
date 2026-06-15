'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GlowingEffect } from '@/components/aceternity'
import { cn } from '@/lib/utils'

interface Analytics {
  avgScore: number
  topMissedKeywords: Array<{ keyword: string; count: number }>
  avgByType: Array<{ type: string; avg: number; count: number }>
  totalExchanges: number
}

export function WeaknessHeatmap() {
  const [data, setData] = useState<Analytics | null>(null)

  useEffect(() => {
    fetch('/api/interview/analytics').then(r => r.json()).then(setData)
  }, [])

  if (!data || data.totalExchanges === 0) return null

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Your Patterns</h3>
      <div className="grid grid-cols-2 gap-3">
        {data.avgByType.map(({ type, avg, count }) => (
          <GlowingEffect key={type}>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground capitalize">{type.replace('_', ' ')}</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {avg}<span className="text-sm text-muted-foreground">/100</span>
              </p>
              <p className="text-xs text-muted-foreground">{count} answers</p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-border">
                <motion.div
                  className={cn(
                    'h-full rounded-full',
                    avg >= 70 ? 'bg-emerald-500' : avg >= 50 ? 'bg-amber-500' : 'bg-red-500',
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${avg}%` }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                />
              </div>
            </div>
          </GlowingEffect>
        ))}
      </div>
      {data.topMissedKeywords.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-2 text-xs font-semibold text-muted-foreground">Keywords You Often Miss</p>
          <div className="flex flex-wrap gap-1.5">
            {data.topMissedKeywords.map(({ keyword, count }) => (
              <span
                key={keyword}
                className="rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive"
              >
                {keyword} ({count}×)
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
