---
title: The never Type
sidebar:
  order: 26
  label: 26. The never Type
---


Когато променлива бъде стеснена до тип, който не може да съдържа никакви стойности, компилаторът на TypeScript ще извлече, че променливата трябва да бъде от тип `never`. Това е така, защото типът `never` представлява стойност, която никога не може да бъде произведена.

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val има тип never тук, защото не може да бъде нищо друго освен низ или число
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

