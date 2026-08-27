import { expect, test } from '@playwright/test';

test.describe('English reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Getting Started With TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code provides excellent support for the TypeScript language',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('About the Author');
    await expect(page.locator('body')).toContainText(
      '/book/about-the-author/index.md',
    );
  });
});
