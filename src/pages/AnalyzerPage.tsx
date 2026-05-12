import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Shield, AlertTriangle, ExternalLink, BookOpen, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import { useAI } from '@/hooks/useAI'
import { useAnalyzerStore } from '@/stores/analyzerStore'
import { trustColor, trustLabel } from '@/lib/utils'
import type { RiskIndicator, AlternativeSource } from '@/types'

export default function AnalyzerPage() {
  const [text, setText] = useState('')
  const [url, setUrl] = useState('')
  const [activeTab, setActiveTab] = useState<'input' | 'history'>('input')
  const { analyze } = useAI()
  const { currentAnalysis, analyses, isLoading, error } = useAnalyzerStore()

  const handleSubmit = useCallback(async () => {
    if (!text.trim()) return
    await analyze(text, url || undefined)
  }, [text, url, analyze])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">AI Misinformation Analyzer</h1>
        <p className="text-muted-foreground mt-1">Paste an article, enter a URL, or type text to analyze for misinformation, manipulation, and trustworthiness.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-xl border border-border bg-card">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveTab('input')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'input' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
              >
                Analyze
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'history' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                aria-label={`History (${analyses.length} items)`}
              >
                History ({analyses.length})
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'input' ? (
                <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-4">
                    <label htmlFor="url-input" className="block text-sm font-medium mb-1">Article URL (optional)</label>
                    <input
                      id="url-input"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com/article"
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="text-input" className="block text-sm font-medium mb-1">Paste content or type text</label>
                    <textarea
                      id="text-input"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Paste the article content here..."
                      rows={8}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!text.trim() || isLoading}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Send className="w-4 h-4" aria-hidden="true" />
                    )}
                    {isLoading ? 'Analyzing...' : 'Analyze Content'}
                  </button>
                  {error && (
                    <p className="mt-2 text-sm text-destructive" role="alert">{error}</p>
                  )}
                </motion.div>
              ) : (
                <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {analyses.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">No analyses yet</p>
                  ) : (
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                      {analyses.map((a) => (
                        <button
                          key={a.id}
                          onClick={() => useAnalyzerStore.getState().setCurrentAnalysis(a)}
                          className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium truncate">{a.title.slice(0, 50)}</span>
                            <span className={`text-xs font-medium ${trustColor(a.trustScore)}`}>
                              {a.trustScore}/100
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{new Date(a.analyzedAt).toLocaleDateString()}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" aria-hidden="true" />
                  <p className="text-muted-foreground">Analyzing content...</p>
                </div>
              </motion.div>
            ) : currentAnalysis ? (
              <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Analysis Results</h2>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Trust Score</span>
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${trustColor(currentAnalysis.trustScore)} bg-current/10`}>
                        {currentAnalysis.trustScore}/100
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{currentAnalysis.summary}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Source: <span className={`font-medium ${trustColor(currentAnalysis.sourceCredibility.score)}`}>{currentAnalysis.sourceCredibility.level.replace(/_/g, ' ')}</span></span>
                    <span>Accessibility: {currentAnalysis.accessibilityScore}/100</span>
                  </div>
                </div>

                <RiskIndicatorsSection indicators={currentAnalysis.riskIndicators} />
                
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold mb-4">Manipulation Analysis</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Emotional Manipulation Score</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${currentAnalysis.manipulationAnalysis.emotionalScore > 60 ? 'bg-red-500' : currentAnalysis.manipulationAnalysis.emotionalScore > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${currentAnalysis.manipulationAnalysis.emotionalScore}%` }} />
                        </div>
                        <span className="text-sm font-medium">{currentAnalysis.manipulationAnalysis.emotionalScore}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Bias Assessment</p>
                      <p className="text-sm">{currentAnalysis.manipulationAnalysis.biasAssessment}</p>
                    </div>
                  </div>
                  {currentAnalysis.manipulationAnalysis.logicalFallacies.length > 0 && (
                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground mb-2">Detected Logical Fallacies</p>
                      <div className="flex flex-wrap gap-2">
                        {currentAnalysis.manipulationAnalysis.logicalFallacies.map((f) => (
                          <span key={f} className="px-2 py-1 rounded-md bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <AlternativeSourcesSection sources={currentAnalysis.alternativeSources} />
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px] border-2 border-dashed border-border rounded-xl">
                <div className="text-center text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-4 opacity-50" aria-hidden="true" />
                  <p className="font-medium">Enter content to analyze</p>
                  <p className="text-sm">Paste text or a URL to detect misinformation</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

function RiskIndicatorsSection({ indicators }: { indicators: RiskIndicator[] }) {
  const [expanded, setExpanded] = useState(true)

  if (indicators.length === 0) {
    return (
      <div className="p-6 rounded-xl border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <Shield className="w-5 h-5" aria-hidden="true" />
          <p className="font-medium">No significant risk indicators detected</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" aria-hidden="true" />
          <span className="font-semibold">{indicators.length} Risk Indicator{indicators.length > 1 ? 's' : ''} Detected</span>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-3">
              {indicators.map((indicator, i) => (
                <div key={i} className="p-3 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{indicator.category.replace(/_/g, ' ')}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      indicator.severity === 'critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      indicator.severity === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {indicator.severity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{indicator.description}</p>
                  {indicator.evidence.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {indicator.evidence.map((e, j) => (
                        <span key={j} className="px-2 py-0.5 rounded bg-muted text-xs text-muted-foreground">
                          &ldquo;{e}&rdquo;
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function AlternativeSourcesSection({ sources }: { sources: AlternativeSource[] }) {
  if (sources.length === 0) return null

  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <h3 className="font-semibold mb-4">Alternative Trusted Sources</h3>
      <div className="space-y-3">
        {sources.map((source, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
            <ExternalLink className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{source.name}</p>
              <p className="text-xs text-muted-foreground">{source.reason}</p>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className={`font-medium ${trustColor(source.credibilityScore)}`}>{source.credibilityScore}</span>
              <span className="text-muted-foreground">/100</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
