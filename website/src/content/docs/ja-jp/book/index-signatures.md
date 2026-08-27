---
title: インデックスシグネチャ
sidebar:
  order: 15
  label: 15. インデックスシグネチャ
---


TypeScript では、インデックスシグネチャとして `string`、`number`、`symbol` を使用できます。

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

JavaScript は `number` のインデックスを自動的に `string` のインデックスへ変換するため、`k[1]` と `k["1"]` は同じ値を返すことに注意してください。

