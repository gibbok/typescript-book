---
title: Enums
sidebar:
  order: 20
  label: 20. Enums
---


En TypeScript, un `enum` es un conjunto de valores constantes con nombre.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Los enums pueden definirse de distintas formas:

### Enums numéricos

En TypeScript, un enum numérico es aquel en el que se asigna un valor numérico a cada constante, comenzando de forma predeterminada por 0.

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

Es posible especificar valores personalizados asignándolos explícitamente:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Enums de cadena

En TypeScript, un enum de cadena es aquel en el que se asigna un valor de cadena a cada constante.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Nota: TypeScript permite utilizar enums heterogéneos en los que coexisten miembros de cadena y numéricos.

### Enums constantes

Un enum constante de TypeScript es un tipo especial de enum cuyos valores se conocen durante la compilación y se insertan allí donde se utiliza el enum, lo que produce un código más eficiente.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Se compilará como:

```typescript
console.log('EN' /* Language.English */);
```

Nota:
Los enums constantes tienen valores codificados directamente y eliminan el enum, lo que puede resultar más eficiente en bibliotecas autocontenidas, aunque por lo general no es deseable. Además, los enums constantes no pueden tener miembros calculados.

### Mapeo inverso

En TypeScript, el mapeo inverso de los enums permite obtener el nombre de un miembro a partir de su valor. De forma predeterminada, los miembros tienen un mapeo directo del nombre al valor, pero pueden crearse mapeos inversos asignando explícitamente valores a cada miembro. Resultan útiles para buscar un miembro por su valor o recorrer todos los miembros. Solo los miembros numéricos generan mapeos inversos; los miembros de cadena no los generan.

El siguiente enum:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

Se compila como:

<!-- skip -->
```javascript
'use strict';
var Grade;
(function (Grade) {
    Grade[(Grade['A'] = 90)] = 'A';
    Grade[(Grade['B'] = 80)] = 'B';
    Grade[(Grade['C'] = 70)] = 'C';
    Grade['F'] = 'fail';
})(Grade || (Grade = {}));
```

Por tanto, el mapeo de valores a claves funciona con miembros numéricos, pero no con miembros de cadena:

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // Element implicitly has an 'any' type because index expression is not of type 'number'.
```

### Enums de ambiente

Un enum de ambiente de TypeScript se define en un archivo de declaración (*.d.ts) sin una implementación asociada. Permite definir constantes con nombre que pueden utilizarse de forma segura entre distintos archivos sin importar en cada uno los detalles de la implementación.

### Miembros calculados y constantes

En TypeScript, un miembro calculado de un enum tiene un valor calculado en tiempo de ejecución, mientras que el valor de un miembro constante se establece durante la compilación y no puede cambiar en tiempo de ejecución. Los miembros calculados se permiten en enums normales, mientras que los miembros constantes se permiten tanto en enums normales como en enums constantes.

```typescript
// Constant members
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 generation at compilation time
```

```typescript
// Computed members
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // random number generated at run time
```

Los enums se representan mediante uniones de los tipos de sus miembros. El valor de cada miembro puede determinarse mediante expresiones constantes o no constantes; a los miembros con valores constantes se les asignan tipos literales. Considera la declaración del tipo E y sus subtipos E.A, E.B y E.C. En este caso, E representa la unión E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

