# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pulpit.spec.ts >> Pulpit tests >> quick payment with correct data
- Location: tests\pulpit.spec.ts:4:8

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('#show_messages')
Expected: "fffPrzelew wykonany! Chuck Demobankowy - 150,00PLN - pizza"
Received: "Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('#show_messages')
    14 × locator resolved to <span class="highlight" id="show_messages" data-testid="message-text">Przelew wykonany! Chuck Demobankowy - 150,00PLN -…</span>
       - unexpected value "Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza"

```

```yaml
- text: Przelew wykonany! Chuck Demobankowy - 150,00PLN - pizza
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | test.describe('Pulpit tests', () => {
  3  |   test.describe.configure({ retries: 3 });
  4  |   test.only('quick payment with correct data', async ({ page }) => {
  5  |     //Arrage
  6  |     const url = 'https://demo-bank.vercel.app/';
  7  |     const userId = 'testerLO';
  8  |     const password = 'password';
  9  |     const chooseList = '2';
  10 |     const price = '150';
  11 |     const tittle = 'pizza';
  12 | 
  13 |     //Act
  14 |     await page.goto(url);
  15 |     await page.getByTestId('login-input').fill(userId);
  16 |     await page.getByTestId('password-input').fill(password);
  17 |     await page.getByTestId('login-button').click();
  18 |     await page.waitForLoadState('domcontentloaded');
  19 | 
  20 |     await page.waitForLoadState('domcontentloaded');
  21 |     await page.locator('#widget_1_transfer_receiver').selectOption(chooseList);
  22 |     await page.locator('#widget_1_transfer_amount').fill(price);
  23 |     await page.locator('#widget_1_transfer_title').fill(tittle);
  24 | 
  25 |     await page.getByRole('button', { name: 'wykonaj' }).click();
  26 |     await page.getByTestId('close-button').click();
  27 | 
  28 |     //Assert
> 29 |     await expect(page.locator('#show_messages')).toHaveText(
     |                                                  ^ Error: expect(locator).toHaveText(expected) failed
  30 |       `fffPrzelew wykonany! Chuck Demobankowy - ${price},00PLN - ${tittle}`,
  31 |     );
  32 |   });
  33 | 
  34 |   test('successful mobile top-up', async ({ page }) => {
  35 |     const login = 'test2345';
  36 |     const password = 'rtgerger';
  37 |     const phoneNumber = '503 xxx xxx';
  38 |     const price = '456';
  39 | 
  40 |     await page.goto('https://demo-bank.vercel.app/');
  41 |     await page.getByTestId('login-input').fill(login);
  42 |     await page.getByTestId('password-input').fill(password);
  43 |     await page.getByTestId('login-button').click();
  44 |     await page.locator('#widget_1_topup_receiver').selectOption(phoneNumber);
  45 |     await page.locator('#widget_1_topup_amount').fill(price);
  46 |     await page.locator('#uniform-widget_1_topup_agreement > span').click();
  47 |     await page.getByRole('button', { name: 'doładuj telefon' }).click();
  48 |     await page.getByTestId('close-button').click();
  49 |     await expect(page.locator('#show_messages')).toHaveText(
  50 |       `Doładowanie wykonane! ${price},00PLN na numer ${phoneNumber}`,
  51 |     );
  52 |   });
  53 | });
  54 | 
```