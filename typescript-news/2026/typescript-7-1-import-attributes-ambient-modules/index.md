# TypeScript 7.1 adds import attributes to ambient modules


**Published:** September 1, 2026

TypeScript's native compiler now supports import-attribute types on pattern ambient module declarations. This lets declarations distinguish imports by attributes such as `type: 'css'` or `type: 'text'`.

## What changed

When an import carries attributes, TypeScript can resolve it against a matching pattern ambient module. Matching uses assignability, and when more than one declaration matches, TypeScript chooses the declaration with the most specific attribute type.

For now, attribute types on these declarations are limited to regular properties whose values are string literal types. Declarations with the same pattern and identical attribute types can merge; declarations with different attribute types remain distinct.

## Compatibility

The change was merged for the TypeScript 7.1.0 Beta milestone. It does not add built-in CSS or text import declarations to the standard library, so projects and tooling still define the ambient modules they need.

## Source

Read the merged TypeScript pull request: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
