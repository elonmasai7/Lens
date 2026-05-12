export interface AnalysisResult {
  id: string
  title: string
  content: string
  url?: string
  trustScore: number
  riskIndicators: RiskIndicator[]
  sourceCredibility: SourceCredibility
  manipulationAnalysis: ManipulationAnalysis
  alternativeSources: AlternativeSource[]
  summary: string
  simplifiedContent?: string
  accessibilityScore: number
  analyzedAt: string
}

export interface RiskIndicator {
  category: RiskCategory
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  evidence: string[]
  score: number
}

export type RiskCategory =
  | 'emotional_manipulation'
  | 'fake_statistics'
  | 'suspicious_claims'
  | 'propaganda'
  | 'misleading_headlines'
  | 'ai_generated'
  | 'scam'

export interface SourceCredibility {
  score: number
  level: 'very_high' | 'high' | 'moderate' | 'low' | 'very_low'
  factors: CredibilityFactor[]
  lastVerified: string
}

export interface CredibilityFactor {
  name: string
  score: number
  description: string
}

export interface ManipulationAnalysis {
  emotionalScore: number
  logicalFallacies: string[]
  manipulativeTechniques: string[]
  biasAssessment: string
}

export interface AlternativeSource {
  name: string
  url: string
  credibilityScore: number
  reason: string
}

export interface AccessibilityPreferences {
  dyslexiaMode: boolean
  highContrast: boolean
  textSpacing: number
  fontSize: number
  simplifiedReading: boolean
  voiceNarration: boolean
  fontFamily: string
  colorScheme: 'auto' | 'light' | 'dark'
  reducedMotion: boolean
}

export interface DashboardMetrics {
  totalAnalyses: number
  averageTrustScore: number
  misinformationDetected: number
  accessibilityConversions: number
  activeUsers: number
  trends: TrendData[]
  categoryBreakdown: CategoryBreakdown[]
  trustHistory: TrustHistoryPoint[]
  geographicData: GeographicDataPoint[]
}

export interface TrendData {
  date: string
  trustScore: number
  misinformationCount: number
  accessibilityScore: number
}

export interface CategoryBreakdown {
  category: RiskCategory
  count: number
  percentage: number
  trend: 'up' | 'down' | 'stable'
}

export interface TrustHistoryPoint {
  date: string
  score: number
}

export interface GeographicDataPoint {
  region: string
  trustScore: number
  riskLevel: 'low' | 'medium' | 'high'
  sampleSize: number
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  simplified?: boolean
}

export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: { code: string; message: string }
  meta?: { timestamp: string; version: string; processingTime: number }
}
