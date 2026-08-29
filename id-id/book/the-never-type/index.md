# Tipe never



Ketika sebuah variabel dipersempit menjadi tipe yang tidak dapat memuat nilai apa pun, compiler TypeScript akan menginferensi bahwa variabel tersebut harus bertipe `never`. Hal ini karena tipe `never` merepresentasikan nilai yang tidak akan pernah dapat dihasilkan.

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val has type never here because it can never be anything other than a string or a number
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

