---
title: Villkorliga typer
sidebar:
  order: 39
  label: 39. Villkorliga typer
---


Villkorliga typer är ett sätt att skapa en typ som beror på ett villkor, där typen som ska skapas bestäms baserat på resultatet av villkoret. De definieras med nyckelordet `extends` och en ternär operator för att villkorligt välja mellan två typer.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

