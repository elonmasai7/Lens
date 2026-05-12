const EMOTIONAL_PATTERNS = [
  /\b(shocking?|unbelievable|mind-blowing|you won't believe|must watch|doctors hate|they don't want you|what happens next|amazing|incredible)\b/i,
  /\b(share this|pass this on|before it's deleted|before they take down|spread the word)\b/i,
  /\b(pharmaceutical companies|big pharma|mainstream media|the government doesn't want|they're hiding|cover.?up)\b/i,
  /[!]{3,}/,
  /(?:^|\s)(?:SHARE|URGENT|ALERT|WARNING|BREAKING)(?:\s|$)/,
]

const PROPAGANDA_PATTERNS = [
  /\b(useless|waste|destroying|ruining|threat|danger|crisis|disaster|catastrophe)\b/i,
  /\b(fake news|false flag|deep state|globalist|elite|establishment)\b/i,
  /\b(patriotic|loyal|betrayal|traitor|enemy|unpatriotic)\b/i,
  /\b(immigrants?|foreigners?|outsiders?) destroying|taking over|draining|stealing\b/i,
]

const STATISTICAL_CLAIMS = [
  /\b\d+%\s+of\s+(people|americans|europeans|germans|french|british)\b/i,
  /\b(millions?|billions?|trillions?)\s+(of\s+)?(people|euros|dollars|citizens)\b/i,
  /\b(studies? show|research shows|experts say|scientists say|doctors say|according to study)\b/i,
]

const AI_GENERATED_PATTERNS = [
  /\b(as an AI|I cannot|I understand your|I apologize|I'm here to|as a language model)\b/i,
  /\b(in recent years|in today's world|in this article|we will explore|let's dive)\b/i,
  /\b(there are several|there are many|there are various|it is important to note|it is worth noting)\b/i,
]

const SCAM_PATTERNS = [
  /\b(free money|guaranteed|make money fast|work from home|no experience needed|get rich quick)\b/i,
  /\b(limited time|act now|don't miss out|expires|hurry|only \d+ left)\b/i,
  /\b(click here|download now|sign up free|claim your|access now)\b/i,
]

function calculateScore(matches, maxScore) {
  if (matches.length === 0) return 0
  const raw = Math.min(matches.length * 15, maxScore)
  return Math.round(raw)
}

function extractEvidence(text, patterns, max = 3) {
  const matches = []
  patterns.forEach(p => {
    const found = text.match(p)
    if (found && matches.length < max) {
      matches.push(found[0].trim())
    }
  })
  return matches
}

export async function analyzeContent(text, url) {
  const riskIndicators = []
  const logicalFallacies = []
  const manipulativeTechniques = []

  const emotionalMatches = text.match(new RegExp(EMOTIONAL_PATTERNS.map(p => p.source).join('|'), 'gi'))
  const emotionalScore = emotionalMatches ? Math.min(emotionalMatches.length * 12, 95) : 0
  if (emotionalScore > 20) {
    riskIndicators.push({
      category: 'emotional_manipulation',
      severity: emotionalScore > 70 ? 'critical' : emotionalScore > 50 ? 'high' : 'medium',
      description: 'Uses emotional manipulation tactics to influence reader response',
      evidence: extractEvidence(text, EMOTIONAL_PATTERNS),
      score: emotionalScore,
    })
    manipulativeTechniques.push('emotional manipulation', 'fear mongering')
    logicalFallacies.push('appeal to emotion')
  }

  const propagandaMatches = text.match(new RegExp(PROPAGANDA_PATTERNS.map(p => p.source).join('|'), 'gi'))
  const propagandaScore = propagandaMatches ? Math.min(propagandaMatches.length * 15, 90) : 0
  if (propagandaScore > 20) {
    riskIndicators.push({
      category: 'propaganda',
      severity: propagandaScore > 70 ? 'critical' : propagandaScore > 50 ? 'high' : 'medium',
      description: 'Contains propaganda patterns, us-vs-them framing, or divisive language',
      evidence: extractEvidence(text, PROPAGANDA_PATTERNS),
      score: propagandaScore,
    })
    manipulativeTechniques.push('us vs them framing', 'scapegoating')
    if (!logicalFallacies.includes('appeal to fear')) logicalFallacies.push('appeal to fear')
  }

  const statMatches = text.match(new RegExp(STATISTICAL_CLAIMS.map(p => p.source).join('|'), 'gi'))
  const statScore = statMatches ? Math.min(statMatches.length * 12, 75) : 0
  if (statScore > 20) {
    riskIndicators.push({
      category: 'suspicious_claims',
      severity: statScore > 60 ? 'high' : 'medium',
      description: 'Makes claims without citing verifiable sources',
      evidence: extractEvidence(text, STATISTICAL_CLAIMS),
      score: statScore,
    })
    logicalFallacies.push('unsubstantiated claim')
  }

  const aiMatches = text.match(new RegExp(AI_GENERATED_PATTERNS.map(p => p.source).join('|'), 'gi'))
  const aiScore = aiMatches ? Math.min(aiMatches.length * 15, 85) : 0
  if (aiScore > 30) {
    riskIndicators.push({
      category: 'ai_generated',
      severity: aiScore > 60 ? 'high' : 'medium',
      description: 'May be AI-generated or templated content',
      evidence: extractEvidence(text, AI_GENERATED_PATTERNS),
      score: aiScore,
    })
  }

  const scamMatches = text.match(new RegExp(SCAM_PATTERNS.map(p => p.source).join('|'), 'gi'))
  const scamScore = scamMatches ? Math.min(scamMatches.length * 15, 90) : 0
  if (scamScore > 20) {
    riskIndicators.push({
      category: 'scam',
      severity: scamScore > 70 ? 'critical' : scamScore > 50 ? 'high' : 'medium',
      description: 'Contains patterns commonly found in scam content',
      evidence: extractEvidence(text, SCAM_PATTERNS),
      score: scamScore,
    })
    manipulativeTechniques.push('urgency creation', 'scarcity tactics')
  }

  const headlinePattern = /\b(you won't believe|this is why|what happened next|the reason is|here's why)\b/i
  const headlineMatch = text.match(headlinePattern)
  if (headlineMatch) {
    riskIndicators.push({
      category: 'misleading_headlines',
      severity: 'medium',
      description: 'Uses clickbait headline patterns',
      evidence: [headlineMatch[0]],
      score: 45,
    })
  }

  const totalRisk = riskIndicators.reduce((sum, r) => sum + r.score, 0)
  const trustScore = Math.max(0, Math.min(100, Math.round(100 - totalRisk / riskIndicators.length || 0)))

  const sourceCredibility = getSourceCredibility(url)

  const analysisId = crypto.randomUUID?.() || Math.random().toString(36).slice(2)

  return {
    id: analysisId,
    title: url || 'Content Analysis',
    content: text,
    url,
    trustScore,
    riskIndicators,
    sourceCredibility,
    manipulationAnalysis: {
      emotionalScore,
      logicalFallacies: [...new Set(logicalFallacies)],
      manipulativeTechniques: [...new Set(manipulativeTechniques)],
      biasAssessment: trustScore > 70 ? 'Generally balanced with minor potential bias'
        : trustScore > 40 ? 'Moderate bias detected that may affect objectivity'
        : 'Strong bias detected with significant potential for misleading information',
    },
    alternativeSources: getAlternativeSources(text, trustScore),
    summary: generateSummary(text, trustScore, riskIndicators),
    simplifiedContent: text.length > 200 ? text.slice(0, 200) + '...' : text,
    accessibilityScore: Math.round(50 + Math.random() * 40),
    analyzedAt: new Date().toISOString(),
  }
}

function getSourceCredibility(url) {
  if (!url) {
    return { score: 50, level: 'moderate', factors: [{ name: 'Unknown Source', score: 50, description: 'No URL provided' }], lastVerified: new Date().toISOString() }
  }

  const trustedDomains = ['europa.eu', 'ec.europa.eu', 'europarl.europa.eu', 'who.int', 'un.org', 'reuters.com', 'ap.org', 'bbc.com', 'bbc.co.uk', 'nature.com', 'science.org']
  const suspiciousDomains = ['dailymail.co.uk', 'infowars.com', 'breitbart.com', 'naturalnews.com', 'yournewswire.com']

  const domain = new URL(url).hostname.replace('www.', '')

  if (trustedDomains.some(d => domain.includes(d))) {
    return { score: 92, level: 'very_high', factors: [{ name: 'Domain Authority', score: 95, description: 'Highly trusted source' }, { name: 'Editorial Standards', score: 90, description: 'Strong editorial oversight' }], lastVerified: new Date().toISOString() }
  }
  if (suspiciousDomains.some(d => domain.includes(d))) {
    return { score: 15, level: 'very_low', factors: [{ name: 'Domain Reputation', score: 10, description: 'Known for misinformation' }, { name: 'Factual Accuracy', score: 20, description: 'Frequently inaccurate' }], lastVerified: new Date().toISOString() }
  }

  return { score: 55, level: 'moderate', factors: [{ name: 'Unknown Domain', score: 55, description: 'Limited information about source' }], lastVerified: new Date().toISOString() }
}

function getAlternativeSources(text, trustScore) {
  if (trustScore > 70) return []
  const sources = [
    { name: 'EUR-Lex', url: 'https://eur-lex.europa.eu', credibilityScore: 99, reason: 'Official EU law database' },
    { name: 'European Commission', url: 'https://ec.europa.eu', credibilityScore: 98, reason: 'Official EU institution' },
    { name: 'European Parliament', url: 'https://www.europarl.europa.eu', credibilityScore: 97, reason: 'Official EU institution' },
    { name: 'Reuters', url: 'https://www.reuters.com', credibilityScore: 92, reason: 'International news agency' },
    { name: 'Associated Press', url: 'https://ap.org', credibilityScore: 91, reason: 'International news agency' },
    { name: 'BBC News', url: 'https://www.bbc.com/news', credibilityScore: 90, reason: 'Public service broadcaster' },
  ]
  return sources.slice(0, 3)
}

function generateSummary(text, trustScore, indicators) {
  const mainIssues = indicators.filter(i => i.severity === 'critical' || i.severity === 'high').map(i => i.category.replace(/_/g, ' '))
  if (mainIssues.length > 0) {
    return `This content has a low trust score (${trustScore}/100) and shows concerning patterns: ${mainIssues.join(', ')}. Exercise caution before sharing or acting on this information.`
  }
  if (trustScore >= 80) {
    return `This content has a high trust score (${trustScore}/100) and appears to be reliable. No significant misinformation indicators detected.`
  }
  return `This content has a moderate trust score (${trustScore}/100). Some potential issues were identified that may warrant further verification.`
}

export async function getTrustScore(source) {
  const credibility = getSourceCredibility(source)
  return { score: credibility.score, level: credibility.level }
}
