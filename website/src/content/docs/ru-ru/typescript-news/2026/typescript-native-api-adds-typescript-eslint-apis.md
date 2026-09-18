---
title: Нативный API TypeScript добавляет API, необходимые typescript-eslint
description: Нативный API TypeScript добавляет API проверщика и типов, необходимые typescript-eslint, сокращая пробелы совместимости инструментов.
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**Опубликовано:** 14 сентября 2026 г.

Нативный API TypeScript теперь предоставляет дополнительные API проверщика и типов, необходимые `typescript-eslint`, сокращая пробелы совместимости для инструментов, зависящих от программного API TypeScript.

## Что изменилось

Изменение добавляет такие API, как `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` и `getExportSymbolOfSymbol`. Типы интерфейсов и классов также получают `getThisType()`, а `IndexKind` экспортируется для запросов индексных типов.

Обновлены как синхронная, так и асинхронная поверхности нативного API.

## Почему это важно

Pull request TypeScript был создан специально для добавления API, которые `typescript-eslint` определил как отсутствующие. Интеграции получают больше информации проверщика и типов, которую они уже ожидали от существующего API TypeScript.

## Источник

См. официальный pull request TypeScript: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
