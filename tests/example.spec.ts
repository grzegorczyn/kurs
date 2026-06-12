import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo-bank.vercel.app/');
  await page.getByTestId('login-input').click();
  await page.getByTestId('login-input').fill('nataliag');
  await page.getByTestId('login-input').click();
  await page.locator('div').filter({ hasText: 'zaloguj się' }).nth(5).click();
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('haslo123');
  await page.getByTestId('login-button').click();
});