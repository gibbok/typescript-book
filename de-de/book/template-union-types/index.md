# Template-Union-Typen



Template-Union-Typen können beispielsweise verwendet werden, um Text innerhalb des Typsystems zusammenzuführen und zu bearbeiten:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

