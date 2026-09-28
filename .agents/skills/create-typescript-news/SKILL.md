---
name: create-typescript-news
description: Create and synchronize concise, source-faithful TypeScript news pages for every language configured in this repository's Astro/Starlight website. Use when asked to add, publish, translate, edit, remove, audit, or synchronize news in website/src/content/docs/typescript-news, or when a website language is added. Require an explicit source/context handoff before creating or materially editing a news item; the handoff may come from the user or from a preceding research workflow requested by the user containing verified sources, dates, and findings.
---

# Create TypeScript News

Create a TypeScript news article only from explicit source/context input, then translate and file it consistently across every configured website language.

## Require source/context input

Before drafting or editing files, confirm that explicit source/context input is available. It may be either:

* source content or announcement text supplied directly by the user; or
* a research handoff produced by a preceding research step that the user explicitly requested, containing the selected topic, original authoritative source URL(s), publication date(s), and the factual findings to use.

A research handoff is valid source/context input only when it identifies the original authoritative source and preserves enough factual detail to verify the article. Prefer official TypeScript, Microsoft, TC39, GitHub, and maintainer sources. Do not treat general model memory or an uncited topic suggestion as source/context input.

If neither form of source/context input is available, ask for:

* the source content or announcement text;
* the original source URL, if the user wants to provide it;
* the publication date;
* an optional preferred title or slug.

Stop after asking. Do not independently select a topic unless the user's workflow explicitly includes a preceding research-and-handoff step.

If source/context input is present but the publication date is missing and cannot be verified from the authoritative source, ask for it because the date determines the year directory and archive. The original source URL is optional only for directly user-supplied source content; a research handoff must include its original authoritative source URL(s).

For a translation audit, language addition, or removal, the existing English articles and any cited sources are the supplied content. Ask the user only when the master content or intended change is missing or ambiguous.

## Inspect the current structure

Before writing:

1. Read `website/src/config/locales.ts` to identify every configured locale. Do not hard-code the locale list.
2. Read the latest English and translated files under `website/src/content/docs/typescript-news/`.
3. Read `.agents/skills/typescript-book-review/SKILL.md` completely and apply its review, style, translation, and Markdown rules.
4. Preserve the existing Astro/Starlight content conventions and use the shared news-list implementation.

## Keep every language synchronized

Treat the English `website/src/content/docs/typescript-news/` tree as the master and canonical news inventory. All translations must follow the English version's factual content, structure, metadata, year, and slug. Compare article paths relative to the English directory with the corresponding tree for every non-root locale configured in `website/src/config/locales.ts`.

Every English news article must have one translated article at the same relative year and slug path in every configured non-root locale. Do not rely on Starlight's content fallback to display English in place of a missing translation.

Apply changes across the entire language set:

* When adding an article, create it in English and every configured non-root locale. The latest-news landing pages and yearly archives discover it automatically; do not add manual article lists to those pages.
* When materially editing an article, apply the same factual change to every translation.
* When changing a title, description, publication date, year, slug, source, or frontmatter field, make the corresponding change in every language.
* When intentionally removing an English article, delete its translated file from every non-root locale.
* When a localized article has no canonical English article, remove the orphaned file as part of synchronization.
* When a new locale is added to `website/src/config/locales.ts`, create its localized news landing page, translate the complete English news archive, and create one localized yearly archive page for every year containing English articles.
* When a locale is removed from `website/src/config/locales.ts`, do not treat its former files as a supported translation. Follow the scope of the locale-removal request for deleting the obsolete locale tree.

Keep the set of relative article paths identical across English and every configured non-root locale. Preserve localized prose, but keep factual meaning, dates, slugs, commands, source URLs, and frontmatter synchronized.

## Verify the source

Treat the explicit source/context input as the authoritative basis for the article. When a research handoff is used, reopen and verify its original authoritative source URL(s) before publication.

* Compare every date, version, feature, compatibility note, command, package name, option, number, and performance claim with the original source.
* Open the supplied or handed-off source URL when accessible, giving preference to official TypeScript, Microsoft, TC39, GitHub, and maintainer sources.
* Do not add claims from memory or infer unannounced behavior.
* Remove details that cannot be supported by the source.
* If the source/context conflicts with the original source or remains ambiguous, ask the user before publishing the disputed claim.
* Link the original source in the article's `Source` section when a URL is available. Omit that section only when directly user-supplied source content has no URL.

## Write the English article

Write a useful, concise summary rather than reproducing the source.

* Lead with what was announced and why it matters to TypeScript developers.
* Prefer short paragraphs and direct technical language.
* Include only sections supported by the source. Use headings such as `## What changed`, `## Compatibility`, and `## Source` when they add value.
* Preserve commands, package names, identifiers, compiler options, code, version numbers, and URLs exactly.
* Avoid marketing language, speculation, filler, and lengthy history.
* Use the publication date for both `lastUpdated` and `article:published_time` unless the source/context supplies a distinct verified update date.

Use the established frontmatter pattern:

```yaml
---
title: Article title
description: A concise, source-supported description.
lastUpdated: YYYY-MM-DD
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: 'YYYY-MM-DD'
---
```

Do not add `sidebar.order` to news articles. Starlight hides individual articles from autogenerated sidebars through `sidebar.hidden: true`. Year links are generated from the English news-year directories and sorted newest first in `website/astro.config.mjs`.

## Automatic latest-news lists and yearly archives

The shared `website/src/components/NewsList.astro` component reads the Starlight `docs` content collection at build time. It filters articles by locale and, for an archive, by year. It uses `article:published_time` as the publication date, sorts newest first, and uses the canonical English slug as the deterministic tie-breaker for articles published on the same date.

* Keep each localized news landing page at `typescript-news/index.mdx`. It renders the latest 11 articles automatically; do not add, remove, or reorder article entries manually.
* Keep one localized archive page at `typescript-news/YYYY/index.mdx` for every year with published English articles. Its localized title and description are page metadata; its `<NewsList locale="LOCALE" year={YYYY} />` renders the localized article list automatically.
* When the first article for a new year is added, create that year's archive page in English and every configured non-root locale. Do not edit older archive pages or article files just to update navigation order.
* The news sidebar contains only year links. Its section label is read from each locale's news landing page title.

Run the bundled verifier and focused list tests from the repository root after every news or locale change:

```shell
python3 .agents/skills/create-typescript-news/scripts/verify_news.py
npm --prefix website run test:news
```

The verifier reads `website/src/config/locales.ts` and checks article path parity, valid publication dates, year-directory consistency, matching dates across translations, localized landing/archive pages, hidden article navigation, and the absence of `sidebar.order` metadata. The tests cover descending year order, newest-first article sorting, deterministic slug tie-breaking, and localized entries. Correct content or implementation issues rather than weakening the checks.

## Save by publication year

Create the English article at:

```text
website/src/content/docs/typescript-news/YYYY/article-slug.md
```

Derive `YYYY` from the verified publication date. Use a short, lowercase, hyphenated slug. Do not place article files directly in `typescript-news/`.

Create each translation at:

```text
website/src/content/docs/LOCALE/typescript-news/YYYY/article-slug.md
```

## Create every translation

For each non-root locale configured in `website/src/config/locales.ts`:

* Translate the title, description, headings, and prose naturally. The shared list formats publication dates using the locale's language tag.
* Keep the same year, slug, publication date, frontmatter structure, Markdown structure, factual scope, and source URL, when present, as the English article.
* Preserve commands, code, packages, options, identifiers, version numbers, and product names.
* Do not translate official announcement titles inside source links unless the linked page itself uses that title.
* Keep each translation faithful to the reviewed English article and the original source.

The landing-page and archive article lists are generated from content metadata, so do not edit them when adding an article.

## Self-review

Review the completed English article and every translation before building:

1. Recheck each factual statement against the explicit source/context input and original source.
2. Confirm no unsupported claim, date, number, command, package, or compatibility statement was introduced.
3. Confirm the summary is useful and as concise as the subject permits.
4. Confirm every translation preserves the English article's technical meaning.
5. Confirm all configured locales have the article and matching publication metadata.
6. Confirm paths, slugs, dates, source links, and frontmatter match across languages.
7. Confirm Markdown follows `.agents/skills/typescript-book-review/SKILL.md`.
8. Compare the complete English article inventory with every configured locale and confirm the relative path sets are identical.
9. Confirm every added or edited English fact is reflected accurately in every translation.
10. Confirm removed articles no longer exist in any configured language.
11. Run `scripts/verify_news.py` and `npm --prefix website run test:news` and confirm both checks pass.
12. Confirm a new-year archive page exists in every configured locale when the publication year is new.

Correct any issue found, then perform the source and translation accuracy comparison once more.

## Validate the website

From `website/`, run:

```shell
npm run build
```

Verify:

* the news verifier and focused list tests pass;
* Astro reports no content or build errors;
* the TypeScript News sidebar displays only years, newest first, with no individual article links;
* clicking a year opens its localized archive page, and archive article links open the existing localized article URLs;
* yearly archives and the latest-news landing page display localized articles in the expected order;
* the English and every localized route are generated under the correct year, including Arabic with its RTL direction;
* existing article canonical URLs, descriptions, and `article:published_time` metadata remain correct;
* existing article routes and archive routes appear in the generated sitemap;
* no duplicate article routes or unexpected missing routes are introduced.

Report the created paths, source used, accuracy review, and build result. Commit or publish changes only when the user requests it.
