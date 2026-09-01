# Şablon Birleşim Türleri



Şablon birleşim türleri, tür sistemi içinde metinleri birleştirmek ve işlemek için kullanılabilir. Örneğin:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

