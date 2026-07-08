import { test, expect } from '@playwright/test';
import { loginData, userId } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Payment tests', () => {
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
  });

  test('simple payment', async ({ page }) => {
    //Arrange
    const odbiorca = 'Katarzyna Super';
    const accountNumber = '12 3456 7890 0000 0000 0000 00000';
    const amount = '222';
    //Act
    await page.getByRole('link', { name: 'płatności' }).click();
    await page.getByTestId('transfer_receiver').fill(odbiorca);
    await page.getByTestId('form_account_to').fill(accountNumber);
    await page.getByTestId('form_amount').fill(amount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();

    //Assert
    await expect(
      page.getByRole('link', {
        name: `Przelew wykonany! ${amount},00PLN dla ${odbiorca}`,
      }),
    );
  });
});
