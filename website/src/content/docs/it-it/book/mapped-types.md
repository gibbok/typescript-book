---
title: Tipi mappati
sidebar:
  order: 37
  label: 37. Tipi mappati
---


I tipi mappati in TypeScript consentono di creare nuovi tipi basati su un tipo esistente trasformando ciascuna proprietà tramite una funzione di mappatura. Mappando i tipi esistenti, è possibile creare nuovi tipi che rappresentano le stesse informazioni in un formato diverso. Per creare un tipo mappato, si accede alle proprietà di un tipo esistente utilizzando l'operatore `keyof` e quindi le si modifica per produrre un nuovo tipo.
Nell'esempio seguente:

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

Definiamo MyMappedType per mappare le proprietà di T, creando un nuovo tipo con ogni proprietà come array del suo tipo originale. In questo modo, creiamo MyNewType per rappresentare le stesse informazioni di MyType, ma con ogni proprietà come array.

