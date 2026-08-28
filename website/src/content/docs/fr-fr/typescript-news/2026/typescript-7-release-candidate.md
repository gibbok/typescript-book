---
title: Annonce de la version candidate de TypeScript 7.0
description: La version candidate de TypeScript 7.0 donnait un aperçu du compilateur natif, des compilations parallèles, des modifications de compatibilité et d'une prise en charge étendue des éditeurs.
lastUpdated: 2026-06-18
sidebar:
    order: 7
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**Publié le :** 18 juin 2026

Microsoft a publié la version candidate de TypeScript 7.0 en tant que dernière préversion avant la version stable de TypeScript 7.

## Ce qui a changé

La version candidate a fait passer TypeScript à son nouveau compilateur et à son nouveau service de langage basés sur Go. Sa logique de vérification des types a été portée depuis TypeScript 6 afin de préserver la sémantique existante tout en améliorant les performances grâce au code natif et au parallélisme à mémoire partagée.

TypeScript 7 a ajouté la vérification parallèle des types et les compilations de projets avec références. L'option `--checkers` contrôle le nombre de workers de vérification des types, tandis que `--builders` contrôle le nombre de workers de compilation des projets avec références.

Au moment de l'annonce, la version candidate pouvait être installée depuis npm :

```shell
npm install --save-dev typescript@rc
```

## Compatibilité

La version candidate ne comprenait pas d'API programmatique stable. L'équipe TypeScript a fourni le paquet de compatibilité `@typescript/typescript6` afin que les outils nécessitant l'API de TypeScript 6 puissent fonctionner avec le nouveau compilateur.

La version candidate a également adopté les valeurs par défaut de TypeScript 6 et traité comme des erreurs les options dépréciées dans TypeScript 6. Il a été conseillé aux équipes de migrer vers TypeScript 6 avant d'évaluer TypeScript 7.

## Source

Consultez l'annonce officielle : [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
