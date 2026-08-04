import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { getMarkdownPath, getPublishedDocs } from '../lib/llms';

export async function getStaticPaths() {
  const entries = getPublishedDocs(await getCollection('docs'));

  return entries.map((entry) => ({
    params: { slug: getMarkdownPath(entry).slice(1, -3) },
    props: { body: entry.body },
  }));
}

export const GET: APIRoute = ({ props }) =>
  new Response(props.body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
