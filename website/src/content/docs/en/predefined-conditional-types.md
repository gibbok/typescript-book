---
title: Predefined Conditional Types
sidebar:
  order: 42
  label: 42. Predefined Conditional Types
---


In TypeScript, Predefined Conditional Types are built-in conditional types provided by the language. They are designed to perform common type transformations based on the characteristics of a given type.

`Exclude<UnionType, ExcludedType>`: This type removes all the types from Type that are assignable to ExcludedType.

`Extract<Type, Union>`: This type extracts all the types from Union that are assignable to Type.

`NonNullable<Type>`: This type removes null and undefined from Type.

`ReturnType<Type>`: This type extracts the return type of a function Type.

`Parameters<Type>`: This type extracts the parameter types of a function Type.

`Required<Type>`: This type makes all properties in Type required.

`Partial<Type>`: This type makes all properties in Type optional.

`Readonly<Type>`: This type makes all properties in Type readonly.

