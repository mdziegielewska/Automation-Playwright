import { test, expect, type Page } from '@playwright/test';
import { forms } from '../support/forms';


let logInParams = [
  { name: 'username', value: process.env.USERNAME! },
  { name: 'password', value: process.env.PASSWORD! }
]


let accountParams =  [
  { name: 'firstName', value: 'xxxx' },
  { name: 'lastName', value: process.env.LAST_NAME! },
  { name: 'address.street', value: 'xxxx' },
  { name: 'address.city', value: process.env.CITY!},
  { name: 'address.state', value: 'xxxx' },
  { name: 'address.zipCode', value: process.env.ZIPCODE! },
  { name: 'ssn', value: 'xxxx' }
]


test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });


test.describe('Log In', () => {

    test('should login incorrectly', async ({ page }) => {

      let loginPanel = page.locator("#loginPanel");
      await expect(loginPanel).toBeVisible();

      await forms.fillField(loginPanel, 'username', 'xxxxxxxxxx');
      await forms.fillField(loginPanel, 'password', 'xxxxxxxxxx');

      forms.submit(loginPanel);

      let title = page.locator('.title');
      await expect(title).toBeVisible();
      await expect(title).toContainText("Error!");
    });

    test('should login correctly', async ({ page }) => {

      let loginPanel = page.locator("#loginPanel");
      await expect(loginPanel).toBeVisible();

      for(const data of logInParams) {
        await forms.fillField(loginPanel, data.name, data.value);
      };

      forms.submit(loginPanel);

      let overview = page.locator("#overviewAccountsApp");
      await expect(overview).toBeVisible();
      await expect(overview).toContainText("Balance");
    });

    test('should do customer lookup', async ({ page }) => {

      let lookUpAccount = page.locator("#loginPanel a").filter({hasText: "Forgot login info?"});
      await expect(lookUpAccount).toBeVisible();

      lookUpAccount.click();

      expect(page).toHaveURL('/parabank/lookup.htm');

      let customerLookup = page.locator('#rightPanel');
      expect(customerLookup).toBeVisible();

      for(const data of accountParams) {
        await forms.fillField(customerLookup, data.name, data.value);
      };

      forms.submit(customerLookup);

      let title = page.locator('.title');
      await expect(title).toBeVisible();
      await expect(title).toContainText("Error!");
    });
});

