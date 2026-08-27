---
title: マージと拡張
sidebar:
  order: 53
  label: 53. マージと拡張
---


マージと拡張は、型とインターフェースを扱う際の 2 つの異なる概念を指します。

マージを使用すると、同じ名前の複数の宣言を 1 つの定義にまとめられます。たとえば、同じ名前のインターフェースを複数回定義した場合です。

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

拡張とは、既存の型またはインターフェースを拡張または継承して、新しい型を作成する機能を指します。元の定義を変更せずに、既存の型へ追加のプロパティまたはメソッドを加える仕組みです。例:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

