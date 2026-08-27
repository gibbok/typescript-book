---
title: インターフェースと型
sidebar:
  order: 49
  label: 49. インターフェースと型
---


### 共通の構文

TypeScript では、インターフェースはオブジェクトの構造を定義し、オブジェクトが持つ必要のあるプロパティまたはメソッドの名前と型を指定します。TypeScript でインターフェースを定義する一般的な構文は次のとおりです。

<!-- skip -->
```typescript
interface InterfaceName {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
}
```

型定義の場合も同様です。

<!-- skip -->
```typescript
type TypeName = {
    property1: Type1;
    // ...
    method1(arg1: ArgType1, arg2: ArgType2): ReturnType;
    // ...
};
```

`interface InterfaceName` または `type TypeName`: インターフェースの名前を定義します。
`property1`: `Type1`: インターフェースのプロパティと、それに対応する型を指定します。複数のプロパティを定義でき、それぞれをセミコロンで区切ります。
`method1(arg1: ArgType1, arg2: ArgType2): ReturnType;`: インターフェースのメソッドを指定します。メソッドは、名前、その後に丸括弧内のパラメーターリスト、そして戻り値の型という順序で定義します。複数のメソッドを定義でき、それぞれをセミコロンで区切ります。

インターフェースの例:

```typescript
interface Person {
    name: string;
    age: number;
    greet(): void;
}
```

型の例:

```typescript
type TypeName = {
    property1: string;
    method1(arg1: string, arg2: string): string;
};
```

TypeScript では、型を使用してデータの構造を定義し、型チェックを強制します。TypeScript で型を定義するための一般的な構文は、具体的なユースケースに応じていくつかあります。例を次に示します。

### 基本型

```typescript
let myNumber: number = 123; // number type
let myBoolean: boolean = true; // boolean type
let myArray: string[] = ['a', 'b']; // array of strings
let myTuple: [string, number] = ['a', 123]; // tuple
```

### オブジェクトとインターフェース

```typescript
const x: { name: string; age: number } = { name: 'Simon', age: 7 };
```

### ユニオン型と交差型

```typescript
type MyType = string | number; // Union type
let myUnion: MyType = 'hello'; // Can be a string
myUnion = 123; // Or a number

type TypeA = { name: string };
type TypeB = { age: number };
type CombinedType = TypeA & TypeB; // Intersection type
let myCombined: CombinedType = { name: 'John', age: 25 }; // Object with both name and age properties
```

