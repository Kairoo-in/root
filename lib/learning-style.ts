export function sortByLearningStyle<T extends { type: string }>(resources: T[], style?: string | null): T[] {
  if (!style) return resources
  const preferredType: Record<string, string[]> = {
    visual: ['video', 'course', 'article', 'book', 'practice'],
    reading: ['book', 'article', 'course', 'video', 'practice'],
    'hands-on': ['practice', 'course', 'video', 'book', 'article'],
  }
  const order = preferredType[style.toLowerCase()] ?? ['course', 'video', 'book', 'article', 'practice']
  return [...resources].sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type))
}
