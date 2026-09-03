import { expect, test } from '@playwright/test';

test.describe('Arabic reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'ar/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'بدء استخدام TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'يوفّر Visual Studio Code دعمًا ممتازًا للغة TypeScript، لكنه لا يتضمن مصرّف TypeScript.',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('ar/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('عن المؤلف');
    await expect(page.locator('body')).toContainText(
      '/ar/book/about-the-author/index.md',
    );
  });
});
