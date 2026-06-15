'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useReducedMotion } from 'framer-motion'
import { LampEffect } from '@/components/aceternity'
import { GlowingEffect } from '@/components/aceternity'
import { GridDotBackground } from '@/components/aceternity'
import { cn } from '@/lib/utils'
import { COMPANY_PACKS } from '@/data/content/companyInterviewPacks'
import { SessionModeCard } from './SessionModeCard'
import type { InterviewType } from '@/types/interview'

const MODES: InterviewType[] = ['behavioral', 'technical', 'system_design', 'case_study']

export function HubClientSection() {
  const router = useRouter()
  const reduce = useReducedMotion()
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  function handleModeClick(type: InterviewType) {
    const params = new URLSearchParams({ type })
    if (selectedCompany) {
      const pack = COMPANY_PACKS.find((c) => c.id === selectedCompany)
      if (pack) params.set('company', pack.name)
    }
    router.push(`/tools/interviewPrep/setup?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Hero with lamp effect + dot grid background */}
      <GridDotBackground
        variant="dots"
        color="rgba(20,184,166,0.12)"
        className="rounded-3xl overflow-hidden"
      >
        <LampEffect className="pt-6 pb-2 min-h-[220px]">
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center gap-3 text-center px-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-medium text-teal-400 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
              AI-Powered Interview Coach
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="bg-linear-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Master
              </span>{' '}
              <span className="text-white">Your Interview</span>
            </h1>
            <p className="max-w-sm text-sm text-white/50 leading-relaxed">
              Personalized practice sessions with real-time feedback, STAR coaching, and company-specific question packs.
            </p>
          </motion.div>
        </LampEffect>
      </GridDotBackground>

      {/* Company pack selector */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-px w-4 bg-teal-500/50" />
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
              Company Pack
            </p>
          </div>
          {selectedCompany && (
            <button
              onClick={() => setSelectedCompany(null)}
              className="text-xs text-white/30 transition-colors hover:text-white/60"
            >
              Clear → General
            </button>
          )}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {COMPANY_PACKS.map((c, i) => {
            const isSelected = selectedCompany === c.id
            const tierStyle =
              c.tier === 'faang'
                ? { border: 'border-violet-500/40', glow: 'rgba(139,92,246,0.3)', badge: 'bg-violet-500/10 text-violet-400' }
                : c.tier === 'tier2'
                  ? { border: 'border-sky-500/40', glow: 'rgba(14,165,233,0.3)', badge: 'bg-sky-500/10 text-sky-400' }
                  : { border: 'border-emerald-500/40', glow: 'rgba(16,185,129,0.3)', badge: 'bg-emerald-500/10 text-emerald-400' }

            return (
              <motion.div
                key={c.id}
                initial={reduce ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="shrink-0"
              >
                <GlowingEffect
                  color={isSelected ? 'rgba(20,184,166,0.35)' : tierStyle.glow}
                  size={160}
                  blur={60}
                  className="rounded-2xl"
                >
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    whileHover={reduce ? {} : { y: -2 }}
                    onClick={() => setSelectedCompany(c.id === selectedCompany ? null : c.id)}
                    className={cn(
                      'flex min-w-[110px] flex-col items-center gap-1.5 rounded-2xl border px-4 py-3.5 text-sm font-medium transition-all duration-200 backdrop-blur-sm',
                      isSelected
                        ? 'border-teal-500/60 bg-teal-500/10 shadow-[0_0_20px_rgba(20,184,166,0.15)]'
                        : cn('bg-white/5 hover:bg-white/8', tierStyle.border, 'hover:border-opacity-70'),
                    )}
                  >
                    <span className="text-2xl">{c.logo}</span>
                    <span className={cn('font-semibold text-xs', isSelected ? 'text-teal-300' : 'text-white/80')}>
                      {c.name}
                    </span>
                    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', tierStyle.badge)}>
                      {c.tier === 'faang' ? 'FAANG' : c.tier === 'tier2' ? 'Tier 2' : 'Startup'}
                    </span>
                  </motion.button>
                </GlowingEffect>
              </motion.div>
            )
          })}
        </div>

        {!selectedCompany && (
          <p className="mt-2.5 text-xs text-white/30">
            Select a company pack to tailor questions, or pick a mode below for a general session.
          </p>
        )}

        {selectedCompany && (
          <motion.p
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2.5 text-xs text-teal-400/70"
          >
            Questions tailored for{' '}
            <span className="font-semibold text-teal-400">
              {COMPANY_PACKS.find((c) => c.id === selectedCompany)?.name}
            </span>
          </motion.p>
        )}
      </div>

      {/* Mode selector */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-4 bg-teal-500/50" />
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Start New Session
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {MODES.map((type, i) => (
            <motion.div
              key={type}
              initial={reduce ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i + 0.2, duration: 0.4 }}
              className="cursor-pointer"
              onClick={() => handleModeClick(type)}
            >
              <GlowingEffect color="rgba(20,184,166,0.25)" size={180} blur={70} className="rounded-2xl">
                <SessionModeCard type={type} selected={false} onClick={() => {}} />
              </GlowingEffect>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
