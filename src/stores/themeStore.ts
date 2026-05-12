import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: (typeof window !== 'undefined' && localStorage.getItem('eulens:theme') as Theme) || 'light',
  setTheme: (theme) => {
    localStorage.setItem('eulens:theme', theme)
    document.documentElement.classList.toggle('dark', theme === 'dark')
    set({ theme })
  },
  toggleTheme: () => {
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('eulens:theme', next)
      document.documentElement.classList.toggle('dark', next === 'dark')
      return { theme: next }
    })
  },
}))
