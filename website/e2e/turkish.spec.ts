import { expect, test } from '@playwright/test';

test.describe('Turkish reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'tr-tr/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'tr-TR');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: "TypeScript'e Başlarken",
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code, TypeScript dili için mükemmel destek sunar ancak TypeScript derleyicisini içermez.',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('tr-tr/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('Yazar Hakkında');
    await expect(page.locator('body')).toContainText(
      '/tr-tr/book/about-the-author/index.md',
    );
  });
});
