import { type Locator, type Page, expect } from '@playwright/test';
import testIds from '../data/dataTestIds.json';

export class HomePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly typewriterRole: Locator;
  readonly description: Locator;
  readonly exploreSkillsBtn: Locator;
  readonly viewWorkBtn: Locator;
  readonly skillsSection: Locator;
  readonly projectsSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByTestId(testIds.hero.name);
    this.typewriterRole = page.getByTestId(testIds.hero.typewriterRole);
    this.description = page.getByTestId(testIds.hero.description);
    this.exploreSkillsBtn = page.getByTestId(testIds.hero.exploreSkillsButton);
    this.viewWorkBtn = page.getByTestId(testIds.hero.viewWorkButton);
    this.skillsSection = page.getByTestId(testIds.skills.section);
    this.projectsSection = page.getByTestId(testIds.projects.section);
  }

  async goto() {
    await this.page.goto('/');
  }

  // Assert methods
  async assertHeadingIsVisible() {
    await expect(this.heading).toBeVisible();
  }

  async assertHeadingContainsText(text: string) {
    await expect(this.heading).toContainText(text);
  }

  async assertTypewriterRoleIsVisible() {
    await expect(this.typewriterRole).toBeVisible();
  }

  async assertTypewriterRoleContainsText(role: string) {
    await expect(this.typewriterRole).toContainText(role);
  }

  async assertDescriptionIsVisible() {
    await expect(this.description).toBeVisible();
  }

  async assertExploreSkillsBtnIsVisible() {
    await expect(this.exploreSkillsBtn).toBeVisible();
  }

  async assertExploreSkillsBtnIsEnabled() {
    await expect(this.exploreSkillsBtn).toBeEnabled();
  }

  async assertSkillsSectionIsInViewport() {
    await expect(this.skillsSection).toBeInViewport();
  }

  async assertViewWorkBtnIsVisible() {
    await expect(this.viewWorkBtn).toBeVisible();
  }

  async assertViewWorkBtnIsEnabled() {
    await expect(this.viewWorkBtn).toBeEnabled();
  }

  async assertProjectsSectionIsInViewport() {
    await expect(this.projectsSection).toBeInViewport();
  }

  async assertStatValueIsVisible(value: string) {
    const statsGrid = this.page.getByTestId(testIds.hero.stats);
    const statValue = statsGrid.filter({ hasText: value });
    await expect(statValue).toBeVisible();
  }

  async assertStatLabelIsVisible(label: string) {
    const statsGrid = this.page.getByTestId(testIds.hero.stats);
    const statLabel = statsGrid.filter({ hasText: label });
    await expect(statLabel).toBeVisible();
  }

  // Action methods
  async clickOnExploreSkillsBtn() {
    await this.exploreSkillsBtn.click();
  }

  async clickOnViewWorkBtn() {
    await this.viewWorkBtn.click();
  }
}