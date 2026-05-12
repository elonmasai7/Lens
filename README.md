# EU Lens — AI-Powered Accessibility & Misinformation Detection

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-blue?logo=github)](https://elonmasai7.github.io/Lens/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![WCAG AA](https://img.shields.io/badge/WCAG-AA-28A745)](https://www.w3.org/WAI/WCAG2AA-Conformance)
[![EU Compliance](https://img.shields.io/badge/EU-Accessibility%20Act-003399)](https://ec.europa.eu/social/main.jsp?catId=1202)

**Making Europe's Digital Information Accessible and Trustworthy for Everyone**

**[Live Demo](https://elonmasai7.github.io/Lens/)** | **[Documentation](https://github.com/elonmasai7/Lens#readme)**

---

## Project Overview

EU Lens is a production-grade civic-tech platform that combines AI-powered misinformation detection with comprehensive accessibility tools. Built for the European Union innovation ecosystem, it helps people with disabilities safely access, understand, and verify digital information across all 24 EU languages.

The platform addresses two interconnected crises:
1. **The Misinformation Crisis** — False information spreads faster than ever, disproportionately affecting vulnerable communities
2. **The Accessibility Crisis** — Most digital content remains inaccessible to over 100 million Europeans with disabilities

## Inspiration

- **European Accessibility Act (Directive 2019/882)** — Mandating accessible digital products and services
- **EU AI Act** — Requiring transparent, trustworthy AI systems
- **Digital Services Act** — Platform accountability and transparency
- **UN Convention on the Rights of Persons with Disabilities** — Equal access to information

## Features

### AI Misinformation Analyzer
- Detects emotional manipulation, fake statistics, suspicious claims, propaganda patterns, misleading headlines, and AI-generated content
- Generates trust scores (0-100), risk indicators with severity levels, and source credibility ratings
- Provides alternative trusted sources and detailed explanations

### Accessibility Transformation Engine
- Dyslexia-friendly mode with specialized font and spacing
- High contrast mode for visual impairments
- Adjustable text spacing, font size, and line height
- Simplified reading mode with easy-to-read summaries
- AI voice narration support
- Full WCAG 2.2 AA compliance

### Inclusive AI Assistant
- Explains complex content in simple language
- Summarizes articles and documents
- Translates complex political/medical language
- Supports all 24 EU languages
- Safe, moderated responses

### Browser Extension Simulation
- Real-time content scanning while browsing
- Misinformation alerts with trust score badges
- One-click accessibility tool activation
- Privacy-focused local analysis

### European Trust Dashboard
- Real-time misinformation trends and analytics
- Accessibility metrics and impact tracking
- Geographic trust distribution across EU member states
- Category breakdown of misinformation types
- Historical trust score tracking

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS 4** for styling
- **Framer Motion** for animations
- **shadcn/ui** component system
- **Zustand** for state management
- **React Query** for data fetching
- **Recharts** for data visualization
- **Lucide React** for icons
- **React Router v7** for navigation

### Backend
- **Node.js** with Express
- **OpenAI API** integration (with local fallback)
- **Helmet** for security headers
- **express-rate-limit** for API protection
- **node-cache** for response caching

### DevOps
- **Docker** multi-stage builds
- **Nginx** reverse proxy with security hardening
- **GitHub Actions** CI/CD
- **Prometheus & Grafana** monitoring

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (React SPA)                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐  │
│  │ Landing  │ │Dashboard │ │ Analyzer │ │ Accessibility │  │
│  │   Page   │ │  Page    │ │   Page   │ │    Page       │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────┘  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                    │
│  │Analytics │ │Extension │ │  About   │                    │
│  │   Page   │ │   Page   │ │   Page   │                    │
│  └──────────┘ └──────────┘ └──────────┘                    │
│                        │                                    │
│              ┌─────────┴─────────┐                          │
│              │  Zustand Stores   │                          │
└────────────────────────┼────────────────────────────────────┘
                         │ HTTP/REST
┌────────────────────────┼────────────────────────────────────┐
│              ┌─────────┴─────────┐                          │
│              │  Express API      │                          │
│              └─────────┬─────────┘                          │
│              ┌─────────┴─────────┐                          │
│              │  Services Layer   │                          │
│  ┌───────────┼──────────┬───────┼───────────┐              │
│  │   AI     │           │      │ Analytics  │              │
│  │ Service  │           │      │  Service   │              │
│  └──────────┘           │      └────────────┘              │
│                         │                                  │
│              ┌──────────┴──────────┐                       │
│              │  OpenAI API / Mock  │                       │
│              └─────────────────────┘                       │
└────────────────────────────────────────────────────────────┘
```

## Quick Start

```bash
# Prerequisites: Node.js 20+, npm 9+
git clone https://github.com/elonmasai7/Lens.git
cd Lens

# Install dependencies
npm install
cd backend && npm install && cd ..

# Set up environment
cp .env.example .env
# Edit .env with your OpenAI API key (optional)

# Start development
npm run dev        # Frontend on :5173
npm run backend    # Backend on :3001
```

## Project Structure

```
Lens/
├── src/                          # React frontend
│   ├── App.tsx                   # App root with routing
│   ├── main.tsx                  # Entry point
│   ├── index.css                 # Global styles + Tailwind
│   ├── components/
│   │   ├── layout/               # Header, Footer, Layout
│   │   ├── landing/              # Landing page sections
│   │   ├── dashboard/            # Dashboard components
│   │   ├── analyzer/             # Analyzer components
│   │   ├── accessibility/        # Accessibility components
│   │   ├── shared/               # ThemeToggle, SkipLink, etc.
│   │   └── ui/                   # UI primitives
│   ├── pages/                    # 7 page components
│   ├── stores/                   # Zustand stores
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utilities, API client, mock data
│   └── types/                    # TypeScript type definitions
├── backend/                      # Express API
│   └── src/
│       ├── index.js              # Server entry
│       ├── config/               # Configuration
│       ├── middleware/            # Error handling
│       ├── routes/               # 7 API route definitions
│       ├── services/             # AI, analytics, cache services
│       └── utils/                # Utilities
├── public/                       # Static assets
├── .github/workflows/            # CI/CD pipelines
├── Dockerfile                    # Multi-stage Docker build
├── docker-compose.yml            # Docker Compose configuration
└── nginx.conf                    # Nginx production config
```

## API Documentation

Base URL: `/api/v1`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/analyze` | POST | Analyze content for misinformation |
| `/summarize` | POST | Summarize content |
| `/simplify` | POST | Simplify complex language |
| `/accessibility/convert` | POST | Convert content for accessibility |
| `/trust/score` | GET | Get trust score for a source |
| `/analytics/dashboard` | GET | Get dashboard metrics |

### Example: Analyze Content

```json
POST /api/v1/analyze
{
  "text": "Breaking: Miracle cure discovered...",
  "url": "https://example.com/article"
}

Response:
{
  "success": true,
  "data": {
    "trustScore": 12,
    "riskIndicators": [
      {
        "category": "emotional_manipulation",
        "severity": "critical",
        "evidence": ["miracle", "doctors baffled"],
        "score": 92
      }
    ],
    "sourceCredibility": {...},
    "manipulationAnalysis": {...},
    "alternativeSources": [...]
  }
}
```

## GitHub Pages

The frontend is automatically deployed to GitHub Pages on every push to `main` via GitHub Actions.

**[Live Demo → https://elonmasai7.github.io/Lens/](https://elonmasai7.github.io/Lens/)**

The Pages site serves the built React SPA. The backend API is not included in the static deployment — API calls fall back to mock data in the frontend when no backend is available.

## Deployment

```bash
# Using Docker
docker compose up -d

# Manual deployment
npm run build
NODE_ENV=production npm run backend
```

## EU Alignment

| Regulation | Compliance |
|------------|-----------|
| European Accessibility Act | Full compliance with digital accessibility requirements |
| EU AI Act | Transparent AI systems, risk-based classification, human oversight |
| Digital Services Act | Content moderation transparency, user empowerment |
| GDPR | Privacy by design, data minimization, user consent |
| WCAG 2.2 | AA compliance minimum, AAA target for core features |
| Ethical AI Guidelines | Human-centric, trustworthy, explainable AI |

## Roadmap

### Phase 1: MVP (Current)
- Core Misinformation Analyzer
- Accessibility Transformation Engine
- European Trust Dashboard
- 24 EU language support

### Phase 2: Enhanced Features
- Inclusive AI Assistant with chat
- Browser extension (Chrome, Firefox, Edge)
- Voice narration and screen reader optimization
- Advanced analytics and reporting

### Phase 3: Platform Scale
- Real-time API for enterprise customers
- EU institution integration
- Mobile applications
- Sign-language avatar concept
- Misinformation education mode

### Phase 4: Ecosystem
- Open-source community
- Third-party API marketplace
- Research partnerships
- AI model fine-tuning for EU languages

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT License — see [LICENSE](LICENSE) for details.

---

<p align="center">
  Built for an accessible, informed, and digitally sovereign Europe.
  <br>
  <a href="https://elonmasai7.github.io/Lens/">Live Demo</a>
</p>
