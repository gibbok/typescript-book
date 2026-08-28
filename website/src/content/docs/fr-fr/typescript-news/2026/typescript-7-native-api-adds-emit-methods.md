---
title: L'API native de TypeScript 7 ajoute des méthodes d'émission
description: L'API native de TypeScript ajoute des méthodes d'émission vers le système de fichiers et en mémoire pour des programmes complets ainsi que pour certaines sorties JavaScript ou de déclarations.
lastUpdated: 2026-07-24
sidebar:
    order: 6
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**Publié le :** 24 juillet 2026

La base de code native de TypeScript a ajouté des API programmatiques d'émission pour les outils devant générer une sortie JavaScript ou de déclarations.

## Ce qui a changé

L'API intégrée fournit quatre modes d'émission présentant différents comportements de sortie et de sélection.

* `program.emit(emitOnly?: EmitOnly)` émet l'ensemble du programme vers le système de fichiers, y compris vers un système de fichiers virtuel configuré, et respecte les options qui bloquent l'émission, telles que `noEmit` et `noEmitOnError`.
* `program.emitToString(emitOnly?: EmitOnly)` émet l'ensemble du programme sous forme de chaînes de caractères en mémoire et respecte également les options qui bloquent l'émission.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` renvoie en mémoire la sortie JavaScript des fichiers sélectionnés et contourne les options qui bloquent l'émission.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` fournit la sortie de déclarations correspondante pour les fichiers sélectionnés.

Les consommateurs de l'API disposent ainsi de choix distincts entre l'émission normale du programme complet et une sortie en mémoire ciblée.

## Disponibilité

La modification a été intégrée à la base de code native de TypeScript le 24 juillet 2026. La source n'indique pas de version npm stable contenant ces API ; les outils doivent donc vérifier leur prise en charge dans la version de TypeScript qu'ils utilisent.

## Source

Consultez la pull request officielle : [API emit](https://github.com/microsoft/typescript-go/pull/4699).
