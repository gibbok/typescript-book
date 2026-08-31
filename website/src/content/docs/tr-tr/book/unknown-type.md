---
title: Unknown türü
sidebar:
  order: 46
  label: 46. Unknown türü
---


TypeScript'te `unknown` türü, türü bilinmeyen bir değeri temsil eder. Herhangi bir türde değere izin veren `any` türünün aksine `unknown`, belirli bir şekilde kullanılmadan önce tür kontrolü veya tür onaylaması gerektirir; dolayısıyla önce tür onaylaması yapılmadan ya da daha belirli bir türe daraltılmadan bir `unknown` üzerinde hiçbir işleme izin verilmez.

`unknown` türü yalnızca `any` ve yine `unknown` türüne atanabilir ve `any` için tür güvenli bir alternatiftir.

<!-- skip -->
```typescript
let value: unknown;

let value1: unknown = value; // Valid
let value2: any = value; // Valid
let value3: boolean = value; // Invalid
let value4: number = value; // Invalid
```

```typescript
const add = (a: unknown, b: unknown): number | undefined =>
    typeof a === 'number' && typeof b === 'number' ? a + b : undefined;
console.log(add(1, 2)); // 3
console.log(add('x', 2)); // undefined
```

