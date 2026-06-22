import { test, expect } from '@playwright/test';
test.describe('Pulpit tests', () => {
  test.describe.configure({ retries: 3 });
  test.only('quick payment with correct data', async ({ page }) => {
    //Arrage
    const url = 'https://demo-bank.vercel.app/';
    const userId = 'testerLO';
    const password = 'password';
    const chooseList = '2';
    const price = '150';
    const tittle = 'pizza';

    //Act
    await page.goto(url);
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();
    await page.waitForLoadState('domcontentloaded');

    await page.waitForLoadState('domcontentloaded');
    await page.locator('#widget_1_transfer_receiver').selectOption(chooseList);
    await page.locator('#widget_1_transfer_amount').fill(price);
    await page.locator('#widget_1_transfer_title').fill(tittle);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `fffPrzelew wykonany! Chuck Demobankowy - ${price},00PLN - ${tittle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    const login = 'test2345';
    const password = 'rtgerger';
    const phoneNumber = '503 xxx xxx';
    const price = '456';

    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill(login);
    await page.getByTestId('password-input').fill(password);
    await page.getByTestId('login-button').click();
    await page.locator('#widget_1_topup_receiver').selectOption(phoneNumber);
    await page.locator('#widget_1_topup_amount').fill(price);
    await page.locator('#uniform-widget_1_topup_agreement > span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    await expect(page.locator('#show_messages')).toHaveText(
      `Doładowanie wykonane! ${price},00PLN na numer ${phoneNumber}`,
    );
  });
});
