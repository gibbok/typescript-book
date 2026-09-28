import { expect, test } from '@playwright/test';

const expectedEnglishArticleSlugs = [
	'typescript-native-api-adds-typescript-eslint-apis',
	'typescript-native-api-adds-layered-vfs',
	'typescript-7-1-import-attributes-ambient-modules',
	'typescript-7-fixes-setter-accessibility',
	'typescript-7-workspace-symbol-search-scope',
	'typescript-7-go-to-implementation-memory-fix',
	'typescript-7-refreshes-config-diagnostics',
	'typescript-7-native-tooling-consolidates',
	'typescript-7-native-api-adds-emit-methods',
	'typescript-7-released',
	'typescript-7-release-candidate',
];

test.describe('TypeScript news archives', () => {
	test('shows only year links and lists English articles newest first', async ({ page }) => {
		const response = await page.goto('typescript-news/2026/');

		expect(response?.ok()).toBe(true);
		await expect(
			page.getByRole('heading', { level: 1, name: 'TypeScript News — 2026' })
		).toBeVisible();

		const sidebarNewsLinks = page.locator(
			'#starlight__sidebar a[href*="/typescript-news/"]'
		);
		await expect(sidebarNewsLinks).toHaveCount(1);
		await expect(sidebarNewsLinks.first()).toHaveText('2026');
		await expect(
			page.locator('#starlight__sidebar summary').filter({ hasText: 'TypeScript News' }),
		).toBeVisible();

		const articleLinks = page.locator('main .news-list a');
		const hrefs = await articleLinks.evaluateAll((links) =>
			links.map((link) => new URL(link.getAttribute('href')!, location.href).pathname),
		);
		expect(hrefs).toEqual(
			expectedEnglishArticleSlugs.map(
				(slug) => `/typescript-book/typescript-news/2026/${slug}/`,
			),
		);
	});

	test('keeps the latest-news page and existing article URL and metadata', async ({ page }) => {
		const landingResponse = await page.goto('typescript-news/');
		expect(landingResponse?.ok()).toBe(true);
		await expect(page.getByRole('heading', { level: 1, name: 'TypeScript News' })).toBeVisible();
		await expect(page.locator('main .news-list a')).toHaveCount(11);
		await expect(page.locator('main .news-list a').first()).toContainText(
			'TypeScript native API adds APIs needed by typescript-eslint',
		);

		const articleResponse = await page.goto(
			'typescript-news/2026/typescript-7-released/',
		);
		expect(articleResponse?.ok()).toBe(true);
		await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
			'href',
			'https://gibbok.github.io/typescript-book/typescript-news/2026/typescript-7-released/',
		);
		await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute(
			'content',
			'2026-07-08',
		);
	});

	test('includes article and archive URLs in the generated sitemap', async ({ page }) => {
		await page.goto('typescript-news/2026/');
		const sitemapIndexUrl = new URL('/typescript-book/sitemap-index.xml', page.url()).href;
		const sitemapIndexResponse = await page.request.get(sitemapIndexUrl);
		expect(sitemapIndexResponse.ok()).toBe(true);
		const sitemapIndex = await sitemapIndexResponse.text();
		const sitemapUrl = sitemapIndex.match(/<loc>(.*?)<\/loc>/)?.[1];
		expect(sitemapUrl).toBeTruthy();

		const localSitemapUrl = new URL(new URL(sitemapUrl!).pathname, page.url()).href;
		const sitemapResponse = await page.request.get(localSitemapUrl);
		expect(sitemapResponse.ok()).toBe(true);
		const sitemap = await sitemapResponse.text();
		expect(sitemap).toContain(
			'https://gibbok.github.io/typescript-book/typescript-news/2026/',
		);
		expect(sitemap).toContain(
			'https://gibbok.github.io/typescript-book/typescript-news/2026/typescript-7-released/',
		);
	});

	test('uses localized Arabic archive links and preserves RTL rendering', async ({ page }) => {
		const response = await page.goto('ar/typescript-news/2026/');

		expect(response?.ok()).toBe(true);
		await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
		await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
		await expect(
			page.getByRole('heading', { level: 1, name: 'أخبار TypeScript — 2026' }),
		).toBeVisible();

		const firstArticle = page.locator('main .news-list a').first();
		await expect(firstArticle).toContainText('واجهة TypeScript الأصلية');
		const localizedPaths = await page.locator('main .news-list a').evaluateAll((links) =>
			links.map((link) => new URL(link.getAttribute('href')!, location.href).pathname),
		);
		expect(localizedPaths).toHaveLength(11);
		for (const pathname of localizedPaths) {
			expect(pathname).toMatch(/^\/typescript-book\/ar\/typescript-news\/2026\//);
		}
	});
});
