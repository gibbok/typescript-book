---
title: never 型について
sidebar:
  order: 26
  label: 26. never 型について
---


変数が値をまったく含められない型まで絞り込まれると、TypeScript コンパイラはその変数が `never` 型でなければならないと推論します。これは、never 型が決して生成されることのない値を表すためです。

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val has type never here because it can never be anything other than a string or a number
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

