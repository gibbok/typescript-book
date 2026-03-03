---
title: Enums
sidebar:
  order: 19
  label: 19. Enums
---


Enums permitem que um desenvolvedor defina um conjunto de constantes nomeadas. Usar enums pode tornar mais fácil documentar a intenção ou criar um conjunto de casos distintos.

### Enums numéricos

Por padrão, os enums são baseados em números, começando de zero e a cada membro é atribuído um incremento de um.

```typescript
enum Direction {
    Up, // 0
    Down, // 1
    Left, // 2
    Right, // 3
}
```

Você pode atribuir o valor de qualquer membro manualmente, apenas o valor inicial neste caso:

```typescript
enum Direction {
    Up = 1,
    Down, // 2
    Left, // 3
    Right, // 4
}
```

Ou todos os membros:

```typescript
enum Direction {
    Up = 1,
    Down = 2,
    Left = 4,
    Right = 8,
}
```

Para acessar um enum, apenas acesse o membro como uma propriedade fora do enum:

<!-- skip -->
```typescript
const up = Direction.Up;
```

Também é possível acessar pelo valor:

<!-- skip -->
```typescript
const upName = Direction[1]; // Up
```

### Enums de string

Enums de string são similares mas cada valor do enum é inicializado com um valor string (em vez de numérico):

```typescript
enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}
```

### Enums constantes

Um enum constante é definido usando o modificador `const` e pode melhorar o desempenho como os valores do enum são "inlined" durante a compilação:

```typescript
const enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}
```

### Mapeamento reverso

Podemos acessar o valor de um membro e também a um nome de membro do valor em si (então mapeamento reverso). Dado o seguinte enum numérico:

```typescript
enum Direction {
    Up,
    Down,
}
```

Nós podemos fazer:

<!-- skip -->
```typescript
const a = Direction.Up; // 0
const b = Direction[0]; // Up
```

O TypeScript compila isso em:

<!-- skip -->
```typescript
'use strict';
var Direction;
(function (Direction) {
    Direction[(Direction['Up'] = 0)] = 'Up';
    Direction[(Direction['Down'] = 1)] = 'Down';
})(Direction || (Direction = {}));
```

### Enums ambiente

Um enum ambiente é usado para descrever a forma de enums que já existem. Eles são definidos usando a palavra-chave `declare`:

```typescript
declare enum Direction {
    Up,
    Down,
    Left,
    Right,
}
```

### Membros computados e constantes

Cada membro enum tem um valor, que pode ser constante ou computado. Um membro é considerado constante se:

* Não tem um inicializador e o membro anterior era uma constante numérica.
* O membro tem um inicializador constante, uma expressão constante que é um subconjunto de TypeScript que pode ser completamente avaliado em tempo de compilação. Uma expressão é uma expressão constante se é:
  * Literal string ou numérico
  * Referência a um membro enum constante anteriormente definido (pode estar em um enum diferente)
  * Uma expressão constante enum entre parênteses
  * Um dos operadores unários +, -, ~ aplicados a uma expressão constante
  * Operadores binários +, -, *, /, %, <<, >>, >>>, &, |, ^  com expressões constantes como operandos

