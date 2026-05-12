# Deployment Guide

## Docker Deployment (Recommended)

### Prerequisites
- Docker 24+
- Docker Compose v2+

### Production Build

```bash
# Clone the repository
git clone <repository-url>
cd eulens

# Create production environment
cp .env.example .env.production
# Edit .env.production with production values

# Build and deploy
docker compose up --build -d
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=https://yourdomain.com
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
CACHE_TTL=600
```

## Nginx Configuration

The included `nginx.conf` provides:
- HTTPS redirect
- Security headers
- Gzip compression
- Static file caching
- API proxy with rate limiting
- SPA fallback routing

### SSL Setup

```bash
# Using Certbot
certbot --nginx -d yourdomain.com

# Using Let's Encrypt
docker compose run --rm certbot certonly --webroot -w /var/www/certbot -d yourdomain.com
```

## Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure proper `CORS_ORIGIN`
- [ ] Set strong rate limiting values
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Set up database for persistence (future)
- [ ] Configure monitoring (Prometheus/Grafana)
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging aggregation
- [ ] Run security audit
- [ ] Set up automated backups
- [ ] Configure CDN for static assets
- [ ] Enable compression

## Manual Deployment

```bash
# Build frontend
npm run build

# Start backend
NODE_ENV=production node backend/src/index.js

# Serve frontend from dist/ with nginx or any static server
```

## Monitoring

### Prometheus
Available at `http://yourdomain.com:9090`

### Grafana
Available at `http://yourdomain.com:3000`
Default credentials: admin/admin

## Health Check

```bash
curl http://yourdomain.com/api/v1/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.0.0",
    "uptime": 12345,
    "environment": "production",
    "aiConfigured": true
  }
}
```
