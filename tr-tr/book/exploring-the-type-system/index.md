# Tür Sistemini Keşfetme



### TypeScript Dil Hizmeti

tsserver olarak da bilinen TypeScript Dil Hizmeti; hata bildirme, tanılama, kaydetme sırasında derleme, yeniden adlandırma, tanıma gitme, tamamlama listeleri, imza yardımı ve daha fazlası gibi çeşitli özellikler sunar. Öncelikle tümleşik geliştirme ortamları (IDE'ler) tarafından IntelliSense desteği sağlamak için kullanılır. Visual Studio Code ile sorunsuz biçimde tümleşir ve Conquer of Completion (Coc) gibi araçlar tarafından kullanılır.

Geliştiriciler, TypeScript düzenleme deneyimini geliştirmek için özel bir API'den yararlanabilir ve kendi özel dil hizmeti eklentilerini oluşturabilir. Bu, özellikle özel lint özelliklerini uygulamak veya özel bir şablon dili için otomatik tamamlamayı etkinleştirmek açısından yararlı olabilir.

<!-- markdownlint-disable MD044 -->
Gerçek dünyadan bir özel eklenti örneği, styled components içindeki CSS özellikleri için sözdizimi hata bildirimi ve IntelliSense desteği sağlayan "typescript-styled-plugin" eklentisidir.
<!-- markdownlint-enable MD044 -->

Daha fazla bilgi ve hızlı başlangıç kılavuzları için GitHub'daki resmî TypeScript Wiki'sine başvurabilirsiniz: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Yapısal Türleme

TypeScript, yapısal bir tür sistemini temel alır. Bu, türlerin uyumluluğunun ve eşdeğerliğinin C# veya C gibi nominal tür sistemlerinde olduğu gibi adları ya da bildirim yerleri yerine gerçek yapıları veya tanımları tarafından belirlendiği anlamına gelir.

TypeScript'in yapısal tür sistemi, JavaScript'in dinamik duck typing sisteminin çalışma zamanındaki işleyişi temel alınarak tasarlanmıştır.

Aşağıdaki örnek geçerli TypeScript kodudur. Gözlemleyebileceğiniz gibi "X" ve "Y", farklı bildirim adlarına sahip olsalar da aynı "a" üyesine sahiptir. Türler yapılarına göre belirlenir ve bu durumda yapılar aynı olduğundan uyumlu ve geçerlidir.

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

### TypeScript'in Temel Karşılaştırma Kuralları

TypeScript'in karşılaştırma süreci özyinelemelidir ve herhangi bir düzeyde iç içe yerleştirilmiş türler üzerinde yürütülür.

"Y", en az "X" ile aynı üyelere sahipse "X" türü "Y" ile uyumludur.

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

İşlev parametreleri adlarına göre değil, türlerine göre karşılaştırılır:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

İşlev dönüş türleri aynı olmalıdır:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

Bir kaynak işlevin dönüş türü, hedef işlevin dönüş türünün bir alt türü olmalıdır:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

İşlev parametrelerinin yok sayılmasına JavaScript'te yaygın bir uygulama olduğundan izin verilir; örneğin "Array.prototype.map()" kullanımı:

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Bu nedenle aşağıdaki tür bildirimleri tamamen geçerlidir:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

Kaynak türün tüm ek isteğe bağlı parametreleri geçerlidir:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

Hedef türün kaynak türde karşılığı olmayan tüm isteğe bağlı parametreleri geçerlidir ve hata oluşturmaz:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

Rest parametresi, sonsuz bir isteğe bağlı parametre dizisi olarak ele alınır:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

Aşırı yüklemelere sahip işlevler, aşırı yükleme imzası uygulama imzasıyla uyumluysa geçerlidir:

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

Kaynak ve hedef parametreler üst türlere veya alt türlere atanabiliyorsa işlev parametresi karşılaştırması başarılı olur (çift değişkenlik).

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

Enum'lar sayılarla, sayılar da Enum'larla karşılaştırılabilir ve geçerlidir; ancak farklı Enum türlerinden Enum değerlerini karşılaştırmak geçersizdir.

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

Bir sınıfın örnekleri, private ve protected üyeleri için uyumluluk denetimine tabi tutulur:

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

Karşılaştırma denetimi farklı kalıtım hiyerarşilerini dikkate almaz, örneğin:

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

Jenerikler, jenerik parametre uygulandıktan sonra ortaya çıkan türün yapısı kullanılarak karşılaştırılır; yalnızca nihai sonuç jenerik olmayan bir tür olarak karşılaştırılır.

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

Jeneriklerin tür argümanı belirtilmediğinde, belirtilmemiş tüm argümanlar "any" türü olarak ele alınır:

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

Unutmayın:

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

"strictNullChecks" etkinleştirildiğinde "null" ve "undefined" değerlerinin "void" değerine benzer şekilde, aksi durumda ise "never" değerine benzer şekilde ele alındığını lütfen unutmayın.

### Kümeler Olarak Türler

TypeScript'te bir tür, olası değerlerin oluşturduğu bir kümedir. Bu küme, türün etki alanı olarak da adlandırılır. Bir türün her değeri, bir kümenin elemanı olarak görülebilir. Bir tür, kümedeki her elemanın o kümenin bir üyesi sayılması için karşılaması gereken kısıtlamaları belirler.
TypeScript'in temel görevi, bir kümenin diğerinin alt kümesi olup olmadığını denetlemek ve doğrulamaktır.

TypeScript çeşitli küme türlerini destekler:

| Küme terimi          | TypeScript                      | Notlar                                                                                                                      |
| -------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Boş küme             | never                           | "never", kendisi dışında hiçbir şey içermez                                                                                |
| Tek elemanlı küme    | undefined / null / literal type |                                                                                                                             |
| Sonlu küme           | boolean / union                 |                                                                                                                             |
| Sonsuz küme          | string / number / object        |                                                                                                                             |
| Evrensel küme        | any / unknown                   | Her eleman "any" türünün üyesidir ve her küme onun alt kümesidir / "unknown", "any" türünün tür açısından güvenli karşılığıdır |

İşte birkaç örnek:

| TypeScript            | Küme terimi              | Örnek                                                                           |
| --------------------- | ------------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (boş küme)              | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                           |
| Değişmez tür          | Tek elemanlı küme        | type X = 'X';                                                                   |
|                       |                           | type Y = 7;                                                                     |
|                       |                           |
| T'ye atanabilir değer | Değer ∈ T (üyesi)        | type XY = 'X' \| 'Y';                                                           |
|                       |                           | const x: XY = 'X';                                                              |
|                       |                           |
| T1, T2'ye atanabilir  | T1 ⊆ T2 (alt kümesi)      | type XY = 'X' \| 'Y';                                                           |
|                       |                           | const x: XY = 'X';                                                              |
|                       |                           | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                           |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (alt kümesi)      | type X = 'X' extends string ? true : false;                                     |
|                       |                           |
| T1 \| T2              | T1 ∪ T2 (birleşim)        | type XY = 'X' \| 'Y';                                                           |
|                       |                           | type JK = 1 \| 2;                                                               |
|                       |                           |
| T1 & T2               | T1 ∩ T2 (kesişim)         | type X = \{ a: string \}                                                          |
|                       |                           | type Y = \{ b: string \}                                                          |
|                       |                           | type XY = X & Y                                                                 |
|                       |                           | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                           |
| unknown               | Evrensel küme             | const x: unknown = 1                                                            |

Bir birleşim, (T1 | T2), daha geniş bir küme (her ikisi) oluşturur:

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

Bir kesişim, (T1 & T2), daha dar bir küme (yalnızca ortak olanlar) oluşturur:

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

`extends` anahtar sözcüğü bu bağlamda "alt kümesi" olarak düşünülebilir. Bir tür için kısıtlama belirler. `extends` bir jenerikle kullanıldığında, jenerik tür parametresini daha belirli bir türle sınırlar.

Buradaki `extends` ifadesinin OOP anlamında sınıf kalıtımıyla hiçbir ilgisi olmadığını lütfen unutmayın.

TypeScript yapısal türlerle çalışır ve katı bir nominal hiyerarşiye sahip değildir. Aslında aşağıdaki örnekte olduğu gibi, TypeScript nesnelerin yapısını veya biçimini dikkate aldığından iki türden biri diğerinin alt türü olmadan da bu iki tür birbiriyle örtüşebilir.

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

### Tür Atama: Tür Bildirimleri ve Tür Onaylamaları

TypeScript'te bir tür farklı yollarla atanabilir:

#### Tür Bildirimi

Aşağıdaki örnekte x değişkeni için bir tür bildirmek üzere x: X (": Type") kullanıyoruz.

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

Değişken belirtilen biçimde değilse TypeScript bir hata bildirir. Örneğin:

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

#### Tür Onaylaması

`as` anahtar sözcüğünü kullanarak bir tür onaylaması eklemek mümkündür. Bu, derleyiciye geliştiricinin bir tür hakkında daha fazla bilgiye sahip olduğunu bildirir ve oluşabilecek hataları susturur.

Örneğin:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

Yukarıdaki örnekte x nesnesinin X türüne sahip olduğu as anahtar sözcüğü kullanılarak onaylanır. Bu, tür tanımında bulunmayan ek bir b özelliğine sahip olsa da nesnenin belirtilen türe uyduğunu TypeScript derleyicisine bildirir.

Tür onaylamaları, özellikle DOM ile çalışırken daha belirli bir türün belirtilmesi gereken durumlarda yararlıdır. Örneğin:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Burada as HTMLInputElement tür onaylaması, TypeScript'e getElementById sonucunun bir HTMLInputElement olarak ele alınması gerektiğini bildirmek için kullanılır.
Tür onaylamaları, aşağıdaki şablon dizgesi örneğinde gösterildiği gibi anahtarları yeniden eşlemek için de kullanılabilir:

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

Bu örnekte `J<Type>` türü, Type öğesinin anahtarlarını yeniden eşlemek için şablon dizgesiyle birlikte eşlenmiş bir tür kullanır. Her anahtara "prefix_" ekleyerek yeni özellikler oluşturur ve bunlara karşılık gelen değerler, özgün özellik değerlerini döndüren işlevlerdir.

Bir tür onaylaması kullanıldığında TypeScript'in fazla özellik denetimi yapmayacağını belirtmek gerekir. Bu nedenle nesnenin yapısı önceden biliniyorsa genellikle bir Tür Bildirimi kullanılması tercih edilir.

#### Ortam Bildirimleri

Ortam bildirimleri, JavaScript kodunun türlerini tanımlayan dosyalardır ve dosya adı biçimleri `.d.ts.` şeklindedir. Genellikle mevcut JavaScript kütüphanelerine açıklama eklemek veya projenizdeki mevcut JS dosyalarına tür eklemek için içe aktarılır ve kullanılır.

Birçok yaygın kütüphanenin türleri şu adreste bulunabilir:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

ve şu komutla yüklenebilir:

```shell
npm install --save-dev @types/library-name
```

Kendi tanımladığınız Ortam Bildirimlerini "üç eğik çizgili" başvuruyu kullanarak içe aktarabilirsiniz:

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Ortam Bildirimlerini `// @ts-check` kullanarak JavaScript dosyalarının içinde bile kullanabilirsiniz.

`declare` anahtar sözcüğü, mevcut JavaScript kodunu içe aktarmadan onun için tür tanımları yapılmasını sağlar ve başka bir dosyadaki ya da genel kapsamdaki türler için yer tutucu görevi görür.

### Özellik Denetimi ve Fazla Özellik Denetimi

TypeScript yapısal bir tür sistemini temel alır; ancak fazla özellik denetimi, bir nesnenin türde belirtilen özelliklere tam olarak sahip olup olmadığını denetlemesini sağlayan bir TypeScript özelliğidir.

Fazla Özellik Denetimi, nesne değişmezleri değişkenlere atanırken veya işlevin fazla özelliğine argüman olarak aktarılırken gerçekleştirilir. Örneğin:

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### Zayıf Türler

Bir tür, yalnızca tümü isteğe bağlı olan bir özellik kümesi içerdiğinde zayıf kabul edilir:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript, hiçbir örtüşme olmadığında zayıf bir türe herhangi bir şey atanmasını hata olarak değerlendirir; örneğin aşağıdaki kod hata verir:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

Önerilmemekle birlikte, gerekirse tür onaylaması kullanarak bu denetimi atlamak mümkündür:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

Ya da zayıf türün indeks imzasına `unknown` ekleyerek:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### Katı Nesne Değişmezi Denetimi (Tazelik)

Bazen "tazelik" olarak adlandırılan katı nesne değişmezi denetimi, normal yapısal tür denetimlerinde aksi hâlde fark edilmeyecek fazla veya yanlış yazılmış özellikleri yakalamaya yardımcı olan bir TypeScript özelliğidir.

Bir nesne değişmezi oluşturulurken TypeScript derleyicisi onu "taze" kabul eder. Nesne değişmezi bir değişkene atanır veya parametre olarak aktarılırsa ve hedef türde bulunmayan özellikler belirtirse TypeScript bir hata verir.

Ancak bir nesne değişmezi genişletildiğinde veya bir tür onaylaması kullanıldığında "tazelik" ortadan kalkar.

İşte bunu gösteren bazı örnekler:

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

### Tür Çıkarımı

TypeScript, şu durumlarda ek açıklama sağlanmadığında türleri çıkarabilir:

* Değişken başlatma.
* Üye başlatma.
* Parametreler için varsayılan değerleri ayarlama.
* İşlev dönüş türü.

Örneğin:

```typescript
let x = 'x'; // The type inferred is string
```

TypeScript derleyicisi, değeri veya ifadeyi analiz eder ve mevcut bilgilere göre türünü belirler.

### Daha Gelişmiş Çıkarımlar

Tür çıkarımında birden fazla ifade kullanıldığında TypeScript "en iyi ortak türleri" arar. Örneğin:

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

Derleyici en iyi ortak türleri bulamazsa bir birleşim türü döndürür. Örneğin:

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript, türleri çıkarmak için değişkenin konumuna dayalı "bağlamsal türleme" kullanır. Aşağıdaki örnekte derleyici, `e` öğesinin `MouseEvent` türünde olduğunu bilir; çünkü çeşitli yaygın JavaScript yapılarına ve DOM'a yönelik ortam bildirimlerini içeren lib.d.ts dosyasında `click` olay türü tanımlanmıştır:

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### Tür Genişletme

Tür genişletme, TypeScript'in tür ek açıklaması olmadan başlatılan bir değişkene tür atadığı süreçtir. Dar türlerden daha geniş türlere geçişe izin verir, ancak tersine izin vermez.
Aşağıdaki örnekte:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript, `string` türünü `x` değişkenine, başlatma sırasında sağlanan tek değeri (`x`) temel alarak atar; bu bir genişletme örneğidir.

TypeScript, örneğin "const" kullanarak genişletme sürecini denetlemenin yollarını sağlar.

### Const

Bir değişken bildirilirken `const` anahtar sözcüğünün kullanılması, TypeScript'te daha dar bir tür çıkarımıyla sonuçlanır.

Örneğin:

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

x değişkenini bildirmek için `const` kullanıldığında, türü belirli 'x' değişmez değerine daraltılır. x türü daraltıldığından, herhangi bir hata olmadan y değişkenine atanabilir.
Türün çıkarılabilmesinin nedeni, `const` değişkenlerinin yeniden atanamaması ve dolayısıyla türlerinin belirli bir değişmez türe, bu durumda 'x' değişmez türüne, daraltılabilmesidir.

#### Tür Parametrelerinde Const Değiştiricisi

TypeScript'in 5.0 sürümünden itibaren bir jenerik tür parametresinde `const` niteliğini belirtmek mümkündür. Bu, mümkün olan en kesin türün çıkarılmasını sağlar. `const` kullanmadan bir örnek görelim:

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

Gördüğünüz gibi `a` ve `b` özelliklerinin türü `string` olarak çıkarılır.

Şimdi `const` sürümüyle arasındaki farkı görelim:

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
```

Artık `a` ve `b` özelliklerinin yalnızca `string` türleri yerine dize değişmezleri olarak çıkarıldığını görebiliriz.

#### Const Onaylaması

Bu özellik, başlatma değerine dayalı daha kesin bir değişmez türle değişken bildirmenize olanak tanır ve derleyiciye değerin değiştirilemez bir değişmez değer olarak ele alınması gerektiğini belirtir. İşte birkaç örnek:

Tek bir özellikte:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

Bir nesnenin tamamında:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

Bu, özellikle bir tuple için tür tanımlarken yararlı olabilir:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### Açık Tür Ek Açıklaması

Daha belirli davranıp bir tür aktarabiliriz. Aşağıdaki örnekte `x` özelliği `number` türündedir:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

Değişmez türlerin birleşimini kullanarak tür ek açıklamasını daha belirli hâle getirebiliriz:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### Tür Daraltma

Tür Daraltma, TypeScript'te genel bir türün daha belirli bir türe daraltıldığı süreçtir. Bu, TypeScript kodu analiz edip belirli koşulların veya işlemlerin tür bilgilerini iyileştirebileceğini belirlediğinde gerçekleşir.

Türleri daraltma farklı şekillerde gerçekleşebilir; bunlar arasında şunlar yer alır:

#### Koşullar

TypeScript, `if` veya `switch` gibi koşullu ifadeler kullanıldığında koşulun sonucuna göre türü daraltabilir. Örneğin:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### Hata fırlatma veya dönüş

Bir hata fırlatmak veya bir daldan erken dönmek, TypeScript'in bir türü daraltmasına yardımcı olmak için kullanılabilir. Örneğin:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

TypeScript'te türleri daraltmanın diğer yolları şunlardır:

* `instanceof` operatörü: Bir nesnenin belirli bir sınıfın örneği olup olmadığını denetlemek için kullanılır.
* `in` operatörü: Bir nesnede bir özelliğin bulunup bulunmadığını denetlemek için kullanılır.
* `typeof` operatörü: Çalışma zamanında bir değerin türünü kontrol etmek için kullanılır.
* `Array.isArray()` gibi yerleşik fonksiyonlar: Bir değerin dizi olup olmadığını kontrol etmek için kullanılır.

#### Ayırt Edici Birleşim

"Ayırt Edici Birleşim" kullanmak, TypeScript'te bir birleşim içindeki farklı türleri birbirinden ayırmak için nesnelere açık bir "etiket" eklendiği bir kalıptır. Bu kalıp "etiketli birleşim" olarak da adlandırılır. Aşağıdaki örnekte "etiket", "type" özelliğiyle temsil edilir:

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

#### Kullanıcı Tanımlı Tür Korumaları

TypeScript'in bir türü belirleyemediği durumlarda, "kullanıcı tanımlı tür koruması" olarak bilinen bir yardımcı fonksiyon yazmak mümkündür. Aşağıdaki örnekte, belirli bir filtreleme uyguladıktan sonra türü daraltmak için bir Tür Yükleminden yararlanacağız:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

#### switch-true daraltması

TypeScript 5.3, karmaşık if/else zincirlerini boole koşullarıyla switch (true) kullanarak değiştirmenize olanak tanıyan switch-true daraltmasını ekler. Okunabilirliği artırır ve yine de türleri daraltır. Örüntü eşlemeye benzer, ancak daha basittir.

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

