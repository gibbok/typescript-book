import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import {
  getMarkdownPath,
  getPageTitle,
  getPublishedDocs,
  utf8Bom,
} from '../lib/llms';

export async function getStaticPaths() {
  const entries = getPublishedDocs(await getCollection('docs'));

  return entries.map((entry) => ({
    params: { slug: getMarkdownPath(entry).slice(1, -3) },
    props: { content: `# ${getPageTitle(entry)}\n\n${entry.body}` },
  }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(`${utf8Bom}${props.content}`, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
