# Tipe Objek



Dalam TypeScript, tipe objek mendeskripsikan bentuk sebuah objek. Tipe ini menentukan nama dan tipe properti objek, serta apakah properti tersebut wajib atau opsional.

Dalam TypeScript, Anda dapat mendefinisikan tipe objek dengan dua cara utama:

Interface mendefinisikan bentuk objek dengan menentukan nama dan tipe properti, serta apakah properti tersebut opsional.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Type alias, serupa dengan interface, mendefinisikan bentuk sebuah objek. Namun, type alias juga dapat membuat tipe kustom baru yang didasarkan pada tipe yang sudah ada atau kombinasi dari tipe-tipe yang sudah ada. Hal ini mencakup pendefinisian tipe union, tipe intersection, dan tipe kompleks lainnya.

```typescript
type Point = {
    x: number;
    y: number;
};
```

Tipe juga dapat didefinisikan secara anonim:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

