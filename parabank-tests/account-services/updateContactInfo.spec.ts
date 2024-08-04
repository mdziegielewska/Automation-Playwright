import { test, expect, type Page } from '@playwright/test';
import { forms } from '../support/forms';


let accountParams =  [
    { name: 'customer.firstName', value: process.env.FIRST_NAME! },
    { name: 'customer.lastName', value: process.env.LAST_NAME! },
    { name: 'customer.address.street', value: process.env.ADDRESS! },
    { name: 'customer.address.city', value: process.env.CITY!},
    { name: 'customer.address.state', value: process.env.STATE! },
    { name: 'customer.address.zipCode', value: process.env.ZIPCODE! },
    { name: 'customer.phoneNumber', value: process.env.PHONE! }
  ]

  
test.beforeEach(async ({ page }) => {
    await page.goto('/');
    forms.login(page);
  });
  

test.describe('Update contact info', () => {

    test('should update profile info', async ({ page }) => {
        let leftPanel = page.locator('#leftPanel li a');
    
        await leftPanel.filter({hasText: 'Update Contact Info'}).click();
            
        expect(page).toHaveURL('/parabank/updateprofile.htm');
    
        let updatePanel = page.locator("#updateProfileForm");
        await expect(updatePanel).toBeVisible();

        for (const data of accountParams) {
            await forms.fillField(updatePanel, data.name, data.value);
        };
        
        await forms.submit(updatePanel);
    
        let result = page.locator("#updateProfileResult");
        await expect(result).toBeVisible();
        await expect(result).toContainText("Profile Updated");

    });
});

