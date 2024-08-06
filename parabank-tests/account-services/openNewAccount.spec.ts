import { test, expect } from '@playwright/test';
import { forms } from '../support/forms';


let accountTypes = ['CHECKING', 'SAVINGS'];


test.beforeEach(async ({ page }) => {
    await page.goto('/');
    forms.login(page);
  });


test.describe('Open new account', () => {

    accountTypes.forEach((type) => {
        test(`should open new ${type} account`, async ({ page }) => {

            let leftPanel = page.locator('#leftPanel li a');
            await leftPanel.filter({hasText: 'Open New Account'}).click();
            
            expect(page).toHaveURL('/parabank/openaccount.htm');
    
            let open = page.locator("#openAccountForm");
            await expect(open).toBeVisible();
    
            let ty = open.locator('#type');
            await expect(ty).toBeVisible();
            await ty.selectOption(type);
            
            let acc = open.locator('#fromAccountId');
            await expect(acc).toBeVisible();
            await acc.selectOption(process.env.TEST_ACC_NUMBER!);
    
            await forms.submit(open);
    
            let result = page.locator("#openAccountResult");
            await expect(result).toBeVisible();
            await expect(result).toContainText("Account Opened!");
        });
    });
});

