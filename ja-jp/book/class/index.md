# クラス



### クラスの一般的な構文

TypeScript では、クラスを定義するために `class` キーワードを使用します。以下に例を示します。

```typescript
class Person {
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public sayHi(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}
```

`class` キーワードは、「Person」という名前のクラスを定義するために使用されています。

このクラスには、`string` 型の name と `number` 型の age という 2 つのプライベートプロパティがあります。

コンストラクターは `constructor` キーワードを使用して定義されています。name と age をパラメーターとして受け取り、対応するプロパティに代入します。

このクラスには、挨拶メッセージをログに出力する sayHi という名前の `public` メソッドがあります。

TypeScript でクラスのインスタンスを作成するには、`new` キーワードの後にクラス名と丸括弧 `()` を続けます。例:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### コンストラクター

コンストラクターはクラス内の特別なメソッドで、クラスのインスタンスが作成されるときにオブジェクトのプロパティを初期化するために使用されます。

```typescript
class Person {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(
            `Hello, my name is ${this.name} and I'm ${this.age} years old.`
        );
    }
}

const john = new Person('Simon', 17);
john.sayHello();
```

次の構文を使用してコンストラクターをオーバーロードできます。

```typescript
type Sex = 'm' | 'f';

class Person {
    name: string;
    age: number;
    sex: Sex;

    constructor(name: string, age: number, sex?: Sex);
    constructor(name: string, age: number, sex: Sex) {
        this.name = name;
        this.age = age;
        this.sex = sex ?? 'm';
    }
}

const p1 = new Person('Simon', 17);
const p2 = new Person('Alice', 22, 'f');
```

TypeScript では複数のコンストラクターオーバーロードを定義できますが、実装は 1 つだけで、すべてのオーバーロードと互換性がなければなりません。これはオプショナルパラメーターを使用して実現できます。

```typescript
class Person {
    name: string;
    age: number;

    constructor();
    constructor(name: string);
    constructor(name: string, age: number);
    constructor(name?: string, age?: number) {
        this.name = name ?? 'Unknown';
        this.age = age ?? 0;
    }

    displayInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

const person1 = new Person();
person1.displayInfo(); // Name: Unknown, Age: 0

const person2 = new Person('John');
person2.displayInfo(); // Name: John, Age: 0

const person3 = new Person('Jane', 25);
person3.displayInfo(); // Name: Jane, Age: 25
```

### プライベートコンストラクターとプロテクテッドコンストラクター

TypeScript では、コンストラクターを private または protected としてマークでき、これによりアクセシビリティと使用方法が制限されます。

プライベートコンストラクター:
クラス自体の内部からのみ呼び出せます。プライベートコンストラクターは、シングルトンパターンを適用したい場合や、インスタンスの作成をクラス内のファクトリーメソッドに制限したい場合によく使用されます。

プロテクテッドコンストラクター:
直接インスタンス化すべきではないものの、サブクラスから拡張できる基底クラスを作成したい場合に便利です。

```typescript
class BaseClass {
    protected constructor() {}
}

class DerivedClass extends BaseClass {
    private value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }
}

// Attempting to instantiate the base class directly will result in an error
// const baseObj = new BaseClass(); // Error: Constructor of class 'BaseClass' is protected.

// Create an instance of the derived class
const derivedObj = new DerivedClass(10);
```

### アクセス修飾子

アクセス修飾子 `private`、`protected`、`public` は、TypeScript クラスのプロパティやメソッドなどのクラスメンバーの可視性とアクセシビリティを制御するために使用されます。これらの修飾子は、カプセル化を適用し、クラスの内部状態へのアクセスや変更に境界を設けるうえで不可欠です。

`private` 修飾子は、クラスメンバーへのアクセスを、それを含むクラス内のみに制限します。

`protected` 修飾子は、クラスメンバーへのアクセスを、それを含むクラスとその派生クラス内で許可します。

`public` 修飾子はクラスメンバーへの無制限のアクセスを提供し、どこからでもアクセスできるようにします。

### ゲッターとセッター

ゲッターとセッターは、クラスプロパティへのアクセスと変更の動作を独自に定義できる特別なメソッドです。オブジェクトの内部状態をカプセル化し、プロパティの値を取得または設定するときに追加のロジックを実行できます。
TypeScript では、ゲッターとセッターはそれぞれ `get` キーワードと `set` キーワードを使用して定義します。次に例を示します。

```typescript
class MyClass {
    private _myProperty: string;

    constructor(value: string) {
        this._myProperty = value;
    }
    get myProperty(): string {
        return this._myProperty;
    }
    set myProperty(value: string) {
        this._myProperty = value;
    }
}
```

### クラスの自動アクセサー

TypeScript バージョン 4.9 では、今後の ECMAScript 機能である自動アクセサーのサポートが追加されています。自動アクセサーはクラスプロパティに似ていますが、「accessor」キーワードを使用して宣言します。

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

自動アクセサーは、アクセス不能なプロパティを操作するプライベートな `get` アクセサーと `set` アクセサーに「脱糖化」されます。

<!-- skip -->
```typescript
class Animal {
    #__name: string;

    get name() {
        return this.#__name;
    }
    set name(value: string) {
        this.#__name = value;
    }

    constructor(name: string) {
        this.name = name;
    }
}
```

### this

TypeScript では、`this` キーワードはメソッドまたはコンストラクター内におけるクラスの現在のインスタンスを指します。これにより、クラス自体のスコープ内から、そのクラスのプロパティとメソッドにアクセスして変更できます。
これは、オブジェクト自身のメソッド内で、その内部状態にアクセスして操作する方法を提供します。

```typescript
class Person {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    public introduce(): void {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const person1 = new Person('Alice');
person1.introduce(); // Hello, my name is Alice.
```

### パラメータープロパティ

パラメータープロパティを使用すると、コンストラクターのパラメーター内でクラスプロパティを直接宣言して初期化でき、定型的なコードを省けます。例:

```typescript
class Person {
    constructor(
        private name: string,
        public age: number
    ) {
        // The "private" and "public" keywords in the constructor
        // automatically declare and initialize the corresponding class properties.
    }
    public introduce(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}
const person = new Person('Alice', 25);
person.introduce();
```

### 抽象クラス

TypeScript では、抽象クラスは主に継承に使用されます。サブクラスが継承できる共通のプロパティとメソッドを定義する方法を提供します。
これは、共通の動作を定義し、サブクラスが特定のメソッドを実装することを強制したい場合に便利です。抽象基底クラスがサブクラスに共有インターフェースと共通機能を提供するクラス階層を作成できます。

```typescript
abstract class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract makeSound(): void;
}

class Cat extends Animal {
    makeSound(): void {
        console.log(`${this.name} meows.`);
    }
}

const cat = new Cat('Whiskers');
cat.makeSound(); // Output: Whiskers meows.
```

### ジェネリクスを使用するクラス

ジェネリクスを使用するクラスでは、さまざまな型を扱える再利用可能なクラスを定義できます。

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }

    setItem(item: T): void {
        this.item = item;
    }
}

const container1 = new Container<number>(42);
console.log(container1.getItem()); //  42

const container2 = new Container<string>('Hello');
container2.setItem('World');
console.log(container2.getItem()); // World
```

### デコレーター

デコレーターは、メタデータの追加、動作の変更、検証、または対象要素の機能の拡張を行う仕組みを提供します。デコレーターは実行時に実行される関数です。1 つの宣言に複数のデコレーターを適用できます。

デコレーターは実験的な機能であり、以下の例は ES6 を使用する TypeScript バージョン 5 以降でのみ互換性があります。

TypeScript 5 より前のバージョンでは、`experimentalDecorators` プロパティを `tsconfig.json` で使用するか、コマンドラインで `--experimentalDecorators` を使用して有効にする必要があります（ただし、以下の例は動作しません）。

デコレーターの一般的なユースケースには、次のようなものがあります。

* プロパティの変更の監視。
* メソッド呼び出しの監視。
* 追加のプロパティやメソッドの追加。
* 実行時の検証。
* 自動的なシリアライズとデシリアライズ。
* ロギング。
* 認可と認証。
* エラーの防止。

注: バージョン 5 のデコレーターでは、パラメーターをデコレートできません。

デコレーターの種類:

#### クラスデコレーター

クラスデコレーターは、プロパティやメソッドを追加したり、クラスのインスタンスを収集したりするなど、既存のクラスを拡張する場合に便利です。次の例では、クラスを文字列表現に変換する `toString` メソッドを追加します。

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function toString<Class extends Constructor>(
    Value: Class,
    context: ClassDecoratorContext<Class>
) {
    return class extends Value {
        constructor(...args: any[]) {
            super(...args);
            console.log(JSON.stringify(this));
            console.log(JSON.stringify(context));
        }
    };
}

@toString
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet() {
        return 'Hello, ' + this.name;
    }
}
const person = new Person('Simon');
/* Logs:
{"name":"Simon"}
{"kind":"class","name":"Person"}
*/
```

#### プロパティデコレーター

プロパティデコレーターは、初期値を変更するなど、プロパティの動作を変更する場合に便利です。次のコードは、プロパティが常に大文字になるように設定するスクリプトです。

```typescript
function upperCase<T>(
    target: undefined,
    context: ClassFieldDecoratorContext<T, string>
) {
    return function (this: T, value: string) {
        return value.toUpperCase();
    };
}

class MyClass {
    @upperCase
    prop1 = 'hello!';
}

console.log(new MyClass().prop1); // Logs: HELLO!
```

#### メソッドデコレーター

メソッドデコレーターを使用すると、メソッドの動作を変更または拡張できます。以下は、単純なロガーの例です。

```typescript
function log<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
        This,
        (this: This, ...args: Args) => Return
    >
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`);
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`);
        return result;
    }

    return replacementMethod;
}

class MyClass {
    @log
    sayHello() {
        console.log('Hello!');
    }
}

new MyClass().sayHello();
```

次の内容がログに出力されます。

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### ゲッターとセッターのデコレーター

ゲッターとセッターのデコレーターを使用すると、クラスアクセサーの動作を変更または拡張できます。たとえば、プロパティへの代入を検証する場合に便利です。次に、ゲッターデコレーターの簡単な例を示します。

```typescript
function range<This, Return extends number>(min: number, max: number) {
    return function (
        target: (this: This) => Return,
        context: ClassGetterDecoratorContext<This, Return>
    ) {
        return function (this: This): Return {
            const value = target.call(this);
            if (value < min || value > max) {
                throw 'Invalid';
            }
            Object.defineProperty(this, context.name, {
                value,
                enumerable: true,
            });
            return value;
        };
    };
}

class MyClass {
    private _value = 0;

    constructor(value: number) {
        this._value = value;
    }
    @range(1, 100)
    get getValue(): number {
        return this._value;
    }
}

const obj = new MyClass(10);
console.log(obj.getValue); // Valid: 10

const obj2 = new MyClass(999);
console.log(obj2.getValue); // Throw: Invalid!
```

#### デコレーターメタデータ

デコレーターメタデータにより、デコレーターが任意のクラスにメタデータを適用し、利用する処理が簡単になります。デコレーターはコンテキストオブジェクトの新しい metadata プロパティにアクセスでき、このプロパティはプリミティブとオブジェクトの両方に対するキーとして使用できます。
メタデータ情報には、クラスの `Symbol.metadata` を介してアクセスできます。

メタデータは、デバッグ、シリアライズ、デコレーターを用いた依存性注入など、さまざまな目的に使用できます。

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // Simple polyfill

type Context =
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    | ClassMethodDecoratorContext; // Context contains property metadata: DecoratorMetadata

function setMetadata(_target: any, context: Context) {
    // Set the metadata object with a primitive value
    context.metadata[context.name] = true;
}

class MyClass {
    @setMetadata
    a = 123;

    @setMetadata
    accessor b = 'b';

    @setMetadata
    fn() {}
}

const metadata = MyClass[Symbol.metadata]; // Get metadata information

console.log(JSON.stringify(metadata)); // {"bar":true,"baz":true,"foo":true}
```

### 継承

継承とは、あるクラスが基底クラスまたはスーパークラスと呼ばれる別のクラスからプロパティとメソッドを継承できる仕組みを指します。派生クラスは子クラスまたはサブクラスとも呼ばれ、新しいプロパティやメソッドを追加したり、既存のものをオーバーライドしたりすることで、基底クラスの機能を拡張して特化できます。

```typescript
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    speak(): void {
        console.log('The animal makes a sound');
    }
}

class Dog extends Animal {
    breed: string;

    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }

    speak(): void {
        console.log('Woof! Woof!');
    }
}

// Create an instance of the base class
const animal = new Animal('Generic Animal');
animal.speak(); // The animal makes a sound

// Create an instance of the derived class
const dog = new Dog('Max', 'Labrador');
dog.speak(); // Woof! Woof!"
```

TypeScript は従来の意味での多重継承をサポートしておらず、代わりに単一の基底クラスからの継承を許可します。
TypeScript は複数のインターフェースをサポートしています。インターフェースはオブジェクトの構造に対する契約を定義でき、クラスは複数のインターフェースを実装できます。これにより、クラスは複数のソースから動作と構造を継承できます。

```typescript
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

class FlyingFish implements Flyable, Swimmable {
    fly() {
        console.log('Flying...');
    }

    swim() {
        console.log('Swimming...');
    }
}

const flyingFish = new FlyingFish();
flyingFish.fly();
flyingFish.swim();
```

TypeScript の `class` キーワードは、JavaScript と同様に、構文糖衣と呼ばれることがよくあります。これは、クラスベースの方法でオブジェクトを作成して操作するための、より馴染みのある構文を提供する目的で ECMAScript 2015（ES6）に導入されました。ただし、TypeScript は JavaScript のスーパーセットであるため、最終的には JavaScript にコンパイルされ、その中核は引き続きプロトタイプベースである点に注意が必要です。

### 静的メンバー

TypeScript には静的メンバーがあります。クラスの静的メンバーにアクセスするには、オブジェクトを作成せずに、クラス名の後にドットを続けて使用できます。

```typescript
class OfficeWorker {
    static memberCount: number = 0;

    constructor(private name: string) {
        OfficeWorker.memberCount++;
    }
}

const w1 = new OfficeWorker('James');
const w2 = new OfficeWorker('Simon');
const total = OfficeWorker.memberCount;
console.log(total); // 2
```

### プロパティの初期化

TypeScript でクラスのプロパティを初期化する方法はいくつかあります。

インライン:

次の例では、クラスのインスタンスが作成されるときに、これらの初期値が使用されます。

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

コンストラクター内:

```typescript
class MyClass {
    property1: string;
    property2: number;

    constructor() {
        this.property1 = 'default value';
        this.property2 = 42;
    }
}
```

コンストラクターパラメーターを使用する方法:

```typescript
class MyClass {
    constructor(
        private property1: string = 'default value',
        public property2: number = 42
    ) {
        // There is no need to assign the values to the properties explicitly.
    }
    log() {
        console.log(this.property2);
    }
}
const x = new MyClass();
x.log();
```

### メソッドのオーバーロード

メソッドのオーバーロードにより、クラスは同じ名前で、パラメーターの型またはパラメーター数が異なる複数のメソッドを持つことができます。これにより、渡された引数に応じて異なる方法でメソッドを呼び出せます。

```typescript
class MyClass {
    add(a: number, b: number): number; // Overload signature 1
    add(a: string, b: string): string; // Overload signature 2

    add(a: number | string, b: number | string): number | string {
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        }
        if (typeof a === 'string' && typeof b === 'string') {
            return a.concat(b);
        }
        throw new Error('Invalid arguments');
    }
}

const r = new MyClass();
console.log(r.add(10, 5)); // Logs 15
```

