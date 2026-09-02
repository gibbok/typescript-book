import { expect, test } from '@playwright/test';

test.describe('Russian reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'ru-ru/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru-RU');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Начало работы с TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code предоставляет отличную поддержку языка TypeScript, но не включает компилятор TypeScript.',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('ru-ru/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('Об авторе');
    await expect(page.locator('body')).toContainText(
      '/ru-ru/book/about-the-author/index.md',
    );
  });
});
