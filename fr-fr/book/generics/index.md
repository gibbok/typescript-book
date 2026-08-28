# Génériques



Les génériques permettent de créer des composants et des fonctions réutilisables pouvant fonctionner avec plusieurs types. Grâce aux génériques, vous pouvez paramétrer des types, des fonctions et des interfaces, ce qui leur permet d'opérer sur différents types sans les spécifier explicitement au préalable.

Les génériques permettent de rendre le code plus flexible et réutilisable.

### Type générique

Pour définir un type générique, vous utilisez des chevrons (`<>`) afin de spécifier les paramètres de type, par exemple :

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Classes génériques

Les génériques peuvent également être appliqués aux classes. Celles-ci peuvent ainsi fonctionner avec plusieurs types à l'aide de paramètres de type. C'est utile pour créer des définitions de classes réutilisables capables d'opérer sur différents types de données tout en préservant la sécurité du typage.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### Contraintes génériques

Les paramètres génériques peuvent être contraints à l'aide du mot-clé `extends`, suivi d'un type ou d'une interface que le paramètre de type doit respecter.

Dans l'exemple suivant, `T` doit posséder une propriété `length` correctement typée pour être valide :

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Invalid
```

Une fonctionnalité générique notable introduite dans la version 3.4 RC est l'inférence de type des fonctions d'ordre supérieur, qui propage les arguments de type générique :

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

Cette fonctionnalité facilite la programmation avec un typage sûr dans un style point-free, courant en programmation fonctionnelle.

### Réduction contextuelle des génériques

La réduction contextuelle des génériques est le mécanisme de TypeScript qui permet au compilateur de restreindre le type d'un paramètre générique en fonction du contexte dans lequel il est utilisé. Elle est utile lorsque des types génériques sont employés dans des instructions conditionnelles :

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value is narrowed down to type 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value is narrowed down to type 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

