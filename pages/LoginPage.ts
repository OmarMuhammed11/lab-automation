import { Page, Locator, expect } from '@playwright/test';
import { SELECTORS } from '../utils/test-data';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator(SELECTORS.usernameInput);
    this.passwordInput = page.locator(SELECTORS.passwordInput);
    this.loginButton = page.locator(SELECTORS.loginButton);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
}