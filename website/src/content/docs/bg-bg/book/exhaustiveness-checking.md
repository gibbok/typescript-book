---
title: Проверка за изчерпателност
sidebar:
  order: 27
  label: 27. Проверка за изчерпателност
---


Проверката за изчерпателност е функция в TypeScript, която гарантира, че всички възможни случаи на дискриминиран union са обработени в `switch` или `if` израз.

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
            console.log(exhaustiveCheck); // Този ред никога няма да бъде изпълнен
    }
};
```

Типът `never` се използва, за да се гарантира, че default случаят е изчерпателен и че TypeScript ще генерира грешка, ако бъде добавена нова стойност към типа Direction без да бъде обработена в switch израза.

