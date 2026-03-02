---
title: Typannoteringar
sidebar:
  order: 11
  label: 11. Typannoteringar
---


På variabler som deklareras med `var`, `let` och `const` är det möjligt att valfritt lägga till en typ:

```typescript
const x: number = 1;
```

TypeScript är bra på att härleda typer, särskilt enkla sådana, så dessa deklarationer är i de flesta fall inte nödvändiga.

På funktioner är det möjligt att lägga till typannoteringar på parametrar:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

Följande är ett exempel med en anonym funktion (så kallad lambda-funktion):

```typescript
const sum = (a: number, b: number) => a + b;
```

Dessa annoteringar kan undvikas när ett standardvärde för en parameter finns:

```typescript
const sum = (a = 10, b: number) => a + b;
```

Returtypannoteringar kan läggas till på funktioner:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

Detta är särskilt användbart för mer komplexa funktioner eftersom det att explicit skriva returtypen före en implementation kan hjälpa till att bättre tänka igenom funktionen.

Generellt sett, överväg att annotera typsignaturer men inte lokala variabler i funktionskroppen, och lägg alltid till typer på objektliteraler.

