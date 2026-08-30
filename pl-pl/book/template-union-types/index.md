# Szablonowe typy unii



Szablonowe typy unii mogą być używane do łączenia tekstu i manipulowania nim w systemie typów, na przykład:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

