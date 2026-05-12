import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: parseInt(process.env.PORT || '3001'),
  nodeEnv: process.env.NODE_ENV || 'development',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '15'),
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '100'),
  cacheTtl: parseInt(process.env.CACHE_TTL || '300'),
}
