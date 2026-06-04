import { type Locator, type Page, expect } from '@playwright/test';

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
    this.heading = page.locator('h1');
    this.typewriterCursor = page.locator('.animate-blink');
    this.typewriterText = page.locator('h1 + div').locator('span').first();
    this.description = page.getByText('Passionate about delivering flawless digital experiences through rigorous testing, smart automation, and a relentless eye for quality.');
    this.exploreSkillsBtn = page.getByRole('link', { name: 'Explore Skills' });
    this.viewWorkBtn = page.getByRole('link', { name: 'View Work' });
    this.skillsSection = page.locator('#skills');
    this.projectsSection = page.locator('#projects');
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
    await expect(this.typewriterCursor).toHaveText('|');
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
    await expect(this.exploreSkillsBtn).toHaveAttribute('href', '#skills');
    await this.exploreSkillsBtn.click();
    await expect(this.skillsSection).toBeInViewport();
  }

  async verifyViewWorkButton() {
    await expect(this.viewWorkBtn).toBeVisible();
    await expect(this.viewWorkBtn).toBeEnabled();
    await expect(this.viewWorkBtn).toHaveAttribute('href', '#projects');
    await this.viewWorkBtn.click();
    await expect(this.projectsSection).toBeInViewport();
  }

  async verifyStat(value: string, label: string) {
    const stat = this.page.getByText(value).first();
    await expect(stat).toBeVisible();
    const statLabel = this.page.getByText(label);
    await expect(statLabel).toBeVisible();
  }
}