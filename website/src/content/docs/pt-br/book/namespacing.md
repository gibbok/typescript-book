---
title: Namespaces
sidebar:
  order: 58
  label: 58. Namespaces
---


No TypeScript, os namespaces são usados para organizar o código em contêineres lógicos, evitando colisões de nomes e fornecendo uma maneira de agrupar código relacionado.
O uso da palavra-chave `export` permite acessar o namespace a partir de módulos externos.

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

