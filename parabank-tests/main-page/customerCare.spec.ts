import { test, expect } from '@playwright/test';
import { forms } from '../support/forms';
import { generate } from '../support/generate';


let message = generate.generateString();

let formParams = [
  { name: 'name', value: process.env.FIRST_NAME! },
  { name: 'email', value: process.env.EMAIL! },
  { name: 'phone', value: process.env.PHONE! }
]


test.beforeEach(async ({ page }) => {
    await page.goto('/parabank/contact.htm');
  });


test.describe('Customer Care', () => {

    test('should send message', async ({ page }) => {

        let pageTitle = page.locator('.title');
        await expect(pageTitle).toBeVisible();
        await expect(pageTitle).toContainText("Customer Care");

        let contactForm = page.locator("#contactForm");
        await expect(contactForm).toBeVisible();

        for(const data of formParams) {
            await forms.fillField(contactForm, data.name, data.value);
        };

        let messageInput = page.locator("#message");
        await messageInput.fill(message);

        forms.submit(contactForm);

        let overview = page.locator("#rightPanel");
        await expect(overview).toBeVisible();
        await expect(overview).toContainText(`Thank you ${process.env.FIRST_NAME!}`);
    });

    test('should show error', async ({ page }) => {

        let pageTitle = page.locator('.title');
        await expect(pageTitle).toBeVisible();
        await expect(pageTitle).toContainText("Customer Care");

        let contactForm = page.locator("#contactForm");
        await expect(contactForm).toBeVisible();

        forms.submit(contactForm);

        await expect(contactForm).toContainText("is required");
    });
});

