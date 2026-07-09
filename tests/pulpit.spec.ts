import { test, expect } from '@playwright/test';
import { loginData, userId } from '../test-data/login.data';
import { pulpitData } from '../test-data/pulpit.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  test.describe.configure({ retries: 3 });
  test.beforeEach(async ({ page }) => {
    const url = 'https://demo-bank.vercel.app/';
    const userId = loginData.userId;
    const password = loginData.password;

    await page.goto(url);

    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();

    await page.waitForLoadState('domcontentloaded');
  });

  test.only('quick payment with correct data', async ({ page }) => {
    //Arrage
    const price = pulpitData.price;
    const title = pulpitData.tittle;
    const chooseList = pulpitData.chooseList;
    const message = pulpitData.expectedMessage;

    //Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.ListValue.selectOption(chooseList);
    await pulpitPage.priceValue.fill(price);
    await pulpitPage.tittleValue.fill(title);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(message);
  });

  test('successful mobile top-up', async ({ page }) => {
    const phoneNumber = '503 xxx xxx';
    const price = '456';

    await page.locator('#widget_1_topup_receiver').selectOption(phoneNumber);
    await page.locator('#widget_1_topup_amount').fill(price);
    await page.locator('#uniform-widget_1_topup_agreement > span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();
    await expect(page.locator('#show_messages')).toHaveText(
      `Doładowanie wykonane! ${price},00PLN na numer ${phoneNumber}`,
    );
  });

  test('correct after successful mobile top-up', async ({ page }) => {
    const phoneNumber = '503 xxx xxx';
    const price = '456';

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
