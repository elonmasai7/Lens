import { motion } from 'framer-motion'
import { AlertTriangle, Users, Globe, EyeOff } from 'lucide-react'

const problems = [
  {
    icon: AlertTriangle,
    title: '73% Increase in Misinformation',
    description: 'Misinformation targeting vulnerable communities has risen dramatically, with people with disabilities being 3x more likely to encounter false information.',
    stat: '73%',
  },
  {
    icon: Users,
    title: '100M+ Europeans Affected',
    description: 'Over 100 million people in the EU have some form of disability, yet most digital content remains inaccessible to them.',
    stat: '100M+',
  },
  {
    icon: Globe,
    title: '24 EU Languages at Risk',
    description: 'Misinformation spreads faster in smaller EU languages where fact-checking resources are limited.',
    stat: '24',
  },
  {
    icon: EyeOff,
    title: '80% of Websites Are Inaccessible',
    description: 'Despite the European Accessibility Act, the majority of websites fail basic accessibility standards.',
    stat: '80%',
  },
]

export default function Problem() {
  return (
    <section className="py-24 bg-muted/30" role="region" aria-label="Problem statement">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            The Digital Information Crisis in Europe
          </h2>
          <p className="text-lg text-muted-foreground">
            Misinformation and inaccessible content create a two-fold crisis that threatens
            democratic participation and equal access to information.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, i) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-primary mb-2">{problem.stat}</div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold mb-2">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground">{problem.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
