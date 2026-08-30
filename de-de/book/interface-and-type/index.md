# Interface und Typ



### Allgemeine Syntax

In TypeScript definieren Interfaces die Struktur von Objekten. Sie geben die Namen und Typen der Eigenschaften oder Methoden an, die ein Objekt besitzen muss. Die allgemeine Syntax zum Definieren eines Interfaces in TypeScript lautet wie folgt:

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

Ähnlich verhält es sich bei der Definition eines Typs:

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` oder `type TypeName`: Definiert den Namen des Interfaces.
`property1`: `Type1`: Gibt die Eigenschaften des Interfaces zusammen mit ihren jeweiligen Typen an. Es können mehrere Eigenschaften definiert werden, die jeweils durch ein Semikolon getrennt sind.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: Gibt die Methoden des Interfaces an. Methoden werden mit ihrem Namen definiert, gefolgt von einer Parameterliste in Klammern und dem Rückgabetyp. Es können mehrere Methoden definiert werden, die jeweils durch ein Semikolon getrennt sind.

Beispiel für ein Interface:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Beispiel für einen Typ:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

In TypeScript werden Typen verwendet, um die Form von Daten zu definieren und die Typprüfung durchzusetzen. Abhängig vom jeweiligen Anwendungsfall gibt es mehrere gebräuchliche Syntaxvarianten zum Definieren von Typen in TypeScript. Hier sind einige Beispiele:

### Grundlegende Typen

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### Objekte und Interfaces

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Union- und Intersection-Typen

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

