import { Link } from 'react-router-dom'
import { Heart, Github, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-lg font-bold mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground text-sm">
                EU
              </span>
              EU Lens
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Making Europe's digital information accessible and trustworthy for everyone.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg hover:bg-accent text-muted-foreground" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg hover:bg-accent text-muted-foreground" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/analyzer" className="hover:text-foreground transition-colors">AI Analyzer</Link></li>
              <li><Link to="/accessibility" className="hover:text-foreground transition-colors">Accessibility</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/extension" className="hover:text-foreground transition-colors">Browser Extension</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/about" className="hover:text-foreground transition-colors">Mission</Link></li>
              <li><Link to="/analytics" className="hover:text-foreground transition-colors">Trust Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-3">Compliance</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Accessibility Statement</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">GDPR Compliance</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">EU AI Act</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} EU Lens. Built with{' '}
            <Heart className="w-3 h-3 inline text-red-500" /> for an accessible Europe.
          </p>
          <p className="text-xs text-muted-foreground">
            Aligned with the European Accessibility Act, EU AI Act &amp; Digital Services Act
          </p>
        </div>
      </div>
    </footer>
  )
}
