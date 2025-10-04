export const TEST_USERS = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
};

export const CHECKOUT_DATA = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
};

export const SELECTORS = {
  // Login Page
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  
  // Inventory Page
  inventoryItem: '.inventory_item',
  addToCartButton: '[data-test^="add-to-cart"]',
  removeButton: '[data-test^="remove"]',
  shoppingCartBadge: '.shopping_cart_badge',
  shoppingCartLink: '.shopping_cart_link',
  
  // Cart Page
  cartItem: '.cart_item',
  cartItemName: '.inventory_item_name',
  checkoutButton: '[data-test="checkout"]',
  
  // Checkout
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton: '[data-test="continue"]',
  finishButton: '[data-test="finish"]',
  
  // Complete
  completeHeader: '.complete-header',
  completeText: '.complete-text',
};