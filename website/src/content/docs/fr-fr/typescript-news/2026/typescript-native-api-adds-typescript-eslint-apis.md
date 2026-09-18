---
title: L'API native de TypeScript ajoute les API requises par typescript-eslint
description: L'API native de TypeScript ajoute des API du vérificateur et des types requises par typescript-eslint, réduisant les écarts de compatibilité.
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**Publié :** 14 septembre 2026

L'API native de TypeScript expose désormais des API supplémentaires du vérificateur et des types nécessaires à `typescript-eslint`, réduisant les écarts de compatibilité pour les outils qui dépendent de l'API programmatique de TypeScript.

## Ce qui change

La modification ajoute notamment `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` et `getExportSymbolOfSymbol`. Les types d'interface et de classe gagnent aussi `getThisType()`, et `IndexKind` est exporté pour les requêtes sur les types d'index.

Les surfaces synchrones et asynchrones de l'API native ont toutes deux été mises à jour.

## Pourquoi c'est important

La pull request TypeScript a été créée spécifiquement pour ajouter des API identifiées comme manquantes par `typescript-eslint`. Les intégrations disposent ainsi de davantage d'informations du vérificateur et des types qu'elles attendaient déjà de l'API TypeScript existante.

## Source

Consultez la pull request officielle de TypeScript : [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
