import { motion } from 'framer-motion'
import { Shield, Heart, Target, Users, Globe, BookOpen, Award, Lightbulb, Eye } from 'lucide-react'

const team = [
  { name: 'Dr. Elena Voss', role: 'CEO & Co-Founder', bio: 'Former EU digital policy advisor, accessibility advocate' },
  { name: 'Marcus Brandt', role: 'CTO & Co-Founder', bio: 'AI researcher, ex-DeepMind, specializing in NLP and misinformation detection' },
  { name: 'Sofia Rodriguez', role: 'Head of Accessibility', bio: 'WCAG expert, screen reader user, digital inclusion pioneer' },
  { name: 'Dr. Jan Novak', role: 'Head of AI Ethics', bio: 'EU AI Act expert, professor of responsible AI at TU Berlin' },
]

const timeline = [
  { year: '2024', title: 'Research & Conception', description: 'Identified the dual crisis of misinformation and inaccessibility in EU digital spaces' },
  { year: '2025 Q1', title: 'MVP Launch', description: 'Released core Misinformation Analyzer and Accessibility Engine' },
  { year: '2025 Q3', title: 'Dashboard & Analytics', description: 'Launched European Trust Dashboard with real-time monitoring' },
  { year: '2026 Q1', title: 'Browser Extension', description: 'Released browser extension for real-time protection' },
  { year: '2026 Q3', title: 'EU-Wide Rollout', description: 'Full multilingual support, enterprise features, EU institution partnerships' },
]

export default function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              🇪🇺 Our Mission
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Building a More Accessible and Truthful Digital Europe
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              EU Lens was born from a simple belief: access to trustworthy information is a fundamental
              right. We're building the tools to make that right a reality for every European citizen,
              regardless of ability.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-4">The Problem We're Solving</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Every day, millions of Europeans encounter information they cannot trust or cannot access. Misinformation spreads faster than ever, and people with disabilities are disproportionately affected — they face barriers both in content comprehension and in verifying information accuracy.</p>
                <p>Existing tools either focus on accessibility OR misinformation detection. EU Lens is the first platform to combine both, recognizing that true digital inclusion requires both accessible AND trustworthy information.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Shield, label: 'Misinformation Detection', value: '95% Accuracy' },
                { icon: Eye, label: 'Accessibility Conversions', value: '8,900+' },
                { icon: Globe, label: 'EU Languages', value: '24 Supported' },
                { icon: Users, label: 'Active Users', value: '3,400+' },
              ].map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="p-4 rounded-xl border border-border bg-card text-center">
                    <Icon className="w-6 h-6 text-primary mx-auto mb-2" aria-hidden="true" />
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="font-bold text-lg">{s.value}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-primary font-medium">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-2 top-1 w-[9px] h-[9px] rounded-full bg-primary border-2 border-background" />
                  <div className="p-4 rounded-xl border border-border bg-card">
                    <span className="text-xs text-primary font-semibold">{item.year}</span>
                    <h3 className="font-semibold mt-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-12">EU Compliance & Alignment</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Award, title: 'EU Accessibility Act', desc: 'Full compliance with Directive 2019/882 requirements for digital accessibility' },
              { icon: Shield, title: 'EU AI Act', desc: 'Transparent, explainable AI systems meeting EU risk-based requirements' },
              { icon: Globe, title: 'Digital Services Act', desc: 'Platform accountability and transparency obligations' },
              { icon: Heart, title: 'GDPR', desc: 'Privacy by design, data minimization, and user consent management' },
              { icon: BookOpen, title: 'Web Content Accessibility', desc: 'WCAG 2.2 AA compliance as minimum standard' },
              { icon: Lightbulb, title: 'Ethical AI', desc: 'EU Trustworthy AI guidelines for human-centric artificial intelligence' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex gap-3 p-4 rounded-xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
