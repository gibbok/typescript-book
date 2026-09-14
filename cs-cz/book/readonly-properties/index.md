# Vlastnosti pouze pro čtení



Zápisu do vlastnosti lze zabránit pomocí modifikátoru `readonly`, který zajišťuje, že vlastnost nelze přepsat, ale neposkytuje žádnou záruku úplné neměnnosti:

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

