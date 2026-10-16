# Interface et type



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
let myNumber: number = 123; // type number
let myBoolean: boolean = true; // type boolean
let myArray: string[] = ['a', 'b']; // tableau de chaînes
let myTuple: [string, number] = ['a', 123]; // tuple
```

### Objets et interfaces

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### Types union et intersection

```typescript
type MyType = string | number; // Type union
let myUnion: MyType = 'hello'; // Peut être une chaîne
myUnion = 123; // Ou un nombre

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Type intersection
let myCombined: CombinedType = { name: 'John', age: 25 }; // Objet possédant les propriétés name et age
```

