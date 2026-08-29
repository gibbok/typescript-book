# Pemeriksaan Kelengkapan



Pemeriksaan kelengkapan adalah fitur dalam TypeScript yang memastikan semua kemungkinan kasus dari union terdiskriminasi ditangani dalam statement `switch` atau statement `if`.

```typescript
type Direction = 'up' | 'down';

const move = (direction: Direction) => {
    switch (direction) {
        case 'up':
            console.log('Moving up');
            break;
        case 'down':
            console.log('Moving down');
            break;
        default:
            const exhaustiveCheck: never = direction;
            console.log(exhaustiveCheck); // This line will never be executed
    }
};
```

Tipe `never` digunakan untuk memastikan bahwa kasus default bersifat exhaustive dan bahwa TypeScript akan menghasilkan error jika nilai baru ditambahkan ke tipe Direction tanpa ditangani dalam statement switch.

