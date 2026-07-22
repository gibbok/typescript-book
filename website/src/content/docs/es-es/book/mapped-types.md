---
title: Tipos mapeados
sidebar:
  order: 38
  label: 38. Tipos mapeados
---


Los tipos mapeados de TypeScript permiten crear tipos nuevos a partir de otro existente transformando cada propiedad mediante una función de mapeo. Así pueden representar la misma información con un formato distinto. Para crear uno, se accede a las propiedades de un tipo existente mediante el operador `keyof` y después se modifican para producir un tipo nuevo.
En el siguiente ejemplo:

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

definimos MyMappedType para recorrer las propiedades de T y crear un tipo nuevo donde cada propiedad es un array de su tipo original. Con él creamos MyNewType, que representa la misma información que MyType, pero con cada propiedad como array.

