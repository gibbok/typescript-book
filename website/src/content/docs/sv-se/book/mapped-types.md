---
title: Mappade typer
sidebar:
  order: 37
  label: 37. Mappade typer
---


Mappade typer i TypeScript låter dig skapa nya typer baserade på en befintlig typ genom att transformera varje egenskap med hjälp av en mappningsfunktion. Genom att mappa befintliga typer kan du skapa nya typer som representerar samma information i ett annat format. För att skapa en mappad typ kommer du åt egenskaperna hos en befintlig typ med `keyof`-operatorn och ändrar dem sedan för att producera en ny typ.
I följande exempel:

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

definierar vi MyMappedType för att mappa över T:s egenskaper och skapa en ny typ där varje egenskap är en array av sin ursprungliga typ. Med hjälp av detta skapar vi MyNewType för att representera samma information som MyType, men med varje egenskap som en array.

