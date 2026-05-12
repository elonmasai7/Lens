import { create } from 'zustand'
import type { AnalysisResult } from '@/types'

interface AnalyzerStore {
  analyses: AnalysisResult[]
  currentAnalysis: AnalysisResult | null
  isLoading: boolean
  error: string | null
  setLoading: (v: boolean) => void
  setError: (v: string | null) => void
  setCurrentAnalysis: (v: AnalysisResult | null) => void
  addAnalysis: (v: AnalysisResult) => void
  clearHistory: () => void
}

export const useAnalyzerStore = create<AnalyzerStore>((set, get) => ({
  analyses: [],
  currentAnalysis: null,
  isLoading: false,
  error: null,
  setLoading: (v) => set({ isLoading: v }),
  setError: (v) => set({ error: v }),
  setCurrentAnalysis: (v) => set({ currentAnalysis: v }),
  addAnalysis: (v) => set({ analyses: [v, ...get().analyses].slice(0, 50) }),
  clearHistory: () => set({ analyses: [] }),
}))
