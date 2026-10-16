---
title: Sabit Değer Çıkarımı
sidebar:
  order: 18
  label: 18. Sabit Değer Çıkarımı
---


Sabit Değer Çıkarımı, bir değişkenin veya parametrenin türünün değerine göre çıkarılmasına olanak tanıyan bir TypeScript özelliğidir.

Aşağıdaki örnekte TypeScript'in, değeri daha sonra değiştirilemeyeceği için `x`'i sabit değer türü olarak değerlendirdiğini; buna karşılık `y` daha sonra herhangi bir zamanda değiştirilebildiği için türünün string olarak çıkarıldığını görebiliriz.

```typescript
const x = 'x'; // Bu değer değiştirilemediği için 'x' sabit türü
let y = 'y'; // Bu değeri değiştirebildiğimiz için string türü
```

Aşağıdaki örnekte, TypeScript değerin daha sonra herhangi bir zamanda değiştirilebileceğini düşündüğünden `o.x` türünün `string` olarak (`a` sabit değeri olarak değil) çıkarıldığını görebiliriz.

<!-- skip -->
```typescript
type X = 'a' | 'b';

let o = {
    x: 'a', // Bu daha geniş bir string türüdür
};

const fn = (x: X) => `${x}-foo`;

console.log(fn(o.x)); // 'string' türündeki argüman 'X' türündeki parametreye atanamaz
```

Gördüğünüz gibi, X daha dar bir tür olduğundan `o.x`, `fn`'ye geçirildiğinde kod hata verir.

Bu sorunu `const` veya `X` türüyle bir tür onaylaması kullanarak çözebiliriz:

<!-- skip -->
```typescript
let o = {
    x: 'a' as const,
};
```

veya:

<!-- skip -->
```typescript
let o = {
    x: 'a' as X,
};
```

