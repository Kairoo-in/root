import { db } from '@/data/client'
import { resumes } from '@/data/schema'
import { eq, and, desc } from 'drizzle-orm'
import { nanoid } from 'nanoid'
import type { ResumeSections, ResumeTemplateId } from '@/types/resume'

export type Resume = typeof resumes.$inferSelect
export type ResumeInsert = typeof resumes.$inferInsert

// ── List ──────────────────────────────────────────────────────────────────────
export async function listResumes(userId: string): Promise<Resume[]> {
  return db
    .select()
    .from(resumes)
    .where(eq(resumes.userId, userId))
    .orderBy(desc(resumes.updatedAt))
}

// ── Get ───────────────────────────────────────────────────────────────────────
export async function getResume(userId: string, id: string): Promise<Resume | null> {
  const [row] = await db
    .select()
    .from(resumes)
    .where(and(eq(resumes.id, id), eq(resumes.userId, userId)))
    .limit(1)
  return row ?? null
}

// ── Create ────────────────────────────────────────────────────────────────────
export async function createResume(
  userId: string,
  data: {
    name?: string
    targetRole?: string
    targetCompany?: string
    jobDescription?: string
    sections: ResumeSections
    templateId?: ResumeTemplateId
    isDefault?: boolean
  }
): Promise<Resume> {
  const [row] = await db
    .insert(resumes)
    .values({
      id: nanoid(),
      userId,
      name: data.name ?? 'Untitled Resume',
      targetRole: data.targetRole ?? null,
      targetCompany: data.targetCompany ?? null,
      jobDescription: data.jobDescription ?? null,
      sections: data.sections,
      templateId: data.templateId ?? 'minimal',
      isDefault: data.isDefault ?? false,
    })
    .returning()
  return row
}

// ── Update ────────────────────────────────────────────────────────────────────
export async function updateResume(
  userId: string,
  id: string,
  data: Partial<Pick<Resume, 'name' | 'targetRole' | 'targetCompany' | 'jobDescription' | 'templateId' | 'atsScore' | 'isDefault'> & { sections: ResumeSections }>
): Promise<Resume | null> {
  const [row] = await db
    .update(resumes)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(resumes.id, id), eq(resumes.userId, userId)))
    .returning()
  return row ?? null
}

// ── Delete ────────────────────────────────────────────────────────────────────
export async function deleteResume(userId: string, id: string): Promise<void> {
  await db
    .delete(resumes)
    .where(and(eq(resumes.id, id), eq(resumes.userId, userId)))
}
