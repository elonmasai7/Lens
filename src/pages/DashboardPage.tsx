import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, Eye, Users, TrendingUp, Activity } from 'lucide-react'
import { useDashboard } from '@/hooks/useAI'
import { trustColor } from '@/lib/utils'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardPage() {
  const { metrics, loading, fetchMetrics } = useDashboard()

  useEffect(() => { fetchMetrics() }, [fetchMetrics])

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" role="status">
          <span className="sr-only">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  const statCards = [
    { icon: Shield, label: 'Total Analyses', value: metrics.totalAnalyses.toLocaleString(), color: 'from-blue-500 to-cyan-500' },
    { icon: Activity, label: 'Avg Trust Score', value: metrics.averageTrustScore.toFixed(1), suffix: '%', color: 'from-teal-500 to-green-500' },
    { icon: AlertTriangle, label: 'Misinformation Detected', value: metrics.misinformationDetected.toLocaleString(), color: 'from-red-500 to-orange-500' },
    { icon: Eye, label: 'Accessibility Conversions', value: metrics.accessibilityConversions.toLocaleString(), color: 'from-purple-500 to-pink-500' },
    { icon: Users, label: 'Active Users', value: metrics.activeUsers.toLocaleString(), color: 'from-amber-500 to-yellow-500' },
    { icon: TrendingUp, label: 'Trust Trend', value: metrics.trends[metrics.trends.length - 1]?.trustScore.toFixed(0) || '0', suffix: '%', color: 'from-indigo-500 to-blue-500' },
  ]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">European Trust Dashboard</h1>
        <p className="text-muted-foreground mt-1">Real-time analytics on misinformation trends and accessibility metrics across Europe.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 rounded-xl border border-border bg-card"
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} p-1.5 mb-3`}>
              <card.icon className="w-full h-full text-white" aria-hidden="true" />
            </div>
            <p className="text-xs text-muted-foreground mb-1">{card.label}</p>
            <p className="text-lg font-bold">{card.value}{card.suffix || ''}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-4">Trust Score Trend (30 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v) => v.slice(5)} stroke="var(--muted-foreground)" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="trustScore" stroke="#003399" strokeWidth={2} dot={false} name="Trust Score" />
                <Line type="monotone" dataKey="accessibilityScore" stroke="#009688" strokeWidth={2} dot={false} name="Accessibility Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-4">Misinformation Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.categoryBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="category" tick={{ fontSize: 9 }} tickFormatter={(v) => v.replace(/_/g, ' ')} stroke="var(--muted-foreground)" />
                <YAxis tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="#003399" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-4">Trust History (90 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.trustHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v) => v.slice(5)} stroke="var(--muted-foreground)" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="score" stroke="#003399" strokeWidth={2} dot={false} name="Trust Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-4">Geographic Trust Distribution</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {metrics.geographicData.map((g) => (
              <div key={g.region} className="flex items-center justify-between py-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{g.region}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    g.riskLevel === 'low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    g.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {g.riskLevel}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${trustColor(g.trustScore)}`} style={{ width: `${g.trustScore}%` }} />
                  </div>
                  <span className={`text-sm font-medium ${trustColor(g.trustScore)}`}>
                    {g.trustScore.toFixed(0)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
