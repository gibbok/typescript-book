---
title: 値から型を取得する
sidebar:
  order: 35
  label: 35. 値から型を取得する
---


TypeScript で値から型を取得するとは、型推論を通じて値または式から型が自動的に推論されることを指します。

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

