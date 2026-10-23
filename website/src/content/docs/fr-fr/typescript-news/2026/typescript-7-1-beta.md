---
title: "TypeScript 7.1 Beta introduit des API modulaires et la prise en charge d’ES2026"
description: "TypeScript 7.1 Beta apporte des API natives modulaires, ES2026, les imports source, les content mappers et des optimisations."
lastUpdated: 2026-10-20
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-20'
---

**Publié le:** 20 octobre 2026

Microsoft a publié TypeScript 7.1 Beta avec de nouvelles API natives du compilateur et la prise en charge de fonctionnalités JavaScript. Pour essayer la bêta :

```shell
npm install -D typescript@beta
```

## Ce qui change

* `--target es2026` et `--lib es2026` sont désormais des options stables, avec des déclarations de bibliothèque standard mises à jour.
* Les nouveaux points d’entrée de l’API comprennent `typescript/sync`, `typescript/async`, `typescript/fs` et `typescript/ast`. Les objets `API` et `Program` doivent être libérés, par exemple avec `using`.
* Les imports de phase source (`import source` et `import.source()`) permettent d’obtenir des objets source de module, notamment pour WebAssembly, avec les réglages appropriés de `--module` et `esnext`.
* Les content mappers exposent le TypeScript intégré à des fichiers comme `.vue` et `.svelte`. Leur exécution en ligne de commande nécessite `--runExternalCode`.
* D’après les benchmarks publiés par Microsoft, les compilations sont plus rapides et utilisent moins de mémoire qu’avec TypeScript 7.0.

## Disponibilité

Il s’agit d’une bêta, pas d’une version stable. Vérifiez la compatibilité des frameworks et des outils avant toute mise à niveau. Les attributs d’import des modules ambiants ont déjà été abordés dans un autre article.

## Source

Lire l’annonce officielle : [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
