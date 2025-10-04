import { Page, Locator, expect } from '@playwright/test';
import { SELECTORS } from '../utils/test-data';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator(SELECTORS.cartItem);
    this.checkoutButton = page.locator(SELECTORS.checkoutButton);
  }

  async verifyProductsInCart(expectedProducts: string[]): Promise<void> {
    const cartItemCount = await this.cartItems.count();
    expect(cartItemCount).toBe(expectedProducts.length);

    for (const productName of expectedProducts) {
      const cartItemName = this.page.locator(SELECTORS.cartItemName, { hasText: productName });
      await expect(cartItemName).toBeVisible();
    }
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }
}