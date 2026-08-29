# Namespace



Dalam TypeScript, namespace digunakan untuk mengatur kode ke dalam wadah logis, mencegah benturan penamaan, dan menyediakan cara untuk mengelompokkan kode yang saling berkaitan.
Penggunaan kata kunci `export` memungkinkan akses ke namespace dari luar modul.

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

