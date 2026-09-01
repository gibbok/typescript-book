---
title: Template Union Type
sidebar:
  order: 44
  label: 44. Template Union Type
---


Template union type có thể được dùng để kết hợp và thao tác văn bản bên trong hệ thống kiểu, ví dụ:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

