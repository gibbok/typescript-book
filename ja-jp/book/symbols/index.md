# シンボル



シンボルは、プログラムの存続期間全体にわたってグローバルに一意であることが保証された不変の値を表すプリミティブデータ型です。

シンボルはオブジェクトプロパティのキーとして使用でき、列挙されないプロパティを作成する方法を提供します。

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

WeakMap と WeakSet では、シンボルをキーとして使用できるようになりました。

