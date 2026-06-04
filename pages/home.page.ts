import { type Locator, type Page, expect } from '@playwright/test';
import testIds from '../fixtures/dataTestIds.json';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly typewriterCursor: Locator;
  readonly typewriterText: Locator;
  readonly description: Locator;
  readonly exploreSkillsBtn: Locator;
  readonly viewWorkBtn: Locator;
  readonly skillsSection: Locator;
  readonly projectsSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByTestId(testIds.hero.name);
    this.typewriterCursor = page.getByTestId(testIds.hero.typewriterRole);
    this.typewriterText = page.getByTestId(testIds.hero.typewriterRole);
    this.description = page.getByTestId(testIds.hero.description);
    this.exploreSkillsBtn = page.getByTestId(testIds.hero.exploreSkillsButton);
    this.viewWorkBtn = page.getByTestId(testIds.hero.viewWorkButton);
    this.skillsSection = page.getByTestId(testIds.skills.section);
    this.projectsSection = page.getByTestId(testIds.projects.section);
  }

  async goto() {
    await this.page.goto('/');
  }

  async verifyWelcomeMessage() {
    await expect(this.heading).toBeVisible();
    await expect(this.heading).toContainText("Hi, I'm");
    await expect(this.heading).toContainText('Cristian Halita');
  }

  async verifyTypewriterCursor() {
    await expect(this.typewriterCursor).toBeVisible();
  }

  async verifyRoleAppears(role: string) {
    await expect(this.typewriterText).toContainText(role, { timeout: 15000 });
  }

  async verifyDescription() {
    await expect(this.description).toBeVisible();
  }

  async verifyExploreSkillsButton() {
    await expect(this.exploreSkillsBtn).toBeVisible();
    await expect(this.exploreSkillsBtn).toBeEnabled();
    await this.exploreSkillsBtn.click();
    await expect(this.skillsSection).toBeInViewport();
  }

  async verifyViewWorkButton() {
    await expect(this.viewWorkBtn).toBeVisible();
    await expect(this.viewWorkBtn).toBeEnabled();
    await this.viewWorkBtn.click();
    await expect(this.projectsSection).toBeInViewport();
  }

  async verifyStat(value: string, label: string) {
    const statsGrid = this.page.getByTestId(testIds.hero.stats);
    const statValue = statsGrid.filter({ hasText: value });
    await expect(statValue).toBeVisible();
    const statLabel = statsGrid.filter({ hasText: label });
    await expect(statLabel).toBeVisible();
  }
}