import { Page, Locator, expect } from '@playwright/test';
import { SELECTORS } from '../utils/test-data';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator(SELECTORS.firstNameInput);
    this.lastNameInput = page.locator(SELECTORS.lastNameInput);
    this.postalCodeInput = page.locator(SELECTORS.postalCodeInput);
    this.continueButton = page.locator(SELECTORS.continueButton);
    this.finishButton = page.locator(SELECTORS.finishButton);
    this.completeHeader = page.locator(SELECTORS.completeHeader);
  }

  async fillCheckoutInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
    await this.page.waitForURL('**/checkout-complete.html');
  }

  async verifyCheckoutComplete(): Promise<void> {
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }
}