import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import testIds from './dataTestIds.json';

type TestFixtures = {
  homePage: HomePage;
  testIds: typeof import('./dataTestIds.json');
};

export const test = base.extend<TestFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  testIds: async ({}, use) => {
    await use(testIds);
  },
});

export { expect };