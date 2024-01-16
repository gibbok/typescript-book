---
title: 详尽性检查
sidebar:
  order: 26
  label: 26. 详尽性检查
---


详尽性检查是 TypeScript 中的一项功能，可确保在 `switch` 语句或 `if` 语句中处理可区分联合的所有可能情况。

```typescript
type Direction = 'up' | 'down';

const move = (direction: Direction) => {
    switch (direction) {
        case 'up':
            console.log('Moving up');
            break;
        case 'down':
            console.log('Moving down');
            break;
        default:
            const exhaustiveCheck: never = direction;
            console.log(exhaustiveCheck); // 这行永远不会被执行
    }
};
```

该 `never` 类型用于确保默认情况是详尽的，并且如果将新值添加到 Direction 类型而未在 switch 语句中进行处理，则 TypeScript 将引发错误。

