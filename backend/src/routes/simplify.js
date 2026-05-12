import { Router } from 'express'
import { simplifyContent } from '../services/aiService.js'

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const { text } = req.body
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Text is required' },
      })
    }
    const simplified = await simplifyContent(text)
    res.json({
      success: true,
      data: { simplified },
      meta: { timestamp: new Date().toISOString(), version: '1.0.0', processingTime: Date.now() - req._startTime },
    })
  } catch (err) {
    next(err)
  }
})

export default router
