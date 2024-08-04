import { test, expect, type Page } from '@playwright/test';
import { generate } from '../support/generate';
import { forms } from '../support/forms';


let username = generate.generateString();

let registerParams =  [
  { name: 'customer.firstName', value: process.env.FIRST_NAME! },
  { name: 'customer.lastName', value: process.env.LAST_NAME! },
  { name: 'customer.address.street', value: process.env.ADDRESS! },
  { name: 'customer.address.city', value: process.env.CITY!},
  { name: 'customer.address.state', value: process.env.STATE! },
  { name: 'customer.address.zipCode', value: process.env.ZIPCODE! },
  { name: 'customer.phoneNumber', value: process.env.PHONE! },
  { name: 'customer.ssn', value: process.env.SSN! },
  { name: 'customer.username', value: username },
  { name: 'customer.password', value: process.env.PASSWORD! },
  { name: 'repeatedPassword', value: process.env.PASSWORD! }
]


test.beforeEach(async ({ page }) => {
      await page.goto('/parabank/register.htm');
  });


test.describe('Register', () => {

    test('should register correctly', async ({ page }) => {

        let registerPanel = page.locator("#customerForm");
        await expect(registerPanel).toBeVisible();

        for (const data of registerParams) {
          await forms.fillField(registerPanel, data.name, data.value);
        };

        forms.submit(registerPanel);

        let title = page.locator('.title');
        await expect(title).toBeVisible();
        await expect(title).toContainText(`Welcome ${username}`)
    });

    test('should show error', async ({ page }) => {

        let registerPanel = page.locator("#customerForm");
        await expect(registerPanel).toBeVisible();

        forms.submit(registerPanel);

        await expect(registerPanel).toContainText("is required");
  });
});

