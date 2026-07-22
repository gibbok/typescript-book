---
title: Mall-unionstyper
sidebar:
  order: 46
  label: 46. Mall-unionstyper
---


Mall-unionstyper kan användas för att slå samman och manipulera text inuti typsystemet, till exempel:

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

