---
title: Тип из значения
sidebar:
  order: 35
  label: 35. Тип из значения
---


Тип из значения в TypeScript означает автоматический вывод типа из значения или выражения посредством механизма вывода типов.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

