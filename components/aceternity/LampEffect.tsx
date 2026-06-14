'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LampEffectProps {
  children?: React.ReactNode
  className?: string
}

export function LampEffect({ children, className }: LampEffectProps) {
  const reduce = useReducedMotion()
  return (
    <div className={cn('relative flex flex-col items-center justify-center overflow-hidden', className)}>
      <div className="relative z-0 flex w-full flex-1 flex-col items-center justify-center" aria-hidden="true">
        {/* Left beam */}
        <motion.div
          initial={reduce ? {} : { opacity: 0.5, width: '15rem' }}
          animate={{ opacity: 1, width: '30rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto right-1/2 top-1/2 h-56 overflow-visible"
          style={{ backgroundImage: `conic-gradient(from 70deg at right, var(--primary), transparent 180deg)` }}
        />
        {/* Right beam */}
        <motion.div
          initial={reduce ? {} : { opacity: 0.5, width: '15rem' }}
          animate={{ opacity: 1, width: '30rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto left-1/2 top-1/2 h-56 overflow-visible"
          style={{ backgroundImage: `conic-gradient(from 290deg at left, var(--primary), transparent 180deg)` }}
        />
        {/* Glow line */}
        <motion.div
          initial={reduce ? {} : { width: '4rem' }}
          animate={{ width: '16rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-primary blur-sm"
        />
        <motion.div
          initial={reduce ? {} : { opacity: 0, width: '2rem' }}
          animate={{ opacity: 1, width: '8rem' }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute inset-auto top-1/2 h-6 -translate-y-1/2 rounded-full bg-primary/50 blur-xl"
        />
        {/* Arc line */}
        <motion.div
          initial={reduce ? {} : { width: '10rem' }}
          animate={{ width: '30rem' }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-auto top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      </div>
      <div className="relative z-10 mt-20">{children}</div>
    </div>
  )
}
