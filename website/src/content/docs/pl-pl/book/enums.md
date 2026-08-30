---
title: Wyliczenia
sidebar:
  order: 20
  label: 20. Wyliczenia
---


W TypeScript `enum` jest zbiorem nazwanych wartości stałych.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Wyliczenia można definiować na różne sposoby:

### Wyliczenia liczbowe

W TypeScript wyliczenie liczbowe to `enum`, w którym każdej stałej przypisana jest wartość liczbowa, domyślnie zaczynająca się od 0.

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

Można określić niestandardowe wartości przez ich jawne przypisanie:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Wyliczenia ciągów znaków

W TypeScript wyliczenie ciągów znaków to `enum`, w którym każdej stałej przypisana jest wartość typu `string`.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Uwaga: TypeScript pozwala na używanie heterogenicznych wyliczeń, w których elementy typu `string` i `number` mogą współistnieć.

### Wyliczenia stałe

Wyliczenie stałe w TypeScript to specjalny typ `enum`, którego wszystkie wartości są znane w czasie kompilacji i wstawiane bezpośrednio wszędzie tam, gdzie używane jest wyliczenie, co zapewnia wydajniejszy kod.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Zostanie skompilowane do:

```typescript
console.log('EN' /* Language.English */);
```

Uwagi:
Wartości wyliczeń stałych są zakodowane na stałe, co powoduje usunięcie wyliczenia i może zapewnić większą wydajność w samodzielnych bibliotekach, ale na ogół nie jest pożądane. Ponadto wyliczenia stałe nie mogą zawierać elementów wyliczanych.

### Mapowanie odwrotne

W TypeScript mapowanie odwrotne w wyliczeniach oznacza możliwość pobrania nazwy elementu wyliczenia na podstawie jego wartości. Domyślnie elementy wyliczenia mają mapowanie w przód z nazwy na wartość, ale mapowanie odwrotne można utworzyć przez jawne ustawienie wartości każdego elementu. Mapowania odwrotne są przydatne, gdy trzeba wyszukać element wyliczenia na podstawie jego wartości lub przejść po wszystkich elementach wyliczenia. Należy pamiętać, że mapowania odwrotne są generowane tylko dla liczbowych elementów wyliczenia, natomiast dla elementów typu `string` nie są generowane w ogóle.

Następujące wyliczenie:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

Jest kompilowane do:

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

Dlatego mapowanie wartości na klucze działa dla liczbowych elementów wyliczenia, ale nie dla elementów typu `string`:

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

### Wyliczenia ambientowe

Wyliczenie ambientowe w TypeScript to rodzaj `enum` zdefiniowanego w pliku deklaracji (*.d.ts) bez powiązanej implementacji. Pozwala ono zdefiniować zestaw nazwanych stałych, których można używać w sposób bezpieczny pod względem typów w różnych plikach bez konieczności importowania szczegółów implementacji do każdego pliku.

### Elementy wyliczane i stałe

W TypeScript element wyliczany to element `enum`, którego wartość jest obliczana w czasie wykonywania, natomiast element stały to element, którego wartość jest ustawiana w czasie kompilacji i nie może zostać zmieniona w czasie wykonywania. Elementy wyliczane są dozwolone w zwykłych wyliczeniach, natomiast elementy stałe są dozwolone zarówno w zwykłych wyliczeniach, jak i w `const enum`.

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

Wyliczenia są reprezentowane przez unie złożone z typów ich elementów. Wartości każdego elementu można określić za pomocą wyrażeń stałych lub niestałych, przy czym elementom o wartościach stałych przypisywane są typy literałowe. Dla zobrazowania rozważmy deklarację typu E i jego podtypów E.A, E.B oraz E.C. W tym przypadku E reprezentuje unię E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

