# Šablonové sjednocené typy



Šablonové sjednocené typy lze použít ke spojování textu a manipulaci s ním v rámci typového systému, například:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

