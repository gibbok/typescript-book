---
title: TypeScript 7.0 est désormais disponible
description: TypeScript 7.0 introduit un compilateur et un service de langage natifs basés sur Go, apportant des améliorations majeures des performances des compilations et des éditeurs.
lastUpdated: 2026-07-08
sidebar:
    order: 6
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**Publié le :** 8 juillet 2026

Microsoft a publié TypeScript 7.0, la première version stable reposant sur la nouvelle base de code native en Go du projet.

## Ce qui a changé

TypeScript 7 utilise du code natif, le multithreading à mémoire partagée et des optimisations supplémentaires. Selon l'équipe TypeScript, les compilations complètes dans les benchmarks publiés étaient de 7,7 à 11,9 fois plus rapides que TypeScript 6.

Cette version fait également passer le service de langage au Language Server Protocol. Les éditeurs compatibles peuvent utiliser la même base native pour accélérer le chargement des projets, les diagnostics, les complétions et la navigation.

Installez la version stable depuis npm :

```shell
npm install --save-dev typescript
```

## Compatibilité

TypeScript 7.0 ne fournit pas d'API programmatique stable. Les outils qui intègrent TypeScript, notamment les versions actuelles d'Astro, Vue, MDX et Svelte ainsi que certains workflows Angular, peuvent encore nécessiter TypeScript 6 jusqu'à ce que la nouvelle API soit disponible.

L'équipe TypeScript prévoit d'introduire la nouvelle API dans TypeScript 7.1. Les projets doivent vérifier la prise en charge par leur framework et leur outillage avant de procéder à la mise à niveau.

## Source

Consultez l'annonce officielle : [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
