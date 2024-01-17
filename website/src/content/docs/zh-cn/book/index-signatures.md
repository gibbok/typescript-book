---
title: 索引签名
sidebar:
  order: 14
  label: 14. 索引签名
---


在 TypeScript 中，我们可以使用 `string` 、`number` 和 `symbol` 作为索引签名：

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // 同 k[1] 的结果相同
```

请注意，JavaScript 会自动将 `number` 的索引转换相同值的 'string'索引, 比如 `k[1]` 和 `k["1"]` 返回相同值。

