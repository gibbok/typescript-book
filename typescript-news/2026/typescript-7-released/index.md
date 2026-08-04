# TypeScript 7.0 is now available


**Published:** July 8, 2026

Microsoft has released TypeScript 7.0, the first stable version built on the project's new native Go codebase.

## What changed

TypeScript 7 uses native code, shared-memory multithreading, and additional optimizations. According to the TypeScript team, full builds in its published benchmarks were between 7.7 and 11.9 times faster than TypeScript 6.

The release also moves the language service to the Language Server Protocol. Supported editors can use the same native foundation for faster project loading, diagnostics, completions, and navigation.

Install the stable release from npm:

```shell
npm install --save-dev typescript
```

## Compatibility

TypeScript 7.0 does not provide a stable programmatic API. Tools that embed TypeScript, including current Astro, Vue, MDX, Svelte, and some Angular workflows, may still require TypeScript 6 until the new API is available.

The TypeScript team expects to introduce the new API in TypeScript 7.1. Projects should check their framework and tooling support before upgrading.

## Source

Read the official announcement: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
