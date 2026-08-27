---
title: プリミティブ型
sidebar:
  order: 11
  label: 11. プリミティブ型
---


TypeScript は 7 種類のプリミティブ型をサポートしています。プリミティブデータ型とは、オブジェクトではなく、関連付けられたメソッドを持たない型を指します。TypeScript では、すべてのプリミティブ型は不変です。つまり、一度代入された値は変更できません。

### string

`string` プリミティブ型はテキストデータを格納し、値は常にダブルクォートまたはシングルクォートで囲まれます。

```typescript
const x: string = 'x';
const y: string = 'y';
```

バッククォート（`）文字で囲むと、文字列を複数行にわたって記述できます。

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

TypeScript の `boolean` データ型は、`true` または `false` のいずれかの二値を格納します。

```typescript
const isReady: boolean = true;
```

### number

TypeScript の `number` データ型は、64 ビット浮動小数点値で表されます。`number` 型は整数と小数を表現できます。
TypeScript は、たとえば次のように、16 進数、2 進数、8 進数もサポートしています。

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigint

`bigint` は、`number` がサポートする最大安全整数である 2^53 - 1 よりも大きな整数値を表します。

`bigint` は、組み込み関数 `BigInt()` を呼び出すか、任意の整数数値リテラルの末尾に `n` を追加することで作成できます。

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

注記：

* `bigint` 値は `number` と混在できず、組み込みの `Math` とともに使用することもできません。同じ型に強制変換する必要があります。
* `bigint` 値を使用できるのは、target の設定が ES2020 以上の場合のみです。

### Symbol

Symbol は、命名の競合を防ぐためにオブジェクトのプロパティキーとして使用できる一意の識別子です。

```typescript
type Obj = {
    [sym: symbol]: number;
};

const a = Symbol('a');
const b = Symbol('b');
let obj: Obj = {};
obj[a] = 123;
obj[b] = 456;

console.log(obj[a]); // 123
console.log(obj[b]); // 456
```

### null と undefined

`null` 型と `undefined` 型は、どちらも値がないこと、または値が存在しないことを表します。

`undefined` 型は、値が代入も初期化もされていないこと、または意図しない値の不在を示します。

`null` 型は、そのフィールドに値がないことが分かっているため値を利用できないことを意味し、意図的な値の不在を示します。

### Array

`array` は、同じ型または異なる型の複数の値を格納できるデータ型です。次の構文を使用して定義できます。

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript は、次の構文を使用した readonly 配列をサポートしています。

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript はタプルと readonly タプルをサポートしています。

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

`any` データ型は文字どおり「あらゆる」値を表し、TypeScript が型を推論できない場合や型が指定されていない場合のデフォルトです。

`any` を使用すると TypeScript コンパイラは型チェックを省略するため、`any` の使用時には型安全性がありません。一般に、エラーが発生したときにコンパイラを黙らせるために `any` を使用しないでください。代わりにエラーの修正に集中してください。`any` を使用するとコントラクトが破られ、TypeScript の自動補完の恩恵が失われる可能性があります。

`any` 型は、JavaScript から TypeScript への段階的な移行中に、コンパイラを黙らせるために役立つことがあります。

新規プロジェクトでは、TypeScript 設定 `noImplicitAny` を使用してください。これにより、`any` が使用または推論された箇所で TypeScript がエラーを出せるようになります。

`any` 型は通常、型に関する実際の問題を覆い隠す可能性があるエラーの原因です。できる限り使用を避けてください。

