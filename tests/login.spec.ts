import { test, expect } from '@playwright/test';
import { loginData, userId } from '../test-data/login.data';

test('successful login with correct credentials', async ({ page }) => {
  //Arrange

  const userId = loginData.userId;
  const password = loginData.password;
  const correctText = 'Jan Demobankowy';

  //Act
  await page.goto('/');
  await page.getByTestId('login-input').fill(userId);
  await page.getByTestId('password-input').fill(password);
  await page.getByTestId('login-button').click();

  //Assert
  await expect(page.getByTestId('user-name')).toHaveText(correctText);
});
