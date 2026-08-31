---
title: Never türü
sidebar:
  order: 48
  label: 48. Never türü
---


`never` türü, hiçbir zaman ortaya çıkmayan değerleri temsil eder. Hiçbir zaman dönmeyen veya hata fırlatan fonksiyonları ya da ifadeleri belirtmek için kullanılır.

Örneğin, sonsuz bir döngü:

```typescript
const infiniteLoop = (): never => {
    while (true) {
        // do something
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

