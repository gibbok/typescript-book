# Nativní API TypeScriptu přidává API potřebná pro typescript-eslint


**Publikováno:** 14. září 2026

Nativní API TypeScriptu nyní zpřístupňuje další API checkeru a typů potřebná pro `typescript-eslint`, čímž zmenšuje mezery v kompatibilitě nástrojů závislých na programovém API TypeScriptu.

## Co se změnilo

Změna přidává například `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` a `getExportSymbolOfSymbol`. Typy rozhraní a tříd také získávají `getThisType()` a pro dotazy na indexové typy se exportuje `IndexKind`.

Aktualizována byla synchronní i asynchronní podoba nativního API.

## Proč je to důležité

Pull request TypeScriptu vznikl konkrétně kvůli doplnění API, která `typescript-eslint` označil jako chybějící. Integrace tak získávají více informací z checkeru a typového systému, které očekávají od zavedeného API TypeScriptu.

## Zdroj

Přečtěte si oficiální pull request TypeScriptu: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
