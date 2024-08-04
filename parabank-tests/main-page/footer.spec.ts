import { test, expect } from '@playwright/test';


let footerList = [
    { name: 'Home', url: '/parabank/index.htm' },
    { name: 'About Us', url: '/parabank/about.htm' },
    { name: 'Services', url: '/parabank/services.htm' },
    { name: 'Products', url: 'https://www.parasoft.com/products/' },
    { name: 'Locations', url: 'https://www.parasoft.com/solutions/' },
    { name: 'Forum', url: 'https://forums.parasoft.com/' },
    { name: 'Site Map', url: '/parabank/sitemap.htm' },
    { name: 'Contact Us', url: '/parabank/contact.htm' }
]


test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });


test.describe('Footer', () => {

    test('should contain elements', async ({page}) => {

        let footer = page.locator("#footermainPanel");
        
        let footerList = footer.locator("ul").first().locator('li');
        await expect(footerList).toHaveCount(8);

        let copyright = footer.locator('p[class="copyright"]');
        await expect(copyright).toBeVisible();
        await expect(copyright).toContainText('All rights reserved');

        let visitUs = footer.locator("ul").nth(1);
        await expect(copyright).toBeVisible();
        await expect(visitUs).toHaveClass('visit');
    });

    footerList.forEach(({ name, url }) => {
        test(`should redirect correctly to ${name}`, async ({ page }) => {

            let footer = page.locator("#footerPanel ul li");

            await footer.filter({hasText: `${name}`}).click();
            await expect(page).toHaveURL(url);
        });
    });
});
