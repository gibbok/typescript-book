---
name: create-typescript-news
description: Create concise, source-faithful TypeScript news pages for every language configured in this repository's Astro/Starlight website. Use when asked to add, publish, translate, or update an item in website/src/content/docs/typescript-news. Require user-provided source content before doing any news research or writing.
---

# Create TypeScript News

Create a TypeScript news article only from source content supplied by the user, then translate and file it consistently across every configured website language.

## Require source content

Before researching, drafting, or editing files, confirm that the user supplied the news source content.

If the content is missing, ask for:

* the source content or announcement text;
* the original source URL;
* the publication date;
* an optional preferred title or slug.

Stop after asking. Do not search for a topic, select news independently, or draft an article without the user-provided source content.

If content is present but the publication date is missing, ask for it because the date determines the year directory and sidebar order. Ask for a missing original URL when the article is expected to cite a public source.

## Inspect the current structure

Before writing:

1. Read `website/astro.config.mjs` to identify every configured locale. Do not rely on a hard-coded locale list.
2. Read the latest English and translated files under `website/src/content/docs/typescript-news/`.
3. Read `.agents/skills/typescript-book-review/SKILL.md` completely and apply its review, style, translation, and Markdown rules.
4. Preserve the existing Astro/Starlight content and sidebar conventions instead of introducing custom routing or components.

## Verify the source

Treat the supplied content as the authoritative source.

* Compare every date, version, feature, compatibility note, command, package name, option, number, and performance claim with the original source.
* Open the supplied source URL when available and accessible, giving preference to the official TypeScript announcement.
* Do not add claims from memory or infer unannounced behavior.
* Remove details that cannot be supported by the source.
* If the supplied content conflicts with the original source or remains ambiguous, ask the user before publishing the disputed claim.
* Link the original source in the article's `Source` section.

## Write the English article

Write a useful, concise summary rather than reproducing the source.

* Lead with what was announced and why it matters to TypeScript developers.
* Prefer short paragraphs and direct technical language.
* Include only sections supported by the source. Use headings such as `## What changed`, `## Compatibility`, and `## Source` when they add value.
* Preserve commands, package names, identifiers, compiler options, code, version numbers, and URLs exactly.
* Avoid marketing language, speculation, filler, and lengthy history.
* Use the publication date for both `lastUpdated` and `article:published_time` unless the user supplies a distinct verified update date.

Use the established frontmatter pattern:

```yaml
---
title: Article title
description: A concise, source-supported description.
lastUpdated: YYYY-MM-DD
sidebar:
    order: -YYYYMMDD
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: 'YYYY-MM-DD'
---
```

The negative `YYYYMMDD` sidebar order keeps the newest years and articles first.

## Save by publication year

Create the English article at:

```text
website/src/content/docs/typescript-news/YYYY/article-slug.md
```

Derive `YYYY` from the verified publication date. Use a short, lowercase, hyphenated slug. Do not place article files directly in `typescript-news/`.

Update `website/src/content/docs/typescript-news/index.md` with a concise entry linking to:

```text
./YYYY/article-slug/
```

Keep index entries ordered newest first.

## Create every translation

For each non-root locale configured in `website/astro.config.mjs`, create:

```text
website/src/content/docs/LOCALE/typescript-news/YYYY/article-slug.md
```

Also update that locale's `typescript-news/index.md`.

* Translate the title, description, publication label, headings, and prose naturally.
* Keep the same slug, publication date, frontmatter structure, Markdown structure, factual scope, and source URL as the English article.
* Preserve commands, code, packages, options, identifiers, version numbers, and product names.
* Do not translate official announcement titles inside source links unless the linked page itself uses that title.
* Keep each translation faithful to the reviewed English article and the original source.

If a locale news index does not exist, create it using the existing English index structure, with localized title, description, introductory text, and `sidebar.hidden: true`.

## Self-review

Review the completed English article and every translation before building:

1. Recheck each factual statement against the supplied content and original source.
2. Confirm no unsupported claim, date, number, command, package, or compatibility statement was introduced.
3. Confirm the summary is useful and as concise as the subject permits.
4. Confirm every translation preserves the English article's technical meaning.
5. Confirm all configured locales have the article and an updated index entry.
6. Confirm paths, slugs, dates, links, frontmatter, and newest-first ordering match across languages.
7. Confirm Markdown follows `.agents/skills/typescript-book-review/SKILL.md`.

Correct any issue found, then perform this accuracy comparison once more.

## Validate the website

From `website/`, run:

```shell
npm run build
```

Verify:

* Astro reports no content or build errors;
* the English and every localized route are generated under the correct year;
* the `TypeScript News` sidebar groups the article under that year;
* the article is present in the generated sitemap;
* canonical URL, description, and `article:published_time` metadata are correct;
* no TypeScript News link is added to the book homepage.

Report the created paths, source used, accuracy review, and build result. Commit or publish changes only when the user requests it.
