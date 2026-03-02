---
title: Interface och Type
sidebar:
  order: 48
  label: 48. Interface och Type
---


### Gemensam syntax

I TypeScript definierar interface strukturen hos objekt och specificerar namnen och typerna på egenskaper eller metoder som ett objekt måste ha. Den gemensamma syntaxen för att definiera ett interface i TypeScript är följande:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

På liknande sätt för typdefinition:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` eller `type TypeName`: Definierar namnet på interfacet.
`property1`: `Type1`: Specificerar interfacets egenskaper tillsammans med deras motsvarande typer. Flera egenskaper kan definieras, var och en separerad med ett semikolon.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: Specificerar interfacets metoder. Metoder definieras med sina namn, följt av en parameterlista inom parenteser och returtypen. Flera metoder kan definieras, var och en separerad med ett semikolon.

Exempel på interface:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Exempel på type:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

I TypeScript används typer för att definiera formen på data och upprätthålla typkontroll. Det finns flera vanliga syntaxer för att definiera typer i TypeScript, beroende på det specifika användningsfallet. Här är några exempel:

### Grundläggande typer

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### Objekt och Interface

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Union- och Intersection-typer

```typescript
type MyType = string | number; // Unionstyp
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersektionstyp
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name och age properties
```

