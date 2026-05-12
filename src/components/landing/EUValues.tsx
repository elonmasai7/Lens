import { motion } from 'framer-motion'
import { ShieldCheck, Users, ScrollText, Scale, Globe2, HeartHandshake } from 'lucide-react'

const euValues = [
  { icon: Scale, title: 'Human Dignity', desc: 'Every person has the right to access information in a way that respects their dignity and abilities.' },
  { icon: Users, title: 'Universal Access', desc: 'Digital information must be accessible to all citizens regardless of disability, age, or background.' },
  { icon: ShieldCheck, title: 'Truth & Transparency', desc: 'Citizens deserve transparent AI systems that explain how they evaluate information.' },
  { icon: ScrollText, title: 'Rule of Law', desc: 'Full compliance with the European Accessibility Act, EU AI Act, DSA, and GDPR.' },
  { icon: Globe2, title: 'Multilingual Europe', desc: 'Supporting all 24 official EU languages with equal priority and quality.' },
  { icon: HeartHandshake, title: 'Solidarity', desc: 'Protecting vulnerable communities from misinformation and digital exclusion.' },
]

export default function EUValues() {
  return (
    <section className="py-24" role="region" aria-label="EU Values">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            🇪🇺 European Values
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Built on European Values
          </h2>
          <p className="text-lg text-muted-foreground">
            EU Lens is designed from the ground up to embody the fundamental values
            of the European Union.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {euValues.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
