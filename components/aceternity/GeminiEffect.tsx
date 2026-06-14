'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GeminiEffectProps {
  children?: React.ReactNode
  className?: string
  beams?: number
}

export function GeminiEffect({ children, className, beams = 5 }: GeminiEffectProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={ref} className={cn('relative isolate flex items-center justify-center', className)}>
      <motion.div
        style={reduce ? {} : { opacity }}
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {Array.from({ length: beams }).map((_, i) => {
          const angle = beams > 1 ? -30 + (60 / (beams - 1)) * i : 0
          return (
            <motion.div
              key={i}
              className="absolute bottom-0 left-1/2 origin-bottom"
              style={{
                width: 2,
                height: '100%',
                rotate: angle,
                background: `linear-gradient(to top, var(--primary), var(--accent), transparent)`,
                opacity: 0.3 + (i === Math.floor(beams / 2) ? 0.4 : 0),
                filter: 'blur(1px)',
              }}
              animate={reduce ? {} : {
                opacity: [0.2, 0.5, 0.2],
                scaleX: [1, 1.4, 1],
              }}
              transition={{
                duration: 3 + i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.2,
              }}
            />
          )
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  )
}
