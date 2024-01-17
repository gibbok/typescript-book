---
title: 模板联合类型
sidebar:
  order: 43
  label: 43. 模板联合类型
---


模板联合类型可用于合并和操作类型系统内的文本，例如：

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

