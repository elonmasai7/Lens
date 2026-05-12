# Accessibility Statement

EU Lens is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.

## Compliance Status

EU Lens aims to conform to **WCAG 2.2 Level AA** as a minimum, with Level AAA as a target for core features.

## Accessibility Features

- **Screen Reader Support**: All interactive elements have ARIA labels, semantic HTML structure, and proper heading hierarchy
- **Keyboard Navigation**: Full keyboard accessibility with visible focus indicators
- **Skip to Content**: Skip navigation link at the top of every page
- **Reduced Motion**: Full support for `prefers-reduced-motion` media query
- **Color Contrast**: AA compliance for all text elements (4.5:1 minimum)
- **Font Controls**: Adjustable font size, spacing, and font family
- **High Contrast Mode**: Dedicated high contrast theme
- **Dyslexia-Friendly Mode**: Specialized typography and spacing
- **Voice Narration**: Text-to-speech support
- **Simplified Reading**: Easy-to-read content summaries

## Known Limitations

- Some third-party chart libraries may have limited screen reader support (data tables provided as alternative)
- Some decorative animations may not respect reduced motion preferences in all browsers

## Feedback

We welcome your feedback on the accessibility of EU Lens. Please contact us at:

- Email: accessibility@eulens.app
- GitHub: [Open an issue](https://github.com/eulens/accessibility)

We aim to respond to accessibility feedback within 5 business days.

## Evaluation

EU Lens is evaluated regularly using:
- Automated testing with axe-core
- Screen reader testing (NVDA, VoiceOver)
- Keyboard-only navigation testing
- Color contrast analyzers
- Lighthouse accessibility audits
