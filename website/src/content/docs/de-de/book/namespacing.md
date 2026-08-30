---
title: Namespaces
sidebar:
  order: 58
  label: 58. Namespaces
---


In TypeScript werden Namespaces verwendet, um Code in logischen Containern zu organisieren, Namenskollisionen zu vermeiden und zusammengehörigen Code zu gruppieren.
Die Verwendung des Schlüsselworts `export` ermöglicht den Zugriff auf den Namespace von außerhalb von Modulen.

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

