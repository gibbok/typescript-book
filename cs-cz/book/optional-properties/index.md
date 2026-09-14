# Volitelné vlastnosti



Objekt může určit volitelné vlastnosti přidáním otazníku `?` na konec názvu vlastnosti:

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

Pokud je vlastnost volitelná, lze zadat výchozí hodnotu:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

