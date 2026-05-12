import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTA() {
  return (
    <section className="py-24 bg-muted/30" role="region" aria-label="Call to action">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-12 text-center"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-white/80" aria-hidden="true" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Join the Mission for an Accessible Europe
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Start using EU Lens today. Help us make Europe's digital information accessible
              and trustworthy for everyone, regardless of ability.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/analyzer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-primary font-medium hover:bg-white/90 transition-all shadow-lg"
              >
                Try EU Lens Now
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white font-medium hover:bg-white/10 transition-all"
              >
                Learn About Our Mission
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
