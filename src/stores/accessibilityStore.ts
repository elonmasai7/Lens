import { create } from 'zustand'
import type { AccessibilityPreferences } from '@/types'

interface AccessibilityStore extends AccessibilityPreferences {
  setDyslexiaMode: (v: boolean) => void
  setHighContrast: (v: boolean) => void
  setTextSpacing: (v: number) => void
  setFontSize: (v: number) => void
  setSimplifiedReading: (v: boolean) => void
  setVoiceNarration: (v: boolean) => void
  setFontFamily: (v: string) => void
  setColorScheme: (v: 'auto' | 'light' | 'dark') => void
  setReducedMotion: (v: boolean) => void
  reset: () => void
}

const defaults: AccessibilityPreferences = {
  dyslexiaMode: false,
  highContrast: false,
  textSpacing: 1,
  fontSize: 16,
  simplifiedReading: false,
  voiceNarration: false,
  fontFamily: 'Inter',
  colorScheme: 'auto',
  reducedMotion: false,
}

function loadPersisted(): AccessibilityPreferences {
  if (typeof window === 'undefined') return defaults
  try {
    const stored = localStorage.getItem('eulens:accessibility')
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults
  } catch {
    return defaults
  }
}

function persist(state: AccessibilityPreferences) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('eulens:accessibility', JSON.stringify(state))
  }
}

export const useAccessibilityStore = create<AccessibilityStore>((set, get) => ({
  ...loadPersisted(),
  setDyslexiaMode: (v) => { set({ dyslexiaMode: v }); persist(get()) },
  setHighContrast: (v) => { set({ highContrast: v }); persist(get()) },
  setTextSpacing: (v) => { set({ textSpacing: v }); persist(get()) },
  setFontSize: (v) => { set({ fontSize: v }); persist(get()) },
  setSimplifiedReading: (v) => { set({ simplifiedReading: v }); persist(get()) },
  setVoiceNarration: (v) => { set({ voiceNarration: v }); persist(get()) },
  setFontFamily: (v) => { set({ fontFamily: v }); persist(get()) },
  setColorScheme: (v) => { set({ colorScheme: v }); persist(get()) },
  setReducedMotion: (v) => { set({ reducedMotion: v }); persist(get()) },
  reset: () => { set(defaults); persist(defaults) },
}))
