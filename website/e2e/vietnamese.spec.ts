import { expect, test } from '@playwright/test';

test.describe('Vietnamese reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'vi-vn/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi-VN');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Bắt đầu với TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code hỗ trợ rất tốt ngôn ngữ TypeScript nhưng không bao gồm trình biên dịch TypeScript.',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('vi-vn/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('Về tác giả');
    await expect(page.locator('body')).toContainText(
      '/vi-vn/book/about-the-author/index.md',
    );
  });
});
