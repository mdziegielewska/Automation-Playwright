import { Locator, Page } from "@playwright/test";

class Forms {
    async fillField(loc: Locator, fieldName: string, value: any) {
        let element = loc.locator(`input[name="${fieldName}"]`);

        await element.fill(value);
    }

    async submit(loc: Locator){
        await loc.locator('input[class="button"]').click();
    }

    async login(page: Page) {
        let logInParams = [
            { name: 'username', value: process.env.USERNAME! },
            { name: 'password', value: process.env.PASSWORD! }
          ]
        
        let loginPanel = page.locator("#loginPanel");

        for(const data of logInParams) {
            await forms.fillField(loginPanel, data.name, data.value);
        };

        forms.submit(loginPanel);
    }
}

export const forms = new Forms();