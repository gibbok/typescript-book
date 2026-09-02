---
title: Индексные сигнатуры
sidebar:
  order: 15
  label: 15. Индексные сигнатуры
---


В TypeScript в индексных сигнатурах можно использовать `string`, `number` и `symbol`:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

Обратите внимание, что JavaScript автоматически преобразует индекс типа `number` в индекс типа `string`, поэтому `k[1]` и `k["1"]` возвращают одно и то же значение.

