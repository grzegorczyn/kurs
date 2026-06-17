import {test, expect} from "@playwright/test";


test("successful login with correct credentials", async ({ page }) => {
  const url = "https://demo-bank.vercel.app/";
  const userId = "testerLO";
  const userPassword = "10987654";
  await page.goto(url);
  await page.getByTestId("login-input").fill(userId);
  await page.getByTestId("password-input").fill(userPassword);
  await page.getByTestId("login-button").click();
  await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
});