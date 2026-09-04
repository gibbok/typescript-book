---
title: TypeScript 7:s inbyggda API får getters för AST-barn och token
description: TypeScripts inbyggda API lägger till Node-metoder för att traversera barn och token, vilket minskar en skillnad mot JavaScript-API:t för syntaxträdsverktyg.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Publicerad:** 3 september 2026

TypeScripts inbyggda API exponerar nu fem `Node`-hjälpmetoder för att traversera barnnoder och token: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` och `getLastToken()`.

## Vad har ändrats

PR #63893 lägger till de återstående getters för barn och token som redan finns i det JavaScript-baserade TypeScript-API:t. Ändringen kompletterar barn- och token-delen av det inbyggda `Node`-API:t efter att getters för position och text redan hade lagts till.

## Varför det är viktigt

Metoderna är användbara för API-konsumenter som traverserar syntaxträdet, inklusive verktyg som behöver inspektera både token och barnnoder. Det inbyggda API:t kan nu använda samma `Node`-hjälpmetoder för traversering i dessa fall.

## Källa

Läs [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) och [spårningsärendet](https://github.com/microsoft/TypeScript/issues/63892).
