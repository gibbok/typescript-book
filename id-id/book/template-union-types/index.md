# Tipe Union Template



Tipe union templat dapat digunakan untuk menggabungkan dan memanipulasi teks di dalam sistem tipe, misalnya:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

