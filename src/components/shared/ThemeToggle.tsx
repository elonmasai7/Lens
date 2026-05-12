import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg hover:bg-accent transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun className={`w-5 h-5 transition-all ${theme === 'dark' ? 'opacity-0 scale-0 absolute' : 'opacity-100 scale-100'}`} aria-hidden="true" />
      <Moon className={`w-5 h-5 transition-all ${theme === 'light' ? 'opacity-0 scale-0 absolute' : 'opacity-100 scale-100'}`} aria-hidden="true" />
    </button>
  )
}
