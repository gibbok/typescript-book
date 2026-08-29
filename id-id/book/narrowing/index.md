# Penyempitan



Penyempitan TypeScript adalah proses mempersempit tipe suatu variabel di dalam blok kondisional. Hal ini berguna ketika bekerja dengan tipe union, ketika sebuah variabel dapat memiliki lebih dari satu tipe.

TypeScript mengenali beberapa cara untuk mempersempit tipe:

### Type guard typeof

Type guard typeof adalah salah satu type guard khusus dalam TypeScript yang memeriksa tipe suatu variabel berdasarkan tipe bawaan JavaScript-nya.

```typescript
const fn = (x: number | string) => {
    if (typeof x === 'number') {
        return x + 1; // x is number
    }
    return -1;
};
```

### Penyempitan berdasarkan truthiness

Penyempitan berdasarkan truthiness dalam TypeScript bekerja dengan memeriksa apakah suatu variabel bersifat truthy atau falsy untuk mempersempit tipenya sebagaimana mestinya.

```typescript
const toUpperCase = (name: string | null) => {
    if (name) {
        return name.toUpperCase();
    } else {
        return null;
    }
};
```

### Penyempitan berdasarkan kesetaraan

Penyempitan berdasarkan kesetaraan dalam TypeScript bekerja dengan memeriksa apakah suatu variabel sama dengan nilai tertentu atau tidak, untuk mempersempit tipenya sebagaimana mestinya.

Penyempitan ini digunakan bersama statement `switch` dan operator kesetaraan seperti `===`, `!==`, `==`, dan `!=` untuk mempersempit tipe.

```typescript
const checkStatus = (status: 'success' | 'error') => {
    switch (status) {
        case 'success':
            return true;
        case 'error':
            return null;
    }
};
```

### Penyempitan dengan Operator In

Penyempitan Operator `in` dalam TypeScript adalah cara untuk mempersempit tipe suatu variabel berdasarkan apakah suatu properti ada di dalam tipe variabel tersebut.

```typescript
type Dog = {
    name: string;
    breed: string;
};

type Cat = {
    name: string;
    likesCream: boolean;
};

const getAnimalType = (pet: Dog | Cat) => {
    if ('breed' in pet) {
        return 'dog';
    } else {
        return 'cat';
    }
};
```

### Penyempitan instanceof

Penyempitan dengan operator `instanceof` dalam TypeScript adalah cara untuk mempersempit tipe suatu variabel berdasarkan fungsi constructor-nya, dengan memeriksa apakah suatu objek merupakan instance dari class atau interface tertentu.

```typescript
class Square {
    constructor(public width: number) {}
}
class Rectangle {
    constructor(
        public width: number,
        public height: number
    ) {}
}
function area(shape: Square | Rectangle) {
    if (shape instanceof Square) {
        return shape.width * shape.width;
    } else {
        return shape.width * shape.height;
    }
}
const square = new Square(5);
const rectangle = new Rectangle(5, 10);
console.log(area(square)); // 25
console.log(area(rectangle)); // 50
```

