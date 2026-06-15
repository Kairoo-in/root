'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Target, ChevronRight } from 'lucide-react'

interface AtsResult {
  score: number
  found: string[]
  missing: string[]
}

interface Props {
  resumeId: string
  initialScore: number | null
  jobDescription: string
  onScoreUpdate: (score: number) => void
}

export default function ATSSidebar({ resumeId, initialScore, jobDescription: initialJD, onScoreUpdate }: Props) {
  const [jd, setJd] = useState(initialJD)
  const [result, setResult] = useState<AtsResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [showJdInput, setShowJdInput] = useState(!initialJD)

  const analyze = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/resumes/${resumeId}/ats-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jd }),
      })
      if (res.ok) {
        const data = (await res.json()) as AtsResult
        setResult(data)
        onScoreUpdate(data.score)
      }
    } finally {
      setLoading(false)
    }
  }

  const scoreColor =
    (result?.score ?? initialScore ?? 0) >= 70
      ? 'text-emerald-400'
      : (result?.score ?? initialScore ?? 0) >= 40
        ? 'text-amber-400'
        : 'text-red-400'

  return (
    <div className="flex flex-col gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 h-full overflow-y-auto">
      <div className="flex items-center gap-2">
        <Target className="w-4 h-4 text-violet-400" />
        <span className="text-sm font-semibold text-white">ATS Score</span>
      </div>

      {/* Score ring */}
      <div className="flex items-center justify-center py-2">
        <div className={`text-5xl font-bold tabular-nums ${scoreColor}`}>
          {result?.score ?? initialScore ?? '–'}
          {(result || initialScore !== null) && <span className="text-xl text-white/40">/100</span>}
        </div>
      </div>

      {/* JD input */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => setShowJdInput(!showJdInput)}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showJdInput ? 'rotate-90' : ''}`} />
          {jd ? 'Edit job description' : 'Paste job description'}
        </button>

        {showJdInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-2"
          >
            <textarea
              rows={6}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-violet-500/50 resize-none"
              value={jd}
              placeholder="Paste the full job description here…"
              onChange={(e) => setJd(e.target.value)}
            />
            <button
              onClick={analyze}
              disabled={loading || !jd.trim()}
              className="px-3 py-2 rounded-lg text-xs font-medium bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white transition-colors"
            >
              {loading ? 'Analyzing…' : 'Analyze'}
            </button>
          </motion.div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div className="flex flex-col gap-3">
          {result.found.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-white/50 uppercase tracking-wider">Matched Keywords</span>
              <div className="flex flex-wrap gap-1.5">
                {result.found.map((kw) => (
                  <span key={kw} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-2.5 h-2.5" /> {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.missing.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-white/50 uppercase tracking-wider">Missing Keywords</span>
              <div className="flex flex-wrap gap-1.5">
                {result.missing.map((kw) => (
                  <span key={kw} className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">
                    <XCircle className="w-2.5 h-2.5" /> {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
