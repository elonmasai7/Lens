# Monitoring & Observability

## Prometheus Configuration

### Metrics Collected

| Metric | Type | Description |
|--------|------|-------------|
| `http_requests_total` | Counter | Total HTTP requests by method, path, status |
| `http_request_duration_ms` | Histogram | Request duration in milliseconds |
| `ai_analysis_duration_ms` | Histogram | AI analysis processing time |
| `ai_requests_total` | Counter | Total AI API calls |
| `ai_fallback_total` | Counter | Fallback to local analysis |
| `active_users` | Gauge | Currently active users |

### Alert Rules

| Alert | Condition | Severity |
|-------|-----------|----------|
| HighErrorRate | Error rate > 5% over 5 minutes | Critical |
| HighLatency | p99 latency > 2s over 5 minutes | Warning |
| AIServiceDown | AI API failures > 10 in 5 minutes | Warning |

## Grafana Dashboard

The included Grafana dashboard (`monitoring/grafana.json`) provides:
- Request rate and error rate panels
- Response time distributions (p50, p95, p99)
- AI analysis performance metrics
- Active user tracking
- System resource usage

## Logging

- Application logs: stdout/stderr (JSON format in production)
- Access logs: Nginx access logs
- Error tracking: Application error logs with stack traces

## Health Checks

- `/api/v1/health` — Application health (returns 200 when healthy)
- Docker health checks — Container-level health monitoring
