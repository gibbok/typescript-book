---
title: Tupla de Tamanho Fixo
sidebar:
  order: 30
  label: 30. Tupla de Tamanho Fixo
---


Uma Tupla de Tamanho Fixo é um tipo específico de tupla que impõe um número fixo de elementos de tipos específicos e não permite quaisquer modificações no tamanho da tupla uma vez definida.

Tuplas de Tamanho Fixo são úteis quando você precisa representar uma coleção de valores com um número específico de elementos e tipos específicos, e deseja garantir que o tamanho e os tipos da tupla não possam ser alterados inadvertidamente.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Erro
```

