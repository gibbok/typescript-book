---
title: TypeScript 7.0 je nyní k dispozici
description: TypeScript 7.0 přináší nativní kompilátor a jazykovou službu napsané v Go a nabízí výrazné zlepšení výkonu sestavování i editorů.
lastUpdated: 2026-07-08
sidebar:
    order: 9
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**Zveřejněno:** 8. července 2026

Microsoft vydal TypeScript 7.0, první stabilní verzi založenou na novém nativním kódu projektu napsaném v Go.

## Co se změnilo

TypeScript 7 používá nativní kód, vícevláknové zpracování se sdílenou pamětí a další optimalizace. Podle týmu TypeScriptu byla úplná sestavení v publikovaných benchmarcích 7,7krát až 11,9krát rychlejší než v TypeScriptu 6.

Toto vydání také převádí jazykovou službu na Language Server Protocol. Podporované editory mohou využívat stejný nativní základ pro rychlejší načítání projektů, diagnostiku, doplňování a navigaci.

Nainstalujte stabilní vydání z npm:

```shell
npm install --save-dev typescript
```

## Kompatibilita

TypeScript 7.0 neposkytuje stabilní programové API. Nástroje, které v sobě používají TypeScript, včetně současných pracovních postupů s Astro, Vue, MDX, Svelte a některých pracovních postupů s Angular, mohou stále vyžadovat TypeScript 6, dokud nebude nové API k dispozici.

Tým TypeScriptu očekává zavedení nového API v TypeScriptu 7.1. Projekty by si před upgradem měly ověřit podporu svého frameworku a nástrojů.

## Zdroj

Přečtěte si oficiální oznámení: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
