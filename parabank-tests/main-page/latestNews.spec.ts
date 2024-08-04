import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  
test.describe('Latest news', () => {

    test('should be presented on main page', async ({ page }) => {

        let newsSection = page.locator("#rightPanel");
        await expect(newsSection).toBeVisible();
        await expect(newsSection).toContainText("Latest News");

        let news = newsSection.locator('.events li a');
        await expect(news).toHaveCount(3);

        await expect(newsSection).toContainText("Read More");
    });

    test('should redirect correctly', async ({ page }) => {

        let newsSection = page.locator("#rightPanel");
        await expect(newsSection).toBeVisible();
        await expect(newsSection).toContainText("Latest News");

        newsSection.locator('.more a').nth(1).click();

        await expect(page).toHaveURL('parabank/news.htm');
        await expect(newsSection).toContainText('ParaBank News');
    });


});

