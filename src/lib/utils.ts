import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function trustColor(score: number) {
  if (score >= 80) return 'trust-very-high'
  if (score >= 60) return 'trust-high'
  if (score >= 40) return 'trust-moderate'
  if (score >= 20) return 'trust-low'
  return 'trust-very-low'
}

export function trustBg(score: number) {
  if (score >= 80) return 'bg-trust-very-high'
  if (score >= 60) return 'bg-trust-high'
  if (score >= 40) return 'bg-trust-moderate'
  if (score >= 20) return 'bg-trust-low'
  return 'bg-trust-very-low'
}

export function trustLabel(score: number) {
  if (score >= 80) return 'Very High'
  if (score >= 60) return 'High'
  if (score >= 40) return 'Moderate'
  if (score >= 20) return 'Low'
  return 'Very Low'
}
