import { expect, test } from '@playwright/test';

test.describe('Indonesian reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'id-id/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'id-ID');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Memulai dengan TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code menyediakan dukungan yang sangat baik untuk bahasa TypeScript',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('id-id/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('Tentang Penulis');
    await expect(page.locator('body')).toContainText(
      '/id-id/book/about-the-author/index.md',
    );
  });
});
