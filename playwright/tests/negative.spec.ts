import { test, expect } from '@playwright/test';

test('Test to verify the message in Front end when the backend service is down', async ({ page }) => {
  await page.goto('http://localhost:8080');
  console.log(await page.innerText('h1'));


 await expect(page.getByRole('heading', { name: 'Hello, World!' })).toBeTruthy();

 expect(await page.innerText('h1')).toBe('Hello, World!');

});