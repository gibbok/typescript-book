import { expect, test } from '@playwright/test';

test.describe('Czech reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'cs-cz/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'cs-CZ');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Začínáme s TypeScriptem',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code poskytuje výbornou podporu jazyka TypeScript, ale neobsahuje jeho kompilátor.',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('cs-cz/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('O autorovi');
    await expect(page.locator('body')).toContainText(
      '/cs-cz/book/about-the-author/index.md',
    );
  });
});
