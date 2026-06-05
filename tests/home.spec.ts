import { test, expect } from '../fixtures/test';

const roles = [
  'QA Engineer',
  'Test Automation Developer',
  'Bug Hunter',
  'Quality Advocate',
];

test.describe('TS-2: Homepage hero section', () => {
  test.beforeEach(async ({ homePage }) => {
    await test.step('Navigate to homepage', async () => {
      await homePage.goto();
    });
  });

  test('TC-1: Verify the welcome message is visible', async ({ homePage }) => {
    await test.step('Verify heading is visible and contains expected text', async () => {
      await homePage.assertHeadingIsVisible();
      await homePage.assertHeadingContainsText("Hi, I'm");
      await homePage.assertHeadingContainsText('Cristian Halita');
    });
  });

  test('TC-2: Verify the typewriter role element is visible', async ({ homePage }) => {
    await test.step('Verify typewriter role element is visible', async () => {
      await homePage.assertTypewriterRoleIsVisible();
    });
  });

  for (const role of roles) {
    test(`TC-3: Verify role "${role}" appears in the typewriter cycle`, async ({ homePage }) => {
      await test.step(`Wait for role "${role}" to appear in typewriter`, async () => {
        await homePage.assertTypewriterRoleContainsText(role);
      });
    });
  }

  test('TC-4: Verify the hero description text is visible', async ({ homePage }) => {
    await test.step('Verify description text is visible', async () => {
      await homePage.assertDescriptionIsVisible();
    });
  });

  test('TC-5: Verify "Explore Skills" button is visible, enabled, and scrolls to the skills section', async ({ homePage }) => {
    await test.step('Verify "Explore Skills" button is visible and enabled', async () => {
      await homePage.assertExploreSkillsBtnIsVisible();
      await homePage.assertExploreSkillsBtnIsEnabled();
    });
    await test.step('Click on "Explore Skills" button and verify skills section is in viewport', async () => {
      await homePage.clickOnExploreSkillsBtn();
      await homePage.assertSkillsSectionIsInViewport();
    });
  });

  test('TC-6: Verify "View Work" button is visible, enabled, and scrolls to the projects section', async ({ homePage }) => {
    await test.step('Verify "View Work" button is visible and enabled', async () => {
      await homePage.assertViewWorkBtnIsVisible();
      await homePage.assertViewWorkBtnIsEnabled();
    });
    await test.step('Click on "View Work" button and verify projects section is in viewport', async () => {
      await homePage.clickOnViewWorkBtn();
      await homePage.assertProjectsSectionIsInViewport();
    });
  });

  test('TC-7: Verify hero stats are displayed', async ({ homePage }) => {
    const stats = [
      { value: '5+', label: 'Years Experience' },
      { value: '400+', label: 'Bugs Caught' },
      { value: '7+', label: 'Projects Tested' },
    ];

    for (const stat of stats) {
      await test.step(`Verify "${stat.value}" value and "${stat.label}" label are displayed`, async () => {
        await homePage.assertStatValueIsVisible(stat.value);
        await homePage.assertStatLabelIsVisible(stat.label);
      });
    }
  });
});
