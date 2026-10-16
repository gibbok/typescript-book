---
title: 값에서 타입 얻기
sidebar:
  order: 35
  label: 35. 값에서 타입 얻기
---


TypeScript에서 값으로부터 타입 얻기란 타입 추론을 통해 값이나 표현식에서 타입을 자동으로 추론하는 것을 의미합니다.

```typescript
const x = 'x'; // TypeScript는 'const'(불변)를 사용하면 'x'를 문자열 리터럴로 추론하지만, 'let'(재할당 가능)을 사용하면 'string'으로 확장합니다.
```

