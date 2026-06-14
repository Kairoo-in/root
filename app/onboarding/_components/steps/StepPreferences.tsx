'use client'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface Props {
  data: { workStyle: string; learningStyle: string }
  onNext: (d: any) => void
  onBack: () => void
  saving: boolean
}

const WORK_STYLES = [
  { value: 'remote', label: '🏠 Remote', desc: 'Fully remote, location-independent' },
  { value: 'hybrid', label: '🏙️ Hybrid', desc: 'Mix of office and remote' },
  { value: 'onsite', label: '🏢 On-site', desc: 'Office-first environment' },
]
const LEARN_STYLES = [
  { value: 'hands-on', label: '🛠️ Hands-on', desc: 'Learn by doing, projects, practice' },
  { value: 'reading', label: '📚 Reading', desc: 'Books, articles, documentation' },
  { value: 'visual', label: '🎬 Visual', desc: 'Videos, diagrams, presentations' },
  { value: 'social', label: '👥 Social', desc: 'Courses, mentors, communities' },
]

export function StepPreferences({ data, onNext, onBack, saving }: Props) {
  const [workStyle, setWorkStyle] = useState(data.workStyle)
  const [learningStyle, setLearningStyle] = useState(data.learningStyle)

  return (
    <div className="p-7">
      <div className="mb-5">
        <h2 className="text-lg font-black text-foreground">Your preferences</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Kairoo will tailor advice to how you work and learn best.</p>
      </div>
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2">Work style preference</label>
          <div className="space-y-2">
            {WORK_STYLES.map(w => (
              <button key={w.value} onClick={() => setWorkStyle(w.value)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  workStyle === w.value ? 'border-teal-500/40 bg-teal-500/5 text-foreground' : 'border-border text-muted-foreground hover:border-teal-500/20'
                }`}>
                <span className="text-base">{w.label.split(' ')[0]}</span>
                <div>
                  <div className="text-xs font-semibold">{w.label.split(' ').slice(1).join(' ')}</div>
                  <div className="text-[11px] text-muted-foreground">{w.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2">How do you learn best?</label>
          <div className="grid grid-cols-2 gap-2">
            {LEARN_STYLES.map(l => (
              <button key={l.value} onClick={() => setLearningStyle(l.value)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  learningStyle === l.value ? 'border-teal-500/40 bg-teal-500/5 text-teal-400' : 'border-border text-muted-foreground hover:border-teal-500/20'
                }`}>
                <span className="text-xl">{l.label.split(' ')[0]}</span>
                <span className="text-[11px] font-semibold">{l.label.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <button onClick={onBack} className="flex-none text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-4 py-2.5 rounded-xl border border-border">← Back</button>
        <button onClick={() => onNext({ workStyle, learningStyle })} disabled={saving}
          className="flex-1 bg-teal-500 text-black font-bold py-2.5 rounded-xl hover:bg-teal-400 transition-colors cursor-pointer text-sm flex items-center justify-center gap-2 disabled:opacity-70">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving your profile...</> : '🎉 Complete Setup — Take me to Kairoo!'}
        </button>
      </div>
    </div>
  )
}
