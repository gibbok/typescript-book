---
title: Generics
sidebar:
  order: 56
  label: 56. Generics
---


Mit Generics können Sie wiederverwendbare Komponenten und Funktionen erstellen, die mit mehreren Typen arbeiten können. Mithilfe von Generics können Sie Typen, Funktionen und Interfaces parametrisieren, sodass sie mit verschiedenen Typen arbeiten können, ohne diese vorher explizit anzugeben.

Mit Generics können Sie Code flexibler und wiederverwendbarer gestalten.

### Generischer Typ

Um einen generischen Typ zu definieren, verwenden Sie spitze Klammern (`<>`) zur Angabe der Typparameter, zum Beispiel:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Generische Klassen

Generics können auch auf Klassen angewendet werden. Auf diese Weise können diese mithilfe von Typparametern mit mehreren Typen arbeiten. Dies ist nützlich, um wiederverwendbare Klassendefinitionen zu erstellen, die mit verschiedenen Datentypen arbeiten und dabei die Typsicherheit gewährleisten.

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

### Einschränkungen für Generics

Generische Parameter können mit dem Schlüsselwort `extends` eingeschränkt werden, gefolgt von einem Typ oder Interface, dem der Typparameter entsprechen muss.

Im folgenden Beispiel muss `T` über eine korrekt typisierte Eigenschaft `length` verfügen, um gültig zu sein:

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

Eine bemerkenswerte Funktion von Generics, die in Version 3.4 RC eingeführt wurde, ist die Typinferenz für Funktionen höherer Ordnung, die generische Typargumente weitergibt:

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

Diese Funktionalität erleichtert die typsichere Programmierung im pointfree-Stil, die in der funktionalen Programmierung üblich ist.

### Kontextbezogenes Narrowing für Generics

Kontextbezogenes Narrowing für Generics ist der Mechanismus in TypeScript, der es dem Compiler ermöglicht, den Typ eines generischen Parameters anhand des Kontexts einzugrenzen, in dem er verwendet wird. Es ist bei der Arbeit mit generischen Typen in bedingten Anweisungen nützlich:

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

