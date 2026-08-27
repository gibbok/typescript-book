---
title: テンプレートユニオン型
sidebar:
  order: 44
  label: 44. テンプレートユニオン型
---


テンプレートユニオン型は、たとえば次のように、型システム内でテキストを結合および操作するために使用できます。

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

