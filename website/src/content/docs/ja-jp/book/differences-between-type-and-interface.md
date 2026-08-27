---
title: 型とインターフェースの違い
sidebar:
  order: 54
  label: 54. 型とインターフェースの違い
---


宣言のマージ（拡張）:

インターフェースは宣言のマージをサポートしています。つまり、同じ名前のインターフェースを複数定義すると、TypeScript はそれらを、プロパティとメソッドを組み合わせた単一のインターフェースにマージします。一方、型は宣言のマージをサポートしていません。これは、元の定義を変更したり、不足している型や誤った型にパッチを当てたりせずに、追加の機能を加えたい場合や既存の型をカスタマイズしたい場合に役立ちます。

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

他の型やインターフェースの拡張:

型とインターフェースはどちらも他の型やインターフェースを拡張できますが、構文が異なります。インターフェースでは、`extends` キーワードを使用して他のインターフェースからプロパティとメソッドを継承します。ただし、インターフェースはユニオン型のような複雑な型を拡張できません。

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

型では、& 演算子を使用して複数の型を単一の型（交差型）に結合します。

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

ユニオン型と交差型:

ユニオン型と交差型を定義する場合、型のほうが柔軟です。`type` キーワードを使用すると、`|` 演算子でユニオン型を、`&` 演算子で交差型を簡単に作成できます。インターフェースでも間接的にユニオン型を表現できますが、交差型の組み込みサポートはありません。

```typescript
type Department = 'dep-x' | 'dep-y'; // Union

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersection
```

インターフェースを使用した例:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

