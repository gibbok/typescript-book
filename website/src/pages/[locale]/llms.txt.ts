import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { defaultLocale, locales, type Locale } from '../../config/locales';
import {
  getDocsForLocale,
  getMarkdownUrl,
  getPageDescription,
  getPageTitle,
  utf8Bom,
} from '../../lib/llms';

export async function getStaticPaths() {
  const docs = await getCollection('docs');

  return Object.keys(locales)
    .filter((locale) => locale !== defaultLocale)
    .map((locale) => ({
      params: { locale },
      props: { entries: getDocsForLocale(docs, locale as Locale) },
    }));
}

export const GET: APIRoute = ({ props }) => {
  const entries = props.entries as Awaited<ReturnType<typeof getCollection<'docs'>>>;
  const homePage = entries.find((entry) => entry.id.endsWith('/index.mdx'));
  if (!homePage) {
    throw new Error('The localized documentation home page is required to generate llms.txt.');
  }

  const pages = entries
    .map((entry) => `- [${getPageTitle(entry)}](${getMarkdownUrl(entry)}): ${getPageDescription(entry)}`)
    .join('\n');

  return new Response(`${utf8Bom}# ${getPageTitle(homePage)}\n\n> ${getPageDescription(homePage)}\n\n## Documentation\n\n${pages}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
