---
title: Tipe dari Nilai
sidebar:
  order: 35
  label: 35. Tipe dari Nilai
---


Tipe dari Nilai dalam TypeScript mengacu pada inferensi otomatis suatu tipe dari nilai atau ekspresi melalui inferensi tipe.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

