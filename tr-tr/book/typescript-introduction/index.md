# TypeScript'e Giriş



### TypeScript nedir?

TypeScript, JavaScript'i temel alan, güçlü tür sistemine sahip bir programlama dilidir. İlk olarak 2012'de Anders Hejlsberg tarafından tasarlanmıştır ve günümüzde Microsoft tarafından açık kaynaklı bir proje olarak geliştirilip sürdürülmektedir.

TypeScript, JavaScript'e derlenir ve herhangi bir JavaScript çalışma zamanında (örneğin bir tarayıcıda veya sunucudaki Node.js'de) çalıştırılabilir.

Fonksiyonel, jenerik, zorunlu ve nesne yönelimli programlama gibi birden fazla programlama paradigmasını destekler ve çalıştırılmadan önce JavaScript'e dönüştürülen, derlenen (transpile edilen) bir dildir.

### Neden TypeScript?

TypeScript, yaygın programlama hatalarını önlemeye ve program çalıştırılmadan önce belirli türdeki çalışma zamanı hatalarından kaçınmaya yardımcı olan, güçlü tür sistemine sahip bir dildir.

Güçlü tür sistemine sahip bir dil, geliştiricinin veri türü tanımlarında çeşitli program kısıtlamalarını ve davranışlarını belirtmesine olanak tanıyarak yazılımın doğruluğunu doğrulamayı ve kusurları önlemeyi kolaylaştırır. Bu, özellikle büyük ölçekli uygulamalarda değerlidir.

TypeScript'in bazı avantajları:

* İsteğe bağlı olarak güçlü tür sistemi sunan statik türleme
* Tür Çıkarımı
* ES6 ve ES7 özelliklerine erişim
* Platformlar ve tarayıcılar arası uyumluluk
* IntelliSense ile araç desteği

### TypeScript ve JavaScript

TypeScript, `.ts` veya `.tsx` dosyalarına yazılırken JavaScript dosyaları `.js` veya `.jsx` uzantılarına sahiptir.

`.tsx` veya `.jsx` uzantılı dosyalar, React'te kullanıcı arayüzü geliştirmek için kullanılan JavaScript Sözdizimi Uzantısı JSX'i içerebilir.

TypeScript, sözdizimi açısından JavaScript'in (ECMAScript 2015) türlendirilmiş bir üst kümesidir. Tüm JavaScript kodları geçerli TypeScript kodudur, ancak bunun tersi her zaman doğru değildir.

Örneğin, aşağıdaki gibi `.js` uzantılı bir JavaScript dosyasındaki fonksiyonu ele alalım:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

Dosya uzantısı `.ts` olarak değiştirildiğinde fonksiyon dönüştürülerek TypeScript'te kullanılabilir. Ancak aynı fonksiyona TypeScript türleriyle ek açıklama eklenirse derlenmeden herhangi bir JavaScript çalışma zamanında çalıştırılamaz. Aşağıdaki TypeScript kodu derlenmezse bir sözdizimi hatası üretir:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript, geliştiricilerin tür ek açıklamaları aracılığıyla niyetlerini ifade etmelerine olanak tanıyarak olası çalışma zamanı hatalarını derleme zamanında tespit etmek üzere tasarlanmıştır. Ayrıca TypeScript, tür çıkarımı sayesinde açık tür ek açıklamaları verilmediğinde bile belirli sorunları yakalayabilir. Örneğin aşağıdaki kod parçacığında hiçbir TypeScript türü belirtilmez:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

Bu durumda TypeScript bir hata algılar ve şunu bildirir:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

TypeScript'in tür sistemi büyük ölçüde JavaScript'in çalışma zamanı davranışından etkilenir. Örneğin JavaScript'te dize birleştirme veya sayısal toplama yapabilen toplama operatörü (+), TypeScript'te de aynı şekilde modellenmiştir:

```typescript
const result = '1' + 1; // Result is of type string
```

TypeScript'in arkasındaki ekip, JavaScript'in olağan dışı kullanımlarını bilinçli olarak hata şeklinde işaretlemeye karar vermiştir. Örneğin aşağıdaki geçerli JavaScript kodunu ele alalım:

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

Ancak TypeScript bir hata verir:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

Bu hata, TypeScript tür uyumluluğunu katı bir şekilde uyguladığı ve bu durumda bir sayı ile bir boole değeri arasında geçersiz bir işlem belirlediği için oluşur.

### TypeScript Kod Üretimi

TypeScript derleyicisinin iki temel sorumluluğu vardır: tür hatalarını denetlemek ve JavaScript'e derlemek. Bu iki süreç birbirinden bağımsızdır. Türler derleme sırasında tamamen silindiğinden, kodun JavaScript çalışma zamanında yürütülmesini etkilemez. TypeScript, tür hataları bulunsa bile JavaScript çıktısı üretebilir.
İşte tür hatası içeren bir TypeScript kodu örneği:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

Ancak yine de çalıştırılabilir JavaScript çıktısı üretebilir:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

TypeScript türlerini çalışma zamanında denetlemek mümkün değildir. Örneğin:

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

Türler derlemeden sonra silindiği için bu kodu JavaScript'te çalıştırmanın bir yolu yoktur. Türleri çalışma zamanında tanımak için başka bir mekanizma kullanmamız gerekir. TypeScript birçok seçenek sunar; bunların yaygın olanlarından biri "etiketli birleşim"dir. Örneğin:

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

"kind" özelliği, JavaScript'te nesneleri birbirinden ayırmak için çalışma zamanında kullanılabilen bir değerdir.

Çalışma zamanındaki bir değerin, tür bildiriminde belirtilenden farklı bir türe sahip olması da mümkündür. Örneğin geliştirici bir API türünü yanlış yorumlayıp ona hatalı bir ek açıklama eklemiş olabilir.

TypeScript, JavaScript'in bir üst kümesi olduğundan "class" anahtar sözcüğü çalışma zamanında hem tür hem de değer olarak kullanılabilir.

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

JavaScript'te bir "class", "prototype" özelliğine sahiptir ve "instanceof" operatörü, bir oluşturucunun prototype özelliğinin bir nesnenin prototip zincirinin herhangi bir yerinde bulunup bulunmadığını sınamak için kullanılabilir.

Tüm türler silindiğinden TypeScript'in çalışma zamanı performansı üzerinde hiçbir etkisi yoktur. Ancak TypeScript, derleme süresine bir miktar ek yük getirir.

### Günümüzde Modern JavaScript (Alt Sürüme Derleme)

TypeScript, kodu ECMAScript 3'ten (1999) bu yana yayımlanmış herhangi bir JavaScript sürümüne derleyebilir. Bu, TypeScript'in en yeni JavaScript özelliklerini eski sürümlere transpile edebileceği anlamına gelir; bu süreç Downleveling olarak bilinir. Böylece eski çalışma zamanı ortamlarıyla en yüksek uyumluluk korunurken modern JavaScript kullanılabilir.

JavaScript'in eski bir sürümüne transpile edilirken TypeScript'in, yerel uygulamalara kıyasla performans ek yükü oluşturabilecek kodlar üretebileceğini unutmamak önemlidir.

TypeScript'te kullanılabilecek modern JavaScript özelliklerinden bazıları şunlardır:

* AMD tarzı "define" geri çağrıları veya CommonJS "require" deyimleri yerine ECMAScript modülleri.
* Prototipler yerine sınıflar.
* "var" yerine "let" veya "const" kullanılarak değişken bildirimi.
* Geleneksel "for" döngüsü yerine "for-of" döngüsü veya ".forEach".
* Fonksiyon ifadeleri yerine ok fonksiyonları.
* Yapıyı ayırma ataması.
* Kısaltılmış özellik/metot adları ve hesaplanmış özellik adları.
* Varsayılan fonksiyon parametreleri.

Geliştiriciler bu modern JavaScript özelliklerinden yararlanarak TypeScript'te daha anlamlı ve kısa kodlar yazabilir.

