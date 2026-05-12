import type { AnalysisResult, DashboardMetrics } from '@/types'

const API_BASE = '/api/v1'

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const defaultHeaders: Record<string, string> = { 'Content-Type': 'application/json' }
  const customHeaders = (options?.headers as Record<string, string>) || {}

  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: options?.method || 'GET',
    headers: { ...defaultHeaders, ...customHeaders },
    body: options?.body,
    signal: options?.signal,
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

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const data = await apiRequest<{ success: boolean; data: DashboardMetrics }>('/analytics/dashboard')
  return data.data
}
