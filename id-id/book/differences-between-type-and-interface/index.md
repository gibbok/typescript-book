# Perbedaan antara Type dan Interface



Penggabungan deklarasi (augmentasi):

Interface mendukung penggabungan deklarasi, yang berarti Anda dapat mendefinisikan beberapa interface dengan nama yang sama dan TypeScript akan menggabungkannya menjadi satu interface dengan gabungan properti dan metode. Di sisi lain, type tidak mendukung penggabungan deklarasi. Hal ini dapat membantu ketika Anda ingin menambahkan fungsionalitas tambahan atau menyesuaikan tipe yang sudah ada tanpa mengubah definisi asli maupun menambal tipe yang hilang atau keliru.

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

Memperluas tipe/interface lain:

Baik type maupun interface dapat memperluas tipe/interface lain, tetapi sintaksnya berbeda. Pada interface, Anda menggunakan kata kunci `extends` untuk mewarisi properti dan metode dari interface lain. Namun, sebuah interface tidak dapat memperluas tipe kompleks seperti tipe union.

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

Untuk type, Anda menggunakan operator `&` untuk menggabungkan beberapa tipe menjadi satu tipe (intersection).

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

Tipe Union dan Intersection:

Type lebih fleksibel dalam mendefinisikan Tipe Union dan Intersection. Dengan kata kunci `type`, Anda dapat dengan mudah membuat tipe union menggunakan operator `|` dan tipe intersection menggunakan operator `&`. Meskipun interface juga dapat merepresentasikan tipe union secara tidak langsung, interface tidak memiliki dukungan bawaan untuk tipe intersection.

```typescript
type Department = 'dep-x' | 'dep-y'; // Union

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersection
```

Contoh dengan interface:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

