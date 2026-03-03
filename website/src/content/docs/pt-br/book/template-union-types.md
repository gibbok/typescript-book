---
title: Tipos Union de Template
sidebar:
  order: 43
  label: 43. Tipos Union de Template
---


Tipos Union de Template em TypeScript permitem criar novas uniões de string concatenando, transformando ou combinando tipos string literais existentes.

```typescript
type Color = 'red' | 'blue';
type Size = 'small' | 'large';
type Style = `${Color}-${Size}`; // 'red-small' | 'red-large' | 'blue-small' | 'blue-large'
```

