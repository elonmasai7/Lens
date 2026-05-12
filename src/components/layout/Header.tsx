import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Accessibility, Shield, BarChart3, Home, Search, ExternalLink, Info } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import ThemeToggle from '../shared/ThemeToggle'

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { to: '/analyzer', label: 'Analyzer', icon: Search },
  { to: '/accessibility', label: 'Accessibility', icon: Accessibility },
  { to: '/analytics', label: 'Analytics', icon: Shield },
  { to: '/extension', label: 'Extension', icon: ExternalLink },
  { to: '/about', label: 'About', icon: Info },
]

export default function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50" role="banner">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-lg font-bold" aria-label="EU Lens Home">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground text-sm">
              EU
            </span>
            <span className="hidden sm:inline">EU Lens</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.slice(1).map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {link.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              className="md:hidden p-2 rounded-lg hover:bg-accent"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div id="mobile-nav-menu" className="md:hidden border-t border-border/50 glass" role="navigation" aria-label="Mobile navigation">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
