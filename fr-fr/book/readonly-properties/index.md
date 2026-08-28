# Propriétés en lecture seule



Il est possible d’empêcher l’écriture dans une propriété en utilisant le modificateur `readonly`, qui garantit que la propriété ne peut pas être réécrite, mais n’offre aucune garantie d’immuabilité totale :

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

