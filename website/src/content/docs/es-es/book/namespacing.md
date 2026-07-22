---
title: Espacios de nombres
sidebar:
  order: 60
  label: 60. Espacios de nombres
---


En TypeScript, los espacios de nombres organizan el código en contenedores lógicos, evitan colisiones de nombres y agrupan código relacionado.
La palabra clave `export` permite acceder al espacio de nombres desde módulos externos.

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

