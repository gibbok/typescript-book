---
name: create-typescript-news
description: Create and synchronize concise, source-faithful TypeScript news pages for every language configured in this repository's Astro/Starlight website. Use when asked to add, publish, translate, edit, remove, audit, or synchronize news in website/src/content/docs/typescript-news, or when a website language is added. Require an explicit source/context handoff before creating or materially editing a news item; the handoff may come from the user or from a preceding research workflow requested by the user.
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

If source/context input is present but the publication date is missing and cannot be verified from the authoritative source, ask for it because the date determines the year directory and sidebar order. The original source URL is optional only for directly user-supplied source content; a research handoff must include its original authoritative source URL(s).

For a translation audit, language addition, or removal, the existing English articles and any cited sources are the supplied content. Ask the user only when the master content or intended change is missing or ambiguous.

## Inspect the current structure

Before writing:

1. Read `website/astro.config.mjs` to identify every configured locale. Do not rely on a hard-coded locale list.
2. Read the latest English and translated files under `website/src/content/docs/typescript-news/`.
3. Read `.agents/skills/typescript-book-review/SKILL.md` completely and apply its review, style, translation, and Markdown rules.
4. Preserve the existing Astro/Starlight content and sidebar conventions instead of introducing custom routing or components.

## Keep every language synchronized

Treat the English `website/src/content/docs/typescript-news/` tree as the master and canonical news inventory. All translations must follow the English version's factual content, structure, metadata, year, and slug. Compare article paths relative to the English directory with the corresponding tree for every non-root locale configured in `website/astro.config.mjs`.

Every English news article must have one translated article at the same relative year and slug path in every configured non-root locale. Do not rely on Starlight's content fallback to display English in place of a missing translation.

Apply changes across the entire language set:

* When adding an article, create it and its index entry in English and every configured non-root locale.
* When materially editing an article, apply the same factual change to every translation and update affected index entries.
* When changing a title, description, publication date, year, slug, source, or frontmatter field, make the corresponding change in every language.
* When intentionally removing an English article, delete its translated file and index entry from every non-root locale.
* When a localized article has no canonical English article, remove the orphaned file and its index entry as part of synchronization.
* When a new locale is added to `website/astro.config.mjs`, create its localized news index and translate the complete existing English news archive, including every year and article, before considering the locale complete.
* When a locale is removed from `website/astro.config.mjs`, do not treat its former files as a supported translation. Follow the scope of the locale-removal request for deleting the obsolete locale tree.

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
    order: N
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: 'YYYY-MM-DD'
---
```

## Maintain contiguous news order

Use one global sequence across all publication years:

* assign `sidebar.order: 1` to the newest English article;
* increase the order by one for each older article;
* keep orders unique and contiguous from `1` through the total number of English articles, with no duplicates or gaps;
* use the same order for every translated version of the same article;
* when adding, removing, moving, or changing the publication date of an article, renumber every affected English and translated article;
* when articles share a publication date, keep them adjacent and use the English slug as a stable alphabetical tie-breaker.

Run the bundled verifier from the repository root after every news or locale change:

```shell
python3 .agents/skills/create-typescript-news/scripts/verify_news_order.py
```

The command must pass before building or publishing. It verifies the configured locale inventory, unique gapless orders, chronological ordering, and matching order values across translations. Correct the content files rather than weakening or bypassing the verifier.

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
* Keep the same slug, publication date, frontmatter structure, Markdown structure, factual scope, and source URL, when present, as the English article.
* Preserve commands, code, packages, options, identifiers, version numbers, and product names.
* Do not translate official announcement titles inside source links unless the linked page itself uses that title.
* Keep each translation faithful to the reviewed English article and the original source.

If a locale news index does not exist, create it using the existing English index structure, with localized title, description, introductory text, and `sidebar.hidden: true`.

## Self-review

Review the completed English article and every translation before building:

1. Recheck each factual statement against the explicit source/context input and original source.
2. Confirm no unsupported claim, date, number, command, package, or compatibility statement was introduced.
3. Confirm the summary is useful and as concise as the subject permits.
4. Confirm every translation preserves the English article's technical meaning.
5. Confirm all configured locales have the article and an updated index entry.
6. Confirm paths, slugs, dates, links, frontmatter, and newest-first ordering match across languages.
7. Confirm Markdown follows `.agents/skills/typescript-book-review/SKILL.md`.
8. Compare the complete English article inventory with every configured locale and confirm the relative path sets are identical.
9. Confirm every added or edited English fact is reflected accurately in every translation.
10. Confirm removed articles and their index entries no longer exist in any configured language.
11. Run `scripts/verify_news_order.py` and confirm orders are unique, contiguous, newest-first, and identical across translations.

Correct any issue found, then perform this accuracy comparison once more.

## Validate the website

From `website/`, run:

```shell
npm run build
```

Verify:

* `scripts/verify_news_order.py` passes;
* Astro reports no content or build errors;
* the English and every localized route are generated under the correct year;
* the `TypeScript News` sidebar groups the article under that year;
* the article is present in the generated sitemap;
* canonical URL, description, and `article:published_time` metadata are correct;
* no TypeScript News link is added to the book homepage;
* every configured locale generates the same set of news routes as English;
* removed routes are absent from the generated output and sitemap;
* edited pages contain no stale pre-edit text in any language.

Report the created paths, source used, accuracy review, and build result. Commit or publish changes only when the user requests it.
