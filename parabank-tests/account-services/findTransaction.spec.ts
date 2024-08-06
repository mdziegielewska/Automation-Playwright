import { test, expect } from '@playwright/test';
import { forms } from '../support/forms';

let transactionParams = [ 
    { name: 'Id', locator: '#transactionId', value: '1234' },
    { name: 'Date', locator: '#transactionDate', value: '12-10-2000' },
    { name: 'Amount', locator: '#amount', value: '10' }
];

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    forms.login(page);
  });


test.describe('Find transaction', () => {

    transactionParams.forEach(({name, locator, value}) => {
        test(`should find transaction by ${name}`, async ({ page }) => {

            let leftPanel = page.locator('#leftPanel li a');
            await leftPanel.filter({hasText: 'Find Transaction'}).click();
                
            expect(page).toHaveURL('/parabank/findtrans.htm');

            let transactionPanel = page.locator("#transactionForm");
            await expect(transactionPanel).toBeVisible();
        
            let acc = transactionPanel.locator('#accountId');
            await expect(acc).toBeVisible();
            await acc.selectOption(process.env.TEST_ACC_NUMBER!);

            let finder = page.locator(locator);
            await expect(finder).toBeVisible();
            await finder.fill(value);

            let button = transactionPanel.locator(`button[id="findBy${name}"]`);
            await button.click();
        
            let result = page.locator("#resultContainer");
            await expect(result).toBeVisible();
            await expect(result).toContainText("Transaction Results");
        });
    });
});

