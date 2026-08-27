---
title: 列挙型
sidebar:
  order: 20
  label: 20. 列挙型
---


TypeScript の `enum` は、名前付き定数値の集合です。

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

列挙型はさまざまな方法で定義できます。

### 数値列挙型

TypeScript の数値列挙型とは、各定数に数値が割り当てられ、デフォルトでは 0 から始まる列挙型です。

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

値を明示的に割り当てることで、独自の値を指定できます。

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### 文字列列挙型

TypeScript の文字列列挙型とは、各定数に文字列値が割り当てられた列挙型です。

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

注: TypeScript では、文字列メンバーと数値メンバーが共存する異種列挙型を使用できます。

### 定数列挙型

TypeScript の定数列挙型は、すべての値がコンパイル時に判明しており、列挙型が使用されるすべての箇所にインライン展開される特殊な列挙型で、より効率的なコードになります。

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

次のようにコンパイルされます。

```typescript
console.log('EN' /* Language.English */);
```

注:
定数列挙型では値がハードコードされ、列挙型が消去されます。この方法は自己完結型ライブラリでは効率が高くなる可能性がありますが、一般には望ましくありません。また、定数列挙型に計算メンバーを含めることはできません。

### 逆引きマッピング

TypeScript の列挙型における逆引きマッピングとは、値から列挙型メンバー名を取得できる機能を指します。デフォルトでは、列挙型メンバーには名前から値への順方向マッピングがありますが、各メンバーの値を明示的に設定することで逆引きマッピングを作成できます。逆引きマッピングは、値から列挙型メンバーを検索する必要がある場合や、列挙型のすべてのメンバーを反復処理する必要がある場合に便利です。数値の列挙型メンバーのみ逆引きマッピングが生成され、文字列の列挙型メンバーには逆引きマッピングがまったく生成されないことに注意してください。

次の列挙型は、

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

次のようにコンパイルされます。

<!-- skip -->
```javascript
'use strict';
var Grade;
(function (Grade) {
    Grade[(Grade['A'] = 90)] = 'A';
    Grade[(Grade['B'] = 80)] = 'B';
    Grade[(Grade['C'] = 70)] = 'C';
    Grade['F'] = 'fail';
})(Grade || (Grade = {}));
```

したがって、値からキーへのマッピングは数値の列挙型メンバーでは機能しますが、文字列の列挙型メンバーでは機能しません。

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // Element implicitly has an 'any' type because index expression is not of type 'number'.
```

### アンビエント列挙型

TypeScript のアンビエント列挙型は、関連する実装を持たずに宣言ファイル（*.d.ts）で定義される列挙型の一種です。これにより、各ファイルに実装の詳細をインポートすることなく、異なるファイル間で型安全に使用できる名前付き定数の集合を定義できます。

### 計算メンバーと定数メンバー

TypeScript の計算メンバーは実行時に値が計算される列挙型のメンバーであり、定数メンバーはコンパイル時に値が設定され、実行時には変更できないメンバーです。計算メンバーは通常の列挙型で使用でき、定数メンバーは通常の列挙型と const 列挙型の両方で使用できます。

```typescript
// Constant members
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 generation at compilation time
```

```typescript
// Computed members
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // random number generated at run time
```

列挙型は、そのメンバー型から構成されるユニオンで表されます。各メンバーの値は定数式または非定数式によって決定でき、定数値を持つメンバーにはリテラル型が割り当てられます。例として、型 E とそのサブタイプ E.A、E.B、E.C の宣言を考えてみましょう。この場合、E はユニオン E.A | E.B | E.C を表します。

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

