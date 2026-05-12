# API Documentation

Base URL: `/api/v1`

All API responses follow a standard format:

```json
{
  "success": true|false,
  "data": { ... },
  "error": { "code": "...", "message": "..." },
  "meta": {
    "timestamp": "2025-01-01T00:00:00.000Z",
    "version": "1.0.0",
    "processingTime": 123
  }
}
```

## Endpoints

### Health Check

```
GET /api/v1/health
```

Response:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "version": "1.0.0",
    "uptime": 3600,
    "aiConfigured": true
  }
}
```

### Analyze Content

```
POST /api/v1/analyze
```

Request:
```json
{
  "text": "Article content to analyze for misinformation...",
  "url": "https://example.com/article"
}
```

Response includes:
- `trustScore` (0-100)
- `riskIndicators[]` — Category, severity, evidence, score
- `sourceCredibility` — Score, level, factors
- `manipulationAnalysis` — Emotional score, fallacies, techniques, bias
- `alternativeSources[]` — Trusted alternatives
- `summary` — Brief analysis summary
- `accessibilityScore` (0-100)

### Summarize Content

```
POST /api/v1/summarize
```

Request:
```json
{
  "text": "Long article text to summarize..."
}
```

Response:
```json
{
  "success": true,
  "data": {
    "summary": "Summarized version..."
  }
}
```

### Simplify Content

```
POST /api/v1/simplify
```

Request:
```json
{
  "text": "Complex text using difficult terminology..."
}
```

Response:
```json
{
  "success": true,
  "data": {
    "simplified": "Simplified version in plain language..."
  }
}
```

### Convert Content for Accessibility

```
POST /api/v1/accessibility/convert
```

Request:
```json
{
  "text": "Content to convert...",
  "mode": "dyslexia | simplified | easyread"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "originalContent": "...",
    "convertedContent": "...",
    "conversionType": "simplified",
    "readabilityScore": 72,
    "wordCount": { "original": 150, "converted": 120 }
  }
}
```

### Get Trust Score

```
GET /api/v1/trust/score?source=https://example.com
```

Response:
```json
{
  "success": true,
  "data": {
    "score": 92,
    "level": "very_high"
  }
}
```

### Get Dashboard Metrics

```
GET /api/v1/analytics/dashboard
```

Response includes:
- `totalAnalyses`
- `averageTrustScore`
- `misinformationDetected`
- `accessibilityConversions`
- `activeUsers`
- `trends[]` — Daily data (30 days)
- `categoryBreakdown[]` — By risk category
- `trustHistory[]` — 90-day history
- `geographicData[]` — By EU member state

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request parameters |
| `NOT_FOUND` | 404 | Endpoint not found |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |

## Rate Limiting

- Default: 100 requests per 15 minutes per IP
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
