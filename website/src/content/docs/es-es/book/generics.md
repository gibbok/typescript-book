---
title: Genéricos
sidebar:
  order: 57
  label: 57. Genéricos
---


Los genéricos permiten crear componentes y funciones reutilizables que trabajan con varios tipos. Permiten parametrizar tipos, funciones e interfaces para que operen con tipos distintos sin especificarlos explícitamente de antemano.

Los genéricos hacen que el código sea más flexible y reutilizable.

### Tipo genérico

Para definir un tipo genérico se utilizan corchetes angulares (`<>`) para especificar sus parámetros. Por ejemplo:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Clases genéricas

Los genéricos también pueden aplicarse a clases para que trabajen con varios tipos mediante parámetros de tipo. Esto permite crear definiciones de clase reutilizables que operan con tipos de datos distintos manteniendo la seguridad de tipos.

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

### Restricciones genéricas

Los parámetros genéricos pueden restringirse mediante la palabra clave `extends` seguida de un tipo o interfaz que el parámetro debe satisfacer.

En el siguiente ejemplo, `T` debe tener una propiedad `length` correctamente tipada para ser válido:

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

Una característica destacada introducida en la versión 3.4 RC es la inferencia de tipos de funciones de orden superior, que propaga los argumentos de tipo genérico:

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

Esta funcionalidad facilita la programación sin puntos con seguridad de tipos, habitual en la programación funcional.

### Restricción contextual de genéricos

La restricción contextual de genéricos permite que el compilador restrinja el tipo de un parámetro genérico según el contexto en el que se utiliza. Resulta útil al trabajar con tipos genéricos en sentencias condicionales:

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

