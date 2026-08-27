import { expect, test } from '@playwright/test';

test.describe('Bulgarian reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'bg-bg/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'bg-BG');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Първи стъпки с TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code предоставя отлична поддръжка за езика TypeScript',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('bg-bg/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('За автора');
    await expect(page.locator('body')).toContainText(
      '/bg-bg/book/about-the-author/index.md',
    );
  });
});
