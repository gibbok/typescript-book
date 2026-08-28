---
title: TypeScript 7 réduit la consommation mémoire de Go to Implementation
description: Un correctif du service de langage natif empêche une croissance quadratique de la mémoire lors de la recherche d'implémentations dans de grands projets aux types complexes.
lastUpdated: 2026-07-30
sidebar:
    order: 3
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Publié le :** 30 juillet 2026

Microsoft a intégré dans le service de langage natif de TypeScript un correctif qui améliore la consommation mémoire de Go to Implementation à grande échelle.

## Ce qui a changé

Le service de langage utilise une file de travail parcourue en largeur pour trouver les implémentations. Pour un membre d'interface possédant de nombreuses implémentations, des recherches répétées dans l'ensemble du programme pouvaient renvoyer les mêmes références. Les références conservées, les tâches mises en file d'attente et les groupes de résultats pouvaient donc croître de manière quadratique et épuiser la mémoire dans les grands projets aux types complexes.

Le correctif déduplique les nœuds de référence avant de les ajouter à la file d'attente de travail et évite de conserver les définitions de symboles en double. Un test de régression vérifie que le doublement du nombre d'implémentations produit une croissance approximativement linéaire plutôt que quadratique.

## Pourquoi c'est important

Go to Implementation peut désormais traiter ce schéma sans conserver plusieurs fois les mêmes références internes. La réponse finale de l'éditeur était déjà dédupliquée ; la modification cible donc la consommation de mémoire et les traitements internes nécessaires pour produire cette réponse.

## Disponibilité

La modification a été intégrée à la base de code native de TypeScript après la sortie de TypeScript 7.0. La source n'indique pas de version npm stable contenant le correctif ; les utilisateurs doivent donc consulter les notes de version correspondant à la version installée avant de s'y fier.

## Source

Consultez la modification officielle : [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
