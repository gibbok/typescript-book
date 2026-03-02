---
title: Distributiva villkorliga typer
sidebar:
  order: 40
  label: 40. Distributiva villkorliga typer
---


Distributiva villkorliga typer är en funktion som gör det möjligt att distribuera en typ över en union av typer, genom att tillämpa en transformation på varje medlem av unionen individuellt.
Detta kan vara särskilt användbart vid arbete med mappade typer eller typer av högre ordning.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

