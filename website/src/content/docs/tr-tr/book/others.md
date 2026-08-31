---
title: Diğer Konular
sidebar:
  order: 62
  label: 62. Diğer Konular
---


### Hatalar ve İstisna İşleme

TypeScript, standart JavaScript hata işleme mekanizmalarını kullanarak hataları yakalamanıza ve işlemenize olanak tanır:

Try-Catch-Finally Blokları:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

Farklı hata türlerini de işleyebilirsiniz:

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

Özel Hata Türleri:

Error `class`'ını genişleterek daha özel hatalar belirtmek mümkündür:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Mixin Sınıfları

Mixin sınıfları, birden çok sınıfın davranışını tek bir sınıfta bir araya getirip bileştirmenize olanak tanır. Derin kalıtım zincirlerine gerek kalmadan işlevselliği yeniden kullanmanın ve genişletmenin bir yolunu sağlarlar.

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

### Eşzamansız Dil Özellikleri

TypeScript, JavaScript'in bir üst kümesi olduğundan JavaScript'in şu yerleşik eşzamansız dil özelliklerine sahiptir:

Promise'lar:

Promise'lar, başarı ve hata koşullarını işlemek için `.then()` ve `.catch()` gibi yöntemleri kullanarak eşzamansız işlemleri ve bunların sonuçlarını işlemenin bir yoludur.

Daha fazla bilgi için: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Async/await anahtar sözcükleri, Promise'larla çalışmak için daha eşzamanlı görünen bir sözdizimi sağlamanın bir yoludur. `async` anahtar sözcüğü eşzamansız bir işlev tanımlamak için, `await` anahtar sözcüğü ise bir Promise çözümlenene veya reddedilene kadar yürütmeyi duraklatmak için async işlev içinde kullanılır.

Daha fazla bilgi için:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

Aşağıdaki API'ler TypeScript'te iyi desteklenir:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Worker'lar:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Worker'lar:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Yineleyiciler ve Üreteçler

Hem yineleyiciler hem de üreteçler TypeScript'te iyi desteklenir.

Yineleyiciler, yineleyici protokolünü uygulayan ve bir koleksiyonun veya dizinin öğelerine tek tek erişmenin bir yolunu sağlayan nesnelerdir. Yinelemedeki bir sonraki öğeyi işaret eden bir işaretçi içeren yapılardır. Bir `next()` yöntemine sahiptirler; bu yöntem dizideki bir sonraki değeri ve dizinin `done` olup olmadığını belirten bir boolean değeri döndürür.

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

Üreteçler, yineleyicilerin oluşturulmasını basitleştiren ve `function*` sözdizimi kullanılarak tanımlanan özel işlevlerdir. Değer dizisini tanımlamak için `yield` anahtar sözcüğünü kullanırlar ve değerler istendiğinde yürütmeyi otomatik olarak duraklatıp sürdürürler.

Üreteçler, yineleyici oluşturmayı kolaylaştırır ve özellikle büyük veya sonsuz dizilerle çalışmak için kullanışlıdır.

Örnek:

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

TypeScript ayrıca eşzamansız yineleyicileri ve eşzamansız üreteçleri destekler.

Daha fazla bilgi için:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### TsDocs JSDoc Referansı

Bir JavaScript kod tabanıyla çalışırken tür bilgisi sağlayan ek açıklamalara sahip JSDoc yorumlarını kullanarak TypeScript'in doğru türü çıkarmasına yardımcı olmak mümkündür.

Örnek:

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

Belgelerin tamamı bu bağlantıda sunulmaktadır:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

3.7 sürümünden itibaren JavaScript JSDoc sözdiziminden .d.ts tür tanımları oluşturmak mümkündür.
Daha fazla bilgiye buradan ulaşabilirsiniz:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

@types kuruluşu altındaki paketler, mevcut JavaScript kütüphaneleri veya modülleri için tür tanımları sağlamak amacıyla kullanılan özel bir paket adlandırma kuralını izler. Örneğin şu komut:

```shell
npm install --save-dev @types/lodash
```

geçerli projenize `lodash` tür tanımlarını yükler.

Bir `@types` paketinin tür tanımlarına katkıda bulunmak için lütfen [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) adresine bir pull request gönderin.

### JSX

JSX (JavaScript XML), JavaScript veya TypeScript dosyalarınız içinde HTML benzeri kod yazmanıza olanak tanıyan bir JavaScript dili sözdizimi uzantısıdır. HTML yapısını tanımlamak için React'te yaygın olarak kullanılır.

TypeScript, tür onaylaması ve statik analiz sağlayarak JSX'in yeteneklerini genişletir.

JSX kullanmak için `jsx` derleyici seçeneğini `tsconfig.json` dosyanızda ayarlamanız gerekir. Yaygın iki yapılandırma seçeneği:

* "preserve": JSX'i değiştirmeden .jsx dosyaları üretir. Bu seçenek, TypeScript'e JSX sözdizimini olduğu gibi tutmasını ve derleme işlemi sırasında dönüştürmemesini söyler. Dönüşümü gerçekleştiren Babel gibi ayrı bir aracınız varsa bu seçeneği kullanabilirsiniz.
* "react": TypeScript'in yerleşik JSX dönüşümünü etkinleştirir. React.createElement kullanılır.

Tüm seçeneklere buradan ulaşabilirsiniz:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### ES6 Modülleri

TypeScript, ES6'yı (ECMAScript 2015) ve sonraki birçok sürümü destekler. Bu, ok işlevleri, şablon değişmezleri, sınıflar, modüller, yapı bozma ve daha fazlası gibi ES6 sözdizimini kullanabileceğiniz anlamına gelir.

Projenizde ES6 özelliklerini etkinleştirmek için tsconfig.json dosyasındaki `target` özelliğini belirtebilirsiniz.

Bir yapılandırma örneği:

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

### ES7 Üs Alma Operatörü

Üs alma (`**`) operatörü, ilk işlenenin ikinci işlenenin kuvvetine yükseltilmesiyle elde edilen değeri hesaplar. `Math.pow()` işlevine benzer şekilde çalışır, ancak buna ek olarak BigInt'leri işlenen olarak kabul edebilir.
TypeScript, tsconfig.json dosyanızda `target` değerini `es2016` veya daha yüksek bir sürüme ayarladığınızda bu operatörü tam olarak destekler.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### for-await-of İfadesi

Bu, TypeScript tarafından tam olarak desteklenen ve `es2018` hedef sürümüyle eşzamansız yinelenebilir nesneler üzerinde yineleme yapmanıza olanak tanıyan bir JavaScript özelliğidir.

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

### Yeni target Meta Özelliği

TypeScript'te `new.target` meta özelliğini kullanabilirsiniz. Bu özellik, bir işlevin veya oluşturucunun new operatörü kullanılarak çağrılıp çağrılmadığını belirlemenizi sağlar. Bir nesnenin oluşturucu çağrısı sonucunda oluşturulup oluşturulmadığını saptamanıza olanak tanır.

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

### Dinamik İçe Aktarma İfadeleri

TypeScript tarafından desteklenen dinamik içe aktarmaya yönelik ECMAScript önerisini kullanarak modülleri koşullu olarak veya isteğe bağlı biçimde gecikmeli yüklemek mümkündür.

TypeScript'te dinamik içe aktarma ifadelerinin sözdizimi şöyledir:

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

Bu komut, TypeScript dosyaları her değiştirildiğinde bunları otomatik olarak yeniden derleyebilme özelliğiyle TypeScript derleyicisini `--watch` parametresiyle başlatır.

```shell
tsc --watch
```

TypeScript 4.9 sürümünden itibaren dosya izleme öncelikle dosya sistemi olaylarına dayanır; olay tabanlı bir izleyici kurulamazsa otomatik olarak yoklamaya başvurur.

### Null Olmayan Onaylama Operatörü

Kesin atama onaylamaları olarak da adlandırılan null olmayan onaylama operatörü (sonek !), TypeScript'in statik tür analizi bir değişkenin veya özelliğin null ya da undefined olabileceğini öne sürse bile bunun null veya undefined olmadığını onaylamanıza olanak tanıyan bir TypeScript özelliğidir. Bu özellik sayesinde açık kontrolleri kaldırmak mümkündür.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Varsayılan Değerli Bildirimler

Varsayılan değerli bildirimler, bir değişkene veya parametreye varsayılan bir değer atandığında kullanılır. Bu, söz konusu değişken veya parametre için bir değer sağlanmazsa bunun yerine varsayılan değerin kullanılacağı anlamına gelir.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### İsteğe Bağlı Zincirleme

İsteğe bağlı zincirleme operatörü `?.`, özelliklere veya yöntemlere erişmek için normal nokta operatörü (`.`) gibi çalışır. Ancak null veya undefined değerlerini, hata oluşturmak yerine ifadeyi sonlandırıp `undefined` döndürerek sorunsuz biçimde işler.

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

### Nullish Birleştirme Operatörü

Nullish birleştirme operatörü `??`, sol taraf `null` veya `undefined` ise sağ taraftaki değeri; aksi takdirde sol taraftaki değeri döndürür.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Şablon Değişmez Türleri

Şablon Değişmez Türleri, string değerlerini tür düzeyinde işlemenize ve mevcut türlerden yeni string türleri oluşturmanıza olanak tanır. String tabanlı işlemlerden daha anlamlı ve kesin türler oluşturmak için kullanışlıdır.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### İşlev Aşırı Yükleme

İşlev aşırı yükleme, aynı işlev adı için her biri farklı parametre ve dönüş türlerine sahip birden çok işlev imzası tanımlamanıza olanak tanır.
Aşırı yüklenmiş bir işlevi çağırdığınızda TypeScript, doğru işlev imzasını belirlemek için sağlanan bağımsız değişkenleri kullanır:

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

### Özyinelemeli Türler

Özyinelemeli Tür, kendisine başvurabilen bir türdür. Bağlı listeler, ağaçlar ve graflar gibi hiyerarşik veya özyinelemeli bir yapıya (potansiyel olarak sonsuz iç içe geçmeye) sahip veri yapılarını tanımlamak için kullanışlıdır.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Özyinelemeli Koşullu Türler

TypeScript'te mantık ve özyineleme kullanarak karmaşık tür ilişkileri tanımlamak mümkündür.
Bunu basit ifadelerle ele alalım:

Koşullu Türler, mantıksal koşullara göre türler tanımlamanıza olanak tanır:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

Özyineleme, kendi tanımı içinde kendisine başvuran bir tür tanımı anlamına gelir:

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

Özyinelemeli Koşullu Türler, hem koşullu mantığı hem de özyinelemeyi birleştirir. Bu, bir tür tanımının koşullu mantık aracılığıyla kendisine bağlı olabileceği ve böylece karmaşık ve esnek tür ilişkileri oluşturabileceği anlamına gelir.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Node'da ECMAScript Modülü Desteği

Node.js, 15.3.0 sürümünden itibaren ECMAScript Modülleri desteğini ekledi ve TypeScript, 4.7 sürümünden beri Node.js için ECMAScript Modülü Desteğine sahiptir. Bu destek, tsconfig.json dosyasındaki `module` özelliği `nodenext` değerine ayarlanarak etkinleştirilebilir. İşte bir örnek:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js, modüller için iki dosya uzantısını destekler: ES modülleri için `.mjs` ve CommonJS modülleri için `.cjs`. TypeScript'teki eşdeğer dosya uzantıları, ES modülleri için `.mts` ve CommonJS modülleri için `.cts` şeklindedir. TypeScript derleyicisi bu dosyaları JavaScript'e dönüştürdüğünde `.mjs` ve `.cjs` dosyaları oluşturur.

Projenizde ES modüllerini kullanmak istiyorsanız package.json dosyasındaki `type` özelliğini "module" olarak ayarlayabilirsiniz. Bu, Node.js'e projeyi bir ES modülü projesi olarak ele alması talimatını verir.

Ayrıca TypeScript, .d.ts dosyalarındaki tür bildirimlerini de destekler. Bu bildirim dosyaları, TypeScript ile yazılmış kütüphaneler veya modüller için tür bilgisi sağlayarak diğer geliştiricilerin bunları TypeScript'in tür denetimi ve otomatik tamamlama özellikleriyle kullanabilmesine olanak tanır.

### Onaylama Fonksiyonları

TypeScript'te onaylama fonksiyonları, dönüş değerlerine göre belirli bir koşulun doğrulandığını belirten fonksiyonlardır. En basit biçimiyle bir onaylama fonksiyonu, sağlanan bir yüklemi inceler ve yüklem false olarak değerlendirildiğinde hata oluşturur.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Ya da bir fonksiyon ifadesi olarak bildirilebilir:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Onaylama fonksiyonları, tür koruyucularıyla benzerlik gösterir. Tür koruyucuları başlangıçta çalışma zamanı denetimleri gerçekleştirmek ve bir değerin belirli bir kapsam içindeki türünü güvence altına almak için kullanıma sunulmuştur.
Daha açık bir ifadeyle tür koruyucu, bir tür yüklemini değerlendiren ve yüklemin doğru mu yanlış mı olduğunu belirten bir boolean değeri döndüren fonksiyondur. Bu, yüklem karşılanmadığında false döndürmek yerine hata oluşturmayı amaçlayan onaylama fonksiyonlarından biraz farklıdır.

Tür koruyucu örneği:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Değişken Sayıda Öğeli Demet Türleri

Değişken Sayıda Öğeli Demet Türleri, TypeScript 4.0 sürümünde kullanıma sunulan bir özelliktir; bu nedenle önce demetin ne olduğunu yeniden ele alalım:

Demet türü, uzunluğu tanımlı ve her bir öğesinin türü bilinen bir dizidir:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

"Variadic" terimi, belirsiz sayıda argüman alma (değişken sayıda argüman kabul etme) anlamına gelir.

Değişken sayıda öğeli demet, önceki tüm özelliklere sahip olan ancak kesin yapısı henüz tanımlanmamış bir demet türüdür:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

Önceki kodda, demet yapısının aktarılan `T` jeneriği tarafından tanımlandığını görebiliriz.

Değişken sayıda öğeli demetler birden fazla jenerik kabul edebilir, bu da onları oldukça esnek kılar:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Yeni değişken sayıda öğeli demetlerle şunları kullanabiliriz:

* Demet türü sözdizimindeki yayma ifadeleri artık jenerik olabilir; böylece üzerinde işlem yaptığımız gerçek türleri bilmediğimizde bile demetler ve diziler üzerindeki yüksek dereceli işlemleri temsil edebiliriz.
* Rest öğeleri bir demetin herhangi bir yerinde bulunabilir.

Örnek:

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

### Kutulanmış Türler

Kutulanmış türler, ilkel türleri nesne olarak temsil etmek için kullanılan sarmalayıcı nesneleri ifade eder. Bu sarmalayıcı nesneler, doğrudan ilkel değerlerde bulunmayan ek işlevler ve metotlar sağlar.

`charAt` veya `normalize` gibi bir metot bir `string` ilkel değeri üzerinde çağrıldığında JavaScript, değeri bir `String` nesnesiyle sarmalar, metodu çağırır ve ardından nesneyi atar.

Gösterim:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript, ilkel değerler ve bunlara karşılık gelen nesne sarmalayıcıları için ayrı türler sağlayarak bu ayrımı temsil eder:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Kutulanmış türlere genellikle gerek yoktur. Kutulanmış türleri kullanmaktan kaçının ve bunun yerine ilkel türleri kullanın; örneğin `string` kullanın, `String` değil.

### TypeScript'te Kovaryans ve Kontravaryans

Kovaryans ve kontravaryans, jenerik türlerde tür ilişkilerinin nasıl davrandığını açıklar.

TypeScript'te:

* Diziler **kovaryanttır**, ancak bu tamamen tür güvenli değildir.
* Fonksiyon parametresi türleri:
  * `strictFunctionTypes` etkinleştirildiğinde **kontravaryanttır**
  * aksi durumda **bivaryanttır**

Kovaryans, ilişkinin korunduğu anlamına gelir: A türü B türünün alt türüyse `F<A>` da `F<B>` türünün alt türüdür. TypeScript'te bu, yaygın olarak dönüş türlerinde ve dizilerde görülür (ancak dizi kovaryansı tamamen tür güvenli değildir).

Kontravaryans, ilişkinin tersine çevrildiği anlamına gelir: A türü B türünün alt türüyse `F<B>`, `F<A>` türünün alt türüdür. TypeScript'te fonksiyon parametresi türlerinin kontravaryant olması amaçlanır; yani daha geniş bir türü kabul eden bir fonksiyon, daha dar bir türün beklendiği yerde kullanılabilir.

Ancak uygulamada TypeScript, fonksiyon parametreleri için çoğunlukla bivaryansa izin verir (`strictFunctionTypes` etkinleştirilmediği sürece); bu, tam anlamıyla tür güvenli olmasa bile her iki yönün de kabul edilebileceği anlamına gelir.

Örnek: Tüm hayvanlar için bir alan ve yalnızca köpekler için ayrı bir alan düşünün.

* **Kovaryans**:  
  Tüm köpekler hayvan olduğu için "hayvanlar alanı" beklenen yerde bir "köpekler alanı" kullanabilirsiniz.  
  Ancak "köpekler alanı" beklenen yerde bir "hayvanlar alanı" kullanamazsınız, çünkü bu alan köpek olmayan hayvanlar içerebilir.

* **Kontravaryans** (fonksiyonlar açısından düşünün):  
  **Herhangi bir hayvanı** işleyebilen bir şeyi, **yalnızca köpekleri** işleyen bir şeyin beklendiği yerde kullanabilirsiniz.  
  Ancak bunun tersi geçerli değildir.

Kovaryans örneği:

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

Kontravaryans örneği:

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

#### Tür Parametreleri için İsteğe Bağlı Varyans Ek Açıklamaları

TypeScript 4.7.0 itibarıyla varyans ek açıklamalarını belirtmek için `out` ve `in` anahtar sözcüklerini kullanabiliriz.

Kovaryans için `out` anahtar sözcüğünü kullanın:

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

Kontravaryans için de `in` anahtar sözcüğünü kullanın:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### Şablon Dizesi Kalıbı İndeks İmzaları

Şablon dizesi kalıbı indeks imzaları, şablon dizesi kalıplarını kullanarak esnek indeks imzaları tanımlamamıza olanak tanır. Bu özellik, belirli dize anahtarı kalıplarıyla indekslenebilen nesneler oluşturmamızı sağlayarak özelliklere erişirken ve özellikleri değiştirirken daha fazla denetim ve kesinlik sunar.

TypeScript, 4.4 sürümünden itibaren semboller ve şablon dizesi kalıpları için indeks imzalarına izin verir.

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

### satisfies Operatörü

`satisfies` operatörü, belirli bir türün belirli bir arayüzü veya koşulu karşılayıp karşılamadığını denetlemenize olanak tanır. Başka bir deyişle bir türün, belirli bir arayüzün gerekli tüm özelliklerine ve metotlarına sahip olmasını sağlar. Bir değişkenin bir tür tanımına uyduğundan emin olmanın bir yoludur.
İşte bir örnek:

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

### Yalnızca Tür İçe Aktarımları ve Dışa Aktarımı

Yalnızca Tür İçe Aktarımları ve Dışa Aktarımları, bu türlerle ilişkili değerleri veya fonksiyonları içe ya da dışa aktarmadan türleri içe veya dışa aktarmanıza olanak tanır. Bu, paketinizin boyutunu küçültmek için yararlı olabilir.

Yalnızca tür içe aktarımlarını kullanmak için `import type` anahtar sözcüğünü kullanabilirsiniz.

TypeScript, `allowImportingTsExtensions` ayarlarından bağımsız olarak yalnızca tür içe aktarımlarında hem bildirim hem de uygulama dosyası uzantılarının (.ts, .mts, .cts ve .tsx) kullanılmasına izin verir.

Örneğin:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Aşağıdaki biçimler desteklenir:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### using Bildirimi ve Belirtik Kaynak Yönetimi

Bir `using` bildirimi, elden çıkarılabilir kaynakları yönetmek için kullanılan ve `const` benzeri, blok kapsamlı, değişmez bir bağlamadır. Bir değerle başlatıldığında bu değerin `Symbol.dispose` metodu kaydedilir ve daha sonra çevreleyen blok kapsamından çıkıldığında çalıştırılır.

Bu, ECMAScript'in Kaynak Yönetimi özelliğine dayanır. Bu özellik; bağlantıları kapatma, dosyaları silme ve belleği serbest bırakma gibi nesne oluşturulduktan sonra yapılması gereken önemli temizleme görevleri için kullanışlıdır.

Notlar:

* TypeScript 5.2 sürümünde yakın zamanda kullanıma sunulduğu için çoğu çalışma zamanı yerel desteğe sahip değildir. Şunlar için polyfill kullanmanız gerekir: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
* Ayrıca tsconfig.json dosyanızı aşağıdaki gibi yapılandırmanız gerekir:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

Örnek:

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

Kod şunları günlüğe yazar:

```shell
1
2
disposed
3
```

Elden çıkarılmaya uygun bir kaynak, `Disposable` arayüzüne uymalıdır:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

`using` bildirimleri, kaynak elden çıkarma işlemlerini bir yığına kaydederek kaynakların bildirim sırasının tersine göre elden çıkarılmasını sağlar:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

Daha sonraki kod çalışsa veya istisnalar oluşsa bile kaynakların elden çıkarılması garanti edilir. Bu durum, elden çıkarma işleminin istisna oluşturmasına ve başka bir istisnayı muhtemelen bastırmasına yol açabilir. Bastırılan hatalara ilişkin bilgileri korumak için `SuppressedError` adında yeni bir yerleşik istisna kullanıma sunulmuştur.

#### await using Bildirimi

Bir `await using` bildirimi, eşzamansız olarak elden çıkarılabilen bir kaynağı işler. Değerin, blok sona erdiğinde tamamlanması beklenecek bir `Symbol.asyncDispose` metodu olmalıdır.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

Eşzamansız olarak elden çıkarılabilen bir kaynak, `Disposable` veya `AsyncDisposable` arayüzlerinden birine uymalıdır:

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

Kod şunları günlüğe yazar:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

`using` ve `await using` bildirimlerine şu deyimlerde izin verilir: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### İçe Aktarma Nitelikleri

TypeScript 5.3'ün İçe Aktarma Nitelikleri (içe aktarımlar için etiketler), çalışma zamanına modüllerin (JSON vb.) nasıl işleneceğini bildirir. Bu, içe aktarımların açıkça tanımlanmasını sağlayarak güvenliği artırır ve kaynakların daha güvenli yüklenmesi için İçerik Güvenliği Politikası (CSP) ile uyumludur. TypeScript bunların geçerli olduğundan emin olur, ancak belirli modül işleme yöntemlerine ilişkin yorumlamayı çalışma zamanına bırakır.

Örnek:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

Dinamik içe aktarımla:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### Düzenli İfade Sözdizimi Denetimi

TypeScript, 5.5.4 sürümünden itibaren düzenli ifade değişmezlerini derleme zamanında yaygın hatalara karşı denetler (ör. geçersiz sözdizimi, yanlış geriye başvurular, hedef JavaScript sürümünüz tarafından desteklenmeyen özellikler). Bu, hataları daha erken yakalamaya yardımcı olur ancak new RegExp("...") dizelerini denetlemez.

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

`import defer`, bir modülü yüklemenize ancak siz gerçekten modülden bir şey kullanana kadar yürütülmesini ertelemenize olanak tanır. Bu, gereksiz işlemlerden ve yan etkilerden kaçınmaya yardımcı olur.

* Yalnızca şununla çalışır: `import defer * as name from "module"`
* Kod yalnızca dışa aktarılan bir öğeye eriştiğinizde çalışır
