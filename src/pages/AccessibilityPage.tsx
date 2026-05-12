import { motion } from 'framer-motion'
import { useAccessibilityStore } from '@/stores/accessibilityStore'
import { Eye, Type, AlignLeft, Mic, RefreshCw, Monitor, Volume2, BookOpen } from 'lucide-react'
import { useState } from 'react'

const sampleText = `The European Parliament has adopted a comprehensive digital regulation package aimed at protecting citizens' online rights. The legislation addresses platform accountability, data protection, and digital accessibility requirements for all member states. This landmark decision represents a significant step forward in creating a safer, more inclusive digital environment for all European citizens.`

export default function AccessibilityPage() {
  const store = useAccessibilityStore()
  const [showPreview, setShowPreview] = useState(true)

  const previewStyle = {
    fontFamily: store.dyslexiaMode ? '"OpenDyslexic", "Comic Sans MS", cursive' : 'Inter, sans-serif',
    fontSize: `${store.fontSize}px`,
    letterSpacing: `${store.textSpacing}px`,
    lineHeight: store.dyslexiaMode ? 1.8 : 1.6,
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Accessibility Settings</h1>
        <p className="text-muted-foreground mt-1">Customize how content is displayed to suit your needs. All settings are WCAG AA compliant.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="p-6 rounded-xl border border-border bg-card">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" aria-hidden="true" />
              Visual Settings
            </h2>
            <div className="space-y-4">
              <ToggleSetting
                label="Dyslexia-Friendly Mode"
                description="Uses OpenDyslexic font and increased line spacing"
                checked={store.dyslexiaMode}
                onChange={store.setDyslexiaMode}
                icon={BookOpen}
              />
              <ToggleSetting
                label="High Contrast Mode"
                description="Increases color contrast for better readability"
                checked={store.highContrast}
                onChange={store.setHighContrast}
                icon={Eye}
              />
              <div>
                <label className="text-sm font-medium block mb-1">Font Size: {store.fontSize}px</label>
                <input
                  type="range"
                  min="12"
                  max="28"
                  value={store.fontSize}
                  onChange={(e) => store.setFontSize(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Font size slider"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Text Spacing: {store.textSpacing}px</label>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={store.textSpacing}
                  onChange={(e) => store.setTextSpacing(Number(e.target.value))}
                  className="w-full accent-primary"
                  aria-label="Text spacing slider"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary" aria-hidden="true" />
              Reading & Audio
            </h2>
            <div className="space-y-4">
              <ToggleSetting
                label="Simplified Reading"
                description="Uses easy-to-read language and short sentences"
                checked={store.simplifiedReading}
                onChange={store.setSimplifiedReading}
                icon={AlignLeft}
              />
              <ToggleSetting
                label="Voice Narration"
                description="Read content aloud using AI voice"
                checked={store.voiceNarration}
                onChange={store.setVoiceNarration}
                icon={Mic}
              />
              <ToggleSetting
                label="Reduced Motion"
                description="Disables animations and transitions"
                checked={store.reducedMotion}
                onChange={store.setReducedMotion}
                icon={Monitor}
              />
            </div>
          </div>

          <button
            onClick={store.reset}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border hover:bg-accent transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Reset to Defaults
          </button>
        </div>

        <div className="lg:col-span-2">
          <div className="p-6 rounded-xl border border-border bg-card h-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Live Preview</h2>
              <span className={`px-2 py-1 rounded text-xs font-medium ${store.highContrast ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-muted text-muted-foreground'}`}>
                {store.highContrast ? 'High Contrast Active' : 'Normal Mode'}
              </span>
            </div>
            <div
              className={`p-6 rounded-lg min-h-[300px] transition-all ${
                store.highContrast
                  ? 'bg-black text-yellow-300 dark:bg-white dark:text-black'
                  : store.dyslexiaMode
                  ? 'bg-amber-50 dark:bg-amber-950'
                  : 'bg-muted/50'
              }`}
              style={previewStyle}
              role="region"
              aria-label="Content preview with current accessibility settings"
            >
              {store.simplifiedReading ? (
                <div>
                  <p className="mb-4">
                    The European Parliament has agreed on new rules for the internet. These rules will help protect people's rights online. The rules make sure that:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Websites are responsible for what they show</li>
                    <li>Your personal data is protected</li>
                    <li>Websites work for people with disabilities</li>
                    <li>All EU countries must follow these rules</li>
                  </ul>
                  <p className="mt-4 text-sm opacity-70">
                    This is an Easy-to-Read summary. Source: European Parliament.
                  </p>
                </div>
              ) : (
                <p>{sampleText}</p>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span>Font: {previewStyle.fontFamily}</span>
              <span>Size: {previewStyle.fontSize}</span>
              <span>Spacing: {previewStyle.letterSpacing}</span>
              <span>Line Height: {previewStyle.lineHeight}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ToggleSetting({
  label, description, checked, onChange, icon: Icon,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
  icon: React.ElementType
}) {
  return (
    <div className="flex items-start gap-3">
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 mt-0.5 ${
          checked ? 'bg-primary' : 'bg-input'
        }`}
      >
        <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
      <div>
        <label className="text-sm font-medium cursor-pointer" onClick={() => onChange(!checked)}>{label}</label>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
