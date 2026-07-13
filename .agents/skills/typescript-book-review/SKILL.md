---

name: typescript-book-review
description: Review and editing guide for TypeScript book and reference content in the style of The Concise TypeScript Book. Use when reviewing or editing educational prose, translated or non-English content, code examples, chapters, table-of-contents entries, or Markdown formatting in this repository to identify and fix typos, grammar mistakes, formatting problems, and minor clarity issues without altering the original meaning or the book’s concise, practical, example-driven style.
---

# TypeScript Book Review

Use this skill to review and edit TypeScript educational content while keeping it consistent with the rest of the book.

## Review and Editing Rules

Review the content carefully and make only justified corrections.

* Fix spelling mistakes and typographical errors.
* Fix grammar, punctuation, capitalization, and awkward sentence structure.
* Fix incorrect, inconsistent, or broken Markdown formatting.
* Make minor wording changes when they improve clarity or readability.
* Preserve the original technical meaning and intent.
* Do not introduce new claims, concepts, examples, recommendations, or explanations unless explicitly requested.
* Do not substantially rewrite content that is already clear and correct.
* Do not change the difficulty level or intended audience.
* Do not alter valid code examples unless a correction is required.
* Do not change identifiers, literal values, commands, or compiler options without a technical reason.
* Never modify code merely to match a personal preference.
* Preserve the existing structure unless a small organizational correction clearly improves readability.
* Keep edits minimal, focused, and easy to review.

When a sentence can be corrected in more than one way, prefer the version closest to the original wording.

## Core Style

Maintain a concise technical-reference style:

* Explain concepts directly and avoid storytelling.
* Use short paragraphs, usually one idea per paragraph.
* Prefer precise, beginner-friendly language without oversimplifying TypeScript behavior.
* Define the concept first, then explain why it matters or how TypeScript handles it.
* State validity, errors, inference results, and runtime behavior explicitly.
* Keep examples small and focused on one point.
* Avoid marketing language, jokes, and lengthy historical context unless they clarify the feature.

## Language and Translation

Use the language requested by the user or already used by the file being edited.

* Preserve the target language of translated content unless the user asks for a different language.
* Correct grammar, spelling, punctuation, and idiomatic phrasing in the target language.
* Keep the translation faithful to the original technical meaning.
* Preserve TypeScript terms, identifiers, literal values, commands, compiler options, code comments, and error text unless a correction is required.
* Do not replace established technical terms with awkward literal translations.
* Keep examples and Markdown structure aligned with the source content when reviewing translated files.
* If a source and translation disagree technically, preserve the TypeScript meaning and make the smallest correction needed.

## Organization

Keep content structured as a book chapter or reference section:

* Use `##` for major topics and `###` or `####` for focused subtopics.
* Keep headings descriptive and suitable for the table of contents.
* Start each section with a brief explanation before showing code.
* Split long topics into short subtopics instead of using one long section.
* Group related examples together: basic syntax, valid usage, invalid usage, and practical notes.
* Preserve compatibility with generated Markdown tables of contents.
* Avoid changing headings unless the change is required to correct an error or improve clarity.
* When changing a heading, update any corresponding table-of-contents entry or internal link.

## Explanation Pattern

Use this default flow when reviewing new or revised sections:

1. Name the TypeScript feature or concept.
2. Describe what it does in one or two paragraphs.
3. Show a minimal TypeScript example.
4. Explain the inferred type, compiler result, or runtime behavior.
5. Add a second example only when it clarifies an edge case or common usage.
6. End with a practical recommendation only when it follows directly from the example.

Prefer direct formulations:

* `TypeScript infers the type as ...`
* `The following example is valid TypeScript code.`
* `The following code produces an error:`
* `This is useful when ...`
* `At runtime, ...`

Do not replace existing phrasing with these formulations when the current wording is already clear and consistent.

## Code Examples

Review examples for consistency without unnecessarily rewriting them:

* Use fenced code blocks with `typescript`, `shell`, `json`, or `text`.
* Add `<!-- skip -->` immediately before TypeScript snippets that are intentionally invalid, incomplete, illustrative only, or not expected to compile.
* Use compact names such as `X`, `Y`, `Person`, `Animal`, `Dog`, or domain-neutral names when the domain is not important.
* Prefer single-quoted strings in TypeScript examples.
* Use inline comments to identify validity, inferred types, or compiler errors.
* Keep comments short: `// Valid`, `// Invalid`, `// Type inferred is string`.
* Show compiler messages in `text` blocks when the exact error helps explain the concept.
* Avoid large applications, frameworks, or unrelated dependencies unless the section is specifically about them.
* Preserve the behavior and educational purpose of every example.
* Do not change code solely for stylistic consistency when doing so would create a large or unnecessary diff.

Example pattern:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const value: X = { a: 'a', b: 'b' }; // Invalid
```

Object literal may only specify known properties.

## Markdown Conventions

Apply the book’s Markdown conventions consistently:

* Use `*` for unordered lists.
* Use inline code for identifiers, file names, compiler options, commands, and literal values.
* Use links directly when they provide useful reference material.
* Use `Notes:` only for short, concrete notes.
* Use markdownlint comments sparingly and only when a formatting exception is necessary.
* Do not add extra frontmatter to book chapters unless the repository format requires it.
* Fix malformed lists, code fences, links, headings, spacing, and indentation.
* Preserve intentional Markdown exceptions when they are required by the repository tooling.

## TypeScript Content Conventions

When reviewing TypeScript explanations:

* Distinguish compile-time type checking from JavaScript runtime behavior.
* Mention type erasure when runtime behavior could otherwise be misunderstood.
* Prefer examples that demonstrate inference, assignability, narrowing, structural typing, configuration, or emitted JavaScript behavior.
* When discussing migrations, recommend gradual migration and avoid refactoring during type conversion.
* When discussing configuration, explain the option’s effect and give a practical default only when the recommendation is clear.
* Avoid asserting version-specific behavior unless it has been verified against the repository’s target TypeScript version.
* Do not alter technical statements unless the original statement is incorrect, misleading, or unclear.
* Verify technical corrections before applying them.

## Table of Contents and Headings

Treat heading and table-of-contents consistency as a critical review requirement.

* Confirm every table-of-contents entry matches its corresponding heading.
* Confirm heading text, capitalization, punctuation, and anchor generation remain compatible.
* Avoid special characters in table-of-contents entries unless the matching heading requires them.
* Keep table-of-contents entries plain and compatible with generated Markdown anchors.
* Check all changed headings against the table of contents at least twice.
* Check all changed table-of-contents entries against their headings at least twice.
* Confirm renamed, added, moved, or removed sections are reflected correctly.
* Confirm internal links still point to valid headings.
* Do not change a heading without checking every related table-of-contents entry and internal reference.

## Review Checklist

Before finishing a review:

* Confirm all spelling and typographical errors have been corrected.
* Confirm grammar, punctuation, and capitalization are correct.
* Confirm translated or non-English content uses the requested language consistently when applicable.
* Confirm minor wording changes preserve the original meaning.
* Confirm no unnecessary rewriting or expansion was introduced.
* Confirm the heading level fits the surrounding chapter structure.
* Confirm examples are minimal and directly support the explanation.
* Confirm code examples retain their original behavior and purpose.
* Confirm invalid or illustrative snippets use `<!-- skip -->`.
* Confirm code fences use the correct language.
* Confirm Markdown formatting is valid and consistent.
* Confirm prose is concise, direct, and free of unrelated background.
* Confirm table-of-contents compatibility when headings were added, removed, moved, or renamed.
* Confirm table-of-contents entries avoid unnecessary special characters.
* Confirm headings, table-of-contents entries, anchors, and internal links were checked twice.
* Review the final diff and remove any change that is unnecessary or alters the original meaning.
