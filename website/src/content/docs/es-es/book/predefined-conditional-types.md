---
title: Tipos condicionales predefinidos
sidebar:
  order: 44
  label: 44. Tipos condicionales predefinidos
---


En TypeScript, los tipos condicionales predefinidos son tipos integrados que proporciona el lenguaje para realizar transformaciones habituales según las características de un tipo.

`Exclude<UnionType, ExcludedType>`: elimina de Type todos los tipos asignables a ExcludedType.

`Extract<Type, Union>`: extrae de Union todos los tipos asignables a Type.

`NonNullable<Type>`: elimina null y undefined de Type.

`ReturnType<Type>`: extrae el tipo de retorno de una función Type.

`Parameters<Type>`: extrae los tipos de los parámetros de una función Type.

`Required<Type>`: convierte en obligatorias todas las propiedades de Type.

`Partial<Type>`: convierte en opcionales todas las propiedades de Type.

`Readonly<Type>`: convierte todas las propiedades de Type en propiedades de solo lectura.

