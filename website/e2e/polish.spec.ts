import { expect, test } from '@playwright/test';

test.describe('Polish reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'pl-pl/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pl-PL');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Pierwsze kroki z TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code oferuje doskonałą obsługę języka TypeScript, ale nie zawiera kompilatora TypeScript.',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('pl-pl/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('O autorze');
    await expect(page.locator('body')).toContainText(
      '/pl-pl/book/about-the-author/index.md',
    );
  });
});
