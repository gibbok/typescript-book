import { expect, test } from '@playwright/test';

test.describe('Italian reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'it-it/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'it-IT');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Per iniziare con TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code offre un eccellente supporto per il linguaggio TypeScript',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('it-it/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText(
      "Informazioni sull'autore",
    );
    await expect(page.locator('body')).toContainText(
      '/it-it/book/about-the-author/index.md',
    );
  });
});
