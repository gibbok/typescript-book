# Generic



Generik memungkinkan Anda membuat komponen dan fungsi yang dapat digunakan kembali dan bekerja dengan berbagai tipe. Dengan generik, Anda dapat memparametrisasi tipe, fungsi, dan antarmuka, sehingga semuanya dapat beroperasi pada tipe yang berbeda tanpa perlu menentukannya secara eksplisit terlebih dahulu.

Generik memungkinkan Anda membuat kode yang lebih fleksibel dan dapat digunakan kembali.

### Tipe Generic

Untuk mendefinisikan tipe generik, Anda menggunakan tanda kurung sudut (`<>`) guna menentukan parameter tipe, misalnya:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Class Generic

Generik juga dapat diterapkan pada kelas. Dengan cara ini, kelas dapat bekerja dengan berbagai tipe menggunakan parameter tipe. Hal ini berguna untuk membuat definisi kelas yang dapat digunakan kembali dan beroperasi pada tipe data yang berbeda sambil tetap mempertahankan keamanan tipe.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // hello
```

### Batasan Generic

Parameter generik dapat dibatasi menggunakan kata kunci `extends` yang diikuti oleh tipe atau antarmuka yang harus dipenuhi oleh parameter tipe tersebut.

Dalam contoh berikut, `T` harus memiliki properti `length` dengan tipe yang tepat agar valid:

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Hello'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Invalid
```

Salah satu fitur generik penting yang diperkenalkan pada versi 3.4 RC adalah inferensi tipe fungsi tingkat tinggi, yang meneruskan argumen tipe generik:

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

Fungsionalitas ini mempermudah pemrograman bergaya point-free yang aman secara tipe dan umum digunakan dalam pemrograman fungsional.

### Penyempitan kontekstual generic

Penyempitan kontekstual untuk generik adalah mekanisme dalam TypeScript yang memungkinkan kompiler mempersempit tipe parameter generik berdasarkan konteks penggunaannya. Mekanisme ini berguna saat bekerja dengan tipe generik dalam pernyataan kondisional:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Value is narrowed down to type 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Value is narrowed down to type 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

