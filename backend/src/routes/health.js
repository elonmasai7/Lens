import { Router } from 'express'
import { config } from '../config/index.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      version: '1.0.0',
      uptime: process.uptime(),
      environment: config.nodeEnv,
      aiConfigured: !!config.openaiApiKey,
    },
    meta: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  })
})

export default router
