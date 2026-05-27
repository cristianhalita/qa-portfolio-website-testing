# Playwright with TypeScript

This project is set up with Playwright and TypeScript for automated testing.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Usage

Run tests:
```bash
npm test
```

Run tests in headed mode:
```bash
npx playwright test --headed
```

Run tests with UI:
```bash
npx playwright test --ui
```

View test report:
```bash
npx playwright show-report
```

## Project Structure

- `playwright.config.ts` - Playwright configuration
- `tsconfig.json` - TypeScript configuration
- `tests/` - Test files directory (to be created)
