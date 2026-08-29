# Memperluas Tipe



Sebuah `interface` dapat diperluas (menyalin member dari tipe lain):

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
```

Interface juga dapat diperluas dari beberapa tipe:

```typescript
interface A {
    a: string;
}
interface B {
    b: string;
}
interface Y extends A, B {
    y: string;
}
```

Kata kunci `extends` hanya berfungsi pada interface dan class; untuk type, gunakan intersection:

```typescript
type A = {
    a: number;
};
type B = {
    b: number;
};
type C = A & B;
```

Sebuah type dapat diperluas menggunakan interface, tetapi tidak sebaliknya:

```typescript
type A = {
    a: string;
};
interface B extends A {
    b: string;
}
```

