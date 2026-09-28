import { readdirSync, readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

// Read source metadata independently of the rendering helper so new articles
// and publication years do not require updating a second, hand-maintained list.
const newsDirectory = new URL('../src/content/docs/typescript-news/', import.meta.url);
const expectedYears = readdirSync(newsDirectory, { withFileTypes: true })
	.filter((entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name))
	.map((entry) => entry.name)
	.filter((year) => readdirSync(new URL(year + '/', newsDirectory))
		.some((name) => /\.(md|mdx)$/.test(name) && !/^index\.(md|mdx)$/.test(name)))
	.sort((a, b) => Number(b) - Number(a));
const expectedArticles = expectedYears.flatMap((year) =>
	readdirSync(new URL(year + '/', newsDirectory))
		.filter((name) => /\.(md|mdx)$/.test(name) && !/^index\.(md|mdx)$/.test(name))
		.map((name) => {
			const source = readFileSync(new URL(year + '/' + name, newsDirectory), 'utf8');
			const date = source.match(/property:\s*article:published_time\s+content:\s*['"]?(\d{4}-\d{2}-\d{2})/)?.[1];
			if (!date) throw new Error('Missing publication date: ' + year + '/' + name);
			return { year, slug: name.replace(/\.(md|mdx)$/, ''), date };
		})
).sort((a, b) => a.date !== b.date ? (a.date < b.date ? 1 : -1) :
	(a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0));
const expectedEnglishArticleSlugs = expectedArticles
	.filter(({ year }) => year === '2026')
	.map(({ slug }) => slug);

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
		await expect(sidebarNewsLinks).toHaveText(expectedYears);
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
		const latestPaths = await page.locator('main .news-list a').evaluateAll((links) =>
			links.map((link) => new URL(link.getAttribute('href')!, location.href).pathname),
		);
		expect(latestPaths).toEqual(expectedArticles.slice(0, 11).map(
			({ year, slug }) => '/typescript-book/typescript-news/' + year + '/' + slug + '/',
		));

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

		const localizedPaths = await page.locator('main .news-list a').evaluateAll((links) =>
			links.map((link) => new URL(link.getAttribute('href')!, location.href).pathname),
		);
		expect(localizedPaths).toEqual(expectedEnglishArticleSlugs.map(
			(slug) => '/typescript-book/ar/typescript-news/2026/' + slug + '/',
		));
	});
});
