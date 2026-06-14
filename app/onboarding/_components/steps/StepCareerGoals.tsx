'use client'
import { useState } from 'react'
import { Target } from 'lucide-react'

const TIMELINES = ['3 months', '6 months', '1 year', '2 years', '3+ years']
const ROLES = ['Senior Engineer', 'Engineering Manager', 'Product Manager', 'Product Lead', 'Data Scientist', 'ML Engineer', 'Founder/Entrepreneur', 'UX Designer', 'Marketing Lead', 'Finance Analyst', 'Consultant', 'Other']

interface Props {
  data: { targetRole: string; targetTimeline: string; careerGoalShort: string; careerGoalLong: string }
  onNext: (d: any) => void
  onBack: () => void
}

export function StepCareerGoals({ data, onNext, onBack }: Props) {
  const [form, setForm] = useState(data)
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="p-7">
      <div className="mb-5">
        <h2 className="text-lg font-black text-foreground">Where do you want to go?</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Every tool will use this to give goal-aligned advice.</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2">Target role</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {ROLES.map(r => (
              <button key={r} onClick={() => set('targetRole', r)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                  form.targetRole === r ? 'bg-teal-500/15 border-teal-500/50 text-teal-400' : 'border-border text-muted-foreground hover:border-teal-500/30'
                }`}>
                {r}
              </button>
            ))}
          </div>
          <input value={form.targetRole} onChange={e => set('targetRole', e.target.value)}
            placeholder="Or type a custom role..."
            className="w-full bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-teal-500/50 transition-colors" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2">Timeline</label>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map(t => (
              <button key={t} onClick={() => set('targetTimeline', t)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                  form.targetTimeline === t ? 'bg-teal-500/15 border-teal-500/50 text-teal-400' : 'border-border text-muted-foreground hover:border-teal-500/30'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
            One-sentence goal <span className="text-muted-foreground/50 font-normal">(shown on dashboard)</span>
          </label>
          <input value={form.careerGoalShort} onChange={e => set('careerGoalShort', e.target.value)}
            placeholder="e.g. Transition from engineering to PM at a Series B startup"
            className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-teal-500/50 transition-colors" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
            Detailed goal <span className="text-muted-foreground/50 font-normal">(optional — more context = better AI)</span>
          </label>
          <textarea value={form.careerGoalLong} onChange={e => set('careerGoalLong', e.target.value)}
            placeholder="Tell Kairoo more about what success looks like for you, why you want this change, and any constraints..."
            rows={3}
            className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-teal-500/50 resize-none transition-colors" />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <button onClick={onBack} className="flex-none text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-4 py-2.5 rounded-xl border border-border">← Back</button>
        <button onClick={() => onNext(form)} className="flex-1 bg-teal-500 text-black font-bold py-2.5 rounded-xl hover:bg-teal-400 transition-colors cursor-pointer text-sm">Next: Your Background →</button>
      </div>
    </div>
  )
}
