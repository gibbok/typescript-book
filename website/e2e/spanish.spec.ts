import { expect, test } from '@playwright/test';

test.describe('Spanish reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'es-es/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'es-ES');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Primeros pasos con TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code ofrece una excelente compatibilidad con el lenguaje TypeScript',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('es-es/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('Sobre el autor');
    await expect(page.locator('body')).toContainText(
      '/es-es/book/about-the-author/index.md',
    );
  });
});
