---
title: Tupla de Comprimento Fixo
sidebar:
  order: 30
  label: 30. Tupla de Comprimento Fixo
---


Uma Tupla de Comprimento Fixo é um tipo específico de tupla que impõe um número fixo de elementos de tipos específicos e proíbe quaisquer modificações no comprimento da tupla uma vez definida.

Tuplas de Comprimento Fixo são úteis quando você precisa representar uma coleção de valores com um número específico de elementos e tipos específicos, e deseja garantir que o comprimento e os tipos da tupla não possam ser alterados inadvertidamente.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Erro
```

