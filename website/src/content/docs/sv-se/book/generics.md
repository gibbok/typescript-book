---
title: Generics
sidebar:
  order: 55
  label: 55. Generics
---


Generics gör det möjligt att skapa återanvändbara komponenter och funktioner som kan arbeta med flera typer. Med generics kan du parameterisera typer, funktioner och gränssnitt, vilket gör att de kan arbeta med olika typer utan att explicit specificera dem i förväg.

Generics gör det möjligt att göra koden mer flexibel och återanvändbar.

### Generisk typ

För att definiera en generisk typ använder du vinkelparenteser (`<>`) för att specificera typparametrarna, till exempel:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Generiska klasser

Generics kan även tillämpas på klasser, på så sätt kan de arbeta med flera typer genom att använda typparametrar. Detta är användbart för att skapa återanvändbara klassdefinitioner som kan arbeta med olika datatyper samtidigt som typsäkerheten bibehålls.

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

### Generiska begränsningar

Generiska parametrar kan begränsas med nyckelordet `extends` följt av en typ eller ett gränssnitt som typparametern måste uppfylla.

I följande exempel måste T innehålla en egenskap `length` för att vara giltig:

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

En intressant funktion hos generics som introducerades i version 3.4 RC är typinferens för högre ordningens funktioner, vilket introducerade propagerade generiska typargument:

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

Denna funktionalitet möjliggör enklare typsäker punktfri programmering (pointfree style) vilket är vanligt inom funktionell programmering.

### Generisk kontextuell avsmalning

Kontextuell avsmalning för generics är mekanismen i TypeScript som gör det möjligt för kompilatorn att smalna av typen för en generisk parameter baserat på det sammanhang där den används. Det är användbart vid arbete med generiska typer i villkorssatser:

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

