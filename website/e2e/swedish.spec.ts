import { expect, test } from '@playwright/test';

test.describe('Swedish reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'sv-se/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'sv-SE');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Komma igång med TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code erbjuder utmärkt stöd för TypeScript-språket',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('sv-se/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('Om författaren');
    await expect(page.locator('body')).toContainText(
      '/sv-se/book/about-the-author/index.md',
    );
  });
});
