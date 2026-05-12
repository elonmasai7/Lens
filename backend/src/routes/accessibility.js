import { Router } from 'express'

const router = Router()

router.post('/convert', async (req, res, next) => {
  try {
    const { text, mode } = req.body
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Text is required' },
      })
    }
    let converted = text
    if (mode === 'dyslexia') {
      converted = text
    } else if (mode === 'simplified') {
      converted = simplifyForAccessibility(text)
    } else if (mode === 'easyread') {
      converted = convertToEasyRead(text)
    }
    res.json({
      success: true,
      data: {
        originalContent: text,
        convertedContent: converted,
        conversionType: mode || 'simplified',
        readabilityScore: 72,
        wordCount: { original: text.split(/\s+/).length, converted: converted.split(/\s+/).length },
      },
      meta: { timestamp: new Date().toISOString(), version: '1.0.0', processingTime: Date.now() - req._startTime },
    })
  } catch (err) {
    next(err)
  }
})

function simplifyForAccessibility(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  return sentences.map(s => {
    let simplified = s.trim()
    if (simplified.length > 120) {
      const mid = Math.floor(simplified.length / 2)
      const breakPoint = simplified.indexOf(' ', mid)
      if (breakPoint > 0) {
        simplified = simplified.slice(0, breakPoint) + '. ' + simplified.slice(breakPoint + 1)
      }
    }
    return simplified
  }).join(' ')
}

function convertToEasyRead(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
  const easyRead = sentences.map(s => {
    let clean = s.trim()
    clean = clean.replace(/\b(utilize|leverage|facilitate|implement|commence|terminate)\b/gi,
      (m) => ({ utilize: 'use', leverage: 'use', facilitate: 'help', implement: 'set up', commence: 'start', terminate: 'end' }[m.toLowerCase()] || m))
    if (clean.length > 100) {
      const mid = Math.floor(clean.length / 2)
      const breakPoint = clean.indexOf(' ', mid)
      if (breakPoint > 0) {
        clean = clean.slice(0, breakPoint) + '.\n' + clean.slice(breakPoint + 1)
      }
    }
    return clean
  })
  return easyRead.join(' ')
}

export default router
