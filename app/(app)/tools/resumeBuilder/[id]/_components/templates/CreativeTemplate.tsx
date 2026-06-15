import type { ResumeSections } from '@/types/resume'

interface Props { sections: ResumeSections }

const ACCENT = '#6d28d9' // violet-700

export default function CreativeTemplate({ sections }: Props) {
  const { contact, summary, experience, education, skills, projects, certifications } = sections

  return (
    <div className="flex font-[Inter,sans-serif] text-[13px] leading-[1.55] min-h-full">
      {/* Left accent strip */}
      <div className="w-3 shrink-0" style={{ background: ACCENT }} />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[28px] font-black tracking-tight" style={{ color: ACCENT }}>{contact.name || 'Your Name'}</h1>
          <div className="mt-1.5 flex flex-wrap gap-x-3 text-[11px] text-[#555]">
            {contact.email && <span>{contact.email}</span>}
            {contact.phone && <span>{contact.phone}</span>}
            {contact.location && <span>{contact.location}</span>}
            {contact.linkedin && <span>{contact.linkedin}</span>}
            {contact.github && <span>{contact.github}</span>}
            {contact.portfolio && <span>{contact.portfolio}</span>}
          </div>
        </div>

        {summary.text && (
          <CSection title="About" accent={ACCENT}>
            <p className="text-[13px] text-[#333]">{summary.text}</p>
          </CSection>
        )}

        {experience.length > 0 && (
          <CSection title="Experience" accent={ACCENT}>
            {experience.map((e) => (
              <div key={e.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-[14px] text-[#111]">{e.role}</span>
                  <span className="text-[11px] text-[#888]">{e.startDate}{e.startDate ? '–' : ''}{e.isCurrent ? 'Present' : e.endDate}</span>
                </div>
                <div className="text-[12px]" style={{ color: ACCENT }}>{e.company}{e.location ? ` · ${e.location}` : ''}</div>
                <ul className="mt-1 ml-4 list-disc text-[12.5px] text-[#333] space-y-0.5">
                  {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </CSection>
        )}

        {skills.length > 0 && (
          <CSection title="Skills" accent={ACCENT}>
            {skills.map((s, i) => (
              <div key={i} className="mb-1.5">
                {s.category && <span className="font-semibold text-[12px]" style={{ color: ACCENT }}>{s.category}: </span>}
                <span className="text-[12.5px] text-[#333]">{s.items.join(' · ')}</span>
              </div>
            ))}
          </CSection>
        )}

        {education.length > 0 && (
          <CSection title="Education" accent={ACCENT}>
            {education.map((e) => (
              <div key={e.id} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{e.institution}</span>
                  <span className="text-[11px] text-[#888]">{e.startDate}{e.startDate ? '–' : ''}{e.endDate}</span>
                </div>
                <div className="text-[12px] text-[#555]">{e.degree}{e.field ? `, ${e.field}` : ''}</div>
              </div>
            ))}
          </CSection>
        )}

        {projects.length > 0 && (
          <CSection title="Projects" accent={ACCENT}>
            {projects.map((p) => (
              <div key={p.id} className="mb-3">
                <div className="font-bold text-[13px]">{p.name}</div>
                {p.tech.length > 0 && <div className="text-[11px] text-[#888]">{p.tech.join(' · ')}</div>}
                {p.description && <p className="text-[12px] text-[#555]">{p.description}</p>}
                <ul className="mt-0.5 ml-4 list-disc text-[12.5px] text-[#333] space-y-0.5">
                  {p.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            ))}
          </CSection>
        )}

        {certifications.length > 0 && (
          <CSection title="Certifications" accent={ACCENT}>
            {certifications.map((c, i) => (
              <div key={i} className="text-[12.5px] mb-1">
                <span className="font-bold">{c.name}</span>
                {c.issuer && <span className="text-[#555]"> · {c.issuer}</span>}
                {c.date && <span className="text-[#888]"> · {c.date}</span>}
              </div>
            ))}
          </CSection>
        )}
      </div>
    </div>
  )
}

function CSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-[11px] font-black uppercase tracking-[0.15em] mb-1.5" style={{ color: accent }}>{title}</h2>
      <div className="border-t-2 pt-2" style={{ borderColor: accent }}>{children}</div>
    </div>
  )
}
