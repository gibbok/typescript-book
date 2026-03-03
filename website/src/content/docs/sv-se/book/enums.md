---
title: Enums
sidebar:
  order: 19
  label: 19. Enums
---


I TypeScript är en `enum` en uppsättning namngivna konstantvärden.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Enums kan definieras på olika sätt:

### Numeriska enums

I TypeScript är en numerisk Enum en Enum där varje konstant tilldelas ett numeriskt värde, med start från 0 som standard.

```typescript
enum Size {
    Small, // värde startar från 0
    Medium,
    Large,
}
```

Det är möjligt att ange anpassade värden genom att explicit tilldela dem:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Sträng-enums

I TypeScript är en sträng-Enum en Enum där varje konstant tilldelas ett strängvärde.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Notera: TypeScript tillåter användning av heterogena Enums där sträng- och numeriska medlemmar kan samexistera.

### Konstanta enums

En konstant enum i TypeScript är en speciell typ av Enum där alla värden är kända vid kompileringstid och infogas överallt där enum:en används, vilket resulterar i mer effektiv kod.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Kommer att kompileras till:

```typescript
console.log('EN' /* Language.English */);
```

Noteringar:
Konstanta Enums har hårdkodade värden som raderar Enum:en, vilket kan vara mer effektivt i fristående bibliotek men är i allmänhet inte önskvärt. Dessutom kan konstanta enums inte ha beräknade medlemmar.

### Omvänd mappning

I TypeScript avser omvänd mappning i Enums möjligheten att hämta Enum-medlemmens namn från dess värde. Som standard har Enum-medlemmar framåtmappningar från namn till värde, men omvända mappningar kan skapas genom att explicit ange värden för varje medlem. Omvända mappningar är användbara när du behöver slå upp en Enum-medlem efter dess värde, eller när du behöver iterera över alla Enum-medlemmar. Observera att bara numeriska Enum-medlemmar genererar omvända mappningar, medan sträng-Enum-medlemmar inte genererar någon omvänd mappning alls.

Följande enum:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

Kompileras till:

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

Därför fungerar mappning av värden till nycklar för numeriska enum-medlemmar, men inte för sträng-enum-medlemmar:

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
console.log(Grade[failGrade]); // Element har implicit en 'any'-typ eftersom indexuttrycket inte är av typen 'number'.
```

### Omgivande enums

En omgivande enum i TypeScript är en typ av Enum som definieras i en deklarationsfil (*.d.ts) utan en associerad implementation. Den låter dig definiera en uppsättning namngivna konstanter som kan användas på ett typsäkert sätt över olika filer utan att behöva importera implementationsdetaljerna i varje fil.

### Beräknade och konstanta medlemmar

I TypeScript är en beräknad medlem en medlem av en Enum som har ett värde som beräknas vid körning, medan en konstant medlem är en medlem vars värde sätts vid kompileringstid och inte kan ändras under körning. Beräknade medlemmar är tillåtna i vanliga Enums, medan konstanta medlemmar är tillåtna i både vanliga och const enums.

```typescript
// Konstanta medlemmar
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 generation at compilation time
```

```typescript
// Beräknade medlemmar
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // slumpmässigt nummer genererat vid körtid
```

Enums betecknas av unioner som består av deras medlemstyper. Värdena för varje medlem kan bestämmas genom konstanta eller icke-konstanta uttryck, där medlemmar med konstanta värden tilldelas literaltyper. För att illustrera, betrakta deklarationen av typ E och dess undertyper E.A, E.B och E.C. I detta fall representerar E unionen E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numerisk literal
    B = 'bar', // Sträng literal
    C = identity(42), // Opak beräknad
}

console.log(E.C); //42
```

