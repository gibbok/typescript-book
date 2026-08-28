---
title: Directives à triple barre oblique
sidebar:
  order: 60
  label: 60. Directives à triple barre oblique
---


Les directives à triple barre oblique sont des commentaires spéciaux qui indiquent au compilateur comment traiter un fichier. Ces directives commencent par trois barres obliques consécutives (`///`), sont généralement placées en haut d'un fichier TypeScript et n'ont aucun effet sur le comportement à l'exécution.

Les directives à triple barre oblique servent à référencer des dépendances externes, à spécifier le comportement de chargement des modules, à activer ou désactiver certaines fonctionnalités du compilateur, et plus encore. Voici quelques exemples :

Référencement d'un fichier de déclaration :

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Indication du format du module :

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Activation des options du compilateur, dans l'exemple suivant le mode strict :

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

