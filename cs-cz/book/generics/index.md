# Generika



Generika umožňují vytvářet znovupoužitelné komponenty a funkce, které mohou pracovat s více typy. Pomocí generik můžete parametrizovat typy, funkce a rozhraní, a umožnit jim tak pracovat s různými typy bez nutnosti je předem explicitně určit.

Generika umožňují vytvářet flexibilnější kód, který lze snáze znovu použít.

### Generický typ

Při definování generického typu používáte lomené závorky (`<>`) k určení typových parametrů, například:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Generické třídy

Generika lze použít také u tříd, které tak mohou pomocí typových parametrů pracovat s více typy. To je užitečné pro vytváření znovupoužitelných definic tříd, které mohou pracovat s různými datovými typy při zachování typové bezpečnosti.

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

### Omezení generik

Generické parametry lze omezit pomocí klíčového slova `extends`, za nímž následuje typ nebo rozhraní, které musí typový parametr splňovat.

V následujícím příkladu musí mít `T` správně typovanou vlastnost `length`, aby byl platný:

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

Významnou funkcí generik zavedenou ve verzi 3.4 RC je odvozování typů funkcí vyššího řádu, které přenáší generické typové argumenty:

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

Tato funkčnost usnadňuje typově bezpečné programování ve stylu pointfree, které je běžné ve funkcionálním programování.

### Kontextové zužování typů u generik

Kontextové zužování typů u generik je mechanismus v TypeScriptu, který kompilátoru umožňuje zúžit typ generického parametru na základě kontextu, ve kterém se používá. Je užitečné při práci s generickými typy v podmíněných příkazech:

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

