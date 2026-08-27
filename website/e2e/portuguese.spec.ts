import { expect, test } from '@playwright/test';

test.describe('Portuguese reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'pt-br/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Começando com TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'O Visual Studio Code oferece excelente suporte para a linguagem TypeScript',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('pt-br/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('Sobre o Autor');
    await expect(page.locator('body')).toContainText(
      '/pt-br/book/about-the-author/index.md',
    );
  });
});
