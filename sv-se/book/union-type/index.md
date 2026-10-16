# Unionstyp



En unionstyp är en typ som representerar ett värde som kan vara en av flera typer. Unionstyper betecknas med symbolen `|` mellan varje möjlig typ.

```typescript
let x: string | number;
x = 'hello'; // Giltigt
x = 123; // Giltigt
```

