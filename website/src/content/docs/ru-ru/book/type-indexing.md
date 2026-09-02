---
title: Индексирование типов
sidebar:
  order: 34
  label: 34. Индексирование типов
---


Индексирование типов означает возможность определять типы, индексируемые заранее неизвестным ключом. Для указания типа свойств, не объявленных явно, используется индексная сигнатура.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

