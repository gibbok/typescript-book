---
title: Overloads
sidebar:
  order: 51
  label: 51. Overloads
---


Sobrecarga de função permite múltiplas assinaturas de função para a mesma função:

```typescript
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: any, b: any): any {
    return a + b;
}
```

