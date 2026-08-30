---
title: Gemappte Typen
sidebar:
  order: 38
  label: 38. Gemappte Typen
---


Gemappte Typen ermöglichen es in TypeScript, neue Typen auf Grundlage eines vorhandenen Typs zu erstellen, indem jede Eigenschaft mithilfe einer Mapping-Funktion transformiert wird. Durch das Mapping vorhandener Typen können Sie neue Typen erstellen, die dieselben Informationen in einem anderen Format darstellen. Um einen gemappten Typ zu erstellen, greifen Sie mit dem Operator `keyof` auf die Eigenschaften eines vorhandenen Typs zu und verändern sie anschließend, um einen neuen Typ zu erzeugen.
Im folgenden Beispiel:

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

Wir definieren MyMappedType so, dass die Eigenschaften von T gemappt werden und ein neuer Typ entsteht, bei dem jede Eigenschaft ein Array ihres ursprünglichen Typs ist. Damit erstellen wir MyNewType, um dieselben Informationen wie MyType darzustellen, jedoch mit jeder Eigenschaft als Array.

