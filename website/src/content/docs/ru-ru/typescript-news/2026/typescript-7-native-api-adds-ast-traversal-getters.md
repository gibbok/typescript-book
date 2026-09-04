---
title: Нативный API TypeScript 7 получил геттеры дочерних узлов и токенов AST
description: Нативный API TypeScript добавляет методы Node для обхода дочерних узлов и токенов, сокращая разрыв с JavaScript API для инструментов работы с синтаксическим деревом.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Опубликовано:** 3 сентября 2026 г.

Нативный API TypeScript теперь предоставляет пять вспомогательных методов `Node` для обхода дочерних узлов и токенов: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` и `getLastToken()`.

## Что изменилось

PR #63893 добавляет оставшиеся геттеры дочерних узлов и токенов, которые уже есть в API TypeScript на базе JavaScript. Это дополняет соответствующую часть нативного API `Node` после ранее добавленных геттеров позиции и текста.

## Почему это важно

Эти методы полезны потребителям API, которые обходят синтаксическое дерево, включая инструменты, которым нужно анализировать и токены, и дочерние узлы. Нативный API теперь может использовать те же вспомогательные методы обхода `Node` для таких задач.

## Источник

См. [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) и [issue для отслеживания](https://github.com/microsoft/TypeScript/issues/63892).
