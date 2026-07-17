---
title: Otros
sidebar:
  order: 61
  label: 61. Otros
---


### Gestión de errores y excepciones

TypeScript permite capturar y gestionar errores mediante los mecanismos estándar de JavaScript:

Bloques try-catch-finally:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

También puedes gestionar distintos tipos de errores:

```typescript
try {
    // Code that might throw different types of errors
} catch (error) {
    if (error instanceof TypeError) {
        // Handle TypeError
    } else if (error instanceof RangeError) {
        // Handle RangeError
    } else {
        // Handle other errors
    }
}
```

Tipos de error personalizados:

Es posible especificar errores más concretos extendiendo la `class` Error:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Clases mixin

Las clases mixin permiten combinar y componer el comportamiento de varias clases en una sola. Permiten reutilizar y ampliar funcionalidad sin necesidad de cadenas de herencia profundas.

```typescript
abstract class Identifiable {
    name: string = '';
    logId() {
        console.log('id:', this.name);
    }
}
abstract class Selectable {
    selected: boolean = false;
    select() {
        this.selected = true;
        console.log('Select');
    }
    deselect() {
        this.selected = false;
        console.log('Deselect');
    }
}
class MyClass {
    constructor() {}
}

// Extend MyClass to include the behavior of Identifiable and Selectable
interface MyClass extends Identifiable, Selectable {}

// Function to apply mixins to a class
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            let descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Apply the mixins to MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### Características asíncronas del lenguaje

Como TypeScript es un superconjunto de JavaScript, incorpora sus características asíncronas, como:

Promesas:

Las promesas permiten gestionar operaciones asíncronas y sus resultados mediante métodos como `.then()` y `.catch()` para tratar los casos de éxito y error.

Más información: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Las palabras clave async/await ofrecen una sintaxis de aspecto más síncrono para trabajar con promesas. `async` define una función asíncrona y `await` pausa su ejecución hasta que una promesa se resuelve o rechaza.

Más información:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

Las siguientes API cuentan con una buena compatibilidad en TypeScript:

API Fetch:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Iteradores y generadores

TypeScript ofrece una buena compatibilidad tanto con iteradores como con generadores.

Los iteradores son objetos que implementan el protocolo de iteración y permiten acceder uno a uno a los elementos de una colección o secuencia. Contienen un puntero al siguiente elemento y un método `next()` que devuelve el siguiente valor junto con un booleano que indica si la secuencia ha finalizado (`done`).

```typescript
class NumberIterator implements Iterable<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    public next(): IteratorResult<number> {
        if (this.current <= this.end) {
            const value = this.current;
            this.current++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

const iterator = new NumberIterator(1, 3);

for (const num of iterator) {
    console.log(num);
}
```

Los generadores son funciones especiales definidas mediante la sintaxis `function*` que simplifican la creación de iteradores. Utilizan `yield` para definir la secuencia de valores y pausan y reanudan automáticamente la ejecución cuando se solicitan valores.

Los generadores facilitan la creación de iteradores y resultan especialmente útiles con secuencias grandes o infinitas.

Ejemplo:

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = numberGenerator(1, 5);

for (const num of generator) {
    console.log(num);
}
```

TypeScript también admite iteradores y generadores asíncronos.

Más información:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### Referencia de TsDocs y JSDoc

Al trabajar con una base de código JavaScript, los comentarios JSDoc con anotaciones adicionales pueden ayudar a TypeScript a inferir el tipo correcto.

Ejemplo:

```typescript
/**
 * Computes the power of a given number
 * @constructor
 * @param {number} base – The base value of the expression
 * @param {number} exponent – The exponent value of the expression
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

La documentación completa está disponible en:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Desde la versión 3.7 es posible generar definiciones de tipos .d.ts a partir de la sintaxis JSDoc de JavaScript.
Encontrarás más información en:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Los paquetes de la organización @types siguen una convención especial de nombres para proporcionar definiciones de tipos de bibliotecas o módulos JavaScript existentes. Por ejemplo:

```shell
npm install --save-dev @types/lodash
```

instalará las definiciones de tipos de `lodash` en el proyecto actual.

Para contribuir a las definiciones de un paquete `@types`, envía una solicitud de incorporación de cambios a [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) es una extensión de la sintaxis de JavaScript que permite escribir código similar a HTML dentro de archivos JavaScript o TypeScript. Se utiliza habitualmente en React para definir la estructura HTML.

TypeScript amplía las capacidades de JSX mediante comprobación de tipos y análisis estático.

Para utilizar JSX debes establecer la opción `jsx` del compilador en `tsconfig.json`. Dos opciones habituales son:

* "preserve": emite archivos .jsx con JSX sin cambios. Indica a TypeScript que no transforme la sintaxis JSX durante la compilación. Puede utilizarse si otra herramienta, como Babel, realiza la transformación.
* "react": activa la transformación JSX integrada de TypeScript. Se utilizará React.createElement.

Todas las opciones están disponibles en:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### Módulos ES6

TypeScript admite ES6 (ECMAScript 2015) y muchas versiones posteriores. Esto permite utilizar sintaxis de ES6, como funciones flecha, literales de plantilla, clases, módulos y desestructuración, entre otras características.

Para activar las características de ES6 en el proyecto, puedes especificar la propiedad `target` en tsconfig.json.

Ejemplo de configuración:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### Operador de exponenciación de ES7

El operador de exponenciación (`**`) calcula el valor obtenido al elevar el primer operando a la potencia del segundo. Funciona de forma similar a `Math.pow()`, pero también acepta valores `bigint` como operandos.
TypeScript admite completamente este operador al establecer `target` en `es2016` o una versión superior en tsconfig.json.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### La sentencia for-await-of

Esta característica de JavaScript, totalmente compatible con TypeScript, permite recorrer objetos iterables asíncronos cuando la versión de destino es `es2018`.

```typescript
async function* asyncNumbers(): AsyncIterableIterator<number> {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    for await (const num of asyncNumbers()) {
        console.log(num);
    }
})();
```

### Metapropiedad new target

La metapropiedad `new.target` permite determinar si una función o un constructor se invocó mediante el operador new. Así se puede detectar si un objeto se creó como resultado de una llamada a un constructor.

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Logs the constructor function used to create an instance
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const parentX = new Parent(); // [Function: Parent]
const child = new Child(); // [Function: Child]
```

### Expresiones de importación dinámica

Es posible cargar módulos de forma condicional o diferida bajo demanda mediante la propuesta de importación dinámica de ECMAScript, compatible con TypeScript.

La sintaxis de las expresiones de importación dinámica es la siguiente:

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Dynamic import
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

Este comando inicia el compilador de TypeScript con el parámetro `--watch`, que recompila automáticamente los archivos TypeScript cuando se modifican.

```shell
tsc --watch
```

Desde TypeScript 4.9, la supervisión de archivos utiliza principalmente eventos del sistema de archivos y recurre automáticamente al sondeo si no puede establecerse un observador basado en eventos.

### Operador de aserción no nula

El operador de aserción no nula (! posfijo), también llamado aserción de asignación definida, permite afirmar que una variable o propiedad no es null ni undefined aunque el análisis estático sugiera lo contrario. Así pueden eliminarse comprobaciones explícitas.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Declaraciones con valores predeterminados

Las declaraciones con valores predeterminados se utilizan cuando se asigna un valor predeterminado a una variable o parámetro. Si no se proporciona ningún valor, se utilizará el predeterminado.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Encadenamiento opcional

El operador de encadenamiento opcional `?.` funciona como el operador de punto (`.`) al acceder a propiedades o métodos. Sin embargo, gestiona valores null o undefined terminando la expresión y devolviendo `undefined` en lugar de generar un error.

```typescript
type Person = {
    name: string;
    age?: number;
    address?: {
        street?: string;
        city?: string;
    };
};

const person: Person = {
    name: 'John',
};

console.log(person.address?.city); // undefined
```

### Operador de fusión de valores nulos

El operador de fusión de valores nulos `??` devuelve el valor del lado derecho si el izquierdo es `null` o `undefined`; en caso contrario, devuelve el del lado izquierdo.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Tipos literales de plantilla

Los tipos literales de plantilla permiten manipular valores de cadena en el nivel de tipos y generar tipos de cadena nuevos a partir de otros existentes. Resultan útiles para crear tipos más expresivos y precisos mediante operaciones con cadenas.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Sobrecarga de funciones

La sobrecarga de funciones permite definir varias firmas para un mismo nombre de función, cada una con distintos tipos de parámetros y de retorno.
Al llamar a una función sobrecargada, TypeScript utiliza los argumentos proporcionados para determinar la firma correcta:

```typescript
function makeGreeting(name: string): string;
function makeGreeting(names: string[]): string[];

function makeGreeting(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Hi ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Hi, ${name}!`);
    }
    throw new Error('Unable to greet');
}

makeGreeting('Simon');
makeGreeting(['Simone', 'John']);
```

### Tipos recursivos

Un tipo recursivo puede hacer referencia a sí mismo. Resulta útil para definir estructuras de datos jerárquicas o recursivas, con anidamiento potencialmente infinito, como listas enlazadas, árboles y grafos.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Tipos condicionales recursivos

En TypeScript es posible definir relaciones de tipos complejas mediante lógica y recursión.
Veámoslo en términos sencillos:

Los tipos condicionales permiten definir tipos basados en condiciones booleanas:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

La recursión consiste en una definición de tipo que hace referencia a sí misma:

```typescript
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const data: Json = {
    prop1: true,
    prop2: 'prop2',
    prop3: {
        prop4: [],
    },
};
```

Los tipos condicionales recursivos combinan la lógica condicional y la recursión. Una definición puede depender de sí misma mediante lógica condicional y crear relaciones de tipos complejas y flexibles.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Compatibilidad con módulos ECMAScript en Node

Node.js añadió compatibilidad con módulos ECMAScript en la versión 15.3.0 y TypeScript la ofrece para Node.js desde la versión 4.7. Puede activarse mediante la propiedad `module` con el valor `nodenext` en tsconfig.json. Por ejemplo:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js admite dos extensiones para módulos: `.mjs` para módulos ES y `.cjs` para CommonJS. Las extensiones equivalentes de TypeScript son `.mts` y `.cts`. Al transpilarlos a JavaScript, el compilador crea archivos `.mjs` y `.cjs`.

Para utilizar módulos ES puedes establecer la propiedad `type` en "module" en package.json. Esto indica a Node.js que trate el proyecto como un proyecto de módulos ES.

TypeScript también admite declaraciones de tipos en archivos `.d.ts`. Estos archivos proporcionan información de tipos para bibliotecas o módulos escritos en TypeScript y permiten que otros desarrolladores los utilicen con las funciones de comprobación de tipos y finalización automática de TypeScript.

### Funciones de aserción

En TypeScript, las funciones de aserción permiten verificar una condición concreta a partir de su valor de retorno. En su forma más sencilla, examinan un predicado y generan un error cuando se evalúa como falso.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

También puede declararse como expresión de función:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Las funciones de aserción se parecen a las guardas de tipo. Estas se introdujeron para realizar comprobaciones en tiempo de ejecución y garantizar el tipo de un valor dentro de un ámbito concreto.
En particular, una guarda de tipo evalúa un predicado y devuelve un booleano que indica si es verdadero o falso. Las funciones de aserción, en cambio, pretenden lanzar un error en lugar de devolver false cuando no se satisface el predicado.

Ejemplo de guarda de tipo:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Tipos de tupla variádicos

Los tipos de tupla variádicos se introdujeron en TypeScript 4.0. Empecemos recordando qué es una tupla:

Un tipo de tupla es un array de longitud definida en el que se conoce el tipo de cada elemento:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

El término «variádico» significa aridad indefinida (aceptar un número variable de argumentos).

Una tupla variádica conserva todas las propiedades anteriores, pero su forma exacta aún no está definida:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

En el código anterior, la forma de la tupla viene definida por el genérico `T` proporcionado.

Las tuplas variádicas pueden aceptar varios genéricos, lo que las hace muy flexibles:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Con las nuevas tuplas variádicas podemos utilizar:

* Las expansiones de la sintaxis de tipos de tupla ahora pueden ser genéricas, por lo que podemos representar operaciones de orden superior sobre tuplas y arrays aunque no conozcamos los tipos reales.
* Los elementos rest pueden aparecer en cualquier posición de una tupla.

Ejemplo:

```typescript
type Items = readonly unknown[];

function concat<T extends Items, U extends Items>(
    arr1: T,
    arr2: U
): [...T, ...U] {
    return [...arr1, ...arr2];
}

concat([1, 2, 3], ['4', '5', '6']); // [1, 2, 3, "4", "5", "6"]
```

### Tipos envoltorio

Los tipos envoltorio son objetos contenedores que representan tipos primitivos como objetos. Proporcionan funcionalidad y métodos adicionales que no están disponibles directamente en los valores primitivos.

Al acceder a un método como `charAt` o `normalize` sobre un primitivo `string`, JavaScript lo envuelve en un objeto `String`, llama al método y después descarta el objeto.

Demostración:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript representa esta diferencia proporcionando tipos distintos para los primitivos y sus objetos contenedores:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Los tipos envoltorio no suelen ser necesarios. Evítalos y utiliza los tipos primitivos; por ejemplo, `string` en lugar de `String`.

### Covarianza y contravarianza en TypeScript

La covarianza y la contravarianza describen cómo se comportan las relaciones de tipos en los tipos genéricos.

En TypeScript:

* Los arrays son **covariantes**, aunque esto no es completamente seguro.
* Los tipos de parámetros de funciones son:
  * **contravariantes** cuando `strictFunctionTypes` está activado;
  * **bivariantes** en caso contrario.

La covarianza conserva la relación: si A es subtipo de B, `F<A>` también es subtipo de `F<B>`. En TypeScript aparece habitualmente en tipos de retorno y arrays, aunque la covarianza de arrays no es completamente segura.

La contravarianza invierte la relación: si A es subtipo de B, `F<B>` es subtipo de `F<A>`. Los parámetros de funciones pretenden ser contravariantes, por lo que una función que acepta un tipo más amplio puede utilizarse donde se espera uno más restringido.

Sin embargo, TypeScript suele permitir en la práctica la bivarianza de parámetros (salvo que `strictFunctionTypes` esté activado), por lo que puede aceptar ambas direcciones aunque no sean estrictamente seguras.

Ejemplo: imagina un espacio para todos los animales y otro exclusivamente para perros.

* **Covarianza**:  
  Puedes utilizar un «espacio de perros» donde se espera un «espacio de animales», porque todos los perros son animales.  
  No puedes utilizar un «espacio de animales» donde se espera un «espacio de perros», porque podría contener otros animales.

* **Contravarianza** (en términos de funciones):  
  Si algo puede gestionar **cualquier animal**, puedes utilizarlo donde se espera algo que gestione **solo perros**.  
  Pero no a la inversa.

Ejemplo de covarianza:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

let animals: Animal[] = [];
let dogs: Dog[] = [];

// Arrays are covariant in TypeScript (but not type-safe)
animals = dogs; // allowed
dogs = animals; // error
```

Ejemplo de contravarianza:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

type Feed<T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = animal => {
    console.log(animal.name);
};

let feedDog: Feed<Dog> = dog => {
    console.log(dog.breed);
};

// Intended contravariance:
feedDog = feedAnimal; // safe

// This depends on compiler settings:
feedAnimal = feedDog; // error only with strictFunctionTypes
```

#### Anotaciones opcionales de varianza para parámetros de tipo

Desde TypeScript 4.7.0 podemos utilizar las palabras clave `out` e `in` para especificar anotaciones de varianza.

Para la covarianza, utiliza `out`:

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

Para la contravarianza, utiliza `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### Firmas de índice con patrones de cadenas de plantilla

Las firmas de índice con patrones de cadenas de plantilla permiten definir firmas flexibles mediante patrones de cadenas. Esta característica permite crear objetos indexables con patrones concretos de claves de cadena y proporciona más control y precisión al acceder y manipular propiedades.

Desde la versión 4.4, TypeScript admite firmas de índice para símbolos y patrones de cadenas de plantilla.

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Unique symbol key',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### El operador satisfies

El operador `satisfies` permite comprobar si un tipo satisface una interfaz o condición concreta. Garantiza que tenga todas las propiedades y métodos obligatorios de una interfaz determinada y que una variable se ajuste a la definición de un tipo.
Este es un ejemplo:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Type Annotation using `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// In the following lines, TypeScript won't be able to infer properly
user.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user.nickName; // string | string[] | undefined

// Type assertion using `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Here too, TypeScript won't be able to infer properly
user2.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user2.nickName; // string | string[] | undefined

// Using the `satisfies` operator we can properly infer the types now
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infers correctly: string[]
user3.nickName; // TypeScript infers correctly: undefined
```

### Importaciones y exportaciones solo de tipos

Las importaciones y exportaciones solo de tipos permiten importar o exportar tipos sin los valores o funciones asociados. Esto puede ayudar a reducir el tamaño del paquete.

Para utilizarlas, puedes emplear la palabra clave `import type`.

TypeScript permite utilizar extensiones de archivos de declaración e implementación (.ts, .mts, .cts y .tsx) en importaciones solo de tipos, independientemente de la configuración de `allowImportingTsExtensions`.

Por ejemplo:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Se admiten las siguientes formas:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### Declaración using y gestión explícita de recursos

Una declaración `using` es una vinculación inmutable con ámbito de bloque, similar a `const`, que gestiona recursos desechables. Al inicializarse con un valor, se registra su método `Symbol.dispose`, que se ejecuta al salir del bloque contenedor.

Se basa en la gestión de recursos de ECMAScript, útil para realizar tareas de limpieza esenciales después de crear objetos, como cerrar conexiones, eliminar archivos y liberar memoria.

Notas:

* Debido a su reciente introducción en TypeScript 5.2, la mayoría de los entornos no ofrece compatibilidad nativa. Necesitarás polyfills para `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack` y `SuppressedError`.
* Además, deberás configurar tsconfig.json de la siguiente forma:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

Ejemplo:

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // Simple polyfill

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // Resource is declared
    console.log(2);
} // Resource is disposed (e.g., `work[Symbol.dispose]()` is evaluated)

console.log(3);
```

El código muestra:

```shell
1
2
disposed
3
```

Un recurso desechable debe ajustarse a la interfaz `Disposable`:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

Las declaraciones `using` registran las operaciones de liberación en una pila para garantizar que los recursos se liberen en orden inverso al de su declaración:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

Se garantiza que los recursos se liberen aunque el código posterior o las excepciones interrumpan la ejecución. La liberación puede lanzar una excepción y ocultar otra. Para conservar información sobre los errores suprimidos se introduce la excepción nativa `SuppressedError`.

#### Declaración await using

Una declaración `await using` gestiona un recurso desechable de forma asíncrona. El valor debe tener un método `Symbol.asyncDispose`, que se esperará al final del bloque.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

Un recurso desechable de forma asíncrona debe ajustarse a la interfaz `Disposable` o `AsyncDisposable`:

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Simple polyfill

class DatabaseConnection implements AsyncDisposable {
    // A method that is called when the object is disposed asynchronously
    [Symbol.asyncDispose]() {
        // Close the connection and return a promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Create a new connection and dispose it asynchronously when it goes out of scope
    await using connection = new DatabaseConnection(); //  Resource is declared
    console.log('Doing some work...');
} // Resource is disposed (e.g., `await connection[Symbol.asyncDispose]()` is evaluated)

doWork();
```

El código muestra:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

Las declaraciones `using` y `await using` se permiten en las sentencias `for`, `for-in`, `for-of`, `for-await-of` y `switch`.

### Atributos de importación

Los atributos de importación de TypeScript 5.3 indican al entorno cómo gestionar módulos como JSON. Mejoran la seguridad al hacer explícitas las importaciones y se ajustan a la Política de Seguridad de Contenidos (CSP) para cargar recursos de forma más segura. TypeScript comprueba su validez, pero deja su interpretación al entorno de ejecución.

Ejemplo:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

Con importación dinámica:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### Comprobación de la sintaxis de expresiones regulares

Desde TypeScript 5.5.4 se comprueban durante la compilación errores habituales en literales de expresiones regulares, como sintaxis no válida, referencias inversas incorrectas o características incompatibles con la versión de JavaScript de destino. Esto permite detectar errores antes, pero no comprueba las cadenas pasadas a new RegExp("...").

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

`import defer` permite cargar un módulo y retrasar su ejecución hasta que se utiliza alguna de sus exportaciones. Esto evita trabajo y efectos secundarios innecesarios.

* Solo funciona con `import defer * as name from "module"`.
* El código solo se ejecuta al acceder a una exportación.
