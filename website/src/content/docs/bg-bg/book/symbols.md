---
title: Namespacing
sidebar:
  order: 58
  label: 58. Namespacing
---


В TypeScript namespaces се използват за организиране на кода в логически контейнери, предотвратяване на конфликти в имената и групиране на свързан код.
Използването на ключовата дума `export` позволява достъп до namespace от външни модули.

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

