# Contributing to EU Lens

We welcome contributions that help us make Europe's digital information more accessible and trustworthy.

## Code of Conduct

All contributors must adhere to our Code of Conduct, which promotes:
- Respectful and inclusive communication
- Constructive feedback
- Focus on accessibility and inclusion
- Compliance with EU values

## Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## Development Guidelines

### Code Style
- TypeScript strict mode
- Functional components with hooks
- Proper TypeScript types for all props and state
- Consistent naming conventions (camelCase for variables, PascalCase for components)

### Accessibility Requirements
- All interactive elements must have ARIA labels
- Semantic HTML (nav, main, section, article, aside)
- Proper heading hierarchy
- Keyboard navigable
- Color contrast ratios (AA minimum)
- Screen reader announcements for dynamic content
- Reduced motion support

### Component Standards
- One component per file
- Props interface defined and exported
- Default exports for page components
- Named exports for reusable components
- JSDoc comments for complex logic

### Testing
- Write tests for new components
- Ensure accessibility tests pass
- Test keyboard navigation
- Test screen reader compatibility

### Commit Messages
Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Testing
- `a11y:` Accessibility improvements

## Pull Request Process

1. Ensure TypeScript compiles without errors
2. Ensure the build succeeds
3. Update documentation if needed
4. Include screenshots for UI changes
5. Mention accessibility testing performed

## Questions?

Open a discussion or issue on GitHub.
