---
title: Interface e Type
sidebar:
  order: 48
  label: 48. Interface e Type
---


### Sintaxe Comum

No TypeScript, interfaces definem a estrutura de objetos, especificando os nomes e tipos de propriedades ou métodos que um objeto deve ter. A sintaxe comum para definir uma interface no TypeScript é a seguinte:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

Similarmente para definição de tipo:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` ou `type TypeName`: Define o nome da interface.
`property1`: `Type1`: Especifica as propriedades da interface junto com seus tipos correspondentes. Múltiplas propriedades podem ser definidas, cada uma separada por ponto e vírgula.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: Especifica os métodos da interface. Métodos são definidos com seus nomes, seguidos por uma lista de parâmetros entre parênteses e o tipo de retorno. Múltiplos métodos podem ser definidos, cada um separado por ponto e vírgula.

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

No TypeScript, tipos são usados para definir a forma dos dados e impor verificação de tipos. Existem várias sintaxes comuns para definir tipos no TypeScript, dependendo do caso de uso específico. Aqui estão alguns exemplos:

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

### Tipos Union e Intersection

```typescript
type MyType = string | number; // Tipo Union
let myUnion: MyType = 'hello'; // Pode ser uma string
myUnion = 123; // Ou um número

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Tipo Intersection
let myCombined: CombinedType = { name: 'John', age: 25 }; // Objeto com propriedades name e age
```

