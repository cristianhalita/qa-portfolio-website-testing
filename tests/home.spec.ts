import { test, expect } from '../fixtures/test';

const roles = [
  'QA Engineer',
  'Test Automation Developer',
  'Bug Hunter',
  'Quality Advocate',
];

test.describe('TS-2: Homepage hero section', () => {
  test('TC-1: Verify the welcome message is visible', async ({ homePage }) => {
    await homePage.verifyWelcomeMessage();
  });

  test('TC-2: Verify the typewriter cursor is visible', async ({ homePage }) => {
    await homePage.verifyTypewriterCursor();
  });

  for (const role of roles) {
    test(`TC-3: Verify role "${role}" appears in the typewriter cycle`, async ({ homePage }) => {
      await homePage.verifyRoleAppears(role);
    });
  }

  test('TC-4: Verify the hero description text is visible', async ({ homePage }) => {
    await homePage.verifyDescription();
  });

  test('TC-5: Verify "Explore Skills" button is visible, enabled, links correctly, and scrolls to the skills section', async ({ homePage }) => {
    await homePage.verifyExploreSkillsButton();
  });

  test('TC-6: Verify "View Work" button is visible, enabled, links correctly, and scrolls to the projects section', async ({ homePage }) => {
    await homePage.verifyViewWorkButton();
  });

  test('TC-7: Verify "5+" years of experience stat is displayed', async ({ homePage }) => {
    await homePage.verifyStat('5+', 'Years Experience');
  });

  test('TC-8: Verify "400+" bugs caught stat is displayed', async ({ homePage }) => {
    await homePage.verifyStat('400+', 'Bugs Caught');
  });

  test('TC-9: Verify "7+" projects tested stat is displayed', async ({ homePage }) => {
    await homePage.verifyStat('7+', 'Projects Tested');
  });
});
