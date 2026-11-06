# TypeScript accélère les reconstructions incrémentales grâce au parallélisme


Une modification intégrée au compilateur parallélise la vérification des signatures des fichiers affectés par un changement dans un module très importé. Cette étape était auparavant séquentielle.

## Ce qui change

Dans le test de l'auteur, une reconstruction après modification d'un simple commentaire est passée de **3,4 à 1,5 seconde** sur Linux à 32 cœurs. Dans un paquet n8n, un cas similaire est passé de **5,4 à 4,5 secondes**. Ces résultats dépendent de la charge testée.

## Performances et limites

Le travail est limité par `GOMAXPROCS` ; les gains dépendent des vérificateurs disponibles et des dépendances. Aucun gain pour `isolatedModules`, qui ne parcourt pas les fichiers dépendants.

## Source

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
