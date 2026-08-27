import { expect, test } from '@playwright/test';

test.describe('Chinese reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'zh-cn/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'TypeScript 入门',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code 为 TypeScript 语言提供了出色的支持',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('zh-cn/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('关于作者');
    await expect(page.locator('body')).toContainText(
      '/zh-cn/book/about-the-author/index.md',
    );
  });
});
