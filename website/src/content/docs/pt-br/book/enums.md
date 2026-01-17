---
title: Enums
sidebar:
  order: 19
  label: 19. Enums
---


No TypeScript, um `enum` é um conjunto de valores constantes nomeados.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Enums podem ser definidos de diferentes maneiras:

### Enums numéricos

No TypeScript, um Enum Numérico é um Enum onde cada constante recebe um valor numérico, começando de 0 por padrão.

```typescript
enum Size {
    Small, // valor começa de 0
    Medium,
    Large,
}
```

É possível especificar valores customizados atribuindo-os explicitamente:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Enums de string

No TypeScript, um enum de String é um Enum onde cada constante recebe um valor string.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Nota: O TypeScript permite o uso de Enums heterogêneos onde membros string e numéricos podem coexistir.

### Enums constantes

Um enum constante no TypeScript é um tipo especial de Enum onde todos os valores são conhecidos em tempo de compilação e são inline onde quer que o enum seja usado, resultando em código mais eficiente.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Será compilado para:

```typescript
console.log('EN' /* Language.English */);
```

Notas:
Const Enums possuem valores fixos, apagando o Enum, o que pode ser mais eficiente em bibliotecas autocontidas, mas geralmente não é desejável. Além disso, Const enums não podem ter membros computados.

### Mapeamento reverso

No TypeScript, mapeamentos reversos em Enums referem-se à capacidade de recuperar o nome do membro do Enum a partir de seu valor. Por padrão, membros de Enum têm mapeamentos diretos de nome para valor, mas mapeamentos reversos podem ser criados definindo explicitamente valores para cada membro. Mapeamentos reversos são úteis quando você precisa procurar um membro de Enum por seu valor, ou quando você precisa iterar sobre todos os membros do Enum. Observe que apenas membros de enums numéricos gerarão mapeamentos reversos, enquanto membros de Enum de String não geram um mapeamento reverso.

O seguinte enum:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

Compila para:

<!-- skip -->
```javascript
'use strict';
var Grade;
(function (Grade) {
    Grade[(Grade['A'] = 90)] = 'A';
    Grade[(Grade['B'] = 80)] = 'B';
    Grade[(Grade['C'] = 70)] = 'C';
    Grade['F'] = 'fail';
})(Grade || (Grade = {}));
```

Portanto, mapear valores para chaves funciona para membros de enum numéricos, mas não para membros de enum de string:

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // Element implicitly has an 'any' type because index expression is not of type 'number'.
```

### Enums ambientes

Um enum ambiente no TypeScript é um tipo de Enum que é definido em um arquivo de declaração (*.d.ts) sem uma implementação associada. Ele permite que você defina um conjunto de constantes nomeadas que podem ser usadas de forma type-safe em diferentes arquivos sem ter que importar os detalhes de implementação em cada arquivo.

### Membros computados e constantes

No TypeScript, um membro computado é um membro de um Enum que tem um valor calculado em tempo de execução, enquanto um membro constante é um membro cujo valor é definido em tempo de compilação e não pode ser alterado durante a execução. Membros computados são permitidos em Enums regulares, enquanto membros constantes são permitidos tanto em enums regulares quanto em const enums.

```typescript
// Membros constantes
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 geração em tempo de compilação
```

```typescript
// Membros computados
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // número aleatório gerado em tempo de execução
```

Enums são denotados por uniões que compreendem seus tipos de membros. Os valores de cada membro podem ser determinados através de expressões constantes ou não constantes, com membros possuindo valores constantes sendo atribuídos tipos literais. Para ilustrar, considere a declaração do tipo E e seus subtipos E.A, E.B e E.C. Neste caso, E representa a união E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Literal numérico
    B = 'bar', // Literal string
    C = identity(42), // Computado opaco
}

console.log(E.C); //42
```

