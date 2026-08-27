---
title: ジェネリクス
sidebar:
  order: 56
  label: 56. ジェネリクス
---


ジェネリクスを使用すると、複数の型を扱える再利用可能なコンポーネントや関数を作成できます。ジェネリクスでは、型、関数、インターフェースを型パラメーター化できるため、事前に明示的に指定することなく、さまざまな型を扱えるようになります。

ジェネリクスを使用すると、コードの柔軟性と再利用性を高められます。

### ジェネリック型

ジェネリック型を定義するには、山括弧（`<>`）を使用して型パラメーターを指定します。例:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### ジェネリッククラス

ジェネリクスはクラスにも適用でき、型パラメーターを使用することで複数の型を扱えます。これは、型安全性を維持しながらさまざまなデータ型を扱える、再利用可能なクラス定義を作成する場合に便利です。

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### ジェネリック制約

ジェネリックパラメーターは、`extends` キーワードの後に、その型パラメーターが満たす必要のある型またはインターフェースを続けることで制約できます。

次の例では、有効であるために `T` が適切に型付けされた `length` プロパティを持っている必要があります。

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Invalid
```

バージョン 3.4 RC で導入された注目すべきジェネリック機能の 1 つに、ジェネリック型引数を伝播する高階関数の型推論があります。

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

この機能により、関数型プログラミングで一般的な、型安全なポイントフリースタイルのプログラミングが容易になります。

### ジェネリクスのコンテキストに基づく絞り込み

ジェネリクスのコンテキストに基づく絞り込みとは、TypeScript において、ジェネリックパラメーターが使用されるコンテキストに基づいて、コンパイラがその型を絞り込める仕組みです。条件文でジェネリック型を扱う場合に便利です。

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value is narrowed down to type 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value is narrowed down to type 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

