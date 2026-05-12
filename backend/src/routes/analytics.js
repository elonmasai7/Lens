import { Router } from 'express'
import { getDashboardMetrics } from '../services/analyticsService.js'

const router = Router()

router.get('/dashboard', async (req, res, next) => {
  try {
    const metrics = await getDashboardMetrics()
    res.json({
      success: true,
      data: metrics,
      meta: { timestamp: new Date().toISOString(), version: '1.0.0', processingTime: Date.now() - req._startTime },
    })
  } catch (err) {
    next(err)
  }
})

export default router
