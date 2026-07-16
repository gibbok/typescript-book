---
title: Tipos primitivos
sidebar:
  order: 10
  label: 10. Tipos primitivos
---


TypeScript admite 7 tipos primitivos. Un tipo de datos primitivo es un tipo que no es un objeto y no tiene métodos asociados. En TypeScript, todos los tipos primitivos son inmutables, lo que significa que sus valores no pueden cambiar una vez asignados.

### string

El tipo primitivo `string` almacena datos de texto y su valor siempre se escribe entre comillas dobles o simples.

```typescript
const x: string = 'x';
const y: string = 'y';
```

Las cadenas pueden ocupar varias líneas si están delimitadas por el carácter de acento grave (`):

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

El tipo de datos `boolean` de TypeScript almacena un valor binario: `true` o `false`.

```typescript
const isReady: boolean = true;
```

### number

Un tipo de datos `number` de TypeScript se representa mediante un valor de coma flotante de 64 bits. Un tipo `number` puede representar enteros y fracciones.
TypeScript también admite valores hexadecimales, binarios y octales. Por ejemplo:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigint

Un `bigint` representa valores enteros que pueden superar el entero seguro máximo admitido por `number`, que es 2^53 - 1.

Puede crearse un `bigint` llamando a la función integrada `BigInt()` o añadiendo `n` al final de cualquier literal numérico entero:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Notas:

* Los valores `bigint` no pueden mezclarse con `number`; para operar juntos, ambos valores deben convertirse al mismo tipo. Tampoco pueden utilizarse con el objeto integrado `Math`.
* Los valores `bigint` solo están disponibles si la configuración de destino es ES2020 o superior.

### Symbol

Los símbolos son identificadores únicos que pueden utilizarse como claves de propiedades en objetos para evitar conflictos de nombres.

```typescript
type Obj = {
    [sym: symbol]: number;
};

const a = Symbol('a');
const b = Symbol('b');
let obj: Obj = {};
obj[a] = 123;
obj[b] = 456;

console.log(obj[a]); // 123
console.log(obj[b]); // 456
```

### null y undefined

Los tipos `null` y `undefined` representan la ausencia de un valor.

El tipo `undefined` significa que el valor no se ha asignado o inicializado, o indica una ausencia involuntaria de valor.

El tipo `null` significa que sabemos que el campo no tiene valor y, por tanto, el valor no está disponible; indica una ausencia intencionada.

### Array

Un `array` es un tipo de datos que puede almacenar varios valores, sean o no del mismo tipo. Puede definirse con la siguiente sintaxis:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript admite arrays de solo lectura mediante la siguiente sintaxis:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript admite tuplas y tuplas de solo lectura:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

El tipo de datos `any` representa literalmente «cualquier» valor y es el predeterminado cuando TypeScript no puede inferir el tipo o este no se especifica.

Al utilizar `any`, el compilador de TypeScript omite la comprobación de tipos, por lo que no hay seguridad de tipos cuando se utiliza `any`. En general, no utilices `any` para silenciar el compilador cuando se produzca un error; céntrate en corregirlo, ya que `any` permite incumplir contratos y perder las ventajas de la finalización automática de TypeScript.

El tipo `any` puede resultar útil durante una migración gradual de JavaScript a TypeScript, ya que permite silenciar el compilador.

En proyectos nuevos, utiliza la configuración `noImplicitAny` de TypeScript, que hace que TypeScript emita errores cuando se utiliza o infiere `any`.

El tipo `any` suele ser una fuente de errores que puede ocultar problemas reales con los tipos. Evita utilizarlo siempre que sea posible.

