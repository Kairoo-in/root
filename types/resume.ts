export type ResumeTemplateId = 'minimal' | 'modern' | 'executive' | 'creative'

export interface ContactSection {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  portfolio: string
}

export interface SummarySection {
  text: string
}

export interface ExperienceEntry {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  isCurrent: boolean
  bullets: string[]
  location: string
}

export interface EducationEntry {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface ProjectEntry {
  id: string
  name: string
  description: string
  bullets: string[]
  tech: string[]
  url?: string
}

export interface CertificationEntry {
  name: string
  issuer: string
  date: string
  url?: string
}

export interface ResumeSections {
  contact: ContactSection
  summary: SummarySection
  experience: ExperienceEntry[]
  education: EducationEntry[]
  skills: SkillCategory[]
  projects: ProjectEntry[]
  certifications: CertificationEntry[]
}

export interface ResumeRow {
  id: string
  userId: string
  name: string
  targetRole: string | null
  targetCompany: string | null
  jobDescription: string | null
  sections: ResumeSections
  templateId: ResumeTemplateId
  atsScore: number | null
  isDefault: boolean
  createdAt: string
  updatedAt: string
}
