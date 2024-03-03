import { expect, test } from "@playwright/test";

const {
  FIRST_NAME,
  LAST_NAME,
  EMAIL,
  PHONE,
  ADDRESS,
  CC_NUMBER,
  CC_EXPIRATION,
  CC_CVC,
} = process.env as any;

const PRODUCT =
  "https://store.ui.com/us/en/pro/category/all-unifi-cloud-gateways/products/ucg-ultra";
// const TEST_PRODUCT =
//   "https://store.ui.com/us/en/pro/category/all-switching/products/usw-flex-mini";

test("buy my dam router", async ({ page }) => {
  await page.goto(PRODUCT);

  await expect(page.getByRole("button", { name: "Add to Cart" })).toBeVisible();

  // Start buying process
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await page.waitForLoadState("networkidle");

  // Go to checkout
  await page.goto("https://store.ui.com/us/en/checkout");
  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Check Out" }).click();
  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Continue as Guest" }).click();
  await page.waitForLoadState("networkidle");

  // Fill out the form....
  await page.getByRole("textbox", { name: "email" }).fill(EMAIL);

  await page.getByPlaceholder("First name").fill(FIRST_NAME);

  await page.getByPlaceholder("Last name").fill(LAST_NAME);

  await page.getByPlaceholder("Phone").fill(PHONE);

  await page.getByPlaceholder("Address 1").fill(ADDRESS);

  await page.waitForTimeout(500);

  await page.keyboard.press("ArrowDown");

  await page.keyboard.press("Enter");

  await page.waitForTimeout(500);

  await page.getByRole("button", { name: "Continue to Shipping" }).click();
  await page.waitForLoadState("networkidle");

  await page.getByRole("button", { name: "Continue to Payment" }).click();
  await page.waitForLoadState("networkidle");

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="1234 1234 1234 1234"]')
    .fill(CC_NUMBER);

  const stripe2ndFrame = page.frameLocator("iframe").nth(1);
  await stripe2ndFrame.locator('[placeholder="MM / YY"]').fill(CC_EXPIRATION);

  const stripe3rdFrame = page.frameLocator("iframe").nth(2);
  await stripe3rdFrame.locator('[placeholder="CVC"]').fill(CC_CVC);

  await page.getByRole("button", { name: "Pay Now" }).click();
});
