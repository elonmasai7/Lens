import { config } from '../config/index.js'

export async function analyzeWithAI(text, url) {
  if (config.openaiApiKey) {
    try {
      const { default: OpenAI } = await import('openai')
      const openai = new OpenAI({ apiKey: config.openaiApiKey })
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a misinformation detection specialist. Analyze the following content for manipulation, bias, and trustworthiness.' },
          { role: 'user', content: text },
        ],
      })
      return response.choices[0]?.message?.content || null
    } catch (err) {
      console.warn('OpenAI API error, falling back to local analysis:', err.message)
      return null
    }
  }
  return null
}

export async function summarizeContent(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  if (sentences.length <= 3) return text

  const important = []
  const keywords = ['announced', 'found', 'according', 'study', 'research', 'commission', 'parliament', 'regulation', 'law', 'report', 'significant', 'important']

  sentences.forEach(s => {
    const hasKeyword = keywords.some(k => s.toLowerCase().includes(k))
    const position = sentences.indexOf(s)
    if (position < 2 || hasKeyword || position === sentences.length - 1) {
      important.push(s.trim())
    }
  })

  if (important.length < 3) {
    important.push(...sentences.slice(0, 3).map(s => s.trim()))
  }

  return [...new Set(important)].join(' ').slice(0, 500)
}

export async function simplifyContent(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  return sentences.map(s => {
    let clean = s.trim()
    clean = clean.replace(/\b(utilize|leverage|facilitate|implement|commence|terminate|subsequently|nevertheless|furthermore|consequently)\b/gi,
      (m) => ({
        utilize: 'use', leverage: 'use', facilitate: 'help', implement: 'set up',
        commence: 'start', terminate: 'end', subsequently: 'later',
        nevertheless: 'however', furthermore: 'also', consequently: 'so',
      }[m.toLowerCase()] || m))
    clean = clean.replace(/\([^)]*\)/g, '').trim()
    if (clean.length > 150) {
      const mid = Math.floor(clean.length / 2)
      const breakPoint = clean.indexOf(' ', mid)
      if (breakPoint > 0) {
        clean = clean.slice(0, breakPoint) + '.\n' + clean.slice(breakPoint + 1).toLowerCase()
      }
    }
    return clean
  }).join(' ')
}
