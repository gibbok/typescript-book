---
title: 값에서 타입 얻기
sidebar:
  order: 35
  label: 35. 값에서 타입 얻기
---


TypeScript에서 값으로부터 타입 얻기는 타입 추론을 통해 값이나 표현식에서 타입을 자동으로 추론하는 것을 의미합니다.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

