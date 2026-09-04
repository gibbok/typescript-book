---
title: L'API native de TypeScript 7 ajoute des getters pour les enfants et les tokens de l'AST
description: L'API native de TypeScript ajoute des méthodes Node pour parcourir les enfants et les tokens, réduisant un écart avec l'API JavaScript pour les outils d'arbre syntaxique.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Publié le :** 3 septembre 2026

L'API native de TypeScript expose désormais cinq méthodes utilitaires de `Node` pour parcourir les nœuds enfants et les tokens : `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` et `getLastToken()`.

## Ce qui change

La PR #63893 ajoute les getters restants pour les enfants et les tokens qui existent déjà dans l'API TypeScript basée sur JavaScript. La modification complète cette partie de l'API native de `Node`, après l'ajout préalable des getters de position et de texte.

## Pourquoi c'est important

Ces méthodes sont utiles aux consommateurs de l'API qui parcourent l'arbre syntaxique, notamment aux outils qui doivent inspecter à la fois les tokens et les nœuds enfants. L'API native peut désormais utiliser les mêmes utilitaires de parcours de `Node` dans ces cas.

## Source

Consultez [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) et l'[issue de suivi](https://github.com/microsoft/TypeScript/issues/63892).
