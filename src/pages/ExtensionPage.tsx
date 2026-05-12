import { motion } from 'framer-motion'
import { Shield, Eye, Scan, Download, Globe, Lock, Bell, Sliders, ExternalLink } from 'lucide-react'

const extensionFeatures = [
  { icon: Scan, title: 'One-Click Analysis', description: 'Scan any webpage for misinformation with a single click' },
  { icon: Shield, title: 'Trust Score Badge', description: 'See trust ratings directly on articles as you browse' },
  { icon: Eye, title: 'Accessibility Overlay', description: 'Apply accessibility settings to any website in real-time' },
  { icon: Bell, title: 'Real-Time Alerts', description: 'Get instant warnings when you encounter misinformation' },
  { icon: Globe, title: 'Multi-Language', description: 'Works across all 24 EU languages automatically' },
  { icon: Lock, title: 'Privacy First', description: 'All analysis happens locally when possible, no tracking' },
]

const STORE_URLS = {
  chrome: 'https://chrome.google.com/webstore',
  firefox: 'https://addons.mozilla.org',
  edge: 'https://microsoftedge.microsoft.com/addons',
}

export default function ExtensionPage() {
  const handleDownload = (store: string, url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleShowDetails = () => {
    const alert = document.getElementById('misinformation-alert-details')
    if (alert) {
      alert.classList.toggle('hidden')
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Download className="w-4 h-4" aria-hidden="true" />
            Browser Extension
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Real-Time Protection While You Browse
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Install the EU Lens browser extension to get real-time misinformation alerts and
            accessibility tools on every website you visit. Available for Chrome, Firefox, and Edge.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => handleDownload('Chrome', STORE_URLS.chrome)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/25"
              aria-label="Add to Chrome browser"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Add to Chrome
            </button>
            <button
              type="button"
              onClick={() => handleDownload('Firefox', STORE_URLS.firefox)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card font-medium hover:bg-accent transition-colors"
              aria-label="Add to Firefox browser"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Add to Firefox
            </button>
            <button
              type="button"
              onClick={() => handleDownload('Edge', STORE_URLS.edge)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card font-medium hover:bg-accent transition-colors"
              aria-label="Add to Edge browser"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              Add to Edge
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="glass rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Globe className="w-3 h-3" aria-hidden="true" />
                news-example.com
              </div>
              <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                <Shield className="w-3 h-3 text-primary" />
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="h-3 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
              <div className="h-3 bg-muted rounded w-2/3" />
            </div>

            <div className="rounded-xl border-2 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-red-600 dark:text-red-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-600 dark:text-red-400">Misinformation Alert</p>
                  <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1">
                    This article contains emotional manipulation and suspicious claims. Trust Score: 12/100
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={handleShowDetails}
                      className="px-2 py-1 rounded bg-red-200 dark:bg-red-800 text-xs font-medium text-red-700 dark:text-red-300"
                      aria-label="Show details of misinformation alert"
                    >
                      Show Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownload('', 'https://eur-lex.europa.eu')}
                      className="px-2 py-1 rounded bg-green-200 dark:bg-green-800 text-xs font-medium text-green-700 dark:text-green-300"
                      aria-label="View trusted alternative sources"
                    >
                      Trusted Sources
                    </button>
                  </div>
                  <div id="misinformation-alert-details" className="hidden mt-2 text-xs text-red-600/80 dark:text-red-400/80 space-y-1">
                    <p>Detected patterns: emotional manipulation (fear-based language), suspicious claims (unsubstantiated statistics), clickbait headline structure.</p>
                    <p>Recommended action: Verify with trusted sources before sharing.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              <span className="text-xs text-muted-foreground">Accessibility tools available for this page</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Extension Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {extensionFeatures.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-3 p-4 rounded-xl border border-border bg-card"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground">{f.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid sm:grid-cols-3 gap-8 mt-8">
            {[
              { step: '1', title: 'Install', desc: 'Add EU Lens to your browser in one click' },
              { step: '2', title: 'Browse', desc: 'Continue browsing as usual — EU Lens works silently' },
              { step: '3', title: 'Stay Protected', desc: 'Get real-time alerts and accessibility tools on any page' },
            ].map((item) => (
              <div key={item.step}>
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
