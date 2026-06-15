'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LampEffect, BackgroundRipple } from '@/components/aceternity'
import { Trophy, ArrowRight } from 'lucide-react'

interface PhaseCompleteModalProps {
  phaseName: string
  isOpen: boolean
  onClose: () => void
  onNextPhase?: () => void
}

export function PhaseCompleteModal({ phaseName, isOpen, onClose, onNextPhase }: PhaseCompleteModalProps) {
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(onClose, 6000)
      return () => clearTimeout(t)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={e => e.stopPropagation()}
            className="w-full max-w-md overflow-hidden rounded-2xl"
          >
            <LampEffect className="py-8">
              <BackgroundRipple className="px-8 py-4">
                <div className="relative z-10 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20"
                  >
                    <Trophy className="h-8 w-8 text-primary" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-foreground"
                  >
                    Phase Complete!
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 text-muted-foreground"
                  >
                    You&apos;ve completed the <strong>{phaseName}</strong> phase.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 flex justify-center gap-3"
                  >
                    <button onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-muted">
                      Keep going
                    </button>
                    {onNextPhase && (
                      <button
                        onClick={onNextPhase}
                        className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                      >
                        Next phase <ArrowRight size={14} />
                      </button>
                    )}
                  </motion.div>
                </div>
              </BackgroundRipple>
            </LampEffect>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
