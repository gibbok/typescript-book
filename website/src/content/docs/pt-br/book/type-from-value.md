---
title: Tipo a partir de Valor
sidebar:
  order: 34
  label: 34. Tipo a partir de Valor
---


Em TypeScript, `typeof` pode ser usado para capturar o tipo de um valor:

```typescript
const config = { url: 'https://example.com', port: 8080 };
type Config = typeof config; // { url: string; port: number; }
```

