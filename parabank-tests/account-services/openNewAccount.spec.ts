import { test, expect } from '@playwright/test';
import { forms } from '../support/forms';

let testParams = [
    {type: 'CHECKING', fromAccount: '16785'},
    {type: 'SAVINGS', fromAccount: '16785'}
];

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    forms.login(page);
  });


test.describe('Open new account', () => {

    testParams.forEach(({type, fromAccount}) => {
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
            await acc.selectOption(fromAccount);
    
            await forms.submit(open);
    
            let result = page.locator("#openAccountResult");
            await expect(result).toBeVisible();
            await expect(result).toContainText("Account Opened!");
        });
    });
});
