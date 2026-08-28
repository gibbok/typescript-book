---
title: TypeScript 7 ajoute une portée de recherche des symboles de l'espace de travail
description: Le service de langage natif ajoute un paramètre permettant de limiter la recherche de symboles dans l'espace de travail au projet actuel.
lastUpdated: 2026-08-07
sidebar:
    order: 2
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-07'
---

**Publié le :** 7 août 2026

Microsoft a intégré au service de langage natif de TypeScript une portée pour la recherche des symboles de l'espace de travail.

## Ce qui a changé

La nouvelle préférence `workspaceSymbols.scope` possède deux valeurs. `allOpenProjects` est la valeur par défaut et recherche les symboles dans tous les projets ouverts. `currentProject` limite la recherche aux projets qui contiennent le document fourni.

L'extension native pour VS Code ajoute désormais un document TypeScript ou JavaScript pris en charge aux requêtes `workspace/symbol`. Elle donne la priorité au document actif et, à défaut, utilise un document ouvert pris en charge. Le service de langage utilise ce document uniquement lorsque `workspaceSymbols.scope` vaut `currentProject` ; dans le cas contraire, il conserve la recherche dans tous les projets ouverts.

## Pourquoi c'est important

Dans un espace de travail qui contient plusieurs projets avec des symboles portant des noms similaires, `currentProject` peut limiter l'ensemble de résultats au projet pertinent. La valeur par défaut préserve le comportement existant ; ce réglage doit donc être activé explicitement.

## Disponibilité

La modification a été intégrée à la base de code native de TypeScript après TypeScript 7.0. La source n'indique pas de version npm stable qui l'inclut ; consultez donc les notes de version de la version installée avant de vous fier à ce paramètre.
