# Pengindeksan Tipe



Pengindeksan tipe mengacu pada kemampuan untuk mendefinisikan tipe yang dapat diindeks oleh kunci yang tidak diketahui sebelumnya, dengan menggunakan index signature untuk menentukan tipe bagi properti yang tidak dideklarasikan secara eksplisit.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

