# Tür Dizinleme



Tür dizinleme, açıkça bildirilmemiş özelliklerin türünü belirtmek için bir dizin imzası kullanarak önceden bilinmeyen bir anahtarla dizinlenebilen türleri tanımlama yeteneğini ifade eder.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

