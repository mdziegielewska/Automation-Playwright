import { test, expect } from '@playwright/test';
import { forms } from '../support/forms';


test.beforeEach(async ({ page }) => {
    await page.goto('/');
    forms.login(page);
  });


test.describe('Request loan', () => {

    test('should request loan', async ({ page }) => {

        let leftPanel = page.locator('#leftPanel li a');
        await leftPanel.filter({hasText: 'Request Loan'}).click();
            
        expect(page).toHaveURL('/parabank/requestloan.htm');
    
        let open = page.locator("#requestLoanForm");
        await expect(open).toBeVisible();
    
        let amount = open.locator('#amount');
        await expect(amount).toBeVisible();
        await amount.fill('10');

        let payment = open.locator('#downPayment');
        await expect(payment).toBeVisible();
        await payment.fill('220');
            
        let from_acc = open.locator('#fromAccountId');
        await expect(from_acc).toBeVisible();
        
        let option = await from_acc.locator('option').nth(1).textContent();
        await from_acc.selectOption(option);
    
        await forms.submit(open);
    
        let result = page.locator("#requestLoanResult");
        await expect(result).toBeVisible();
        await expect(result).toContainText("Loan Request Processed");
    });
});

