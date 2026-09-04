---
title: API nativa do TypeScript 7 adiciona getters de filhos e tokens da AST
description: A API nativa do TypeScript adiciona métodos de Node para percorrer filhos e tokens, reduzindo uma diferença em relação à API JavaScript para ferramentas de árvore sintática.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Publicado:** 3 de setembro de 2026

A API nativa do TypeScript agora expõe cinco auxiliares de `Node` para percorrer nós filhos e tokens: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` e `getLastToken()`.

## O que mudou

A PR #63893 adiciona os getters restantes de filhos e tokens que já existem na API do TypeScript baseada em JavaScript. A mudança completa a parte de filhos e tokens da API nativa de `Node`, depois que os getters de posição e texto já haviam sido adicionados.

## Por que isso importa

Esses métodos são úteis para consumidores da API que percorrem a árvore sintática, incluindo ferramentas que precisam inspecionar tokens e nós filhos. A API nativa agora pode usar os mesmos auxiliares de travessia de `Node` nesses casos.

## Fonte

Leia [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) e a [issue de acompanhamento](https://github.com/microsoft/TypeScript/issues/63892).
