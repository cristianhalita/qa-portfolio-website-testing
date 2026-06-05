# Playwright with TypeScript

End-to-end automated testing suite for the QA Portfolio Website, built with [Playwright](https://playwright.dev/) and TypeScript.

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

### Run all tests (all browsers, headless)
```bash
npm test
```
> **Note:** `npm test` automatically runs `tsc --noEmit` first via the `pretest` script. If there are type errors, tests won't run.

### Run tests in a specific mode
```bash
npm run test:headed       # See the browser while tests run
npm run test:ui           # Interactive Playwright UI mode (time-travel debugging)
npm run test:debug        # Step through tests with DevTools debugger
```

### Run tests for a specific browser
```bash
npm run test:chromium       # Desktop Chrome
npm run test:firefox        # Desktop Firefox
npm run test:webkit         # Desktop Safari
npm run test:mobile-chrome  # Mobile Chrome (Pixel 5)
npm run test:mobile-safari  # Mobile Safari (iPhone 13)
```

### View test report
```bash
npm run report
```

### Type-check without running tests
```bash
npm run lint
```

## Project Structure

```
testing/
├── playwright.config.ts   # Playwright configuration (browsers, timeouts, web server)
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies and scripts
├── fixtures/
│   └── test.ts            # Custom test fixture — extends Playwright's base test
├── pages/
│   └── home.page.ts       # Page Object Model for the Home page
├── data/
│   └── dataTestIds.json   # Centralized test ID selectors
├── tests/
│   ├── launch.spec.ts     # TS-1: Homepage launch tests
│   └── home.spec.ts       # TS-2: Homepage hero section tests
└── public/
    └── status.json        # Mock data for API interception
```

## Architecture & Patterns

### Custom Test Fixture

Tests use a **custom fixture** (`fixtures/test.ts`) instead of importing directly from `@playwright/test`. This fixture automatically injects Page Object instances into the test context:

```ts
// fixtures/test.ts
export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});
```

Tests import from the fixture, not from Playwright directly:

```ts
import { test, expect } from '../fixtures/test';
```

This gives every test access to `homePage` without manual instantiation:

```ts
test('my test', async ({ homePage }) => {
  await homePage.goto();
  await homePage.assertHeadingIsVisible();
});
```

### Page Object Model (POM)

Each page is represented by a class in `pages/` that encapsulates:
- **Locators** — defined in the constructor using `getByTestId()`
- **Assert methods** — e.g. `assertHeadingIsVisible()`
- **Action methods** — e.g. `clickOnExploreSkillsBtn()`

This keeps test specs clean and readable, with all implementation details in one place.

### Centralized Test IDs (`dataTestIds.json`)

All `data-testid` selectors are stored in `data/dataTestIds.json`, organized by page section:

```json
{
  "hero": {
    "name": "hero-name",
    "typewriterRole": "hero-typewriter-role",
    "exploreSkillsButton": "hero-explore-skills-button"
  }
}
```

Page Objects reference these IDs instead of hardcoding strings:

```ts
import testIds from '../data/dataTestIds.json';

this.heading = page.getByTestId(testIds.hero.name);
```

**Benefits:**
- Single source of truth — if a test ID changes, update it in one place
- Type-safe with autocomplete via JSON imports
- Decouples test logic from DOM implementation details

## Browser Projects

The project is configured to run tests across multiple browsers and devices:

| Project | Device | Use Case |
|---------|--------|----------|
| `chromium` | Desktop Chrome | Default desktop testing |
| `firefox` | Desktop Firefox | Cross-browser coverage |
| `webkit` | Desktop Safari | Cross-browser coverage |
| `mobile-chrome` | Pixel 5 | Mobile responsiveness |
| `mobile-safari` | iPhone 13 | Mobile responsiveness |

## CI Configuration

The `playwright.config.ts` adjusts behavior for CI environments:
- **Retries:** 2 retries in CI, 0 locally
- **Workers:** 1 worker in CI, 100% locally
- **Base URL:** `localhost:4173` in CI (preview build), `localhost:5173` locally (dev server)
- **Web server:** Auto-starts dev server locally only
- **Traces:** Captured on first retry
- **Screenshots:** Captured on failure only
- **Videos:** Retained on failure only
