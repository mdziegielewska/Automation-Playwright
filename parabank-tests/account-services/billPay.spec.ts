import { test, expect } from '@playwright/test';
import { forms } from '../support/forms';


let billData =  [
    { name: 'payee.name', value: process.env.FIRST_NAME! },
    { name: 'payee.address.street', value: process.env.ADDRESS! },
    { name: 'payee.address.city', value: process.env.CITY!},
    { name: 'payee.address.state', value: process.env.STATE! },
    { name: 'payee.address.zipCode', value: process.env.ZIPCODE! },
    { name: 'payee.phoneNumber', value: process.env.PHONE! },
    { name: 'payee.accountNumber', value: process.env.ACCOUNT! },
    { name: 'verifyAccount', value: process.env.ACCOUNT! },
    { name: 'amount', value: '100' }
  ]


test.beforeEach(async ({ page }) => {
    await page.goto('/');
    forms.login(page);
  });


test.describe('Bill Payment Service', () => {

    test('send payment', async ({ page }) => {
      
        let leftPanel = page.locator('#leftPanel li a');
        await leftPanel.filter({hasText: 'Bill Pay'}).click();
        
        expect(page).toHaveURL('/parabank/billpay.htm');

        let payForm = page.locator("#billpayForm");
        await expect(payForm).toBeVisible();

        for(const data of billData) {
            await forms.fillField(payForm, data.name, data.value);
        };

        forms.submit(payForm);

        let result = page.locator("#billpayResult");
        await expect(result).toBeVisible();
        await expect(result).toContainText("Bill Payment Complete");
    });
});

