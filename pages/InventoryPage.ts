import { Page, Locator, expect } from '@playwright/test';
import { SELECTORS } from '../utils/test-data';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator(SELECTORS.inventoryItem);
    this.shoppingCartBadge = page.locator(SELECTORS.shoppingCartBadge);
    this.shoppingCartLink = page.locator(SELECTORS.shoppingCartLink);
  }

  async addRandomProductsToCart(count: number): Promise<string[]> {
    const totalProducts = await this.inventoryItems.count();
    const availableIndices = Array.from({ length: totalProducts }, (_, i) => i);
    const shuffled = availableIndices.sort(() => Math.random() - 0.5);
    const selectedIndices = shuffled.slice(0, count);
    const addedProducts: string[] = [];

    for (const index of selectedIndices) {
      const item = this.inventoryItems.nth(index);
      const productName = await item.locator('.inventory_item_name').textContent();
      const addButton = item.locator(SELECTORS.addToCartButton);
      
      await addButton.click();
      await expect(item.locator(SELECTORS.removeButton)).toBeVisible();
      
      if (productName) {
        addedProducts.push(productName);
      }
    }

    return addedProducts;
  }

  async verifyCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.shoppingCartBadge).toHaveText(expectedCount.toString());
  }

  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click();
    await this.page.waitForURL('**/cart.html');
  }
}