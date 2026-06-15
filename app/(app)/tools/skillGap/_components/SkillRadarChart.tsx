'use client'
import { motion } from 'framer-motion'
import type { SkillEntry, TargetSkillEntry } from '@/data/schema'

interface Props {
  currentSkills: SkillEntry[]
  targetSkills: TargetSkillEntry[]
  size?: number
}

function polarToCartesian(cx: number, cy: number, r: number, angleRad: number) {
  return {
    x: cx + r * Math.cos(angleRad - Math.PI / 2),
    y: cy + r * Math.sin(angleRad - Math.PI / 2),
  }
}

function polygonPoints(cx: number, cy: number, maxR: number, values: number[], maxVal: number) {
  return values
    .map((v, i) => {
      const angle = (2 * Math.PI * i) / values.length
      const r = (v / maxVal) * maxR
      const pt = polarToCartesian(cx, cy, r, angle)
      return `${pt.x},${pt.y}`
    })
    .join(' ')
}

export function SkillRadarChart({ currentSkills, targetSkills, size = 300 }: Props) {
  const cx = size / 2
  const cy = size / 2
  const maxR = size / 2 - 32

  // Merge into unified axis list (by name, matched to target)
  const axes = targetSkills.slice(0, 10).map(ts => {
    const current = currentSkills.find(cs => cs.name.toLowerCase() === ts.name.toLowerCase())
    return { name: ts.name, current: current?.level ?? 0, target: ts.requiredLevel }
  })

  const n = axes.length
  if (n < 3) return null

  const gridLevels = [1, 2, 3, 4, 5]

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid rings */}
        {gridLevels.map(level => (
          <polygon
            key={level}
            points={polygonPoints(cx, cy, maxR, Array(n).fill(level), 5)}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={0.5}
            opacity={0.4}
          />
        ))}

        {/* Axis spokes */}
        {axes.map((_, i) => {
          const angle = (2 * Math.PI * i) / n
          const end = polarToCartesian(cx, cy, maxR, angle)
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={end.x}
              y2={end.y}
              stroke="hsl(var(--border))"
              strokeWidth={0.5}
              opacity={0.4}
            />
          )
        })}

        {/* Target polygon */}
        <motion.polygon
          points={polygonPoints(cx, cy, maxR, axes.map(a => a.target), 5)}
          fill="hsl(var(--primary) / 0.08)"
          stroke="hsl(var(--primary) / 0.4)"
          strokeWidth={1.5}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Current polygon */}
        <motion.polygon
          points={polygonPoints(cx, cy, maxR, axes.map(a => a.current), 5)}
          fill="hsl(160 84% 39% / 0.15)"
          stroke="hsl(160 84% 39%)"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />

        {/* Axis labels */}
        {axes.map((axis, i) => {
          const angle = (2 * Math.PI * i) / n
          const labelR = maxR + 18
          const pt = polarToCartesian(cx, cy, labelR, angle)
          const anchor =
            pt.x < cx - 5 ? 'end' : pt.x > cx + 5 ? 'start' : 'middle'
          return (
            <text
              key={i}
              x={pt.x}
              y={pt.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={10}
              fill="hsl(var(--muted-foreground))"
              className="font-medium"
            >
              {axis.name.length > 14 ? axis.name.slice(0, 13) + '…' : axis.name}
            </text>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-teal-500 inline-block rounded" />
          Current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-primary/50 inline-block rounded" />
          Target Role
        </span>
      </div>
    </div>
  )
}
