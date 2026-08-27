# 型システムを探る



### TypeScript Language Service

tsserver とも呼ばれる TypeScript Language Service は、エラー報告、診断、保存時のコンパイル、名前変更、定義への移動、補完リスト、シグネチャヘルプなど、さまざまな機能を提供します。主に統合開発環境（IDE）で IntelliSense サポートを提供するために使用されます。Visual Studio Code とシームレスに統合され、Conquer of Completion（Coc）などのツールでも利用されています。

開発者は専用 API を活用して独自のカスタム Language Service プラグインを作成し、TypeScript の編集エクスペリエンスを向上させることができます。これは、特殊な lint 機能を実装したり、カスタムテンプレート言語の自動補完を有効にしたりする場合に特に役立ちます。

<!-- markdownlint-disable MD044 -->
実際に使われているカスタムプラグインの例として、styled components の CSS プロパティに対する構文エラー報告と IntelliSense サポートを提供する「typescript-styled-plugin」があります。
<!-- markdownlint-enable MD044 -->

詳細情報とクイックスタートガイドについては、GitHub 上の公式 TypeScript Wiki を参照してください：[https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### 構造的型付け

TypeScript は構造的型システムに基づいています。これは、C# や C の公称型システムのように型の名前や宣言場所ではなく、型の実際の構造や定義によって型の互換性と同等性が決まることを意味します。

TypeScript の構造的型システムは、実行時における JavaScript の動的なダックタイピングシステムの仕組みに基づいて設計されています。

次の例は有効な TypeScript コードです。ご覧のとおり、「X」と「Y」は宣言名が異なりますが、同じメンバー「a」を持っています。型は構造によって決まり、この場合は構造が同じであるため、互換性があり有効です。

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Valid
```

### TypeScript の基本的な比較規則

TypeScript の比較処理は再帰的であり、どの階層にネストされた型に対しても実行されます。

「Y」が少なくとも「X」と同じメンバーを持つ場合、型「X」は「Y」と互換性があります。

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

関数のパラメーターは名前ではなく型によって比較されます。

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

関数の戻り値の型は同じでなければなりません。

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

ソース関数の戻り値の型は、ターゲット関数の戻り値の型のサブタイプでなければなりません。

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

関数のパラメーターを破棄することは許可されています。これは JavaScript で一般的な慣行であり、たとえば「Array.prototype.map()」で使用されています。

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

したがって、次の型宣言は完全に有効です。

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

ソース型に追加された任意のオプションパラメーターは有効です。

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

ソース型に対応するパラメーターがないターゲット型のオプションパラメーターはすべて有効であり、エラーにはなりません。

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

rest パラメーターは、オプションパラメーターが無限に続くものとして扱われます。

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

オーバーロードを持つ関数は、オーバーロードシグネチャが実装シグネチャと互換性がある場合に有効です。

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Valid
x('a', 1); // Valid

function y(a: string): void; // Invalid, not compatible with implementation signature
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

ソースとターゲットのパラメーターがスーパータイプまたはサブタイプに代入可能な場合、関数パラメーターの比較は成功します（双変性）。

```typescript
// Supertype
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Subtype
class Y extends X {}
// Subtype
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Bivariance does accept supertypes
console.log(getA(new X('x'))); // Valid
console.log(getA(new Y('Y'))); // Valid
console.log(getA(new Z('z'))); // Valid
```

列挙型は数値と比較でき、その逆も有効ですが、異なる列挙型の列挙値どうしを比較することは無効です。

<!-- skip -->
```typescript
enum X {
    A,
    B,
}
enum Y {
    A,
    B,
    C,
}
const xa: number = X.A; // Valid
const ya: Y = 0; // Valid
X.A === Y.A; // Invalid
```

クラスのインスタンスでは、private および protected メンバーに対して互換性チェックが行われます。

<!-- skip -->
```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}

class Y {
    private a: string;
    constructor(value: string) {
        this.a = value;
    }
}

let x: X = new Y('y'); // Invalid
```

比較チェックでは、継承階層の違いは考慮されません。たとえば次のとおりです。

```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
class Y extends X {
    public a: string;
    constructor(value: string) {
        super(value);
        this.a = value;
    }
}
class Z {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
let x: X = new X('x');
let y: Y = new Y('y');
let z: Z = new Z('z');
x === y; // Valid
x === z; // Valid even if z is from a different inheritance hierarchy
```

ジェネリクスは、ジェネリックパラメーターを適用した後に得られる型の構造に基づいて比較され、最終結果だけが非ジェネリック型として比較されます。

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Invalid as the type argument is used in the final structure
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Valid as the type argument is not used in the final structure
```

ジェネリクスの型引数が指定されていない場合、指定されていないすべての引数は「any」型として扱われます。

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

次の点を覚えておいてください。

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Valid, everything is assignable to itself

let c: any;
c = 1; // Valid, all types are assignable to any

let d: unknown;
d = 1; // Valid, all types are assignable to unknown

let e: unknown;
let e1: unknown = e; // Valid, unknown is only assignable to itself and any
let e2: any = e; // Valid
let e3: number = e; // Invalid

let f: never;
f = 1; // Invalid, nothing is assignable to never

let g: void;
let g1: any;
g = 1; // Invalid, void is not assignable to or from anything except any
g = g1; // Valid
```

「strictNullChecks」が有効な場合、「null」と「undefined」は「void」と同様に扱われます。それ以外の場合は「never」と同様に扱われることに注意してください。

### 集合としての型

TypeScript では、型は取り得る値の集合です。この集合は型のドメインとも呼ばれます。型の各値は、集合内の要素とみなすことができます。型は、集合内のすべての要素がその集合のメンバーとみなされるために満たすべき制約を定めます。
TypeScript の主な役割は、ある集合が別の集合の部分集合であるかをチェックし、検証することです。

TypeScript は、さまざまな種類の集合をサポートしています。

| 集合の用語         | TypeScript                      | 注記                                                                                                               |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 空集合             | never                           | 「never」はそれ自体以外のあらゆるものを含む                                                                        |
| 単一要素の集合     | undefined / null / リテラル型   |                                                                                                                    |
| 有限集合           | boolean / union                 |                                                                                                                    |
| 無限集合           | string / number / object        |                                                                                                                    |
| 全体集合           | any / unknown                   | すべての要素は「any」のメンバーで、すべての集合はその部分集合である / 「unknown」は「any」の型安全な対となる型     |

いくつか例を示します。

| TypeScript            | 集合の用語              | 例                                                                              |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅（空集合）            | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                        |
| リテラル型            | 単一要素の集合          | type X = 'X';                                                                   |
|                       |                        | type Y = 7;                                                                     |
|                       |                        |
| T に代入可能な値      | 値 ∈ T（メンバー）      | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        |
| T2 に代入可能な T1    | T1 ⊆ T2（部分集合）     | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                        |                                                                                 |
| T1 extends T2         | T1 ⊆ T2（部分集合）     | type X = 'X' extends string ? true : false;                                     |
|                       |                        |
| T1 \| T2              | T1 ∪ T2（和集合）       | type XY = 'X' \| 'Y';                                                           |
|                       |                        | type JK = 1 \| 2;                                                               |
|                       |                        |
| T1 & T2               | T1 ∩ T2（共通部分）     | type X = \{ a: string \}                                                          |
|                       |                        | type Y = \{ b: string \}                                                          |
|                       |                        | type XY = X & Y                                                                 |
|                       |                        | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                        |
| unknown               | 全体集合               | const x: unknown = 1                                                            |

ユニオン（T1 | T2）は、より広い集合（両方）を作成します。

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Valid
```

交差型（T1 & T2）は、より狭い集合（共有されるものだけ）を作成します。

<!-- skip -->
```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
    b: string;
};
type XY = X & Y;
const r: XY = { a: 'a' }; // Invalid
const j: XY = { a: 'a', b: 'b' }; // Valid
```

この文脈では、`extends` キーワードは「部分集合」と考えることができます。これは型に制約を設定します。`extends` をジェネリックとともに使用すると、ジェネリック型パラメーターがより具体的な型に制約されます。

ここでの `extends` は、OOP の意味でのクラス継承とはまったく関係がないことに注意してください。

TypeScript は構造的型を扱い、厳密な公称型階層を持ちません。実際、次の例のように、TypeScript はオブジェクトの構造、つまり形状を考慮するため、2 つの型はどちらも他方のサブタイプではなくても重複することがあります。

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
interface Z extends Y {
    c: string;
}
const z: Z = { a: 'a', b: 'b', c: 'c' };
interface X1 {
    a: string;
}
interface Y1 {
    a: string;
    b: string;
}
interface Z1 {
    a: string;
    b: string;
    c: string;
}
const z1: Z1 = { a: 'a', b: 'b', c: 'c' };

const r: Z1 = z; // Valid
```

### 型を割り当てる：型宣言と型アサーション

TypeScript では、さまざまな方法で型を割り当てることができます。

#### 型宣言

次の例では、x: X（": Type"）を使用して変数 x の型を宣言します。

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

変数が指定された形式でない場合、TypeScript はエラーを報告します。たとえば次のとおりです。

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Error: Object literal may only specify known properties
};
```

#### 型アサーション

`as` キーワードを使用してアサーションを追加できます。これは、開発者が型についてより多くの情報を持っていることをコンパイラに伝え、発生し得るエラーを抑制します。

例：

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

上の例では、as キーワードを使用して、オブジェクト x が型 X であるとアサーションしています。これにより、型定義に存在しない追加のプロパティ b があっても、オブジェクトが指定された型に準拠していることを TypeScript コンパイラに伝えます。

型アサーションは、より具体的な型を指定する必要がある状況、特に DOM を扱う場合に役立ちます。たとえば次のとおりです。

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

ここでは、型アサーション as HTMLInputElement を使用して、getElementById の結果を HTMLInputElement として扱うよう TypeScript に伝えています。
次のテンプレートリテラルの例に示すように、型アサーションをキーの再マッピングに使用することもできます。

```typescript
type J<Type> = {
    [Property in keyof Type as `prefix_${string &
        Property}`]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

この例では、型 `J<Type>` はテンプレートリテラルを持つマップ型を使用して Type のキーを再マッピングします。各キーに「prefix_」を追加した新しいプロパティを作成し、対応する値は元のプロパティ値を返す関数になります。

型アサーションを使用すると、TypeScript は過剰プロパティチェックを実行しない点に注意してください。そのため、オブジェクトの構造が事前に分かっている場合は、通常、型宣言を使用することが望ましいです。

#### アンビエント宣言

アンビエント宣言は JavaScript コードの型を記述するファイルで、ファイル名の形式は `.d.ts.` です。通常は、既存の JavaScript ライブラリに型アノテーションを付けたり、プロジェクト内の既存の JS ファイルに型を追加したりするためにインポートして使用します。

一般的なライブラリの型の多くは、次の場所で確認できます。
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

また、次のコマンドでインストールできます。

```shell
npm install --save-dev @types/library-name
```

独自に定義したアンビエント宣言は、「トリプルスラッシュ」リファレンスを使用してインポートできます。

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

`// @ts-check` を使用すれば、JavaScript ファイル内でもアンビエント宣言を使用できます。

`declare` キーワードを使用すると、既存の JavaScript コードをインポートせずに型定義を記述でき、別のファイルまたはグローバルな型のプレースホルダーとして機能します。

### プロパティチェックと過剰プロパティチェック

TypeScript は構造的型システムに基づいていますが、過剰プロパティチェックは、オブジェクトが型で指定されたプロパティを正確に持つかどうかをチェックできる TypeScript の機能です。

過剰プロパティチェックは、たとえばオブジェクトリテラルを変数に代入するときや、関数の引数として渡すときに実行されます。

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### 弱い型

すべてオプションのプロパティの集合だけで構成される型は、弱い型とみなされます。

```typescript
type X = {
    a?: string;
    b?: string;
};
```

弱い型と共通するプロパティがない値を代入すると、TypeScript はエラーとみなします。たとえば、次のコードはエラーを発生させます。

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

推奨はされませんが、必要であれば、型アサーションを使用してこのチェックを回避できます。

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

または、弱い型のインデックスシグネチャに `unknown` を追加します。

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### 厳密なオブジェクトリテラルチェック（Freshness）

厳密なオブジェクトリテラルチェックは「freshness」と呼ばれることもあり、通常の構造的型チェックでは見落とされてしまう過剰なプロパティやスペルミスのあるプロパティを検出するのに役立つ TypeScript の機能です。

オブジェクトリテラルを作成すると、TypeScript コンパイラはそれを「fresh」とみなします。オブジェクトリテラルを変数に代入するかパラメーターとして渡した場合、そのオブジェクトリテラルにターゲット型に存在しないプロパティが指定されていると、TypeScript はエラーを発生させます。

ただし、オブジェクトリテラルの型が拡大された場合や、型アサーションが使用された場合は、「freshness」が失われます。

これを示す例をいくつか紹介します。

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Freshness check: Invalid assignment
var y: Y;
y = { a: 'a', bx: 'bx' }; // Freshness check: Invalid assignment

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Widening: No errors, structurally type compatible

fn({ a: 'a', bx: 'b' }); // Freshness check: Invalid argument

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Widening: No Freshness check
```

### 型推論

TypeScript は、次の場合にアノテーションが指定されていなくても型を推論できます。

* 変数の初期化。
* メンバーの初期化。
* パラメーターのデフォルト値の設定。
* 関数の戻り値の型。

例：

```typescript
let x = 'x'; // The type inferred is string
```

TypeScript コンパイラは値または式を分析し、利用可能な情報に基づいてその型を決定します。

### より高度な推論

型推論で複数の式が使用されている場合、TypeScript は「最適な共通型」を探します。たとえば次のとおりです。

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

コンパイラが最適な共通型を見つけられない場合は、ユニオン型を返します。例：

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript は、変数の位置に基づく「コンテキスト型付け」を利用して型を推論します。次の例では、コンパイラは `e` が `MouseEvent` 型であることを認識します。これは、さまざまな一般的な JavaScript 構文と DOM のアンビエント宣言を含む lib.d.ts ファイルに `click` イベント型が定義されているためです。

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### 型の拡大

型の拡大は、型アノテーションなしで初期化された変数に TypeScript が型を割り当てるプロセスです。狭い型から広い型への変換は許可しますが、その逆は許可しません。
次の例では、

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript は `string` を `x` に割り当てます。これは、初期化時に指定された単一の値（`x`）に基づく型の拡大の一例です。

TypeScript には、たとえば「const」を使用するなど、型の拡大のプロセスを制御する方法があります。

### const

変数を宣言するときに `const` キーワードを使用すると、TypeScript ではより狭い型が推論されます。

例：

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

`const` を使用して変数 x を宣言すると、その型は特定のリテラル値 'x' に絞り込まれます。x の型が絞り込まれているため、エラーなしで変数 y に代入できます。
型を推論できる理由は、`const` 変数は再代入できず、その型を特定のリテラル型、この場合はリテラル型 'x' に絞り込めるためです。

#### 型パラメーターの const 修飾子

TypeScript のバージョン 5.0 以降では、ジェネリック型パラメーターに `const` 修飾子を指定できます。これにより、可能な限り正確な型を推論できます。まず、`const` を使用しない例を見てみましょう。

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

ご覧のとおり、プロパティ `a` と `b` は `string` 型として推論されています   。

次に、`const` を使用したバージョンとの違いを見てみましょう。

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
```

プロパティ `a` と `b` が、単なる `string` 型ではなく文字列リテラルとして推論されていることが分かります。

#### const アサーション

この機能を使用すると、初期値に基づくより正確なリテラル型で変数を宣言し、その値を不変のリテラルとして扱うべきであることをコンパイラに示せます。いくつか例を示します。

単一のプロパティの場合：

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

オブジェクト全体の場合：

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

これは、タプルの型を定義するときに特に役立ちます。

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### 明示的な型アノテーション

具体的な型を渡すことができます。次の例では、プロパティ `x` は `number` 型です。

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

リテラル型のユニオンを使用すると、型アノテーションをより具体的にできます。

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### 型の絞り込み

型の絞り込みとは、TypeScript で一般的な型をより具体的な型に絞り込むプロセスです。これは、TypeScript がコードを分析し、特定の条件や操作によって型情報を精緻化できると判断した場合に行われます。

型の絞り込みは、次のようなさまざまな方法で行えます。

#### 条件

`if` や `switch` などの条件文を使用することで、TypeScript は条件の結果に基づいて型を絞り込めます。例：

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### throw または return

エラーを throw したり、分岐から早期 return したりすることで、TypeScript による型の絞り込みを支援できます。例：

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

TypeScript で型を絞り込むその他の方法には、次のものがあります。

* `instanceof` 演算子：オブジェクトが特定のクラスのインスタンスであるかをチェックするために使用します。
* `in` 演算子：オブジェクトにプロパティが存在するかをチェックするために使用します。
* `typeof` 演算子：実行時に値の型をチェックするために使用します。
* `Array.isArray()` などの組み込み関数：値が配列かどうかをチェックするために使用します。

#### 判別可能なユニオン

「判別可能なユニオン」は、ユニオン内の異なる型を区別するためにオブジェクトへ明示的な「タグ」を追加する TypeScript のパターンです。このパターンは「タグ付きユニオン」とも呼ばれます。次の例では、「タグ」はプロパティ「type」で表されます。

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // type is A
        case 'type_b':
            return input.value + 'extra'; // type is B
    }
};
```

#### ユーザー定義型ガード

TypeScript が型を判定できない場合、「ユーザー定義型ガード」と呼ばれるヘルパー関数を記述できます。次の例では、型述語を利用し、特定のフィルタリングを適用した後で型を絞り込みます。

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

#### switch-true による絞り込み

TypeScript 5.3 では switch-true による絞り込みが追加され、煩雑な if/else チェーンを、真偽値条件を使用した switch (true) に置き換えられるようになりました。可読性が向上し、型の絞り込みも維持されます。パターンマッチングに似ていますが、よりシンプルです。

```typescript
function classify(x: unknown) {
    switch (true) {
        case typeof x === 'string':
            return `"${x.toUpperCase()}"`;
        case typeof x === 'number':
            return x > 0 ? 'positive' : 'negative';
        case Array.isArray(x):
            return `[${x.length} items]`;
        default:
            return 'something else';
    }
}
```

