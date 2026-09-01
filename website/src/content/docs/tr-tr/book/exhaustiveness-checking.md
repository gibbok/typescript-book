---
title: Kapsamlılık denetimi
sidebar:
  order: 27
  label: 27. Kapsamlılık denetimi
---


Kapsamlılık denetimi, ayırt edici bir birleşimin tüm olası durumlarının bir `switch` veya `if` ifadesinde ele alınmasını sağlayan bir TypeScript özelliğidir.

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

`never` türü, varsayılan durumun kapsamlı olmasını ve switch ifadesinde ele alınmadan Direction türüne yeni bir değer eklenirse TypeScript'in hata vermesini sağlamak için kullanılır.

