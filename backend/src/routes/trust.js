import { Router } from 'express'
import { getTrustScore } from '../services/misinformationService.js'

const router = Router()

router.get('/score', async (req, res, next) => {
  try {
    const { source } = req.query
    if (!source || typeof source !== 'string') {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Source parameter is required' },
      })
    }
    const result = await getTrustScore(source)
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
