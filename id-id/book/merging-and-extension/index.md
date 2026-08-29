# Penggabungan dan Ekstensi



Penggabungan dan ekstensi mengacu pada dua konsep berbeda yang berkaitan dengan penggunaan tipe dan interface.

Penggabungan memungkinkan Anda menggabungkan beberapa deklarasi dengan nama yang sama menjadi satu definisi, misalnya ketika Anda mendefinisikan interface dengan nama yang sama beberapa kali:

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

Ekstensi mengacu pada kemampuan untuk memperluas atau mewarisi tipe atau interface yang sudah ada guna membuat tipe atau interface baru. Ini adalah mekanisme untuk menambahkan properti atau metode tambahan ke tipe yang sudah ada tanpa mengubah definisi aslinya. Contoh:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

