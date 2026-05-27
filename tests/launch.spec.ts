import { test, expect } from '@playwright/test';

test('Check homepage is loaded correctly', async ({ page }) => {
  await test.step('Navigate to the application', async () => {
    await page.goto('http://localhost:5173');
  });

  await test.step('Verify the URL is correct', async () => {
    await expect(page).toHaveURL('http://localhost:5173');
  });

  await test.step('Verify the page has the correct title', async () => {
    await expect(page).toHaveTitle('Cristian Halita | QA Engineer Portfolio');
  });

  await test.step('Verify the page has loaded content', async () => {
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });
});
