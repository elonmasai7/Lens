import type {
  AnalysisResult,
  DashboardMetrics,
  SourceCredibility,
  GeographicDataPoint,
} from '@/types'

const now = new Date().toISOString()

export const mockSources: SourceCredibility[] = [
  { score: 98, level: 'very_high', factors: [{ name: 'Editorial Standards', score: 99, description: 'Highest journalistic standards' }, { name: 'Fact-Checking Process', score: 97, description: 'Rigorous verification' }], lastVerified: now },
  { score: 92, level: 'very_high', factors: [{ name: 'Editorial Standards', score: 94, description: 'Strong editorial oversight' }, { name: 'Source Transparency', score: 90, description: 'Clear attribution' }], lastVerified: now },
  { score: 78, level: 'high', factors: [{ name: 'Domain Authority', score: 80, description: 'Established domain' }, { name: 'Content Quality', score: 76, description: 'Generally reliable' }], lastVerified: now },
  { score: 45, level: 'moderate', factors: [{ name: 'Bias Score', score: 40, description: 'Moderate bias detected' }, { name: 'Verification', score: 50, description: 'Partial verification' }], lastVerified: now },
  { score: 22, level: 'low', factors: [{ name: 'Domain Reputation', score: 20, description: 'Suspicious domain' }, { name: 'Factual Accuracy', score: 24, description: 'Frequently inaccurate' }], lastVerified: now },
  { score: 8, level: 'very_low', factors: [{ name: 'Known Misinformation', score: 5, description: 'Known misinformation source' }, { name: 'Domain Age', score: 11, description: 'Recently registered' }], lastVerified: now },
]

export const mockAnalyses: AnalysisResult[] = [
  {
    id: '1', title: 'Breaking: New Study Shows Miracle Cure for Diabetes',
    content: 'A revolutionary new study has revealed that a simple natural ingredient can cure diabetes overnight. Doctors are baffled by this incredible breakthrough that pharmaceutical companies don\'t want you to know about. Share this before it gets deleted!',
    trustScore: 8, accessibilityScore: 45,
    riskIndicators: [
      { category: 'emotional_manipulation', severity: 'critical', description: 'Uses fear-based language and urgency tactics', evidence: ['doctors are baffled', 'don\'t want you to know', 'before it gets deleted'], score: 92 },
      { category: 'suspicious_claims', severity: 'critical', description: 'Extraordinary claims without evidence', evidence: ['cure diabetes overnight', 'natural ingredient'], score: 88 },
      { category: 'scam', severity: 'high', description: 'Classic scam pattern detected', evidence: ['Share this', 'miracle cure', 'pharmaceutical companies'], score: 85 },
    ],
    manipulationAnalysis: { emotionalScore: 92, logicalFallacies: ['appeal to emotion', 'false dilemma', 'anecdotal fallacy'], manipulativeTechniques: ['fear mongering', 'conspiracy theory framing', 'urgency creation'], biasAssessment: 'Heavily biased with sensationalist framing' },
    alternativeSources: [
      { name: 'European Medicines Agency', url: 'https://www.ema.europa.eu', credibilityScore: 98, reason: 'Official EU health authority' },
      { name: 'WHO Fact Sheets', url: 'https://www.who.int', credibilityScore: 96, reason: 'World Health Organization' },
    ],
    sourceCredibility: mockSources[5], summary: 'This article contains multiple misinformation indicators typical of health scam content.', simplifiedContent: 'This article promotes an unproven "miracle cure" for diabetes. Be very careful - there is no evidence for these claims.', analyzedAt: now,
  },
  {
    id: '2', title: 'EU Parliament Votes on New Digital Regulation Package',
    content: 'The European Parliament has adopted a comprehensive digital regulation package aimed at protecting citizens\' online rights. The legislation addresses platform accountability, data protection, and digital accessibility requirements for all member states.',
    trustScore: 94, accessibilityScore: 88,
    riskIndicators: [
      { category: 'misleading_headlines', severity: 'low', description: 'Minor sensationalism in headline', evidence: [], score: 12 },
    ],
    manipulationAnalysis: { emotionalScore: 8, logicalFallacies: [], manipulativeTechniques: [], biasAssessment: 'Balanced reporting with factual citations' },
    alternativeSources: [
      { name: 'EUR-Lex', url: 'https://eur-lex.europa.eu', credibilityScore: 99, reason: 'Official EU law database' },
      { name: 'European Parliament News', url: 'https://www.europarl.europa.eu', credibilityScore: 98, reason: 'Official source' },
    ],
    sourceCredibility: mockSources[0], summary: 'Reliable reporting on EU digital regulation developments.', analyzedAt: now,
  },
  {
    id: '3', title: 'You Won\'t Believe What Scientists Just Discovered About Vaccines',
    content: 'In a shocking revelation that mainstream media is covering up, independent researchers have found that ... This information is being suppressed by big pharmaceutical companies who are only interested in profits. Share this with everyone you know before it disappears!',
    trustScore: 5, accessibilityScore: 35,
    riskIndicators: [
      { category: 'emotional_manipulation', severity: 'critical', description: 'Extreme emotional manipulation', evidence: ['shocking revelation', 'covering up', 'suppressed'], score: 95 },
      { category: 'ai_generated', severity: 'high', description: 'AI-generated or heavily templated content', evidence: ['Clickbait structure', 'Viral share pattern'], score: 78 },
      { category: 'propaganda', severity: 'high', description: 'Anti-science propaganda pattern', evidence: ['mainstream media is covering up', 'big pharmaceutical'], score: 82 },
    ],
    manipulationAnalysis: { emotionalScore: 95, logicalFallacies: ['conspiracy theory', 'appeal to emotion', 'hasty generalization'], manipulativeTechniques: ['conspiracy narrative', 'victimization framing', 'urgency creation'], biasAssessment: 'Extreme anti-science bias with conspiracy elements' },
    alternativeSources: [
      { name: 'European Centre for Disease Control', url: 'https://www.ecdc.europa.eu', credibilityScore: 97, reason: 'EU public health authority' },
      { name: 'Science-Based Medicine', url: 'https://sciencebasedmedicine.org', credibilityScore: 92, reason: 'Evidence-based analysis' },
    ],
    sourceCredibility: mockSources[5], summary: 'Anti-vaccine misinformation using classic conspiracy theory tactics.', simplifiedContent: 'This article contains false information about vaccines that could be harmful to your health.', analyzedAt: now,
  },
  {
    id: '4', title: 'European Commission Announces €5 Billion Digital Inclusion Fund',
    content: 'The European Commission has unveiled a new €5 billion fund dedicated to improving digital accessibility and inclusion across all EU member states. The initiative targets barrier-free access to digital services for people with disabilities.',
    trustScore: 96, accessibilityScore: 92,
    riskIndicators: [],
    manipulationAnalysis: { emotionalScore: 5, logicalFallacies: [], manipulativeTechniques: [], biasAssessment: 'Factual, official announcement' },
    alternativeSources: [
      { name: 'European Commission', url: 'https://ec.europa.eu', credibilityScore: 99, reason: 'Official source' },
    ],
    sourceCredibility: mockSources[0], summary: 'Official announcement of EU digital inclusion funding.', simplifiedContent: 'The EU is spending €5 billion to make digital services accessible for everyone, including people with disabilities.', analyzedAt: now,
  },
  {
    id: '5', title: 'Study Shows 73% Increase in Online Misinformation Targeting Vulnerable Groups',
    content: 'New research published in the Journal of Digital Ethics reveals a dramatic increase in misinformation campaigns specifically targeting elderly and disabled populations across Europe. The study analyzed over 100,000 articles across 12 EU languages.',
    trustScore: 85, accessibilityScore: 76,
    riskIndicators: [
      { category: 'fake_statistics', severity: 'low', description: 'Statistics appear credible but source needs verification', evidence: [], score: 15 },
    ],
    manipulationAnalysis: { emotionalScore: 25, logicalFallacies: [], manipulativeTechniques: [], biasAssessment: 'Well-researched with minor framing bias' },
    alternativeSources: [
      { name: 'EDMO', url: 'https://edmo.eu', credibilityScore: 95, reason: 'European Digital Media Observatory' },
    ],
    sourceCredibility: mockSources[2], summary: 'Credible research on misinformation targeting vulnerable groups.', simplifiedContent: 'A new study found that false information targeting older people and people with disabilities has increased by 73% in Europe.', analyzedAt: now,
  },
  {
    id: '6', title: 'Political Leader Claims Immigrants Are Destroying Our Healthcare System',
    content: 'In a speech yesterday, the opposition leader claimed that immigration is the primary cause of healthcare system strain, stating that "millions are coming here just for free healthcare, draining resources from our citizens."',
    trustScore: 18, accessibilityScore: 42,
    riskIndicators: [
      { category: 'propaganda', severity: 'high', description: 'Anti-immigration propaganda with xenophobic framing', evidence: ['destroying our', 'millions are coming', 'draining resources'], score: 88 },
      { category: 'fake_statistics', severity: 'high', description: 'Unsubstantiated statistical claims', evidence: ['millions are coming', 'draining resources'], score: 76 },
      { category: 'emotional_manipulation', severity: 'high', description: 'Fear-based rhetoric targeting vulnerable populations', evidence: ['destroying our healthcare', 'draining resources from our citizens'], score: 84 },
    ],
    manipulationAnalysis: { emotionalScore: 86, logicalFallacies: ['straw man', 'hasty generalization', 'appeal to fear'], manipulativeTechniques: ['us vs them framing', 'fear mongering', 'scapegoating'], biasAssessment: 'Strong anti-immigration bias with populist rhetoric' },
    alternativeSources: [
      { name: 'Eurostat Migration Data', url: 'https://ec.europa.eu/eurostat', credibilityScore: 98, reason: 'Official EU statistics' },
      { name: 'Migration Policy Institute', url: 'https://www.migrationpolicy.org', credibilityScore: 90, reason: 'Non-partisan research' },
    ],
    sourceCredibility: mockSources[4], summary: 'Political speech containing multiple propaganda and misinformation indicators.', simplifiedContent: 'A politician made claims about immigration that do not match official statistics.', analyzedAt: now,
  },
]

export const mockDashboardData: DashboardMetrics = {
  totalAnalyses: 15423,
  averageTrustScore: 67.3,
  misinformationDetected: 3421,
  accessibilityConversions: 8921,
  activeUsers: 3452,
  trends: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 86400000).toISOString().split('T')[0],
    trustScore: 55 + Math.random() * 30,
    misinformationCount: Math.floor(80 + Math.random() * 120),
    accessibilityScore: 50 + Math.random() * 40,
  })),
  categoryBreakdown: [
    { category: 'emotional_manipulation', count: 1243, percentage: 36.3, trend: 'up' },
    { category: 'fake_statistics', count: 687, percentage: 20.1, trend: 'stable' },
    { category: 'propaganda', count: 543, percentage: 15.9, trend: 'up' },
    { category: 'misleading_headlines', count: 412, percentage: 12.0, trend: 'down' },
    { category: 'suspicious_claims', count: 298, percentage: 8.7, trend: 'stable' },
    { category: 'ai_generated', count: 156, percentage: 4.6, trend: 'up' },
    { category: 'scam', count: 82, percentage: 2.4, trend: 'down' },
  ],
  trustHistory: Array.from({ length: 90 }, (_, i) => ({
    date: new Date(Date.now() - (89 - i) * 86400000).toISOString().split('T')[0],
    score: 50 + Math.random() * 35,
  })),
  geographicData: [
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
  ],
}
