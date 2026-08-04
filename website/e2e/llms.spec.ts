import { expect, test } from '@playwright/test';

test('exposes an llms.txt index for the documentation', async ({ page }) => {
  await page.goto('llms.txt');

  await expect(page.locator('body')).toContainText('# TypeScript Book');
  await expect(page.locator('body')).toContainText(
    '[Readonly Properties](https://gibbok.github.io/typescript-book/book/readonly-properties/index.md)',
  );
  await expect(page.locator('body')).toContainText(
    '[Table of Contents](https://gibbok.github.io/typescript-book/book/table-of-contents/index.md): Table of Contents',
  );
});

test('exposes a documentation page as Markdown', async ({ page }) => {
  const response = await page.goto('book/type-annotations/index.md');

  expect(response?.headers()['content-type']).toContain('text/markdown');
  await expect(page.locator('body')).toContainText(
    '# Type Annotations',
  );
});

test('exposes correctly encoded indexes for configured locales', async ({ page }) => {
  await page.goto('bg-bg/llms.txt');

  await expect(page.locator('body')).toContainText('За автора');
  await expect(page.locator('body')).toContainText('/bg-bg/book/about-the-author/index.md');
});

test('exposes a correctly encoded Chinese index', async ({ page }) => {
  await page.goto('zh-cn/llms.txt');

  await expect(page.locator('body')).toContainText('关于作者');
  await expect(page.locator('body')).toContainText('/zh-cn/book/about-the-author/index.md');
});
