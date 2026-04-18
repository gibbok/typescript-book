---
title: Сигнатури на индекси
sidebar:
  order: 14
  label: 14. Сигнатури на индекси
---


В TypeScript като сигнатури на индекси можем да използваме `string`, `number` и `symbol`:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Същият резултат като k[1]
```

Моля, обърнете внимание, че JavaScript автоматично преобразува индекс с `number` в индекс с `string`, така че `k[1]` или `k["1"]` връщат същата стойност.

