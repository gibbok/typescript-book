# Tür Yüklemleri



TypeScript'te Tür Yüklemleri, boole değeri döndüren ve bir değişkenin türünü daha belirli bir türe daraltmak için kullanılan fonksiyonlardır.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

TypeScript 5.5, `x is T` gibi tür yüklemlerini `.filter` gibi fonksiyonlarda otomatik olarak çıkarır. Böylece undefined gibi değerlerin ne zaman kaldırıldığını bilir; bu da daha kesin türler ve daha az hata sağlar. Bu özellik açık denetimlerde (ör. `x !== undefined`) çalışır, ancak `!!x` gibi belirsiz denetimlerde çalışmaz.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

