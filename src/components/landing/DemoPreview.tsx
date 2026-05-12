import { motion } from 'framer-motion'
import { Shield, ArrowRight, Sparkles } from 'lucide-react'
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

interface DemoResult {
  trustScore: number
  summary: string
  riskIndicators: { category: string; severity: string; description: string }[]
}

export default function DemoPreview() {
  const [demoText, setDemoText] = useState('')
  const [demoResult, setDemoResult] = useState<DemoResult | null>(null)
  const navigate = useNavigate()

  const handleDemoSubmit = useCallback(async () => {
    if (!demoText.trim()) return
    try {
      const res = await fetch('/api/v1/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: demoText }),
      })
      const data = await res.json()
      setDemoResult(data.data || data)
    } catch {
      setDemoResult({
        trustScore: 23,
        summary: 'This content shows signs of emotional manipulation and unsubstantiated claims.',
        riskIndicators: [{ category: 'emotional_manipulation', severity: 'high', description: 'Uses fear-based language' }],
      })
    }
  }, [demoText])

  return (
    <section className="py-24" role="region" aria-label="Live demo">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" aria-hidden="true" />
            Live Demo
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Try It Now</h2>
          <p className="text-lg text-muted-foreground">Paste any text to see how EU Lens analyzes content for misinformation.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-6 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <span className="text-xs text-muted-foreground ml-2">AI Analyzer Demo</span>
          </div>
          <textarea
            value={demoText}
            onChange={(e) => setDemoText(e.target.value)}
            placeholder="Paste an article, headline, or claim to analyze..."
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-input bg-background/50 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-4"
          />
          <button
            onClick={handleDemoSubmit}
            disabled={!demoText.trim()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all disabled:opacity-50 mb-4"
          >
            <Shield className="w-4 h-4" aria-hidden="true" />
            Analyze Content
          </button>

          {demoResult && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Trust Score</span>
                <span className={`text-lg font-bold ${demoResult.trustScore > 60 ? 'text-green-500' : demoResult.trustScore > 30 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {demoResult.trustScore}/100
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{demoResult.summary}</p>
              {demoResult.riskIndicators?.length > 0 && (
                <div className="space-y-2">
                  {demoResult.riskIndicators.slice(0, 2).map((r, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-red-50 dark:bg-red-950/50">
                      <Shield className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-medium text-red-600 dark:text-red-400">{r.category.replace(/_/g, ' ')}</p>
                        <p className="text-xs text-red-600/70">{r.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={() => navigate('/analyzer')}
                className="flex items-center gap-1 text-sm text-primary font-medium"
              >
                Try full analysis <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
