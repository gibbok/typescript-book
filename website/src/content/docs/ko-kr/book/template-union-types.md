---
title: 템플릿 유니온 타입
sidebar:
  order: 44
  label: 44. 템플릿 유니온 타입
---


템플릿 유니온 타입을 사용하면 타입 시스템 안에서 텍스트를 병합하고 조작할 수 있습니다. 예를 들면 다음과 같습니다.

```typescript
type Status = 'active' | 'inactive';
type Products = 'p1' | 'p2';
type ProductId = `id-${Products}-${Status}`; // "id-p1-active" | "id-p1-inactive" | "id-p2-active" | "id-p2-inactive"
```

