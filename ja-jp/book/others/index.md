# その他



### エラーと例外処理

TypeScript では、標準の JavaScript エラー処理機構を使用してエラーをキャッチし、処理できます。

Try-Catch-Finally ブロック:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

異なる種類のエラーを処理することもできます。

```typescript
try {
    // Code that might throw different types of errors
} catch (error) {
    if (error instanceof TypeError) {
        // Handle TypeError
    } else if (error instanceof RangeError) {
        // Handle RangeError
    } else {
        // Handle other errors
    }
}
```

カスタムエラー型:

Error `class` を拡張することで、より具体的なエラーを指定できます。

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### ミックスインクラス

Mixin クラスを使用すると、複数のクラスの振る舞いを組み合わせて構成し、1 つのクラスにまとめることができます。深い継承チェーンを必要とせずに、機能を再利用して拡張する方法を提供します。

```typescript
abstract class Identifiable {
    name: string = '';
    logId() {
        console.log('id:', this.name);
    }
}
abstract class Selectable {
    selected: boolean = false;
    select() {
        this.selected = true;
        console.log('Select');
    }
    deselect() {
        this.selected = false;
        console.log('Deselect');
    }
}
class MyClass {
    constructor() {}
}

// Extend MyClass to include the behavior of Identifiable and Selectable
interface MyClass extends Identifiable, Selectable {}

// Function to apply mixins to a class
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            let descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Apply the mixins to MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### 非同期言語機能

TypeScript は JavaScript のスーパーセットであるため、次のような JavaScript の非同期言語機能が組み込まれています。

Promise：

Promise は非同期処理とその結果を扱うための仕組みで、`.then()` や `.catch()` などのメソッドを使用して成功時とエラー時の状態を処理します。

詳細はこちら：[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await：

Async/await キーワードを使用すると、Promise を扱う際に、より同期処理に近い見た目の構文を記述できます。`async` キーワードは非同期関数を定義するために使用され、`await` キーワードは async 関数内で、Promise が解決または拒否されるまで実行を一時停止するために使用されます。

詳細はこちら：
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

次の API は TypeScript で十分にサポートされています。

Fetch API：
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers：
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers：
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket：
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### イテレーターとジェネレーター

TypeScript はイテレーターとジェネレーターの両方を十分にサポートしています。

イテレーターはイテレータープロトコルを実装するオブジェクトであり、コレクションやシーケンスの要素に 1 つずつアクセスする方法を提供します。反復処理における次の要素へのポインターを含む構造です。イテレーターには `next()` メソッドがあり、シーケンス内の次の値と、シーケンスが `done` であるかどうかを示す真偽値を返します。

```typescript
class NumberIterator implements Iterable<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    public next(): IteratorResult<number> {
        if (this.current <= this.end) {
            const value = this.current;
            this.current++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

const iterator = new NumberIterator(1, 3);

for (const num of iterator) {
    console.log(num);
}
```

ジェネレーターは、イテレーターの作成を簡素化する `function*` 構文を使用して定義される特殊な関数です。`yield` キーワードを使用して値のシーケンスを定義し、値が要求されると実行を自動的に一時停止して再開します。

ジェネレーターを使用するとイテレーターを簡単に作成でき、特に大規模または無限のシーケンスを扱う場合に役立ちます。

例：

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = numberGenerator(1, 5);

for (const num of generator) {
    console.log(num);
}
```

TypeScript は非同期イテレーターと非同期ジェネレーターもサポートしています。

詳細はこちら：

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### TsDocs・JSDoc リファレンス

JavaScript のコードベースを扱う場合、型情報を提供する追加のアノテーションを含む JSDoc コメントを使用することで、TypeScript が適切な型を推論できるように支援できます。

例：

```typescript
/**
 * Computes the power of a given number
 * @constructor
 * @param {number} base – The base value of the expression
 * @param {number} exponent – The exponent value of the expression
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

完全なドキュメントはこちらのリンクで提供されています：
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

バージョン 3.7 以降では、JavaScript の JSDoc 構文から .d.ts 型定義を生成できます。
詳細はこちら：
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

@types 組織配下のパッケージは、既存の JavaScript ライブラリやモジュールに型定義を提供するために使用される、特別なパッケージ命名規則です。たとえば、次を使用すると、

```shell
npm install --save-dev @types/lodash
```

現在のプロジェクトに `lodash` の型定義がインストールされます。

`@types` パッケージの型定義に貢献するには、[https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) にプルリクエストを送信してください。

### JSX

JSX（JavaScript XML）は JavaScript 言語の構文を拡張するもので、JavaScript または TypeScript ファイル内に HTML に似たコードを記述できます。React で HTML 構造を定義するためによく使用されます。

TypeScript は型チェックと静的解析を提供することで JSX の機能を拡張します。

JSX を使用するには、`tsconfig.json` ファイルで `jsx` コンパイラオプションを設定する必要があります。一般的な設定オプションは次の 2 つです。

* "preserve"：JSX を変更せずに .jsx ファイルを出力します。このオプションは、JSX 構文をそのまま保持し、コンパイル処理中に変換しないよう TypeScript に指示します。変換を処理する Babel などの別のツールがある場合に、このオプションを使用できます。
* "react"：TypeScript に組み込まれた JSX 変換を有効にします。React.createElement が使用されます。

すべてのオプションはこちらで確認できます：
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### ES6 モジュール

TypeScript は ES6（ECMAScript 2015）およびそれ以降の多くのバージョンをサポートしています。つまり、アロー関数、テンプレートリテラル、クラス、モジュール、分割代入などの ES6 構文を使用できます。

プロジェクトで ES6 機能を有効にするには、tsconfig.json で `target` プロパティを指定できます。

設定例：

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### ES7 べき乗演算子

べき乗（`**`）演算子は、第 1 オペランドを第 2 オペランドの累乗にした値を計算します。`Math.pow()` と同様に機能しますが、オペランドとして BigInt も受け入れられます。
TypeScript では、tsconfig.json ファイルの `target` を `es2016` 以上に設定することで、この演算子が完全にサポートされます。

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### for-await-of 文

これは TypeScript で完全にサポートされている JavaScript の機能で、ターゲットバージョンを `es2018` にすると、非同期反復可能オブジェクトを反復処理できます。

```typescript
async function* asyncNumbers(): AsyncIterableIterator<number> {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    for await (const num of asyncNumbers()) {
        console.log(num);
    }
})();
```

### new target メタプロパティ

TypeScript では `new.target` メタプロパティを使用できます。これにより、関数またはコンストラクターが new 演算子を使用して呼び出されたかどうかを判定できます。コンストラクター呼び出しの結果としてオブジェクトが作成されたかどうかを検出できます。

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Logs the constructor function used to create an instance
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const parentX = new Parent(); // [Function: Parent]
const child = new Child(); // [Function: Child]
```

### 動的 import 式

TypeScript でサポートされている動的 import の ECMAScript 提案を使用して、条件に応じてモジュールを読み込んだり、必要に応じて遅延読み込みしたりできます。

TypeScript における動的 import 式の構文は次のとおりです。

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Dynamic import
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

このコマンドは `--watch` パラメーターを指定して TypeScript コンパイラを起動し、TypeScript ファイルが変更されるたびに自動的に再コンパイルできるようにします。

```shell
tsc --watch
```

TypeScript バージョン 4.9 以降、ファイル監視は主にファイルシステムイベントに依存し、イベントベースのウォッチャーを確立できない場合は自動的にポーリングへ切り替わります。

### 非 null アサーション演算子

非 null アサーション演算子（後置の !）は、確実な代入アサーションとも呼ばれ、TypeScript の静的型解析が null または undefined の可能性を示している場合でも、変数やプロパティが null または undefined ではないと表明できる TypeScript の機能です。この機能を使用すると、明示的なチェックをすべて取り除くことができます。

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### デフォルト値を持つ宣言

デフォルト値を持つ宣言は、変数またはパラメーターにデフォルト値が代入される場合に使用されます。つまり、その変数またはパラメーターに値が指定されていない場合、デフォルト値が使用されます。

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### オプショナルチェーン

オプショナルチェーン演算子 `?.` は、プロパティやメソッドにアクセスする際、通常のドット演算子（`.`）と同様に機能します。ただし、エラーをスローする代わりに式を終了して `undefined` を返すことで、null または undefined の値を適切に処理します。

```typescript
type Person = {
    name: string;
    age?: number;
    address?: {
        street?: string;
        city?: string;
    };
};

const person: Person = {
    name: 'John',
};

console.log(person.address?.city); // undefined
```

### null 合体演算子

null 合体演算子 `??` は、左辺の値が `null` または `undefined` の場合は右辺の値を返し、それ以外の場合は左辺の値を返します。

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### テンプレートリテラル型

テンプレートリテラル型を使用すると、型レベルで文字列値を操作し、既存の文字列型に基づいて新しい文字列型を生成できます。文字列ベースの操作から、より表現力が高く正確な型を作成するのに役立ちます。

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### 関数オーバーロード

関数オーバーロードを使用すると、同じ関数名に対して、パラメーター型と戻り値の型がそれぞれ異なる複数の関数シグネチャを定義できます。
オーバーロードされた関数を呼び出すと、TypeScript は指定された引数を使用して正しい関数シグネチャを判定します。

```typescript
function makeGreeting(name: string): string;
function makeGreeting(names: string[]): string[];

function makeGreeting(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Hi ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Hi, ${name}!`);
    }
    throw new Error('Unable to greet');
}

makeGreeting('Simon');
makeGreeting(['Simone', 'John']);
```

### 再帰型

再帰型とは、それ自身を参照できる型です。これは、連結リスト、木、グラフなど、階層構造または再帰構造（無限にネストする可能性がある）を持つデータ構造を定義するのに役立ちます。

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### 再帰条件型

TypeScript では、ロジックと再帰を使用して複雑な型の関係を定義できます。
簡単な言葉で分解してみましょう。

条件型を使用すると、真偽条件に基づいて型を定義できます。

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

再帰とは、型定義の中でその型自体を参照する型定義を意味します。

```typescript
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const data: Json = {
    prop1: true,
    prop2: 'prop2',
    prop3: {
        prop4: [],
    },
};
```

再帰条件型は、条件ロジックと再帰の両方を組み合わせます。これは、型定義が条件ロジックを通じてそれ自身に依存できることを意味し、複雑で柔軟な型の関係を作成します。

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Node における ECMAScript モジュールのサポート

Node.js はバージョン 15.3.0 から ECMAScript モジュールのサポートを追加し、TypeScript はバージョン 4.7 以降、Node.js 向けの ECMAScript モジュールをサポートしています。このサポートは、tsconfig.json ファイルで `module` プロパティに値 `nodenext` を使用することで有効にできます。例を示します。

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js はモジュール用に 2 つのファイル拡張子をサポートしています。ES モジュールには `.mjs`、CommonJS モジュールには `.cjs` を使用します。TypeScript で対応するファイル拡張子は、ES モジュールには `.mts`、CommonJS モジュールには `.cts` です。TypeScript コンパイラがこれらのファイルを JavaScript にトランスパイルすると、`.mjs` ファイルと `.cjs` ファイルが作成されます。

プロジェクトで ES モジュールを使用する場合は、package.json ファイルで `type` プロパティを "module" に設定できます。これにより、プロジェクトを ES モジュールプロジェクトとして扱うよう Node.js に指示します。

さらに、TypeScript は .d.ts ファイルでの型宣言もサポートしています。これらの宣言ファイルは、TypeScript で記述されたライブラリやモジュールの型情報を提供し、他の開発者が TypeScript の型チェック機能と自動補完機能を利用できるようにします。

### アサーション関数

TypeScript におけるアサーション関数は、戻り値に基づいて特定の条件の検証を示す関数です。最も単純な形式では、assert 関数は指定された述語を調べ、述語が false と評価された場合にエラーを発生させます。

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

また、関数式として宣言することもできます。

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

アサーション関数には型ガードとの類似点があります。型ガードはもともと、実行時チェックを行い、特定のスコープ内で値の型を保証するために導入されました。
具体的には、型ガードは型述語を評価し、その述語が true か false かを示す真偽値を返す関数です。これはアサーション関数とは少し異なります。アサーション関数は、述語が満たされない場合に false を返すのではなく、エラーをスローすることを目的としています。

型ガードの例：

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### 可変長タプル型

可変長タプル型は TypeScript バージョン 4.0 で導入された機能です。まず、タプルとは何かを振り返ることから始めましょう。

タプル型は、長さが定義され、各要素の型が既知である配列です。

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

「variadic」という用語は、不定アリティ（可変数の引数を受け入れること）を意味します。

可変長タプルは、これまでと同じすべてのプロパティを持ちながら、正確な形状がまだ定義されていないタプル型です。

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

前のコードでは、渡されたジェネリック `T` によってタプルの形状が定義されていることが分かります。

可変長タプルは複数のジェネリックを受け入れることができるため、非常に柔軟です。

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

新しい可変長タプルでは、次の機能を使用できます。

* タプル型構文内のスプレッドをジェネリックにできるようになったため、操作対象となる実際の型が分からない場合でも、タプルと配列に対する高階操作を表現できます。
* rest 要素をタプル内の任意の位置に配置できます。

例：

```typescript
type Items = readonly unknown[];

function concat<T extends Items, U extends Items>(
    arr1: T,
    arr2: U
): [...T, ...U] {
    return [...arr1, ...arr2];
}

concat([1, 2, 3], ['4', '5', '6']); // [1, 2, 3, "4", "5", "6"]
```

### ボックス化された型

ボックス化された型とは、プリミティブ型をオブジェクトとして表現するために使用されるラッパーオブジェクトを指します。これらのラッパーオブジェクトは、プリミティブ値で直接利用できない追加の機能やメソッドを提供します。

`string` プリミティブで `charAt` や `normalize` のようなメソッドにアクセスすると、JavaScript はそれを `String` オブジェクトでラップし、メソッドを呼び出してから、そのオブジェクトを破棄します。

デモ：

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript は、プリミティブとそれに対応するオブジェクトラッパーに個別の型を提供することで、この違いを表現します。

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

通常、ボックス化された型は必要ありません。ボックス化された型の使用は避け、代わりにプリミティブ型を使用してください。たとえば、`String` ではなく `string` を使用します。

### TypeScript における共変性と反変性

共変性と反変性は、ジェネリック型において型の関係がどのように振る舞うかを表します。

TypeScript では、次のようになります。

* 配列は **共変** ですが、完全に型安全ではありません。
* 関数のパラメーター型は次のようになります。
  * `strictFunctionTypes` が有効な場合は **反変**
  * それ以外の場合は **双変**

共変とは、関係が維持されることを意味します。型 A が型 B のサブタイプである場合、`F<A>` も `F<B>` のサブタイプになります。TypeScript では、これは戻り値の型と配列でよく見られます（ただし、配列の共変性は完全に型安全ではありません）。

反変とは、関係が逆になることを意味します。型 A が型 B のサブタイプである場合、`F<B>` は `F<A>` のサブタイプになります。TypeScript では、関数のパラメーター型は反変となるように意図されています。つまり、より広い型を受け入れる関数を、より狭い型が期待される場所で使用できます。

しかし実際には、TypeScript は関数のパラメーターについて双変を許可することがよくあります（`strictFunctionTypes` が有効な場合を除く）。これは、厳密には型安全ではない場合でも、両方向が受け入れられる可能性があることを意味します。

例：すべての動物のための空間と、犬だけのための別の空間を想像してください。

* **共変**：  
  「動物の空間」が期待される場所で「犬の空間」を使用できます。すべての犬は動物だからです。  
  ただし、「犬の空間」が期待される場所で「動物の空間」を使用することはできません。犬以外の動物が含まれている可能性があるためです。

* **反変**（関数の観点で考えてください）：  
  **あらゆる動物**を扱えるものがある場合、それを**犬だけ**を扱うものが期待される場所で使用できます。  
  ただし、その逆はできません。

共変の例：

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

let animals: Animal[] = [];
let dogs: Dog[] = [];

// Arrays are covariant in TypeScript (but not type-safe)
animals = dogs; // allowed
dogs = animals; // error
```

反変の例：

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

type Feed<T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = animal => {
    console.log(animal.name);
};

let feedDog: Feed<Dog> = dog => {
    console.log(dog.breed);
};

// Intended contravariance:
feedDog = feedAnimal; // safe

// This depends on compiler settings:
feedAnimal = feedDog; // error only with strictFunctionTypes
```

#### 型パラメーターのオプショナルな変性アノテーション

TypeScript 4.7.0 以降では、`out` キーワードと `in` キーワードを使用して変性アノテーションを指定できます。

共変には、`out` キーワードを使用します。

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

反変には、`in` キーワードを使用します。

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### テンプレート文字列パターンのインデックスシグネチャ

テンプレート文字列パターンのインデックスシグネチャを使用すると、テンプレート文字列パターンを使って柔軟なインデックスシグネチャを定義できます。この機能により、特定の文字列キーパターンでインデックス付けできるオブジェクトを作成でき、プロパティへのアクセスと操作をより細かく、明確に制御できます。

TypeScript はバージョン 4.4 以降、シンボルとテンプレート文字列パターンのインデックスシグネチャを許可しています。

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Unique symbol key',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### satisfies 演算子

`satisfies` 演算子を使用すると、指定された型が特定のインターフェイスや条件を満たしているかを確認できます。言い換えると、型が特定のインターフェイスで必要とされるすべてのプロパティとメソッドを持っていることを保証します。変数が型の定義に適合することを保証する方法です。
例を示します。

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Type Annotation using `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// In the following lines, TypeScript won't be able to infer properly
user.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user.nickName; // string | string[] | undefined

// Type assertion using `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Here too, TypeScript won't be able to infer properly
user2.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user2.nickName; // string | string[] | undefined

// Using the `satisfies` operator we can properly infer the types now
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infers correctly: string[]
user3.nickName; // TypeScript infers correctly: undefined
```

### 型のみのインポートとエクスポート

型のみのインポートとエクスポートを使用すると、その型に関連付けられた値や関数をインポートまたはエクスポートせずに、型をインポートまたはエクスポートできます。これはバンドルサイズを削減するのに役立つ場合があります。

型のみをインポートするには、`import type` キーワードを使用できます。

TypeScript では、`allowImportingTsExtensions` の設定に関係なく、型のみのインポートで宣言ファイルと実装ファイルの両方の拡張子（.ts、.mts、.cts、.tsx）を使用できます。

例：

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

次の形式がサポートされています。

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### using 宣言と明示的なリソース管理

`using` 宣言は、破棄可能なリソースの管理に使用される、`const` に似たブロックスコープの不変バインディングです。値で初期化されると、その値の `Symbol.dispose` メソッドが記録され、その後、囲んでいるブロックスコープを抜ける際に実行されます。

これは ECMAScript のリソース管理機能に基づいています。この機能は、接続を閉じる、ファイルを削除する、メモリを解放するなど、オブジェクト作成後に不可欠なクリーンアップタスクを実行するのに役立ちます。

注意：

* TypeScript バージョン 5.2 で導入されてから日が浅いため、ほとんどのランタイムはネイティブにサポートしていません。`Symbol.dispose`、`Symbol.asyncDispose`、`DisposableStack`、`AsyncDisposableStack`、`SuppressedError` にはポリフィルが必要です。
* さらに、tsconfig.json を次のように設定する必要があります。

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

例：

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // Simple polyfill

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // Resource is declared
    console.log(2);
} // Resource is disposed (e.g., `work[Symbol.dispose]()` is evaluated)

console.log(3);
```

コードの出力は次のようになります。

```shell
1
2
disposed
3
```

破棄の対象となるリソースは、`Disposable` インターフェイスに準拠している必要があります。

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

`using` 宣言はリソースの破棄操作をスタックに記録し、宣言と逆の順序で破棄されることを保証します。

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

後続のコードが実行された場合や例外が発生した場合でも、リソースは確実に破棄されます。そのため、破棄時に例外がスローされ、別の例外が抑制される可能性があります。抑制されたエラーの情報を保持するため、新しいネイティブ例外 `SuppressedError` が導入されています。

#### await using 宣言

`await using` 宣言は、非同期に破棄可能なリソースを処理します。値には `Symbol.asyncDispose` メソッドが必要で、ブロックの終了時に await されます。

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

非同期に破棄可能なリソースは、`Disposable` または `AsyncDisposable` インターフェイスのいずれかに準拠している必要があります。

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Simple polyfill

class DatabaseConnection implements AsyncDisposable {
    // A method that is called when the object is disposed asynchronously
    [Symbol.asyncDispose]() {
        // Close the connection and return a promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Create a new connection and dispose it asynchronously when it goes out of scope
    await using connection = new DatabaseConnection(); //  Resource is declared
    console.log('Doing some work...');
} // Resource is disposed (e.g., `await connection[Symbol.asyncDispose]()` is evaluated)

doWork();
```

コードの出力は次のとおりです。

```shell
Doing some work...
Closing the connection...
Connection closed.
```

`using` 宣言と `await using` 宣言は、`for`、`for-in`、`for-of`、`for-await-of`、`switch` 文で使用できます。

### インポート属性

TypeScript 5.3 のインポート属性（インポート用のラベル）は、モジュール（JSON など）の処理方法をランタイムに伝えます。これにより、インポートを明確にすることでセキュリティが向上し、より安全にリソースを読み込むためのコンテンツセキュリティポリシー（CSP）にも準拠します。TypeScript はそれらが有効であることを保証しますが、特定のモジュール処理における解釈はランタイムに委ねます。

例：

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

動的 import の場合：

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### 正規表現の構文チェック

TypeScript 5.5.4 以降、コンパイル時に正規表現リテラルの一般的なエラー（無効な構文、誤った後方参照、ターゲットの JS バージョンでサポートされていない機能など）がチェックされます。これはバグを早期に発見するのに役立ちますが、new RegExp("...") の文字列はチェックされません。

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

`import defer` を使用すると、モジュールを読み込みつつ、そのモジュールから何かを実際に使用するまで実行を遅らせることができます。これにより、不要な処理や副作用を回避できます。

* 次の形式でのみ動作します：`import defer * as name from "module"`
* エクスポートにアクセスしたときにのみコードが実行されます
