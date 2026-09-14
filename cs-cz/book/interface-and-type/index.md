# Rozhraní a typ



### Obvyklá syntaxe

V TypeScriptu definují rozhraní strukturu objektů a určují názvy a typy vlastností nebo metod, které objekt musí mít. Obvyklá syntaxe pro definici rozhraní v TypeScriptu je následující:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

Podobně pro definici typu:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` nebo `type TypeName`: Definuje název rozhraní.
`property1`: `Type1`: Určuje vlastnosti rozhraní spolu s jejich odpovídajícími typy. Lze definovat více vlastností, každou oddělenou středníkem.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: Určuje metody rozhraní. Metody se definují svými názvy, za nimiž následuje seznam parametrů v závorkách a návratový typ. Lze definovat více metod, každou oddělenou středníkem.

Příklad rozhraní:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Příklad typu:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

V TypeScriptu se typy používají k definování struktury dat a vynucení typové kontroly. Pro definování typů v TypeScriptu existuje několik běžných způsobů zápisu podle konkrétního případu použití. Zde je několik příkladů:

### Základní typy

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### Objekty a rozhraní

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Sjednocení a průniky typů

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

