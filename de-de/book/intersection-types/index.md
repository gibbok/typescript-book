# Schnittmengentypen



Ein Schnittmengentyp ist ein Typ, der einen Wert darstellt, der alle Eigenschaften von zwei oder mehr Typen besitzt. Schnittmengentypen werden durch das Symbol `&` zwischen den einzelnen Typen gekennzeichnet.

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

