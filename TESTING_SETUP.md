# Testing Setup Guide

## Installation

To run the tests in `src/components/__tests__/ProjectsSection.test.tsx`, install the following dev dependencies:

```bash
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom @vitest/ui
```

## Vitest Configuration

Create `vitest.config.ts` in the project root:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## Test Setup File

Create `src/test/setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

## Update package.json

Add test scripts to `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage"
  }
}
```

## Running Tests

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Test Coverage

The ProjectsSection tests cover:
- ✅ Basic rendering and structure
- ✅ Tag organization with 4 categories (technology, domain, type, method)
- ✅ Tag color semantics (blue, green, purple, orange)
- ✅ Kebab-case to human-readable conversion
- ✅ Card composition (images, line-clamping, shadows)
- ✅ Coming soon ribbon with proper ARIA labels
- ✅ Accessibility (focus rings, ARIA labels, keyboard navigation)
- ✅ Project modal (open/close, keyboard support, ESC key)
- ✅ External link behavior
- ✅ Data integrity (unique IDs, kebab-case tags)

## Notes

- Tests use Vitest instead of Jest for better Vite integration
- Testing Library provides accessible queries (getByRole, getByLabelText, etc.)
- User-event library simulates real user interactions
- All tests follow ARIA best practices
