---
title: Namespacing
sidebar:
  order: 57
  label: 57. Namespacing
---


No TypeScript, os namespaces são usados para organizar o código em contêineres lógicos, evitando colisões de nomes e fornecendo uma maneira de agrupar códigos relacionados.
O uso das palavras-chave `export` permite o acesso ao namespace em módulos externos.

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

