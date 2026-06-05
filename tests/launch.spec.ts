import { test, expect } from '../fixtures/test';
import testIds from '../data/dataTestIds.json';

test.describe('TS-1: Homepage launch', () => {
  test.beforeEach(async ({ homePage }) => {
    await test.step('Navigate to homepage', async () => {
      await homePage.goto();
    });
  });

  test('TC-1: Verify the URL is correct', async ({ homePage }) => {
    await test.step('Verify page URL ends with /', async () => {
      await expect(homePage.page).toHaveURL(/\/$/);
    });
  });

  test('TC-2: Verify the page has the correct title', async ({ homePage }) => {
    await test.step('Verify page title is "Cristian Halita | QA Engineer Portfolio"', async () => {
      await expect(homePage.page).toHaveTitle('Cristian Halita | QA Engineer Portfolio');
    });
  });

  test('TC-3: Verify the page has loaded content', async ({ homePage }) => {
    await test.step('Verify app root element is visible', async () => {
      const appRoot = homePage.page.getByTestId(testIds.app.root);
      await expect(appRoot).toBeVisible();
    });
  });
});
