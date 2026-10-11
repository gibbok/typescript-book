import { expect, test } from '@playwright/test';

const translations = [
  {
    locale: 'pt-BR',
    path: 'pt-br',
    edition: 'pt',
    cover: 'pt_BR',
    title: 'React e padrões do mundo real para TypeScript 7',
    kindle: 'https://www.amazon.com.br/dp/B0HM6RT27Y',
    paperback: 'https://www.amazon.com/dp/B0HMG1CNPX',
    kindleStore: 'Amazon.com.br',
    paperbackStore: 'Amazon.com',
  },
  {
    locale: 'es-ES',
    path: 'es-es',
    edition: 'es',
    cover: 'es_ES',
    title: 'React y patrones del mundo real para TypeScript 7',
    kindle: 'https://www.amazon.es/dp/B0HM6ZNYBP',
    paperback: 'https://www.amazon.es/dp/B0HMFP27WJ',
    kindleStore: 'Amazon.es',
    paperbackStore: 'Amazon.es',
  },
];

for (const translation of translations) {
  test.describe(`${translation.locale} Plus Edition`, () => {
    test.use({ locale: translation.locale });

    test('shows the localized cover and detects the translated edition', async ({ page }) => {
      await page.goto(`${translation.path}/plus-edition/`);
      await expect(page.locator('.plus-landing h1')).toContainText(translation.title);
      await expect(page.locator('[data-edition-select]')).toHaveValue(translation.edition);
      const cover = page.locator('.plus-landing__cover img');
      await expect(cover).toHaveAttribute(
        'src', `/typescript-book/images/plus-edition-cover_${translation.cover}.webp`,
      );
      await expect(cover).toHaveJSProperty('naturalWidth', 640);
      await expect(cover).toHaveJSProperty('naturalHeight', 1024);
      await expect(page.locator('[data-format-link="kindle"]')).toHaveAttribute('href', translation.kindle);
      await expect(page.locator('[data-format-link="paperback"]')).toHaveAttribute('href', translation.paperback);
      await expect(page.locator('[data-format-link="kindle"] [data-store-name]')).toHaveText(translation.kindleStore);
      await expect(page.locator('[data-format-link="paperback"] [data-store-name]')).toHaveText(translation.paperbackStore);
    });

    test('renders translated purchase links without JavaScript', async ({ browser }) => {
      const context = await browser.newContext({ javaScriptEnabled: false });
      const page = await context.newPage();
      try {
        await page.goto(`http://127.0.0.1:4321/typescript-book/${translation.path}/plus-edition/`);
        await expect(page.locator('[data-edition-select]')).toHaveValue(translation.edition);
        await expect(page.locator('[data-format-link="kindle"]')).toHaveAttribute('href', translation.kindle);
        await expect(page.locator('[data-format-link="paperback"]')).toHaveAttribute('href', translation.paperback);
      } finally {
        await context.close();
      }
    });
  });
}

test('switches all editions while preserving each format’s Amazon store', async ({ page }) => {
  await page.goto('plus-edition/');
  const select = page.locator('[data-edition-select]');
  await expect(select.locator('option')).toHaveCount(4);
  for (const translation of translations) {
    await select.selectOption(translation.edition);
    await expect(page.locator('[data-edition-title]')).toContainText(translation.title);
    await expect(page.locator('[data-format-link="kindle"]')).toHaveAttribute('href', translation.kindle);
    await expect(page.locator('[data-format-link="paperback"]')).toHaveAttribute('href', translation.paperback);
    await expect(page.locator('[data-format-link="kindle"] [data-store-name]')).toHaveText(translation.kindleStore);
    await expect(page.locator('[data-format-link="paperback"] [data-store-name]')).toHaveText(translation.paperbackStore);
  }
  await select.selectOption('it');
  await expect(page.locator('[data-format-link="kindle"]')).toHaveAttribute('href', 'https://www.amazon.com/dp/B0H95PLXHX');
  await expect(page.locator('[data-format-link="paperback"]')).toHaveAttribute('href', 'https://www.amazon.com/dp/B0H96R5HZD');
  await select.selectOption('en');
  await expect(page.locator('[data-format-link="kindle"]')).toHaveAttribute('href', 'https://www.amazon.com/dp/B0H8RSXC57');
  await expect(page.locator('[data-format-link="paperback"]')).toHaveAttribute('href', 'https://www.amazon.com/dp/B0H8TTP49G');
});
