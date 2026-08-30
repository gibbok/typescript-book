import { expect, test } from '@playwright/test';

test.describe('German reader', () => {
  test('renders the localized book page', async ({ page }) => {
    const response = await page.goto(
      'de-de/book/getting-started-with-typescript/',
    );

    expect(response?.ok()).toBe(true);
    await expect(page.locator('html')).toHaveAttribute('lang', 'de-DE');
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Erste Schritte mit TypeScript',
      }),
    ).toBeVisible();

    await expect(page.locator('main[data-pagefind-body]')).toContainText(
      'Visual Studio Code bietet eine ausgezeichnete Unterstützung für die TypeScript-Sprache, enthält jedoch nicht den TypeScript-Compiler.',
    );
  });

  test('exposes the localized documentation index', async ({ page }) => {
    const response = await page.goto('de-de/llms.txt');

    expect(response?.ok()).toBe(true);
    await expect(page.locator('body')).toContainText('Über den Autor');
    await expect(page.locator('body')).toContainText(
      '/de-de/book/about-the-author/index.md',
    );
  });
});
