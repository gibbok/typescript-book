---
title: L'API nativa di TypeScript 7 aggiunge getter per figli e token dell'AST
description: L'API nativa di TypeScript aggiunge metodi di Node per attraversare figli e token, riducendo una differenza rispetto all'API JavaScript per gli strumenti che analizzano l'albero sintattico.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Pubblicato:** 3 settembre 2026

L'API nativa di TypeScript ora espone cinque metodi di supporto di `Node` per attraversare nodi figli e token: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` e `getLastToken()`.

## Cosa è cambiato

La PR #63893 aggiunge i getter rimanenti per figli e token già presenti nell'API TypeScript basata su JavaScript. La modifica completa la parte relativa a figli e token dell'API nativa di `Node`, dopo l'aggiunta precedente dei getter per posizione e testo.

## Perché è importante

Questi metodi sono utili per chi usa l'API per attraversare l'albero sintattico, compresi gli strumenti che devono ispezionare sia i token sia i nodi figli. L'API nativa può ora usare gli stessi helper di attraversamento di `Node` in questi casi.

## Fonte

Leggi [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) e la [issue di tracciamento](https://github.com/microsoft/TypeScript/issues/63892).
