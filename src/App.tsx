import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useThemeStore } from '@/stores/themeStore'
import { useAccessibilityStore } from '@/stores/accessibilityStore'
import Layout from '@/components/layout/Layout'
import LandingPage from '@/pages/LandingPage'
import DashboardPage from '@/pages/DashboardPage'
import AnalyzerPage from '@/pages/AnalyzerPage'
import AccessibilityPage from '@/pages/AccessibilityPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import ExtensionPage from '@/pages/ExtensionPage'
import AboutPage from '@/pages/AboutPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function App() {
  const theme = useThemeStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/analyzer" element={<AnalyzerPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/extension" element={<ExtensionPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
