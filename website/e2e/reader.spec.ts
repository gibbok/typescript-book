import { expect, test } from '@playwright/test';

const gettingStartedPath = 'book/getting-started-with-typescript/';

test.describe('core reader journeys', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(gettingStartedPath);
  });

  test('renders readable book content', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Getting Started With TypeScript',
      }),
    ).toBeVisible();

    const article = page.locator('main[data-pagefind-body]');
    await expect(article).toContainText(
      'Visual Studio Code provides excellent support for the TypeScript language',
    );
  });

  test('uses the right-side page navigation', async ({ page }) => {
    const pageNavigation = page
      .locator('starlight-toc')
      .getByRole('navigation', { name: 'On this page' });

    await expect(pageNavigation).toBeVisible();
    await pageNavigation
      .getByRole('link', { name: 'Configuration', exact: true })
      .click();

    await expect(page).toHaveURL(/#configuration$/);
    await expect(
      page.getByRole('heading', { name: 'Configuration', exact: true }),
    ).toBeInViewport();
  });

  test('finds and opens book content with search', async ({ page }) => {
    const searchButton = page.getByRole('button', { name: 'Search' });
    await expect(searchButton).toBeEnabled();
    await searchButton.click();

    const search = page.locator('#starlight__search input');
    await expect(search).toBeVisible();
    await search.fill('Discriminated Unions');

    const result = page
      .locator('#starlight__search')
      .getByRole('link')
      .filter({ hasText: 'Discriminated Unions' })
      .first();

    await expect(result).toBeVisible();
    await result.click();
    await expect(
      page.getByRole('heading', { level: 1, name: 'Discriminated Unions' }),
    ).toBeVisible();
  });
});
