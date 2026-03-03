---
title: Interface e Type
sidebar:
  order: 48
  label: 48. Interface e Type
---


### Sintaxe Comum

No TypeScript, as interfaces definem a estrutura de objetos, especificando os nomes e tipos de propriedades ou métodos que um objeto deve possuir. A sintaxe comum para definir uma interface no TypeScript é a seguinte:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

Da mesma forma para a definição de tipo (type):

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` ou `type TypeName`: Define o nome da interface/tipo.
`property1`: `Type1`: Especifica as propriedades da interface junto com seus tipos correspondentes. Múltiplas propriedades podem ser definidas, cada uma separada por um ponto e vírgula.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: Especifica os métodos da interface. Métodos são definidos com seus nomes, seguidos por uma lista de parâmetros entre parênteses e o tipo de retorno. Múltiplos métodos podem ser definidas, cada uma separada por um ponto e vírgula.

Exemplo de interface:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Exemplo de tipo:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

No TypeScript, os tipos são usados para definir a forma dos dados e impor a verificação de tipos. Existem várias sintaxes comuns para definir tipos, dependendo do caso de uso específico. Aqui estão alguns exemplos:

### Tipos Básicos

```typescript
let myNumber: number = 123; // tipo number
let myBoolean: boolean = true; // tipo boolean
let myArray: string[] = ['a', 'b']; // array de strings
let myTuple: [string, number] = ['a', 123]; // tupla
```

### Objetos e Interfaces

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Tipos União e Interseção

```typescript
type MyType = string | number; // Tipo União (Union type)
let myUnion: MyType = 'hello'; // Pode ser uma string
myUnion = 123; // Ou um número

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Tipo Interseção (Intersection type)
let myCombined: CombinedType = { name: 'John', age: 25 }; // Objeto com as propriedades name e age
```

