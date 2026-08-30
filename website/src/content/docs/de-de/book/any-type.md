---
title: Typ any
sidebar:
  order: 45
  label: 45. Typ any
---


Der Typ `any` ist ein spezieller Typ (universeller Supertyp), der zur Darstellung jedes beliebigen Werttyps (Primitivwerte, Objekte, Arrays, Funktionen, Fehler, Symbole) verwendet werden kann. Er wird häufig in Situationen verwendet, in denen der Typ eines Werts zur Kompilierzeit nicht bekannt ist oder wenn mit Werten aus externen APIs oder Bibliotheken gearbeitet wird, die keine TypeScript-Typdefinitionen besitzen.

Durch die Verwendung des Typs `any` teilen Sie dem TypeScript-Compiler mit, dass Werte ohne Einschränkungen dargestellt werden sollen. Beachten Sie Folgendes, um die Typsicherheit in Ihrem Code zu maximieren:

* Beschränken Sie die Verwendung von `any` auf bestimmte Fälle, in denen der Typ wirklich unbekannt ist.
* Geben Sie aus einer Funktion keine `any`-Typen zurück, da dies die Typsicherheit im Code schwächt, der sie verwendet.
* Verwenden Sie anstelle von `any` `@ts-ignore`, wenn Sie den Compiler stummschalten müssen.

```typescript
let value: any;
value = true; // Valid
value = 7; // Valid
```

