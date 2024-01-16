---
title: never 类型
sidebar:
  order: 25
  label: 25. never 类型
---


当变量缩小为不能包含任何值的类型时，TypeScript 编译器将推断该变量必须属于该never类型。这是因为 never 类型代表永远无法生成的值。

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val 在这里的类型为 never，因为它只能是字符串或数字
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

