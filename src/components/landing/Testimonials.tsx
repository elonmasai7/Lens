import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Dr. Maria Weber',
    role: 'Digital Rights Advocate, Berlin',
    content: 'EU Lens has transformed how I verify information for my accessibility research. The trust scoring system is remarkably accurate and the accessibility features are genuinely useful.',
    rating: 5,
  },
  {
    name: 'Ahmed Al-Rashid',
    role: 'Community Support Worker, Vienna',
    content: 'The content simplification feature helps my clients with cognitive disabilities understand news and official documents independently. This is truly empowering technology.',
    rating: 5,
  },
  {
    name: 'Prof. Elena Conti',
    role: 'Media Studies, University of Milan',
    content: 'As someone studying misinformation patterns across EU languages, EU Lens provides invaluable multilingual analysis that no other tool offers.',
    rating: 5,
  },
  {
    name: 'Klaus Mueller',
    role: 'Accessibility Consultant, Brussels',
    content: 'Finally, a platform that takes both accessibility and misinformation seriously. The WCAG compliance is impressive and the AI narration works flawlessly.',
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-muted/30" role="region" aria-label="Testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Trusted by Accessibility Advocates Across Europe
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card"
            >
              <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" aria-hidden="true" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">&ldquo;{t.content}&rdquo;</p>
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
