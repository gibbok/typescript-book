---
title: Enum'lar
sidebar:
  order: 20
  label: 20. Enum'lar
---


TypeScript'te bir `enum`, adlandırılmış sabit değerler kümesidir.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Enum'lar farklı şekillerde tanımlanabilir:

### Sayısal enum'lar

TypeScript'te Sayısal Enum, her sabite varsayılan olarak 0'dan başlayan sayısal bir değerin atandığı bir Enum'dur.

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

Değerleri açıkça atayarak özel değerler belirtmek mümkündür:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Dize enum'ları

TypeScript'te Dize Enum'u, her sabite bir dize değerinin atandığı bir Enum'dur.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Not: TypeScript, dize ve sayısal üyelerin bir arada bulunabildiği heterojen Enum'ların kullanımına izin verir.

### Sabit enum'lar

TypeScript'te sabit enum, tüm değerlerin derleme zamanında bilindiği ve enum'un kullanıldığı her yerde satır içine alındığı, böylece daha verimli kod elde edilen özel bir Enum türüdür.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Şuna derlenir:

```typescript
console.log('EN' /* Language.English */);
```

Notlar:
Const Enum'lar sabit kodlanmış değerlere sahiptir ve Enum'u siler; bu, kendi içinde bağımsız kitaplıklarda daha verimli olabilir, ancak genellikle tercih edilmez. Ayrıca Const enum'lar hesaplanmış üyelere sahip olamaz.

### Ters eşleme

TypeScript'te Enum'lardaki ters eşlemeler, Enum üyesinin adını değerinden alma yeteneğini ifade eder. Varsayılan olarak Enum üyelerinde addan değere ileri eşlemeler bulunur, ancak her üye için değerler açıkça ayarlanarak ters eşlemeler oluşturulabilir. Ters eşlemeler, bir Enum üyesini değerine göre aramanız veya tüm Enum üyeleri üzerinde yineleme yapmanız gerektiğinde kullanışlıdır. Yalnızca sayısal enum üyelerinin ters eşlemeler oluşturacağını, dize enum üyeleri içinse hiçbir ters eşleme oluşturulmayacağını unutmayın.

Aşağıdaki enum:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

Şuna derlenir:

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

Dolayısıyla değerlerin anahtarlarla eşlenmesi sayısal enum üyeleri için çalışırken dize enum üyeleri için çalışmaz:

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

### Bildirimsel enum'lar

TypeScript'te bildirimsel enum, ilişkili bir uygulaması olmadan bir bildirim dosyasında (*.d.ts) tanımlanan bir Enum türüdür. Her dosyada uygulama ayrıntılarını içe aktarmak zorunda kalmadan farklı dosyalar arasında tür açısından güvenli biçimde kullanılabilen adlandırılmış sabitler kümesi tanımlamanıza olanak tanır.

### Hesaplanmış ve sabit üyeler

TypeScript'te hesaplanmış üye, değeri çalışma zamanında hesaplanan bir Enum üyesiyken sabit üye, değeri derleme zamanında belirlenen ve çalışma zamanında değiştirilemeyen bir üyedir. Hesaplanmış üyelere normal Enum'larda izin verilirken sabit üyelere hem normal hem de const enum'larda izin verilir.

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

Enum'lar, üye türlerinden oluşan birleşimlerle gösterilir. Her üyenin değeri sabit veya sabit olmayan ifadeler aracılığıyla belirlenebilir ve sabit değerlere sahip üyelere sabit değer türleri atanır. Örnek olarak E türünün ve E.A, E.B ve E.C alt türlerinin bildirimini ele alalım. Bu durumda E, E.A | E.B | E.C birleşimini temsil eder.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

