---
title: Tipe Never
sidebar:
  order: 48
  label: 48. Tipe Never
---


Tipe `never` merepresentasikan nilai yang tidak pernah terjadi. Tipe ini digunakan untuk menunjukkan fungsi atau ekspresi yang tidak pernah mengembalikan nilai atau melempar error.

Misalnya, sebuah perulangan tak terbatas:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
    }
};
```

Melempar error:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

Tipe `never` berguna untuk memastikan keamanan tipe dan mendeteksi potensi error dalam kode Anda. Tipe ini membantu TypeScript menganalisis dan menyimpulkan tipe yang lebih presisi ketika digunakan bersama tipe lain dan pernyataan alur kontrol, misalnya:

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // move up
            break;
        case 'down':
            // move down
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

