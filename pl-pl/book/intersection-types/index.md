# Typy przecięcia



Typ przecięcia to typ reprezentujący wartość, która ma wszystkie właściwości co najmniej dwóch typów. Typy przecięcia zapisuje się za pomocą symbolu `&` między poszczególnymi typami.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersection

const j: J = {
    a: 'a',
    b: 'b',
};
```

