import { test, expect } from '@playwright/test';
import { loginData, userId } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test('successful login with correct credentials', async ({ page }) => {
  //Arrange

  const userId = loginData.userId;
  const password = loginData.password;
  const correctText = 'Jan Demobankowy';

  //Act
  await page.goto('/');

  const loginPage = new LoginPage(page);
  await loginPage.loginInput.fill(userId);
  await loginPage.passwordInput.fill(password);
  await loginPage.loginButton.click();

  //Assert
  await expect(page.getByTestId('user-name')).toHaveText(correctText);
});


