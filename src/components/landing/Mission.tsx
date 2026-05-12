import { motion } from 'framer-motion'
import { Heart, Shield, BookOpen, Globe } from 'lucide-react'

const values = [
  {
    icon: Heart,
    title: 'Inclusion First',
    description: 'Every feature is designed with accessibility at its core, ensuring no one is left behind in the digital information age.',
  },
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'Our AI systems are transparent, explainable, and accountable — aligned with the EU AI Act\'s requirements for trustworthy AI.',
  },
  {
    icon: BookOpen,
    title: 'Digital Literacy',
    description: 'We empower citizens with the tools to critically evaluate information and participate fully in democratic discourse.',
  },
  {
    icon: Globe,
    title: 'European Sovereignty',
    description: 'Built on European values, respecting multilingual diversity, cultural contexts, and fundamental rights across all member states.',
  },
]

const logos = [
  'European Accessibility Act', 'EU AI Act', 'Digital Services Act', 'GDPR',
  'WCAG 2.2 AA', 'Ethical AI Guidelines',
]

export default function Mission() {
  return (
    <section className="py-24" role="region" aria-label="Our mission">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Our Mission: An Accessible, Trustworthy Digital Europe
          </h2>
          <p className="text-lg text-muted-foreground">
            We believe that access to trustworthy information is a fundamental right.
            EU Lens is our commitment to making that right a reality for every European citizen.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="glass rounded-2xl p-8">
          <p className="text-sm text-muted-foreground text-center mb-6">Aligned with EU Regulatory Frameworks</p>
          <div className="flex flex-wrap justify-center gap-3">
            {logos.map((logo) => (
              <span key={logo} className="px-3 py-1.5 rounded-lg bg-primary/5 text-primary text-xs font-medium border border-primary/10">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
