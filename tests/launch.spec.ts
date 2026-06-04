import { test, expect } from '../fixtures/test';

test.describe('TS-1: Homepage launch', () => {
  test('TC-1: Verify the URL is correct', async ({ homePage }) => {
    await expect(homePage.page).toHaveURL(/\/$/);
  });

  test('TC-2: Verify the page has the correct title', async ({ homePage }) => {
    await expect(homePage.page).toHaveTitle('Cristian Halita | QA Engineer Portfolio');
  });

  test('TC-3: Verify the page has loaded content', async ({ homePage }) => {
    const body = homePage.page.locator('body');
    await expect(body).toBeVisible();
  });
});
