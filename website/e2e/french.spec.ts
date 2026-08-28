import { expect, test } from '@playwright/test';

test.describe('French reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'fr-fr/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr-FR');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Bien démarrer avec TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code offre une excellente prise en charge du langage TypeScript',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('fr-fr/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText("À propos de l'auteur");
    await expect(page.locator('body')).toContainText(
      '/fr-fr/book/about-the-author/index.md',
    );
  });
});
