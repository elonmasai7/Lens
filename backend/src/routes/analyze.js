import { Router } from 'express'
import { analyzeContent } from '../services/misinformationService.js'

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const { text, url } = req.body
    if (!text || typeof text !== 'string') {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Text is required and must be a string' },
      })
    }
    const result = await analyzeContent(text, url)
    res.json({
      success: true,
      data: result,
      meta: { timestamp: new Date().toISOString(), version: '1.0.0', processingTime: Date.now() - req._startTime },
    })
  } catch (err) {
    next(err)
  }
})

export default router
