import assert from 'node:assert/strict';
import test from 'node:test';
import { getNewsArticles, sortNewsYears } from '../src/lib/news-archive.js';

function article(id, title, publishedDate) {
	return {
		id,
		data: {
			title,
			description: `${title} summary`,
			head: [
				{
					tag: 'meta',
					attrs: {
						property: 'article:published_time',
						content: publishedDate,
					},
				},
			],
		},
	};
}

test('publication years are unique and in descending order', () => {
	assert.deepEqual(sortNewsYears(['2024', 'archive', '2026', '2025', '2026']), [
		'2026',
		'2025',
		'2024',
	]);
});

test('news lists sort newest first and break same-date ties by canonical slug', () => {
	const entries = [
		article('typescript-news/2026/zulu.md', 'Zulu', '2026-04-01'),
		article('typescript-news/2026/alpha.md', 'Alpha', '2026-04-01'),
		article('typescript-news/2026/beta.md', 'Beta', '2026-04-02'),
		article('typescript-news/2025/older.md', 'Older', '2025-12-31'),
		article('typescript-news/2026/index.mdx', 'Archive page', '2026-04-03'),
	];

	assert.deepEqual(
		getNewsArticles(entries, 'root', 2026).map(({ slug }) => slug),
		['beta', 'alpha', 'zulu']
	);
	assert.deepEqual(
		getNewsArticles(entries, 'root').map(({ slug }) => slug),
		['beta', 'alpha', 'zulu', 'older']
	);
});

test('localized archives use localized entries and preserve the shared article route', () => {
	const entries = [
		article('typescript-news/2026/example.md', 'English title', '2026-04-01'),
		article('fr-fr/typescript-news/2026/example.md', 'Titre français', '2026-04-01'),
	];
	const [localized] = getNewsArticles(entries, 'fr-fr', 2026);

	assert.equal(localized.title, 'Titre français');
	assert.equal(localized.relativePath, '2026/example');
	assert.equal(localized.publishedDate, '2026-04-01');
});
