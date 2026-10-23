import { expect, test } from '@playwright/test';
import { locales } from '../src/config/locales';

test.beforeEach(async ({ page }) => {
  // Keep local verification from sending production analytics or ad requests.
  await page.route(/^https:\/\//, (route) => route.abort());
});

test('switching language from a missing URL opens an existing homepage', async ({ page, request }) => {
  // GitHub Pages serves the same static 404 document at any missing URL.
  const errorPage = await request.get('404.html');
  expect(errorPage.ok()).toBe(true);
  const errorPageBody = await errorPage.body();
  await page.route('**/typescript-book/cs-cz/book/does-not-exist/', (route) =>
    route.fulfill({ status: 404, contentType: 'text/html', body: errorPageBody }),
  );
  await page.goto('cs-cz/book/does-not-exist/');
  await expect(page).toHaveTitle('404 | TypeScript Book');

  const languageSelect = page.locator('error-page-language-select select').first();
  const destinations = await languageSelect.locator('option').evaluateAll((options) =>
    options.map((option) => (option as HTMLOptionElement).value),
  );
  expect(destinations).toEqual(Object.keys(locales).map((locale) =>
    `/typescript-book/${locale === 'root' ? '' : `${locale}/`}`,
  ));
  for (const destination of destinations) {
    expect((await request.get(destination)).ok(), destination).toBe(true);
  }

  await languageSelect.selectOption('/typescript-book/cs-cz/');
  await expect(page).toHaveURL(/\/typescript-book\/cs-cz\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'cs-CZ');
  await expect(page).not.toHaveTitle('404 | TypeScript Book');
});

for (const path of [
  'book/about-the-author/',
  'typescript-news/2026/typescript-7-released/',
]) {
  test(`switching language preserves the route on ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.locator('starlight-lang-select select').first().selectOption(
      `/typescript-book/cs-cz/${path}`,
    );
    await expect(page).toHaveURL(`/typescript-book/cs-cz/${path}`);
    await expect(page.locator('html')).toHaveAttribute('lang', 'cs-CZ');
    await expect(page).not.toHaveTitle('404 | TypeScript Book');
  });
}
