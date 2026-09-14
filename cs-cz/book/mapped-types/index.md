# Mapované typy



Mapované typy v TypeScriptu umožňují vytvářet nové typy na základě existujícího typu transformací každé vlastnosti pomocí mapovací funkce. Mapováním existujících typů můžete vytvářet nové typy, které představují stejné informace v jiném formátu. Mapovaný typ vytvoříte tak, že přistoupíte k vlastnostem existujícího typu pomocí operátoru `keyof` a poté je upravíte, čímž vznikne nový typ.
V následujícím příkladu:

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

definujeme MyMappedType tak, aby mapoval vlastnosti T a vytvořil nový typ, v němž je každá vlastnost polem svého původního typu. Pomocí toho vytváříme MyNewType, který představuje stejné informace jako MyType, ale každá vlastnost je polem.

