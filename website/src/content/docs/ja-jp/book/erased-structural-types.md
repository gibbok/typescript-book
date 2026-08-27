---
title: 消去される構造的型
sidebar:
  order: 57
  label: 57. 消去される構造的型
---


TypeScript では、オブジェクトが特定の厳密な型と一致する必要はありません。たとえば、あるインターフェースの要件を満たすオブジェクトを作成した場合、それらの間に明示的な関連付けがなくても、そのインターフェースが必要な場所でそのオブジェクトを使用できます。
例:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Valid
```

