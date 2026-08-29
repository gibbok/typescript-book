---
title: Tuple dengan Panjang Tetap
sidebar:
  order: 31
  label: 31. Tuple dengan Panjang Tetap
---


Tuple dengan Panjang Tetap adalah jenis tuple khusus yang memberlakukan jumlah elemen tetap dengan tipe tertentu, dan tidak mengizinkan perubahan apa pun pada panjang tuple setelah didefinisikan.

Tuple dengan Panjang Tetap berguna ketika Anda perlu merepresentasikan kumpulan nilai dengan jumlah elemen dan tipe tertentu, serta ingin memastikan bahwa panjang dan tipe tuple tidak dapat berubah secara tidak sengaja.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Error
```

