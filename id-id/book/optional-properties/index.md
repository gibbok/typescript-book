# Properti Opsional



Sebuah objek dapat menentukan properti opsional dengan menambahkan tanda tanya `?` di akhir nama properti:

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

Nilai default dapat ditentukan ketika sebuah properti bersifat opsional:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

