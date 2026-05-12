import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import SkipLink from '../shared/SkipLink'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex-1" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
