import type { AnalysisResult, DashboardMetrics } from '@/types'

const API_BASE = '/api/v1'

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.error?.message || err.message || 'Request failed')
  }
  return res.json()
}

export async function analyzeContent(text: string, url?: string): Promise<AnalysisResult> {
  const data = await apiRequest<{ success: boolean; data: AnalysisResult }>('/analyze', {
    method: 'POST',
    body: JSON.stringify({ text, url }),
  })
  return data.data
}

export async function summarizeContent(text: string): Promise<string> {
  const data = await apiRequest<{ success: boolean; data: { summary: string } }>('/summarize', {
    method: 'POST',
    body: JSON.stringify({ text }),
  })
  return data.data.summary
}

export async function simplifyContent(text: string): Promise<string> {
  const data = await apiRequest<{ success: boolean; data: { simplified: string } }>('/simplify', {
    method: 'POST',
    body: JSON.stringify({ text }),
  })
  return data.data.simplified
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const data = await apiRequest<{ success: boolean; data: DashboardMetrics }>('/analytics/dashboard')
  return data.data
}

export async function getTrustScore(source: string): Promise<{ score: number; level: string }> {
  const data = await apiRequest<{ success: boolean; data: { score: number; level: string } }>(`/trust/score?source=${encodeURIComponent(source)}`)
  return data.data
}
