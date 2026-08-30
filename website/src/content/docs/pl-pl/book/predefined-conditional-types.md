---
title: Predefiniowane typy warunkowe
sidebar:
  order: 43
  label: 43. Predefiniowane typy warunkowe
---


W TypeScript predefiniowane typy warunkowe są wbudowanymi typami warunkowymi udostępnianymi przez język. Zostały zaprojektowane do wykonywania typowych przekształceń typów na podstawie cech danego typu.

`Exclude<UnionType, ExcludedType>`: Ten typ usuwa z Type wszystkie typy, które można przypisać do ExcludedType.

`Extract<Type, Union>`: Ten typ wyodrębnia z Union wszystkie typy, które można przypisać do Type.

`NonNullable<Type>`: Ten typ usuwa `null` i `undefined` z Type.

`ReturnType<Type>`: Ten typ wyodrębnia typ zwracany przez funkcję Type.

`Parameters<Type>`: Ten typ wyodrębnia typy parametrów funkcji Type.

`Required<Type>`: Ten typ sprawia, że wszystkie właściwości w Type są wymagane.

`Partial<Type>`: Ten typ sprawia, że wszystkie właściwości w Type są opcjonalne.

`Readonly<Type>`: Ten typ sprawia, że wszystkie właściwości w Type są tylko do odczytu.

