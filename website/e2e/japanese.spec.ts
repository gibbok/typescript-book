import { expect, test } from '@playwright/test';

test.describe('Japanese reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'ja-jp/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja-JP');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'TypeScript を始める',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code は TypeScript 言語を十分にサポートしています',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('ja-jp/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('著者について');
    await expect(page.locator('body')).toContainText(
      '/ja-jp/book/about-the-author/index.md',
    );
  });
});
