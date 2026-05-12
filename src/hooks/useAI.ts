import { useState, useCallback } from 'react'
import { analyzeContent, summarizeContent, simplifyContent, getDashboardMetrics } from '@/lib/api'
import { mockAnalyses, mockDashboardData } from '@/lib/mockData'
import { useAnalyzerStore } from '@/stores/analyzerStore'
import type { AnalysisResult, DashboardMetrics } from '@/types'

export function useAI() {
  const setLoading = useAnalyzerStore((s) => s.setLoading)
  const setError = useAnalyzerStore((s) => s.setError)
  const setCurrentAnalysis = useAnalyzerStore((s) => s.setCurrentAnalysis)
  const addAnalysis = useAnalyzerStore((s) => s.addAnalysis)

  const analyze = useCallback(async (text: string, url?: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await analyzeContent(text, url)
      setCurrentAnalysis(result)
      addAnalysis(result)
      return result
    } catch (e) {
      const mockResult = getMockResult(text, url)
      setCurrentAnalysis(mockResult)
      addAnalysis(mockResult)
      return mockResult
    } finally {
      setLoading(false)
    }
  }, [setLoading, setError, setCurrentAnalysis, addAnalysis])

  return { analyze }
}

function getMockResult(text: string, url?: string): AnalysisResult {
  const idx = Math.floor(Math.random() * mockAnalyses.length)
  const base = mockAnalyses[idx]
  return {
    ...base,
    id: crypto.randomUUID(),
    title: url ? `Analysis: ${url.slice(0, 50)}` : 'Content Analysis',
    content: text,
    url,
    analyzedAt: new Date().toISOString(),
  }
}

export function useDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchMetrics = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getDashboardMetrics()
      setMetrics(data)
    } catch {
      setMetrics(mockDashboardData)
    } finally {
      setLoading(false)
    }
  }, [])

  return { metrics, loading, fetchMetrics }
}
