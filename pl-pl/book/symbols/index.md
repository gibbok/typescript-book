# Symbole



Symbole są prymitywnym typem danych reprezentującym niezmienną wartość, która przez cały czas działania programu ma zagwarantowaną globalną unikatowość.

Symbole mogą być używane jako klucze właściwości obiektów i umożliwiają tworzenie właściwości niewyliczalnych.

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // value 1
console.log(obj[key2]); // value 2
```

Symbole mogą być teraz używane jako klucze w obiektach WeakMap i WeakSet.

