import { motion } from 'framer-motion'
import Hero from '@/components/landing/Hero'
import Problem from '@/components/landing/Problem'
import Mission from '@/components/landing/Mission'
import DemoPreview from '@/components/landing/DemoPreview'
import Features from '@/components/landing/Features'
import EUValues from '@/components/landing/EUValues'
import Testimonials from '@/components/landing/Testimonials'
import Statistics from '@/components/landing/Statistics'
import CTA from '@/components/landing/CTA'

export default function LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Problem />
      <Mission />
      <DemoPreview />
      <Features />
      <Statistics />
      <EUValues />
      <Testimonials />
      <CTA />
    </motion.div>
  )
}
