---
title: TypeScript 入門
sidebar:
  order: 8
  label: 8. TypeScript 入門
---


### TypeScript とは？

TypeScript は、JavaScript を基盤とする強く型付けされたプログラミング言語です。元々は 2012 年に Anders Hejlsberg によって設計され、現在は Microsoft がオープンソースプロジェクトとして開発および保守しています。

TypeScript は JavaScript にコンパイルされ、あらゆる JavaScript ランタイム（たとえばブラウザーやサーバー上の Node.js）で実行できます。

関数型、ジェネリック、命令型、オブジェクト指向プログラミングなど、複数のプログラミングパラダイムをサポートしています。また、実行前に JavaScript へ変換されるコンパイル（トランスパイル）言語です。

### TypeScript を選ぶ理由

TypeScript は強い型付けの言語であり、一般的なプログラミング上の誤りを防ぎ、プログラムの実行前に特定の種類のランタイムエラーを回避するのに役立ちます。

強い型付けの言語では、開発者がデータ型の定義でプログラムのさまざまな制約や振る舞いを指定できます。これにより、ソフトウェアの正しさを検証しやすくなり、不具合を防止できます。これは特に大規模なアプリケーションで有用です。

TypeScript の利点の一部を以下に示します。

* 静的型付け（任意で強い型付け）
* 型推論
* ES6 および ES7 の機能を利用可能
* クロスプラットフォームおよびクロスブラウザー互換性
* IntelliSense によるツールサポート

### TypeScript と JavaScript

TypeScript は `.ts` または `.tsx` ファイルに記述し、JavaScript ファイルは `.js` または `.jsx` ファイルに記述します。

拡張子が `.tsx` または `.jsx` のファイルには、React の UI 開発で使用される JavaScript 構文拡張の JSX を含めることができます。

構文上、TypeScript は JavaScript（ECMAScript 2015）の型付きスーパーセットです。すべての JavaScript コードは有効な TypeScript コードですが、その逆が常に成り立つとは限りません。

たとえば、次のような `.js` 拡張子の JavaScript ファイル内の関数を考えてみましょう。

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

ファイル拡張子を `.ts` に変更すれば、この関数を TypeScript に変換して使用できます。ただし、同じ関数に TypeScript の型注釈を付けると、コンパイルなしではどの JavaScript ランタイムでも実行できません。次の TypeScript コードは、コンパイルしなければ構文エラーになります。

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript は、開発者が型注釈を通じて意図を表現できるようにすることで、潜在的なランタイムエラーをコンパイル時に検出するよう設計されています。さらに、型推論により、明示的な型注釈がなくても TypeScript は特定の問題を検出できます。たとえば、次のコードスニペットでは TypeScript の型を一切指定していません。

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

この場合、TypeScript はエラーを検出し、次のように報告します。

```text
Property 'y' does not exist on type '{ x: number; }'.
```

TypeScript の型システムは、JavaScript の実行時の振る舞いから大きな影響を受けています。たとえば、JavaScript では文字列の連結または数値の加算を行う加算演算子（+）は、TypeScript でも同じようにモデル化されています。

```typescript
const result = '1' + 1; // Result is of type string
```

TypeScript の開発チームは、JavaScript の通常とは異なる使い方をエラーとして示すという意図的な判断をしています。たとえば、次の有効な JavaScript コードを考えてみましょう。

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

しかし、TypeScript はエラーをスローします。

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

このエラーが発生するのは、TypeScript が型の互換性を厳密に適用し、この場合は数値と真偽値の間の無効な演算を識別するためです。

### TypeScript のコード生成

TypeScript コンパイラには、型エラーのチェックと JavaScript へのコンパイルという 2 つの主要な役割があります。この 2 つの処理は互いに独立しています。型はコンパイル時に完全に消去されるため、JavaScript ランタイムでのコードの実行には影響しません。TypeScript は型エラーが存在していても JavaScript を出力できます。
型エラーを含む TypeScript コードの例を以下に示します。

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

それでも、実行可能な JavaScript を出力できます。

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

実行時に TypeScript の型をチェックすることはできません。次に例を示します。

<!-- skip -->
```typescript
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark: () => void;
}
interface Cat extends Animal {
    meow: () => void;
}
const makeNoise = (animal: Animal) => {
    if (animal instanceof Dog) {
        // 'Dog' only refers to a type, but is being used as a value here.
        // ...
    }
};
```

型はコンパイル後に消去されるため、このコードを JavaScript で実行する方法はありません。実行時に型を識別するには、別の仕組みを使用する必要があります。TypeScript には複数の選択肢があり、よく使われるものの 1 つが「タグ付きユニオン」です。次に例を示します。

```typescript
interface Dog {
    kind: 'dog'; // Tagged union
    bark: () => void;
}
interface Cat {
    kind: 'cat'; // Tagged union
    meow: () => void;
}
type Animal = Dog | Cat;

const makeNoise = (animal: Animal) => {
    if (animal.kind === 'dog') {
        animal.bark();
    } else {
        animal.meow();
    }
};

const dog: Dog = {
    kind: 'dog',
    bark: () => console.log('bark'),
};
makeNoise(dog);
```

「kind」プロパティは、JavaScript でオブジェクトを区別するために実行時に使用できる値です。

また、実行時の値が、型宣言で宣言された型とは異なる型を持つ可能性もあります。たとえば、開発者が API の型を誤って解釈し、誤った注釈を付けた場合です。

TypeScript は JavaScript のスーパーセットであるため、「class」キーワードは実行時に型および値として使用できます。

```typescript
class Animal {
    constructor(public name: string) {}
}
class Dog extends Animal {
    constructor(
        public name: string,
        public bark: () => void
    ) {
        super(name);
    }
}
class Cat extends Animal {
    constructor(
        public name: string,
        public meow: () => void
    ) {
        super(name);
    }
}
type Mammal = Dog | Cat;

const makeNoise = (mammal: Mammal) => {
    if (mammal instanceof Dog) {
        mammal.bark();
    } else {
        mammal.meow();
    }
};

const dog = new Dog('Fido', () => console.log('bark'));
makeNoise(dog);
```

JavaScript では、「class」には「prototype」プロパティがあり、「instanceof」演算子を使用して、コンストラクターの prototype プロパティがオブジェクトのプロトタイプチェーン上のどこかに存在するかどうかを検査できます。

すべての型が消去されるため、TypeScript が実行時のパフォーマンスに影響を与えることはありません。ただし、TypeScript によってビルド時間のオーバーヘッドが多少発生します。

### 今すぐモダン JavaScript（ダウンレベリング）

TypeScript は、ECMAScript 3（1999 年）以降にリリースされたあらゆるバージョンの JavaScript へコードをコンパイルできます。つまり、TypeScript は最新の JavaScript 機能を古いバージョンへトランスパイルできます。この処理はダウンレベリングと呼ばれます。これにより、古いランタイム環境との互換性を最大限に維持しながら、モダン JavaScript を使用できます。

古いバージョンの JavaScript へトランスパイルする際、TypeScript が生成するコードには、ネイティブ実装と比べてパフォーマンス上のオーバーヘッドが生じる可能性がある点に注意することが重要です。

TypeScript で使用できるモダン JavaScript 機能の一部を以下に示します。

* AMD 形式の「define」コールバックや CommonJS の「require」文の代わりに ECMAScript モジュールを使用する。
* プロトタイプの代わりにクラスを使用する。
* 「var」の代わりに「let」または「const」を使用して変数を宣言する。
* 従来の「for」ループの代わりに「for-of」ループまたは「.forEach」を使用する。
* 関数式の代わりにアロー関数を使用する。
* 分割代入。
* プロパティ名やメソッド名の短縮記法、および算出プロパティ名。
* 関数のデフォルトパラメーター。

これらのモダン JavaScript 機能を活用することで、開発者は TypeScript でより表現力に富んだ簡潔なコードを記述できます。

