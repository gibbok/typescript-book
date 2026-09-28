/** Sort publication-year directory names newest first. */
export function sortNewsYears(years) {
	return [...new Set(years.filter((year) => /^\d{4}$/.test(year)))]
		.sort((first, second) => Number(second) - Number(first));
}

function getPublishedDate(entry) {
	const publishedMeta = entry.data.head?.find(
		(item) => item.tag === 'meta' && item.attrs?.property === 'article:published_time'
	);
	const publishedDate = publishedMeta?.attrs?.content;

	if (typeof publishedDate !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(publishedDate)) {
		throw new Error(`${entry.id}: missing or invalid article:published_time metadata`);
	}

	return publishedDate;
}

/**
 * Return news articles for a locale, sorted by publication date and canonical slug.
 * Localized articles share the English article path, so the slug tie-breaker is
 * identical in every language.
 */
export function getNewsArticles(entries, locale, year) {
	const prefix = `${locale === 'root' ? '' : `${locale}/`}typescript-news/`;
	const articles = [];

	for (const entry of entries) {
		if (!entry.id.startsWith(prefix)) continue;

		const match = entry.id.slice(prefix.length).match(/^(\d{4})\/([^/]+)\.(?:md|mdx)$/);
		if (!match || match[2] === 'index') continue;
		if (year !== undefined && match[1] !== String(year)) continue;

		articles.push({
			year: match[1],
			slug: match[2],
			relativePath: `${match[1]}/${match[2]}`,
			title: entry.data.title,
			description: entry.data.description,
			publishedDate: getPublishedDate(entry),
		});
	}

	return articles.sort((first, second) => {
		if (first.publishedDate !== second.publishedDate) {
			return first.publishedDate < second.publishedDate ? 1 : -1;
		}
		if (first.slug === second.slug) return 0;
		return first.slug < second.slug ? -1 : 1;
	});
}
