---
title: Tipo any
sidebar:
  order: 44
  label: 44. Tipo any
---


El tipo `any` es un tipo especial (supertipo universal) que puede representar cualquier clase de valor: primitivos, objetos, arrays, funciones, errores o símbolos. Suele utilizarse cuando el tipo de un valor no se conoce durante la compilación o al trabajar con API o bibliotecas externas sin tipos de TypeScript.

Al utilizar `any` indicas al compilador de TypeScript que los valores deben representarse sin limitaciones. Para maximizar la seguridad de tipos, ten en cuenta lo siguiente:

* Limita el uso de `any` a casos concretos en los que el tipo sea realmente desconocido.
* No devuelvas tipos `any` desde una función, ya que debilita la seguridad de tipos del código que la utiliza.
* En lugar de `any`, utiliza `@ts-ignore` si necesitas silenciar el compilador.

```typescript
let value: any;
value = true; // Valid
value = 7; // Valid
```

