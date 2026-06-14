'use client'

import { useState, useCallback } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Check, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type ButtonState = 'idle' | 'loading' | 'success' | 'error'

interface StatefulButtonProps {
  children: React.ReactNode
  onClick?: () => Promise<void> | void
  state?: ButtonState
  className?: string
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  successText?: string
  errorText?: string
}

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 border-transparent',
  outline: 'border border-border bg-transparent text-foreground hover:bg-accent-subtle',
  ghost: 'border-transparent bg-transparent text-foreground hover:bg-accent-subtle',
}
const sizes = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
}

export function StatefulButton({
  children,
  onClick,
  state: controlledState,
  className,
  variant = 'primary',
  size = 'md',
  disabled,
  type = 'button',
  successText = 'Done',
  errorText = 'Try again',
}: StatefulButtonProps) {
  const [internalState, setInternalState] = useState<ButtonState>('idle')
  const reduce = useReducedMotion()
  const state = controlledState ?? internalState

  const handleClick = useCallback(async () => {
    if (!onClick || state === 'loading') return
    setInternalState('loading')
    try {
      await onClick()
      setInternalState('success')
      setTimeout(() => setInternalState('idle'), 2000)
    } catch {
      setInternalState('error')
      setTimeout(() => setInternalState('idle'), 2500)
    }
  }, [onClick, state])

  const stateContent: Record<ButtonState, React.ReactNode> = {
    idle: children,
    loading: <><Loader2 className="h-4 w-4 animate-spin" /> Loading…</>,
    success: <><Check className="h-4 w-4" /> {successText}</>,
    error: <><AlertCircle className="h-4 w-4" /> {errorText}</>,
  }

  const stateColors: Record<ButtonState, string> = {
    idle: '',
    loading: 'opacity-80 cursor-wait',
    success: '!bg-success !text-white',
    error: '!bg-destructive !text-white',
  }

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled || state === 'loading'}
      whileTap={reduce ? {} : { scale: 0.97 }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        variants[variant],
        sizes[size],
        stateColors[state],
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={state}
          initial={reduce ? {} : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? {} : { opacity: 0, y: -6 }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-2"
        >
          {stateContent[state]}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}
