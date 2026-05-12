import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Shield, Users, FileText, Globe } from 'lucide-react'

const stats = [
  { icon: Shield, value: 15423, suffix: '+', label: 'Content Analyses', color: 'from-blue-500 to-cyan-500' },
  { icon: Users, value: 3452, suffix: '+', label: 'Active Users', color: 'from-teal-500 to-green-500' },
  { icon: FileText, value: 8921, suffix: '+', label: 'Accessibility Conversions', color: 'from-purple-500 to-pink-500' },
  { icon: Globe, value: 24, suffix: '', label: 'EU Languages Supported', color: 'from-amber-500 to-orange-500' },
]

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 2000
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [target])

  return <span>{count}{suffix}</span>
}

export default function Statistics() {
  return (
    <section className="py-24" role="region" aria-label="Platform statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow"
              >
                <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} p-3 mb-4`}>
                  <Icon className="w-full h-full text-white" aria-hidden="true" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold mb-1">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
