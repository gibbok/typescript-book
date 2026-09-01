import { expect, test } from '@playwright/test';

test.describe('Thai reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'th-th/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'th-TH');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'เริ่มต้นใช้งาน TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code รองรับภาษา TypeScript ได้อย่างยอดเยี่ยม แต่ไม่ได้รวมคอมไพเลอร์ TypeScript มาด้วย',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('th-th/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('เกี่ยวกับผู้เขียน');
    await expect(page.locator('body')).toContainText(
      '/th-th/book/about-the-author/index.md',
    );
  });
});
