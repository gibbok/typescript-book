# Typ na podstawie wartości zwracanej przez funkcję



Typ na podstawie wartości zwracanej przez funkcję oznacza możliwość automatycznego wywnioskowania typu zwracanego przez funkcję na podstawie jej implementacji. Dzięki temu TypeScript może określić typ wartości zwracanej przez funkcję bez jawnych adnotacji typów.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript może wywnioskować, że typ zwracany przez funkcję to number
```

