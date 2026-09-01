# Dizin İmzaları



TypeScript'te dizin imzası olarak `string`, `number` ve `symbol` kullanabiliriz:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

JavaScript'in `number` türündeki bir dizini otomatik olarak `string` türündeki bir dizine dönüştürdüğünü lütfen unutmayın; bu nedenle `k[1]` veya `k["1"]` aynı değeri döndürür.

