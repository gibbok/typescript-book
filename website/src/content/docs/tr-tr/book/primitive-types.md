---
title: İlkel Türler
sidebar:
  order: 11
  label: 11. İlkel Türler
---


TypeScript 7 ilkel türü destekler. İlkel veri türü, nesne olmayan ve kendisiyle ilişkili herhangi bir yöntemi bulunmayan bir türü ifade eder. TypeScript'teki tüm ilkel türler değişmezdir; yani değerleri atandıktan sonra değiştirilemez.

### string

`string` ilkel türü metinsel verileri saklar ve değer her zaman çift ya da tek tırnak içine alınır.

```typescript
const x: string = 'x';
const y: string = 'y';
```

Dizeler, ters tırnak (`) karakteriyle çevrelenirse birden fazla satıra yayılabilir:

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

TypeScript'teki `boolean` veri türü, `true` veya `false` olmak üzere ikili bir değer saklar.

```typescript
const isReady: boolean = true;
```

### number

TypeScript'teki `number` veri türü, 64 bitlik kayan noktalı bir değerle temsil edilir. `number` türü tam sayıları ve kesirleri temsil edebilir.
TypeScript ayrıca onaltılık, ikilik ve sekizlik sayıları da destekler; örneğin:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigint

`bigint`, `number` tarafından desteklenen ve 2^53 - 1 olan en büyük güvenli tam sayıdan daha büyük tam sayı değerlerini temsil eder.

Bir `bigint`, yerleşik `BigInt()` fonksiyonu çağrılarak veya herhangi bir tam sayı sayısal sabitinin sonuna `n` eklenerek oluşturulabilir:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Notlar:

* `bigint` değerleri `number` ile karıştırılamaz ve yerleşik `Math` ile kullanılamaz; aynı türe dönüştürülmeleri gerekir.
* `bigint` değerleri yalnızca hedef yapılandırması ES2020 veya üzeriyse kullanılabilir.

### Symbol

Semboller, adlandırma çakışmalarını önlemek için nesnelerde özellik anahtarı olarak kullanılabilen benzersiz tanımlayıcılardır.

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

### null ve undefined

Hem `null` hem de `undefined` türleri, bir değerin bulunmamasını veya herhangi bir değerin yokluğunu temsil eder.

`undefined` türü, değerin atanmadığı ya da başlatılmadığı anlamına gelir veya bir değerin kasıtsız olarak bulunmadığını belirtir.

`null` türü, alanın bir değeri olmadığını bildiğimiz için değerin kullanılamadığını ifade eder ve bir değerin kasıtlı olarak bulunmadığını belirtir.

### Dizi

Bir `array`, aynı türde veya farklı türlerde birden fazla değeri saklayabilen bir veri türüdür. Aşağıdaki söz dizimi kullanılarak tanımlanabilir:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript, aşağıdaki söz dizimini kullanarak salt okunur dizileri destekler:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript, demetleri ve salt okunur demetleri destekler:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

`any` veri türü, kelimenin tam anlamıyla "herhangi bir" değeri temsil eder ve TypeScript türü çıkaramadığında ya da tür belirtilmediğinde varsayılandır.

`any` kullanıldığında TypeScript derleyicisi tür denetimini atlar; dolayısıyla `any` kullanımı sırasında tür güvenliği yoktur. Genel olarak, bir hata oluştuğunda derleyiciyi susturmak için `any` kullanmayın; bunun yerine hatayı düzeltmeye odaklanın. Çünkü `any` kullanmak sözleşmelerin bozulmasına ve TypeScript otomatik tamamlamasının avantajlarının kaybedilmesine yol açabilir.

`any` türü, derleyiciyi susturabildiği için JavaScript'ten TypeScript'e kademeli bir geçiş sırasında faydalı olabilir.

Yeni projelerde `noImplicitAny` TypeScript yapılandırmasını kullanın; bu yapılandırma, `any` kullanıldığı veya çıkarıldığı yerlerde TypeScript'in hata vermesini sağlar.

`any` türü genellikle türlerinizdeki gerçek sorunları maskeleyebilen bir hata kaynağıdır. Mümkün olduğunca kullanmaktan kaçının.

