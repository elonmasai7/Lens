import { motion } from 'framer-motion'
import { ArrowRight, Shield, Eye, Brain } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAccessibilityStore } from '@/stores/accessibilityStore'

export default function Hero() {
  const { fontSize } = useAccessibilityStore()

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" role="region" aria-label="Hero section">
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-primary/5 via-secondary/5 to-gold/5 dark:from-primary/10 dark:via-secondary/10 dark:to-gold/5" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="w-4 h-4" aria-hidden="true" />
              EU Civic Tech Initiative
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6" style={{ fontSize: `calc(${fontSize}px * 2.5)` }}>
              Making Europe's Digital Information{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Accessible and Trustworthy
              </span>{' '}
              for Everyone
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              AI-powered accessibility and misinformation detection platform designed for an inclusive,
              informed, and digitally sovereign Europe. Empowering every citizen to access trustworthy
              information regardless of ability.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/analyzer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/25"
              >
                Try AI Analyzer
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/accessibility"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-background font-medium hover:bg-accent transition-colors"
              >
                <Eye className="w-4 h-4" aria-hidden="true" />
                Accessibility Tools
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-primary" aria-hidden="true" />
                AI-Powered
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-secondary" aria-hidden="true" />
                EU Compliant
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gold" aria-hidden="true" />
                WCAG AA+
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              <div className="glass rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-muted-foreground ml-2">eu-lens.app</span>
                </div>
                <div className="space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
                  <div className="flex gap-2 mt-4">
                    <div className="flex-1 h-24 bg-muted/50 rounded-lg" />
                    <div className="flex-1 h-24 bg-muted/50 rounded-lg" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-muted rounded w-24 mb-2" />
                      <div className="h-8 bg-green-500/20 rounded w-full flex items-center justify-center text-sm text-green-600 font-medium px-3">
                        Trust Score: 94/100
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-secondary/10 rounded-full blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
