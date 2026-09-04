# TypeScript 7.1 ajoute les attributs d’import aux modules ambient


**Publié le :** 1er septembre 2026

Le compilateur natif de TypeScript prend désormais en charge les types d’attributs d’import dans les déclarations de modules ambient à motif. Les déclarations peuvent ainsi distinguer les imports avec des attributs tels que `type: 'css'` ou `type: 'text'`.

## Ce qui change

Lorsqu’un import possède des attributs, TypeScript peut le résoudre vers un module ambient à motif correspondant. La correspondance repose sur l’assignabilité et, si plusieurs déclarations correspondent, TypeScript choisit celle dont le type d’attributs est le plus spécifique.

Pour l’instant, les types d’attributs de ces déclarations sont limités aux propriétés ordinaires dont les valeurs sont des types littéraux de chaîne. Les déclarations ayant le même motif et des types d’attributs identiques peuvent fusionner ; des types différents restent séparés.

## Compatibilité

La modification a été intégrée pour le jalon TypeScript 7.1.0 Beta. Elle n’ajoute pas de déclarations intégrées pour les imports CSS ou texte à la bibliothèque standard ; les projets et outils doivent donc toujours définir les modules ambient dont ils ont besoin.

## Source

Consultez la pull request TypeScript fusionnée : [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
