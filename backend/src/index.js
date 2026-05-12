import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { config } from './config/index.js'
import { errorHandler } from './middleware/errorHandler.js'
import healthRoutes from './routes/health.js'
import analyzeRoutes from './routes/analyze.js'
import summarizeRoutes from './routes/summarize.js'
import simplifyRoutes from './routes/simplify.js'
import accessibilityRoutes from './routes/accessibility.js'
import trustRoutes from './routes/trust.js'
import analyticsRoutes from './routes/analytics.js'

const app = express()

app.use(helmet())
app.use(cors({ origin: config.corsOrigin }))
app.use(compression())
app.use(morgan('dev'))
app.use(express.json({ limit: '5mb' }))

const limiter = rateLimit({
  windowMs: config.rateLimitWindow * 60 * 1000,
  max: config.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
})
app.use('/api/', limiter)

app.use('/api/v1/health', healthRoutes)
app.use('/api/v1/analyze', analyzeRoutes)
app.use('/api/v1/summarize', summarizeRoutes)
app.use('/api/v1/simplify', simplifyRoutes)
app.use('/api/v1/accessibility', accessibilityRoutes)
app.use('/api/v1/trust', trustRoutes)
app.use('/api/v1/analytics', analyticsRoutes)

app.use((_req, res) => {
  res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Endpoint not found' } })
})

app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`EU Lens API running on port ${config.port} [${config.nodeEnv}]`)
})

export default app
