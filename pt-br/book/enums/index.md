# Enums



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

No TypeScript, um enum numérico é um enum em que cada constante recebe um valor numérico, começando em 0 por padrão.

```typescript
enum Size {
    Small, // o valor começa em 0
    Medium,
    Large,
}
```

É possível especificar valores personalizados atribuindo-os explicitamente:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Enums de string

No TypeScript, um enum de string é um enum em que cada constante recebe um valor de string.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Nota: O TypeScript permite o uso de enums heterogêneos, nos quais membros de string e numéricos podem coexistir.

### Enums constantes

Um enum constante (const enum) no TypeScript é um tipo especial de enum em que todos os valores são conhecidos em tempo de compilação e são inseridos diretamente (inlined) onde quer que o enum seja usado, resultando em um código mais eficiente.

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
Enums constantes têm valores fixos (hardcoded), eliminando o enum, o que pode ser mais eficiente em bibliotecas autocontidas, mas geralmente não é desejável. Além disso, enums constantes não podem ter membros computados.

### Mapeamento reverso

No TypeScript, os mapeamentos reversos em enums referem-se à capacidade de recuperar o nome do membro do enum a partir de seu valor. Por padrão, os membros do enum têm mapeamentos diretos (forward mappings) do nome para o valor, mas mapeamentos reversos podem ser criados definindo explicitamente os valores para cada membro. Os mapeamentos reversos são úteis quando você precisa procurar um membro do enum pelo seu valor ou quando precisa iterar sobre todos os membros do enum. Observe que apenas membros de enums numéricos gerarão mapeamentos reversos, enquanto membros de enums de string não possuem um mapeamento reverso gerado.

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

Portanto, mapear valores para chaves funciona para membros de enums numéricos, mas não para membros de enums de string:

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
console.log(failGrade); // Saída: fail
console.log(Grade[failGrade]); // O elemento tem implicitamente o tipo 'any' porque a expressão de índice não é do tipo 'number'.
```

### Enums de ambiente

Um enum de ambiente no TypeScript é um tipo de enum definido em um arquivo de declaração (*.d.ts) sem uma implementação associada. Ele permite definir um conjunto de constantes nomeadas que podem ser usadas com segurança de tipos em diferentes arquivos, sem ter que importar os detalhes da implementação em cada arquivo.

### Membros computados e constantes

No TypeScript, um membro computado é um membro de um enum que possui um valor calculado em tempo de execução, enquanto um membro constante é um membro cujo valor é definido em tempo de compilação e não pode ser alterado em tempo de execução. Membros computados são permitidos em enums regulares, enquanto membros constantes são permitidos tanto em enums regulares quanto em enums constantes (const enums).

```typescript
// Membros constantes
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 gerado em tempo de compilação
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

Enums são representados por uniões compostas pelos tipos de seus membros. Os valores de cada membro podem ser determinados por meio de expressões constantes ou não constantes, com membros que possuem valores constantes recebendo tipos literais. Para ilustrar, considere a declaração do tipo E e seus subtipos E.A, E.B e E.C. Neste caso, E representa a união E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Literal numérico
    B = 'bar', // Literal de string
    C = identity(42), // Computado opaco
}

console.log(E.C); //42
```

