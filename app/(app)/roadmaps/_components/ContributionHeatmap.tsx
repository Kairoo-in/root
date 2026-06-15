'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

function getLast52Weeks(): Array<Array<{ date: string; dow: number }>> {
  const weeks: Array<Array<{ date: string; dow: number }>> = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let w = 51; w >= 0; w--) {
    const week: Array<{ date: string; dow: number }> = []
    for (let d = 0; d < 7; d++) {
      const date = new Date(today)
      date.setDate(today.getDate() - (w * 7 + (6 - d)))
      week.push({
        date: date.toISOString().split('T')[0],
        dow: date.getDay(),
      })
    }
    weeks.push(week)
  }
  return weeks
}

export function ContributionHeatmap() {
  const [data, setData] = useState<Record<string, number>>({})
  useEffect(() => {
    fetch('/api/roadmaps/heatmap').then(r => r.json()).then(setData)
  }, [])

  const weeks = getLast52Weeks()
  const maxCount = Math.max(...Object.values(data), 1)

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Activity This Year</p>
      <div className="flex gap-0.5 overflow-x-auto pb-2">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {week.map(({ date }) => {
              const count = data[date] ?? 0
              const intensity = count === 0 ? 0 : Math.ceil((count / maxCount) * 4)
              return (
                <motion.div
                  key={date}
                  title={`${date}: ${count} activities`}
                  className={cn('h-2.5 w-2.5 rounded-sm', [
                    'bg-border',
                    'bg-primary/25',
                    'bg-primary/50',
                    'bg-primary/75',
                    'bg-primary',
                  ][intensity])}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (wi * 7) * 0.001 }}
                />
              )
            })}
          </div>
        ))}
      </div>
      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className={cn('h-2.5 w-2.5 rounded-sm', ['bg-border','bg-primary/25','bg-primary/50','bg-primary/75','bg-primary'][i])} />
        ))}
        <span>More</span>
      </div>
    </div>
  )
}
