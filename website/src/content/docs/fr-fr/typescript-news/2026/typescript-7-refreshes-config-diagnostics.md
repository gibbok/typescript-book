---
title: TypeScript 7 actualise les diagnostics de configuration après la modification de fichiers
description: Le service de langage natif republie désormais les erreurs de tsconfig.json et jsconfig.json après la modification des fichiers de configuration surveillés.
lastUpdated: 2026-07-30
sidebar:
    order: 4
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Publié le :** 30 juillet 2026

Microsoft a intégré un correctif qui actualise les diagnostics des fichiers de configuration dans le service de langage natif de TypeScript après la modification d'un fichier `tsconfig.json` ou `jsconfig.json` suivi.

## Ce qui a changé

Les diagnostics des fichiers de configuration sont publiés lors de la mise à jour d'un instantané du service de langage. Auparavant, la modification d'un fichier de configuration surveillé planifiait l'actualisation des diagnostics, mais pas la mise à jour de l'instantané. Les nouvelles erreurs de configuration pouvaient donc rester obsolètes jusqu'à ce que l'éditeur effectue une autre requête mettant à jour l'instantané.

Le service de langage détecte désormais les modifications apportées aux fichiers de configuration suivis et planifie une mise à jour temporisée de l'instantané. Les diagnostics envoyés automatiquement sont ainsi republiés sans dépendre d'une requête ultérieure de l'éditeur.

## Pourquoi c'est important

Lorsqu'un éditeur ou un outil externe modifie un fichier `tsconfig.json` ou `jsconfig.json` suivi, le service de langage natif peut signaler les erreurs de configuration mises à jour uniquement à partir de l'événement de surveillance du fichier. Un test de régression vérifie ce comportement avec une valeur `target` non valide.

## Disponibilité

La modification a été intégrée à la base de code native de TypeScript après la sortie de TypeScript 7.0. La source n'indique pas de version npm stable qui l'inclut ; consultez donc les notes de version de la version installée avant de vous fier au correctif.

## Source

Consultez la modification officielle : [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
