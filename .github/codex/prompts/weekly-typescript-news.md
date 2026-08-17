# Weekly TypeScript news

Create one new TypeScript news or educational article for this repository.

For this scheduled automation only, the repository owner's instructions in this prompt authorize autonomous research and topic selection. Treat the authoritative primary source you select, including its publication date and URL, as the user-supplied source content required by `.agents/skills/create-typescript-news/SKILL.md`. Follow that skill completely after selecting the source.

## Research and selection

* Research one fresh TypeScript news or educational topic published during the 30 calendar days before this run.
* Prefer authoritative primary sources, especially official TypeScript, Microsoft, TC39, GitHub, and maintainers' announcements.
* Do not treat search-result snippets, aggregators, reposts, or AI-generated summaries as primary sources.
* Before choosing a topic, inspect all existing TypeScript news and relevant website content in every locale configured by `website/astro.config.mjs`.
* Reject duplicate, near-duplicate, and substantially overlapping topics, even when the title or source differs.
* If no unique, timely, well-supported topic exists, make no file changes and finish with a brief explanation. The workflow will then exit without opening a pull request.

## Article and translations

* Read and follow `.agents/skills/create-typescript-news/SKILL.md` and every repository instruction it references.
* Treat English as the canonical master article.
* Write an accurate, concise, useful article rather than merely rewriting the source.
* Create natural, faithful translations for every supported website language.
* Keep facts, metadata, dates, slugs, ordering, navigation, commands, code, and technical meaning equivalent across all languages.
* Add external source links to the published article only when the repository skill requires them.

## Validation

Run every validation required by the repository skill, including:

* `python3 .agents/skills/create-typescript-news/scripts/verify_news_order.py`;
* formatting and content checks applicable to the changed files;
* full inventory and factual parity checks across every configured locale;
* duplicate and near-duplicate review against existing website content;
* `npm run build` from `website/`;
* checks that ordering, routes, sitemap entries, canonical URLs, descriptions, and publication metadata are correct.

Fix every issue before finishing. Do not commit, push, create a branch, or open a pull request; the workflow performs those operations in a separate job.

## Final response

When changes were made, return only a Markdown pull-request description with these headings and complete details:

## Chosen topic

State the topic and article path.

## Why it is timely

State the source publication date and why the topic matters now.

## Duplication review

Describe all existing TypeScript news and relevant website content checked across every supported language, and explain why the new article does not overlap.

## Languages updated

List every language updated.

## Validation performed

List each command and manual consistency check performed, with its result.

## Original sources

List the original primary source URL or URLs used for factual review.

Do not claim that a check passed unless you actually ran it successfully.
