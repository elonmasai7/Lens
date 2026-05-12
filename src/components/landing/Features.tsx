import { motion } from 'framer-motion'
import { Sparkles, Shield, Eye, Languages } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI Misinformation Detection',
    description: 'Advanced AI analyzes content for emotional manipulation, fake statistics, propaganda patterns, and misleading claims in real-time.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Eye,
    title: 'Accessibility Transformation',
    description: 'Adapt any content for dyslexia, visual impairments, cognitive disabilities, or reading difficulties with one click.',
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: Shield,
    title: 'Trust Scoring System',
    description: 'Every piece of content receives a transparent trust score with detailed explanations and alternative trusted sources.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Languages,
    title: 'Multilingual EU Support',
    description: 'Full support for all 24 EU languages with AI-powered translation, simplification, and cross-language verification.',
    color: 'from-amber-500 to-orange-500',
  },
]

export default function Features() {
  return (
    <section className="py-24 bg-muted/30" role="region" aria-label="Features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Powerful Features for an Inclusive Digital Europe
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to navigate digital information safely and accessibly.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="relative p-6 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 mb-4`}>
                    <Icon className="w-full h-full text-white" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <span aria-hidden="true">→</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
