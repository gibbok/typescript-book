---
title: Предефинирани Conditional типове
sidebar:
  order: 43
  label: 43. Предефинирани Conditional типове
---


В TypeScript, предефинираните Conditional типове са вградени conditional типове, предоставени от езика. Те са създадени, за да извършват често използвани трансформации на типове въз основа на характеристиките на даден тип.

`Exclude<UnionType, ExcludedType>`: Премахва всички типове от UnionType, които могат да бъдат присвоени на ExcludedType.

`Extract<Type, Union>`: Извлича всички типове от Union, които могат да бъдат присвоени на Type.

`NonNullable<Type>`: Премахва null и undefined от Type.

`ReturnType<Type>`: Извлича типа на върнатата стойност на функция Type.

`Parameters<Type>`: Извлича типовете на параметрите на функция Type.

`Required<Type>`: Прави всички свойства в Type задължителни.

`Partial<Type>`: Прави всички свойства в Type опционални.

`Readonly<Type>`: Прави всички свойства в Type само за четене.

