import { test, expect } from '@playwright/test';

test('successful login with correct credentials', async ({ page }) => {
  //Arrange
  const userPassword = '10987654';
  const userId = 'testerLO';
  const correctText = 'Jan Demobankowy';

  //Act
  await page.goto('/');
  await page.getByTestId('login-input').fill(userId);
  await page.getByTestId('password-input').fill(userPassword);
  await page.getByTestId('login-button').click();

  //Assert
  await expect(page.getByTestId('user-name')).toHaveText(correctText);
});
