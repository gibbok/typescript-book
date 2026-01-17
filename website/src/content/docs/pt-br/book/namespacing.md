---
title: Namespacing
sidebar:
  order: 57
  label: 57. Namespacing
---


No TypeScript, namespaces são usados para organizar código em contêineres lógicos, prevenindo colisões de nomes e fornecendo uma maneira de agrupar código relacionado.
O uso da palavra-chave `export` permite acesso ao namespace em módulos "externos".

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

