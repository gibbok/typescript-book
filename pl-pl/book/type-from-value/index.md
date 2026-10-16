# Typ na podstawie wartości



Typ na podstawie wartości w TypeScript oznacza automatyczne wnioskowanie typu z wartości lub wyrażenia za pomocą mechanizmu wnioskowania typów.

```typescript
const x = 'x'; // TypeScript wnioskuje 'x' jako literał tekstowy przy const (niezmienny), ale poszerza do string przy let (możliwe ponowne przypisanie).
```

