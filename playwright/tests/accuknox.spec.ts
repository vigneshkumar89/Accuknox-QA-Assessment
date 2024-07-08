import { test, expect } from '@playwright/test';

test('Test to Verify Frontend and Backend Integration', async ({ page }) => {
  await page.goto('http://localhost:8080');

  //validating the message using getByRole attribute
 await expect(page.getByRole('heading', { name: 'Hello from the Backend!' })).toBeVisible();

 //validating the message using innerText attribute
 expect(await page.innerText('h1')).toBe('Hello from the Backend!');
});

test('API Testing to check the Backend service', async ({ request }) => {
  const response = await request.get("http://localhost:3000/greet");
  console.log(await response.json());
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  const respBody = await response.json();
  expect(respBody.message).toBe('Hello from the Backend!');
})

