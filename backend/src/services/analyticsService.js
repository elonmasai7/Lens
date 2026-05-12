const CATEGORIES = ['emotional_manipulation', 'fake_statistics', 'suspicious_claims', 'propaganda', 'misleading_headlines', 'ai_generated', 'scam']

export async function getDashboardMetrics() {
  const trends = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
    trustScore: 55 + Math.random() * 30,
    misinformationCount: Math.floor(80 + Math.random() * 120),
    accessibilityScore: 50 + Math.random() * 40,
  }))

  const categoryBreakdown = [
    { category: 'emotional_manipulation', count: 1243, percentage: 36.3, trend: 'up' },
    { category: 'fake_statistics', count: 687, percentage: 20.1, trend: 'stable' },
    { category: 'propaganda', count: 543, percentage: 15.9, trend: 'up' },
    { category: 'misleading_headlines', count: 412, percentage: 12.0, trend: 'down' },
    { category: 'suspicious_claims', count: 298, percentage: 8.7, trend: 'stable' },
    { category: 'ai_generated', count: 156, percentage: 4.6, trend: 'up' },
    { category: 'scam', count: 82, percentage: 2.4, trend: 'down' },
  ]

  const trustHistory = Array.from({ length: 90 }, (_, i) => ({
    date: new Date(Date.now() - (89 - i) * 86400000).toISOString().split('T')[0],
    score: 50 + Math.random() * 35,
  }))

  const geographicData = [
    { region: 'Germany', trustScore: 72, riskLevel: 'low', sampleSize: 2341 },
    { region: 'France', trustScore: 68, riskLevel: 'medium', sampleSize: 1987 },
    { region: 'Italy', trustScore: 59, riskLevel: 'medium', sampleSize: 1654 },
    { region: 'Spain', trustScore: 63, riskLevel: 'medium', sampleSize: 1432 },
    { region: 'Netherlands', trustScore: 78, riskLevel: 'low', sampleSize: 987 },
    { region: 'Poland', trustScore: 52, riskLevel: 'high', sampleSize: 1123 },
    { region: 'Sweden', trustScore: 81, riskLevel: 'low', sampleSize: 876 },
    { region: 'Belgium', trustScore: 74, riskLevel: 'low', sampleSize: 654 },
    { region: 'Austria', trustScore: 71, riskLevel: 'low', sampleSize: 543 },
    { region: 'Denmark', trustScore: 84, riskLevel: 'low', sampleSize: 432 },
    { region: 'Finland', trustScore: 86, riskLevel: 'low', sampleSize: 398 },
    { region: 'Portugal', trustScore: 65, riskLevel: 'medium', sampleSize: 376 },
    { region: 'Ireland', trustScore: 76, riskLevel: 'low', sampleSize: 354 },
    { region: 'Greece', trustScore: 55, riskLevel: 'high', sampleSize: 432 },
    { region: 'Czech Republic', trustScore: 58, riskLevel: 'medium', sampleSize: 321 },
    { region: 'Romania', trustScore: 48, riskLevel: 'high', sampleSize: 298 },
    { region: 'Hungary', trustScore: 45, riskLevel: 'high', sampleSize: 276 },
    { region: 'Bulgaria', trustScore: 44, riskLevel: 'high', sampleSize: 198 },
  ]

  return {
    totalAnalyses: 15423,
    averageTrustScore: 67.3,
    misinformationDetected: 3421,
    accessibilityConversions: 8921,
    activeUsers: 3452,
    trends,
    categoryBreakdown,
    trustHistory,
    geographicData,
  }
}
