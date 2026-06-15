// data/content/skillResources.ts

export interface CourseResource {
  title: string
  provider: string
  url: string
  type: 'video' | 'course' | 'book' | 'article' | 'practice'
  duration: string  // "4 hours", "6 weeks"
  level: 'beginner' | 'intermediate' | 'advanced'
  free: boolean
  skills: string[]
  rating?: number  // 0-5
}

export const SKILL_RESOURCES: CourseResource[] = [
  // Programming
  { title: 'JavaScript: The Complete Guide 2024', provider: 'Udemy', url: 'https://udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced/', type: 'course', duration: '52 hours', level: 'beginner', free: false, skills: ['javascript', 'web development'], rating: 4.8 },
  { title: 'TypeScript Deep Dive', provider: 'GitBook', url: 'https://basarat.gitbook.io/typescript/', type: 'book', duration: '10 hours', level: 'intermediate', free: true, skills: ['typescript', 'javascript'], rating: 4.7 },
  { title: 'CS50: Introduction to Computer Science', provider: 'Harvard/edX', url: 'https://cs50.harvard.edu/x/', type: 'course', duration: '12 weeks', level: 'beginner', free: true, skills: ['programming', 'algorithms', 'python', 'c'], rating: 4.9 },
  { title: 'Algorithms Specialization', provider: 'Coursera/Stanford', url: 'https://coursera.org/specializations/algorithms', type: 'course', duration: '4 months', level: 'intermediate', free: false, skills: ['algorithms', 'data structures'], rating: 4.8 },
  { title: 'Neetcode 150', provider: 'Neetcode.io', url: 'https://neetcode.io/practice', type: 'practice', duration: 'Self-paced', level: 'intermediate', free: true, skills: ['algorithms', 'leetcode', 'coding interviews'], rating: 4.9 },
  // System Design
  { title: "System Design Interview – An Insider’s Guide", provider: 'Book/Amazon', url: 'https://amazon.com/dp/B08CMF2CQF', type: 'book', duration: '8 hours', level: 'intermediate', free: false, skills: ['system design', 'architecture'], rating: 4.7 },
  { title: 'Grokking the System Design Interview', provider: 'Educative.io', url: 'https://educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers', type: 'course', duration: '15 hours', level: 'intermediate', free: false, skills: ['system design', 'distributed systems'], rating: 4.6 },
  // Product Management
  { title: 'Product Management Fundamentals', provider: 'Coursera/Duke', url: 'https://coursera.org/learn/uva-darden-foundations-frameworks-product-management', type: 'course', duration: '4 weeks', level: 'beginner', free: false, skills: ['product management', 'roadmapping'], rating: 4.5 },
  { title: 'Inspired: How to Create Tech Products Customers Love', provider: 'Book', url: 'https://amazon.com/dp/1119387507', type: 'book', duration: '6 hours', level: 'intermediate', free: false, skills: ['product management', 'product strategy'], rating: 4.8 },
  { title: "Lenny’s Newsletter", provider: 'Substack', url: 'https://lennysnewsletter.com', type: 'article', duration: 'Ongoing', level: 'intermediate', free: false, skills: ['product management', 'growth', 'product strategy'], rating: 4.8 },
  // Data Science / ML
  { title: 'Machine Learning Specialization', provider: 'Coursera/Stanford', url: 'https://coursera.org/specializations/machine-learning-introduction', type: 'course', duration: '3 months', level: 'beginner', free: false, skills: ['machine learning', 'python', 'data science'], rating: 4.9 },
  { title: 'fast.ai - Practical Deep Learning', provider: 'fast.ai', url: 'https://course.fast.ai/', type: 'course', duration: '7 weeks', level: 'intermediate', free: true, skills: ['deep learning', 'python', 'machine learning'], rating: 4.8 },
  { title: 'Kaggle Learn', provider: 'Kaggle', url: 'https://kaggle.com/learn', type: 'practice', duration: 'Self-paced', level: 'beginner', free: true, skills: ['data science', 'python', 'sql', 'machine learning'], rating: 4.7 },
  // Cloud / DevOps
  { title: 'AWS Certified Solutions Architect', provider: 'AWS/A Cloud Guru', url: 'https://acloudguru.com/course/aws-certified-solutions-architect-associate-saa-c03', type: 'course', duration: '20 hours', level: 'intermediate', free: false, skills: ['aws', 'cloud computing', 'devops'], rating: 4.7 },
  { title: 'The DevOps Handbook', provider: 'Book', url: 'https://amazon.com/dp/1942788002', type: 'book', duration: '10 hours', level: 'intermediate', free: false, skills: ['devops', 'ci/cd', 'culture'], rating: 4.6 },
  // Leadership / Soft Skills
  { title: 'How to Win Friends and Influence People', provider: 'Book', url: 'https://amazon.com/dp/0671027034', type: 'book', duration: '5 hours', level: 'beginner', free: false, skills: ['communication', 'leadership', 'influence'], rating: 4.7 },
  { title: "The Manager’s Path", provider: 'Book', url: 'https://amazon.com/dp/1491973897', type: 'book', duration: '6 hours', level: 'intermediate', free: false, skills: ['management', 'leadership', 'engineering management'], rating: 4.8 },
  // UI/UX
  { title: 'Google UX Design Certificate', provider: 'Coursera/Google', url: 'https://coursera.org/professional-certificates/google-ux-design', type: 'course', duration: '6 months', level: 'beginner', free: false, skills: ['ux design', 'figma', 'user research', 'prototyping'], rating: 4.8 },
  { title: 'Refactoring UI', provider: 'Book', url: 'https://refactoringui.com/', type: 'book', duration: '4 hours', level: 'intermediate', free: false, skills: ['ui design', 'visual design', 'css'], rating: 4.9 },
  // SQL / Databases
  { title: 'Mode SQL Tutorial', provider: 'Mode Analytics', url: 'https://mode.com/sql-tutorial/', type: 'course', duration: '6 hours', level: 'beginner', free: true, skills: ['sql', 'data analysis', 'databases'], rating: 4.6 },
  { title: "PostgreSQL: Up and Running", provider: "Book/O’Reilly", url: 'https://oreilly.com/library/view/postgresql-up-and/9781491963401/', type: 'book', duration: '8 hours', level: 'intermediate', free: false, skills: ['postgresql', 'databases', 'sql'], rating: 4.5 },
]

export function getResourcesForSkill(skillName: string): CourseResource[] {
  const lower = skillName.toLowerCase()
  return SKILL_RESOURCES.filter(r =>
    r.skills.some(s => s.toLowerCase().includes(lower) || lower.includes(s.toLowerCase()))
  ).slice(0, 4)
}

// Salary impact data: average salary increase for acquiring this skill
export const SKILL_SALARY_DELTA: Record<string, { usdDelta: number; inrDelta: number; demandScore: number }> = {
  'machine learning': { usdDelta: 25000, inrDelta: 1500000, demandScore: 95 },
  'system design': { usdDelta: 20000, inrDelta: 1200000, demandScore: 92 },
  'typescript': { usdDelta: 8000, inrDelta: 480000, demandScore: 85 },
  'aws': { usdDelta: 15000, inrDelta: 900000, demandScore: 90 },
  'python': { usdDelta: 12000, inrDelta: 720000, demandScore: 88 },
  'react': { usdDelta: 10000, inrDelta: 600000, demandScore: 87 },
  'algorithms': { usdDelta: 18000, inrDelta: 1080000, demandScore: 91 },
  'leadership': { usdDelta: 22000, inrDelta: 1320000, demandScore: 88 },
  'product management': { usdDelta: 30000, inrDelta: 1800000, demandScore: 86 },
  'sql': { usdDelta: 8000, inrDelta: 480000, demandScore: 82 },
  'communication': { usdDelta: 15000, inrDelta: 900000, demandScore: 84 },
  'devops': { usdDelta: 18000, inrDelta: 1080000, demandScore: 89 },
}

export function getSalaryDelta(skillName: string): { usdDelta: number; inrDelta: number; demandScore: number } | null {
  const lower = skillName.toLowerCase()
  const key = Object.keys(SKILL_SALARY_DELTA).find(k => lower.includes(k) || k.includes(lower))
  return key ? SKILL_SALARY_DELTA[key] : null
}
