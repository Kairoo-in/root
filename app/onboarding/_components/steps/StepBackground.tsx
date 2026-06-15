'use client'
import { useState } from 'react'
import { X, Plus } from 'lucide-react'

interface Props {
  data: { skills: string[]; certifications: string[]; resumeText: string }
  onNext: (d: any) => void
  onBack: () => void
}

const COMMON_SKILLS = ['Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'Excel', 'Figma', 'Product Management', 'Data Analysis', 'Machine Learning', 'Marketing', 'Sales', 'Leadership', 'Communication', 'Project Management']

export function StepBackground({ data, onNext, onBack }: Props) {
  const [skills, setSkills] = useState<string[]>(data.skills)
  const [skillInput, setSkillInput] = useState('')
  const [certs, setCerts] = useState<string[]>(data.certifications)
  const [certInput, setCertInput] = useState('')
  const [resumeText, setResumeText] = useState(data.resumeText)

  const addSkill = (s: string) => {
    const trimmed = s.trim()
    if (trimmed && !skills.includes(trimmed)) setSkills(prev => [...prev, trimmed])
    setSkillInput('')
  }
  const removeSkill = (s: string) => setSkills(prev => prev.filter(x => x !== s))
  const addCert = (c: string) => {
    const trimmed = c.trim()
    if (trimmed && !certs.includes(trimmed)) setCerts(prev => [...prev, trimmed])
    setCertInput('')
  }
  const removeCert = (c: string) => setCerts(prev => prev.filter(x => x !== c))

  return (
    <div className="p-7">
      <div className="mb-5">
        <h2 className="text-lg font-black text-foreground">Your background</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Skills, certs, and optionally your resume.</p>
      </div>
      <div className="space-y-5">
        {/* Skills */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2">Skills</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {COMMON_SKILLS.map(s => !skills.includes(s) && (
              <button key={s} onClick={() => addSkill(s)}
                className="text-[11px] px-2.5 py-1 rounded-lg border border-border text-muted-foreground hover:border-teal-500/40 hover:text-teal-400 transition-all cursor-pointer">
                + {s}
              </button>
            ))}
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {skills.map(s => (
                <span key={s} className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 font-medium">
                  {s}
                  <button onClick={() => removeSkill(s)} className="cursor-pointer hover:text-red-400 transition-colors"><X className="w-2.5 h-2.5" /></button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSkill(skillInput)}
              placeholder="Add custom skill..."
              className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-teal-500/50 transition-colors" />
            <button onClick={() => addSkill(skillInput)} className="px-3 rounded-xl border border-border text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certifications */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-2">Certifications <span className="font-normal text-muted-foreground/50">(optional)</span></label>
          {certs.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {certs.map(c => (
                <span key={c} className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                  {c}
                  <button onClick={() => removeCert(c)} className="cursor-pointer hover:text-red-400 transition-colors"><X className="w-2.5 h-2.5" /></button>
                </span>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <input value={certInput} onChange={e => setCertInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addCert(certInput)}
              placeholder="e.g. AWS Solutions Architect, PMP, CFA..."
              className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-teal-500/50 transition-colors" />
            <button onClick={() => addCert(certInput)} className="px-3 rounded-xl border border-border text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Resume paste */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground mb-1.5">
            Paste your resume <span className="font-normal text-muted-foreground/50">(optional but powerful — AI uses this verbatim)</span>
          </label>
          <textarea value={resumeText} onChange={e => setResumeText(e.target.value)}
            placeholder="Paste your full resume text here. The AI will use it to write better cover letters, improve your resume, prep tailored interview answers, and more..."
            rows={5}
            className="w-full bg-background border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-teal-500/50 resize-none transition-colors font-mono text-[11px]" />
        </div>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <button onClick={onBack} className="flex-none text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-4 py-2.5 rounded-xl border border-border">← Back</button>
        <button onClick={() => onNext({ skills, certifications: certs, resumeText })} className="flex-1 bg-teal-500 text-black font-bold py-2.5 rounded-xl hover:bg-teal-400 transition-colors cursor-pointer text-sm">Next: Preferences →</button>
      </div>
    </div>
  )
}
