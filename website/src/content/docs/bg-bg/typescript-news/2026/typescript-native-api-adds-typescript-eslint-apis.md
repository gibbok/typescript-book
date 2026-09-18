---
title: Нативният API на TypeScript добавя API, нужни на typescript-eslint
description: Нативният API на TypeScript добавя API за проверка и типове, нужни на typescript-eslint, и намалява пропуските в съвместимостта.
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**Публикувано:** 14 септември 2026 г.

Нативният API на TypeScript вече предоставя допълнителни API за проверка и типове, нужни на `typescript-eslint`, като намалява пропуските в съвместимостта за инструменти, които използват програмния API на TypeScript.

## Какво се промени

Промяната добавя API като `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` и `getExportSymbolOfSymbol`. Типовете за интерфейси и класове получават и `getThisType()`, а `IndexKind` се експортира за заявки към индексни типове.

Обновени са както синхронният, така и асинхронният нативен API.

## Защо е важно

Pull request-ът на TypeScript е създаден специално за добавяне на API, определени като липсващи от `typescript-eslint`. Това дава на интеграциите повече информация за проверката и типовете, която те вече очакват от установения API на TypeScript.

## Източник

Прочетете официалния pull request на TypeScript: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
