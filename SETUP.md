# Setup Guide

## Prerequisites

- **Node.js** 20.x or higher
- **npm** 9.x or higher
- **Git** (for version control)

## Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd eulens
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Server
PORT=3001
NODE_ENV=development

# OpenAI API (optional — falls back to local analysis)
OPENAI_API_KEY=your-key-here

# CORS
CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# Cache
CACHE_TTL=300
```

### 5. Start Development Servers

**Terminal 1 — Frontend:**
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`

**Terminal 2 — Backend:**
```bash
npm run backend
```
Backend API runs at `http://localhost:3001`

## Docker Setup

### Build and Run with Docker Compose

```bash
docker compose up --build
```

### Production Build

```bash
docker compose -f docker-compose.yml --env-file .env.production up -d
```

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Backend server port | `3001` | No |
| `NODE_ENV` | Environment mode | `development` | No |
| `OPENAI_API_KEY` | OpenAI API key | — | No (mock fallback) |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` | No |
| `RATE_LIMIT_WINDOW` | Rate limit window (minutes) | `15` | No |
| `RATE_LIMIT_MAX` | Max requests per window | `100` | No |
| `CACHE_TTL` | Cache TTL (seconds) | `300` | No |

## Testing

```bash
# Run frontend tests (when implemented)
npm test

# Run backend tests
cd backend && npm test
```

## Troubleshooting

### Frontend issues

**Problem:** `npm run dev` fails with module not found
**Solution:** Delete `node_modules` and `package-lock.json`, then run `npm install`

**Problem:** API calls fail with CORS error
**Solution:** Ensure backend is running and `CORS_ORIGIN` matches your frontend URL

### Backend issues

**Problem:** Backend won't start — port in use
**Solution:** Change `PORT` in `.env` or kill the process using the port

**Problem:** AI analysis returns mock data
**Solution:** This is expected when `OPENAI_API_KEY` is not set. Add your key for real AI analysis.
