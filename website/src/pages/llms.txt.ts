import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import {
  getMarkdownUrl,
  getPageDescription,
  getPageTitle,
  getPublishedDocs,
} from '../lib/llms';

export const GET: APIRoute = async () => {
  const entries = getPublishedDocs(await getCollection('docs'));
  const homePage = entries.find((entry) => entry.id === 'index.mdx');
  if (!homePage) {
    throw new Error('The root documentation page is required to generate llms.txt.');
  }

  const summary = getPageDescription(homePage);
  const pages = entries
    .map((entry) => {
      const title = getPageTitle(entry);
      const description = getPageDescription(entry);

      return `- [${title}](${getMarkdownUrl(entry)}): ${description}`;
    })
    .join('\n');

  return new Response(`# ${getPageTitle(homePage)}\n\n> ${summary}\n\n## Documentation\n\n${pages}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
