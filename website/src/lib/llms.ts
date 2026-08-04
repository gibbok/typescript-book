import type { CollectionEntry } from 'astro:content';

type DocsEntry = CollectionEntry<'docs'>;

const siteBaseUrl = 'https://gibbok.github.io/typescript-book';

const removeMarkdownSyntax = (value: string) =>
  value
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!?(?:\[[^\]]*\])\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[*_#>[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const firstParagraph = (body: string) => {
  const paragraphs = body.split(/\n\s*\n/);

  return paragraphs
    .map(removeMarkdownSyntax)
    .find((paragraph) => paragraph.length > 0) ?? '';
};

const titleFromId = (id: string) =>
  id
    .split('/')
    .at(-1)!
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

export const getPageTitle = (entry: DocsEntry) =>
  entry.data.title ?? titleFromId(entry.id);

export const getPageDescription = (entry: DocsEntry) => {
  const description = entry.data.description ?? firstParagraph(entry.body);

  return removeMarkdownSyntax(description);
};

const withoutContentExtension = (id: string) =>
  id
    .replace(/\.(?:md|mdx)$/, '')
    .replace(/\/index$/, '')
    .replace(/^index$/, '');

export const getMarkdownPath = (entry: DocsEntry) =>
  withoutContentExtension(entry.id)
    ? `/${withoutContentExtension(entry.id)}/index.md`
    : '/index.md';

export const getMarkdownUrl = (entry: DocsEntry) =>
  `${siteBaseUrl}${getMarkdownPath(entry)}`;

export const getPublishedDocs = (entries: DocsEntry[]) =>
  entries
    .sort((first, second) => getMarkdownPath(first).localeCompare(getMarkdownPath(second)));
