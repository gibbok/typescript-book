# Penetapan



Penyempitan TypeScript menggunakan penetapan adalah cara untuk mempersempit tipe suatu variabel berdasarkan nilai yang ditetapkan kepadanya. Ketika suatu variabel diberi nilai, TypeScript menginferensi tipenya berdasarkan nilai yang ditetapkan, lalu mempersempit tipe variabel agar sesuai dengan tipe yang diinferensi.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

