'use client'

import { cn } from '@/lib/utils'
import { motion, useReducedMotion } from 'framer-motion'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'shimmer' | 'gradient' | 'bordered' | 'glass' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

export function TailwindButtons({ variant = 'gradient', size = 'md', className, children, ...props }: ButtonProps) {
  const reduce = useReducedMotion()
  const sizeMap = { sm: 'h-8 px-3 text-sm', md: 'h-10 px-5 text-sm', lg: 'h-12 px-7 text-base' }

  const variantMap: Record<string, string> = {
    shimmer: [
      'relative overflow-hidden rounded-lg border border-primary/30',
      'bg-primary/10 text-primary font-semibold',
      'before:absolute before:inset-0 before:-translate-x-full',
      'before:animate-[shimmer_1.6s_infinite]',
      'before:bg-gradient-to-r before:from-transparent before:via-primary/20 before:to-transparent',
      'hover:bg-primary/15 transition-colors',
    ].join(' '),
    gradient: [
      'rounded-lg bg-gradient-to-br from-primary to-accent',
      'text-primary-foreground font-semibold shadow-lg shadow-primary/25',
      'hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200',
    ].join(' '),
    bordered: [
      'rounded-lg border-2 border-primary text-primary font-semibold',
      'hover:bg-primary hover:text-primary-foreground transition-all duration-200',
    ].join(' '),
    glass: [
      'rounded-lg border border-white/10 bg-white/5 text-foreground font-semibold',
      'backdrop-blur-sm hover:bg-white/10 transition-all duration-200',
    ].join(' '),
    destructive: [
      'rounded-lg bg-destructive text-white font-semibold',
      'hover:bg-destructive/90 transition-colors',
    ].join(' '),
  }

  const { onClick, disabled, type, form, name, value, ...restMotionSafe } = props

  return (
    <motion.button
      whileTap={reduce ? {} : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      form={form}
      name={name}
      value={value}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        sizeMap[size],
        variantMap[variant],
        className,
      )}
    >
      {children}
    </motion.button>
  )
}
