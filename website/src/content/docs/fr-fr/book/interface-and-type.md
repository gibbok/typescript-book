---
title: Interface et type
sidebar:
  order: 49
  label: 49. Interface et type
---


### Syntaxe courante

En TypeScript, les interfaces définissent la structure des objets en précisant les noms et les types des propriétés ou des méthodes qu'un objet doit posséder. La syntaxe courante pour définir une interface en TypeScript est la suivante :

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

De même, pour une définition de type :

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` ou `type TypeName` : définit le nom de l'interface.
`property1` : `Type1` : indique les propriétés de l'interface ainsi que leurs types correspondants. Plusieurs propriétés peuvent être définies, chacune étant séparée par un point-virgule.
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;` : indique les méthodes de l'interface. Les méthodes sont définies avec leur nom, suivi d'une liste de paramètres entre parenthèses et du type de retour. Plusieurs méthodes peuvent être définies, chacune étant séparée par un point-virgule.

Exemple d'interface :

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

Exemple de type :

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

En TypeScript, les types servent à définir la forme des données et à imposer la vérification des types. Il existe plusieurs syntaxes courantes pour définir les types en TypeScript, selon le cas d'utilisation précis. En voici quelques exemples :

### Types de base

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### Objets et interfaces

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Types union et intersection

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

