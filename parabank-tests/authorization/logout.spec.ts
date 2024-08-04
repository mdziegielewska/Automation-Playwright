import { test, expect } from '@playwright/test';
import { forms } from '../support/forms';


test.beforeEach(async ({ page }) => {
    await page.goto('/');
    forms.login(page);
  });


test.describe('Log out', () => {

    test('should log out correctly', async ({ page }) => {
        let leftPanel = page.locator('#leftPanel li a');
        await leftPanel.filter({hasText: 'Log Out'}).click();
            
        expect(page).toHaveURL('/parabank/index.htm?ConnType=JDBC');

        let loginPanel = page.locator("#loginPanel");
        await expect(loginPanel).toBeVisible();
    });
});

