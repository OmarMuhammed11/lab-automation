import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { TEST_USERS, CHECKOUT_DATA } from '../utils/test-data';

test.describe('Sauce Labs - Complete Checkout Flow', () => {
  test('User completes successful checkout with 3 random products', async ({ page }) => {
    // Initialize page objects
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Step 1: Navigate and Login
    await test.step('Login to application', async () => {
      await loginPage.navigate();
      await loginPage.login(TEST_USERS.standard.username, TEST_USERS.standard.password);
    });

    // Step 2: Add 3 random products to cart
    let selectedProducts: string[];
    await test.step('Add 3 random products to cart', async () => {
      selectedProducts = await inventoryPage.addRandomProductsToCart(3);
      console.log('Selected products:', selectedProducts);
      
      // Assertion: Verify 3 products were added
      expect(selectedProducts).toHaveLength(3);
    });

    // Step 3: Verify cart badge
    await test.step('Verify cart badge shows 3 items', async () => {
      await inventoryPage.verifyCartBadgeCount(3);
    });

    // Step 4: Navigate to cart
    await test.step('Navigate to cart', async () => {
      await inventoryPage.goToCart();
    });

    // Step 5: Verify cart contents
    await test.step('Verify all products are in cart', async () => {
      await cartPage.verifyProductsInCart(selectedProducts);
    });

    // Step 6: Proceed to checkout
    await test.step('Proceed to checkout', async () => {
      await cartPage.proceedToCheckout();
    });

    // Step 7: Fill checkout information
    await test.step('Fill checkout information', async () => {
      await checkoutPage.fillCheckoutInformation(
        CHECKOUT_DATA.firstName,
        CHECKOUT_DATA.lastName,
        CHECKOUT_DATA.postalCode
      );
    });

    // Step 8: Complete checkout
    await test.step('Complete checkout', async () => {
      await checkoutPage.finishCheckout();
    });

    // Step 9: Verify successful completion
    await test.step('Verify order completion', async () => {
      await checkoutPage.verifyCheckoutComplete();
    });
  });
});