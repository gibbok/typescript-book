---
title: Typ z hodnoty
sidebar:
  order: 35
  label: 35. Typ z hodnoty
---


Typ z hodnoty v TypeScriptu označuje automatické odvození typu z hodnoty nebo výrazu prostřednictvím odvozování typů.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

