# Typy mapowane



Typy mapowane w TypeScript pozwalają tworzyć nowe typy na podstawie istniejącego typu przez przekształcenie każdej właściwości za pomocą funkcji mapującej. Mapując istniejące typy, można tworzyć nowe typy, które reprezentują te same informacje w innym formacie. Aby utworzyć typ mapowany, należy uzyskać dostęp do właściwości istniejącego typu za pomocą operatora `keyof`, a następnie zmienić je w celu utworzenia nowego typu.
W poniższym przykładzie:

```typescript
type MyMappedType<T> = {
    [P in keyof T]: T[P][];
};
type MyType = {
    foo: string;
    bar: number;
};
type MyNewType = MyMappedType<MyType>;
const x: MyNewType = {
    foo: ['hello', 'world'],
    bar: [1, 2, 3],
};
```

Definiujemy `MyMappedType`, aby mapował właściwości typu `T`, tworząc nowy typ, w którym każda właściwość jest tablicą swojego pierwotnego typu. Za jego pomocą tworzymy `MyNewType`, aby reprezentował te same informacje co `MyType`, ale z każdą właściwością w postaci tablicy.

