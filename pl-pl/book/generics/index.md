# Typy generyczne



Typy generyczne umożliwiają tworzenie komponentów i funkcji wielokrotnego użytku, które mogą współpracować z wieloma typami. Dzięki typom generycznym można parametryzować typy, funkcje i interfejsy, co pozwala im działać na różnych typach bez konieczności ich wcześniejszego jawnego określania.

Typy generyczne pozwalają tworzyć bardziej elastyczny kod wielokrotnego użytku.

### Typ generyczny

Aby zdefiniować typ generyczny, należy użyć nawiasów ostrych (`<>`) do określenia parametrów typu, na przykład:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Klasy generyczne

Typy generyczne można również stosować do klas, dzięki czemu mogą one współpracować z wieloma typami za pomocą parametrów typu. Jest to przydatne podczas tworzenia definicji klas wielokrotnego użytku, które mogą działać na różnych typach danych przy zachowaniu bezpieczeństwa typów.

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

### Ograniczenia typów generycznych

Parametry generyczne można ograniczać za pomocą słowa kluczowego `extends`, po którym podaje się typ lub interfejs, z którym parametr typu musi być zgodny.

W poniższym przykładzie typ `T` musi mieć prawidłowo typowaną właściwość `length`, aby był poprawny:

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

Istotną funkcją typów generycznych, wprowadzoną w wersji 3.4 RC, jest wnioskowanie typów dla funkcji wyższego rzędu, które propaguje argumenty typów generycznych:

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

Ta funkcjonalność ułatwia bezpieczne pod względem typów programowanie w stylu bezpunktowym (point-free), często spotykanym w programowaniu funkcyjnym.

### Kontekstowe zawężanie typów generycznych

Kontekstowe zawężanie typów generycznych to mechanizm TypeScriptu, który umożliwia kompilatorowi zawężenie typu parametru generycznego na podstawie kontekstu, w którym jest on używany. Jest to przydatne podczas pracy z typami generycznymi w instrukcjach warunkowych:

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

