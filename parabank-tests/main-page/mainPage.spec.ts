import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });


test.describe('Main page', () => {
    test('should contain sections', async ({ page }) => {

        let mainPanel = page.locator('#mainPanel');
        await expect(mainPanel).toBeVisible();
        await expect(mainPanel.locator('#topPanel a img').nth(1)).toHaveAttribute('alt', 'ParaBank');

        let headerPanel = mainPanel.locator('#headerPanel');
        await expect(headerPanel).toBeVisible();

        await expect(headerPanel.locator('ul').nth(0)).toHaveClass('leftmenu');
        await expect(headerPanel.locator('ul').nth(1)).toHaveClass('button');
    
        let bodyPanel = mainPanel.locator('#bodyPanel');
        await expect(bodyPanel).toBeVisible();
        await expect(bodyPanel.nth(0)).toContainText("Customer Login");
        
        await expect(bodyPanel.locator('#rightPanel ul')).toHaveCount(3);    
        await expect(bodyPanel.locator('#rightPanel ul').first()).toHaveClass('services');    
        await expect(bodyPanel.locator('#rightPanel ul').nth(2)).toHaveClass('events');  
    });
});

