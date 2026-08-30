# Właściwości tylko do odczytu



Można uniemożliwić zapisywanie właściwości za pomocą modyfikatora `readonly`, który gwarantuje, że właściwości nie można ponownie zapisać, ale nie zapewnia całkowitej niezmienności:

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

