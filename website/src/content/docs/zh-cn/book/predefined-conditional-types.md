---
title: 预定义条件类型
sidebar:
  order: 42
  label: 42. 预定义条件类型
---


在 TypeScript 中，预定义的条件类型是语言提供的内置条件类型。它们旨在根据给定类型的特征执行常见的类型转换。

`Exclude<UnionType, ExcludedType>`: 此类型从 Type 中删除可分配给 ExcludedType 的所有类型。

`Extract<Type, Union>`: 此类型从 Union 中提取可分配给 Type 的所有类型。

`NonNullable<Type>`: 此类型从 Type 中删除 null 和 undefined。

`ReturnType<Type>`: 此类型提取函数 Type 的返回类型。

`Parameters<Type>`: 该类型提取函数类型的参数类型。

`Required<Type>`: 此类型使 Type 中的所有属性成为必需。

`Partial<Type>`: 此类型使 Type 中的所有属性都是可选的。

`Readonly<Type>`: 此类型使 Type 中的所有属性变为只读。

