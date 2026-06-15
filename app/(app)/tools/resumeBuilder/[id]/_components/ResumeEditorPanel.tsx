'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { ResumeSections } from '@/types/resume'
import SectionEditor from './SectionEditor'

interface Props {
  sections: ResumeSections
  onChange: (sections: ResumeSections) => void
  targetRole: string
  targetCompany: string
  jobDescription: string
}

const SECTION_ORDER: Array<keyof ResumeSections> = [
  'contact', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications',
]

const SECTION_LABELS: Record<keyof ResumeSections, string> = {
  contact: 'Contact',
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
}

export default function ResumeEditorPanel({ sections, onChange, targetRole, targetCompany, jobDescription }: Props) {
  const [openSection, setOpenSection] = useState<keyof ResumeSections | ''>('summary')

  return (
    <div className="flex flex-col gap-2 h-full overflow-y-auto pr-2">
      {SECTION_ORDER.map((key) => (
        <div key={key} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
          <button
            onClick={() => setOpenSection(openSection === key ? '' : key)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-white hover:bg-white/5 transition-colors"
          >
            <span>{SECTION_LABELS[key]}</span>
            <motion.div
              animate={{ rotate: openSection === key ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-white/40" />
            </motion.div>
          </button>

          <AnimatePresence initial={false}>
            {openSection === key && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 pt-1">
                  <SectionEditor
                    sectionKey={key}
                    sections={sections}
                    onChange={onChange}
                    targetRole={targetRole}
                    targetCompany={targetCompany}
                    jobDescription={jobDescription}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
