import { expect, test } from '@playwright/test';

test.describe('Korean reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'ko-kr/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ko-KR');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'TypeScript 시작하기',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code는 TypeScript 언어를 훌륭하게 지원하지만',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('ko-kr/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('저자 소개');
    await expect(page.locator('body')).toContainText(
      '/ko-kr/book/about-the-author/index.md',
    );
  });
});
