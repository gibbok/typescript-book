# Never türü



`never` türü, hiçbir zaman ortaya çıkmayan değerleri temsil eder. Hiçbir zaman dönmeyen veya hata fırlatan fonksiyonları ya da ifadeleri belirtmek için kullanılır.

Örneğin, sonsuz bir döngü:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // bir şey yap
    }
};
```

Hata fırlatma:

```typescript
const throwError = (message: string): never => {
    throw new Error(message);
};
```

`never` türü, tür güvenliğini sağlamada ve kodunuzdaki olası hataları yakalamada kullanışlıdır. Diğer türler ve kontrol akışı ifadeleriyle birlikte kullanıldığında TypeScript'in daha kesin türleri analiz etmesine ve çıkarsamasına yardımcı olur. Örneğin:

```typescript
type Direction = 'up' | 'down';
const move = (direction: Direction): void => {
    switch (direction) {
        case 'up':
            // yukarı taşı
            break;
        case 'down':
            // aşağı taşı
            break;
        default:
            const exhaustiveCheck: never = direction;
            throw new Error(`Unhandled direction: ${exhaustiveCheck}`);
    }
};
```

