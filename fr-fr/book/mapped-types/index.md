# Types mappés



En TypeScript, les types mappés permettent de créer de nouveaux types à partir d'un type existant en transformant chaque propriété à l'aide d'une fonction de mappage. En mappant des types existants, vous pouvez créer de nouveaux types qui représentent les mêmes informations dans un format différent. Pour créer un type mappé, vous accédez aux propriétés d'un type existant à l'aide de l'opérateur `keyof`, puis vous les modifiez afin de produire un nouveau type.
Dans l'exemple suivant :

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

nous définissons MyMappedType afin de parcourir les propriétés de T et de créer un nouveau type dont chaque propriété est un tableau du type d'origine. À partir de celui-ci, nous créons MyNewType pour représenter les mêmes informations que MyType, mais avec chaque propriété sous forme de tableau.

