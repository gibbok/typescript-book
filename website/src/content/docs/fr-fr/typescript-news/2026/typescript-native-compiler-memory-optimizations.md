---
title: Le compilateur natif TypeScript réduit l’utilisation de mémoire grâce à des optimisations du vérificateur de types
description: Des modifications fusionnées réduisent la taille des types structurés et ajustent l’allocation mémoire et les caches.
lastUpdated: 2026-10-14
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-14'
---

**Publié le :** 14 octobre 2026

Microsoft a fusionné plusieurs optimisations mémoire dans le compilateur natif de TypeScript. Elles réduisent la mémoire conservée par les structures internes du vérificateur de types sans modifier la syntaxe TypeScript.

## Ce qui change

* Les blocs des arènes typées visent désormais environ 512 octets au lieu de contenir systématiquement 256 objets. Dans le benchmark VS Code de cette modification, la mémoire de tas conservée a baissé de 8.54% et l’analyse par le ramasse-miettes de 10.44%, tandis que les événements d’allocation ont augmenté de 13.91%.
* Les signatures facultatives, les informations d’index et les caches du constructeur de nœuds sont déplacés hors des enregistrements `StructuredType`, dont la taille passe de 144 à 88 octets.
* Les nœuds de type résolus et les signatures utilisent des stockages paginés de liens entre nœuds lorsque des identifiants stables existent, avec une table de correspondance de repli pour les autres.

## Disponibilité

Ces modifications ont été fusionnées le 14 octobre 2026. Les pull requests ne précisent aucune version npm stable qui les inclut. Les résultats du benchmark concernent la modification et la charge de travail mesurées.

## Source

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
