import { test, expect } from '@playwright/test';


let menuList = [
    { name: 'About Us', url: '/parabank/about.htm' },
    { name: 'Services', url: '/parabank/services.htm' },
    { name: 'Products', url: 'https://www.parasoft.com/products/' },
    { name: 'Locations', url: 'https://www.parasoft.com/solutions/' },
    { name: 'Admin Page', url: '/parabank/admin.htm' }
]

let buttons = [
    { name: 'about', url: '/parabank/about.htm' },
    { name: 'home', url: '/parabank/index.htm' },
    { name: 'contact', url: '/parabank/contact.htm' },
]


test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });


test.describe('Navigation', () => {

    test.describe('Menu', () => {
        menuList.forEach(({ name, url }) => {

            test(`should redirect correctly to ${name}`, async ({ page }) => {
    
                let menuPanel = page.locator(".leftmenu li");
                await expect(menuPanel).toHaveCount(6);
    
                await menuPanel.filter({hasText: `${name}`}).click();
                await expect(page).toHaveURL(url);
            });
        })
    })

    test.describe('Buttons', () => {
        buttons.forEach(({name, url}) => {

            test(`should redirect correctly to ${name}`, async ({ page }) => {
                
                let mainMenuPanel = page.locator('#mainPanel #headerPanel ul').nth(1);
                await expect(mainMenuPanel).toBeVisible();
                await expect(mainMenuPanel).toHaveClass('button');
    
                let buttons = mainMenuPanel.locator('li'); 
                await expect(buttons).toHaveCount(3);
    
                await buttons.filter({hasText: `${name}`}).click();
                await expect(page).toHaveURL(url);
            });
        })
    })
});

