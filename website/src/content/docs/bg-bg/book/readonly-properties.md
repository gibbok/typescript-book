---
title: Readonly свойства
sidebar:
  order: 14
  label: 14. Readonly свойства
---


Възможно е да се предотврати записването в дадено свойство чрез използването на модификатора `readonly`, който гарантира, че свойството не може да бъде презаписвано, но не предоставя пълна гаранция за цялостна неизменяемост:

```typescript
interface Y {
    readonly a: number;
}

type X = {
    readonly a: number;
};

type J = Readonly<{
    a: number;
}>;

type K = {
    readonly [index: number]: string;
};
```

