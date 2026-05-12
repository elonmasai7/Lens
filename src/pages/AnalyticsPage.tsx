import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { useEffect, useState } from 'react'
import { mockDashboardData } from '@/lib/mockData'
import { trustColor } from '@/lib/utils'
import type { DashboardMetrics } from '@/types'

const COLORS = ['#003399', '#009688', '#ef4444', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6']

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'geo'>('overview')

  useEffect(() => {
    setMetrics(mockDashboardData)
  }, [])

  if (!metrics) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" role="status">
          <span className="sr-only">Loading analytics...</span>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Trust & Analytics</h1>
        <p className="text-muted-foreground mt-1">Deep insights into misinformation patterns and accessibility impact across Europe.</p>
      </div>

      <div className="flex gap-2 mb-6">
        {(['overview', 'trends', 'geo'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-4">Misinformation Categories Distribution</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={metrics.categoryBreakdown} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={90} label={({ category, percent }) => `${(percent * 100).toFixed(0)}%`}>
                      {metrics.categoryBreakdown.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {metrics.categoryBreakdown.map((c, i) => (
                  <div key={c.category} className="flex items-center gap-2 text-xs">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="text-muted-foreground">{c.category.replace(/_/g, ' ')}</span>
                    <span className="font-medium">{c.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h3 className="font-semibold mb-4">Category Trends</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics.categoryBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis type="number" tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                    <YAxis dataKey="category" type="category" tick={{ fontSize: 9 }} tickFormatter={(v) => v.replace(/_/g, ' ')} stroke="var(--muted-foreground)" width={120} />
                    <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                    <Bar dataKey="count" fill="#003399" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-4">Trust Score & Accessibility Over Time</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics.trends}>
                  <defs>
                    <linearGradient id="trustGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#003399" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#003399" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="accessGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#009688" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#009688" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(v) => v.slice(5)} stroke="var(--muted-foreground)" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} stroke="var(--muted-foreground)" />
                  <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="trustScore" stroke="#003399" fill="url(#trustGradient)" strokeWidth={2} name="Trust Score" />
                  <Area type="monotone" dataKey="accessibilityScore" stroke="#009688" fill="url(#accessGradient)" strokeWidth={2} name="Accessibility Score" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="font-semibold mb-4">90-Day Trust History</h3>
            <div className="h-72">
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
        </div>
      )}

      {activeTab === 'geo' && (
        <div className="p-6 rounded-xl border border-border bg-card">
          <h3 className="font-semibold mb-4">Geographic Trust Distribution</h3>
          <div className="space-y-2">
            {metrics.geographicData.map((g) => (
              <div key={g.region} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium w-32">{g.region}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    g.riskLevel === 'low' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    g.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {g.riskLevel}
                  </span>
                  <span className="text-xs text-muted-foreground">n={g.sampleSize}</span>
                </div>
                <div className="flex items-center gap-3 w-48">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${trustColor(g.trustScore)}`} style={{ width: `${g.trustScore}%` }} />
                  </div>
                  <span className="text-sm font-medium w-12 text-right">{g.trustScore.toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
