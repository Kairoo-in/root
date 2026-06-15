'use client'

import { useState } from 'react'

export function useAIStream() {
  const [isStreaming, setIsStreaming] = useState(false)

  const stream = async (featureId: string, inputs: Record<string, string>): Promise<string> => {
    setIsStreaming(true)
    let result = ''
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featureId, inputs }),
      })
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(err.error)
      }
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        result += decoder.decode(value, { stream: true })
      }
    } finally {
      setIsStreaming(false)
    }
    return result
  }

  return { stream, isStreaming }
}
