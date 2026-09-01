# Salt Okunur Özellikler



Bir özelliğin yeniden yazılamamasını sağlayan ancak tamamen değişmez olduğuna dair herhangi bir güvence vermeyen `readonly` değiştiricisini kullanarak özelliğe yazmayı önlemek mümkündür:

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

