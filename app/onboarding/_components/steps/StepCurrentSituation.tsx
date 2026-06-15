'use client'
import { useState } from 'react'
import { Briefcase, MapPin, Building2 } from 'lucide-react'

const INDUSTRIES = ['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Design', 'Sales', 'Operations', 'Legal', 'Consulting', 'Other']
const EXP_RANGES = [
  { label: 'Student / Fresher', value: 0 },
  { label: '1–2 years', value: 1 },
  { label: '3–5 years', value: 3 },
  { label: '6–10 years', value: 6 },
  { label: '10+ years', value: 10 },
]

interface Props {
  data: { currentRole: string; currentCompany: string; yearsExperience: number | ''; industry: string; location: string }
  onNext: (d: any) => void
  onBack: () => void
}

export function StepCurrentSituation({ data, onNext, onBack }: Props) {
  const [form, setForm] = useState(data)
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="p-7">
      <div className="mb-5">
        <h2 className="text-lg font-black text-foreground">Where are you right now?</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Your current professional situation.</p>
      </div>
      <div className="space-y-4">
        <Field label="Current job title" icon={Briefcase} placeholder="e.g. Software Engineer, Product Manager, Student" value={form.currentRole} onChange={v => set('currentRole', v)} />
        <Field label="Company / Organisation" icon={Building2} placeholder="e.g. Google, Infosys, IIT Delhi (or leave blank)" value={form.currentCompany} onChange={v => set('currentCompany', v)} />
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2">Years of experience</label>
          <div className="flex flex-wrap gap-2">
            {EXP_RANGES.map(r => (
              <button key={r.label} onClick={() => set('yearsExperience', r.value)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                  form.yearsExperience === r.value ? 'bg-teal-500/15 border-teal-500/50 text-teal-400' : 'border-border text-muted-foreground hover:border-teal-500/30'
                }`}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2">Industry</label>
          <div className="flex flex-wrap gap-2">
            {INDUSTRIES.map(ind => (
              <button key={ind} onClick={() => set('industry', ind)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all cursor-pointer ${
                  form.industry === ind ? 'bg-teal-500/15 border-teal-500/50 text-teal-400' : 'border-border text-muted-foreground hover:border-teal-500/30'
                }`}>
                {ind}
              </button>
            ))}
          </div>
        </div>
        <Field label="Location" icon={MapPin} placeholder="e.g. Bangalore, Mumbai, Remote" value={form.location} onChange={v => set('location', v)} />
      </div>
      <NavButtons onBack={onBack} onNext={() => onNext(form)} nextLabel="Next: Your Goals →" />
    </div>
  )
}

function Field({ label, icon: Icon, placeholder, value, onChange }: { label: string; icon: any; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground mb-1.5">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/50" />
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-teal-500/50 transition-colors" />
      </div>
    </div>
  )
}

function NavButtons({ onBack, onNext, nextLabel }: { onBack: () => void; onNext: () => void; nextLabel: string }) {
  return (
    <div className="flex items-center gap-3 mt-6">
      <button onClick={onBack} className="flex-none text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-4 py-2.5 rounded-xl border border-border">← Back</button>
      <button onClick={onNext} className="flex-1 bg-teal-500 text-black font-bold py-2.5 rounded-xl hover:bg-teal-400 transition-colors cursor-pointer text-sm">{nextLabel}</button>
    </div>
  )
}
