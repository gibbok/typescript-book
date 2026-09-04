---
title: Нативният API на TypeScript 7 добавя getter-и за AST дъщерни възли и token-и
description: Нативният API на TypeScript добавя Node методи за обхождане на дъщерни възли и token-и, намалявайки разликата спрямо JavaScript API за инструменти, работещи със синтактичното дърво.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Публикувано:** 3 септември 2026 г.

Нативният API на TypeScript вече предоставя пет помощни метода на `Node` за обхождане на дъщерни възли и token-и: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` и `getLastToken()`.

## Какво се промени

PR #63893 добавя останалите getter-и за дъщерни възли и token-и, които вече съществуват в базирания на JavaScript TypeScript API. Промяната завършва тази част от нативния `Node` API, след като getter-ите за позиция и текст вече бяха добавени.

## Защо е важно

Тези методи са полезни за потребители на API, които обхождат синтактичното дърво, включително инструменти, които трябва да проверяват както token-и, така и дъщерни възли. Нативният API вече може да използва същите помощни методи на `Node` за тези случаи.

## Източник

Прочетете [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) и [проследяващия issue](https://github.com/microsoft/TypeScript/issues/63892).
