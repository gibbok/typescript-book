---
title: Tipos estructurales eliminados
sidebar:
  order: 58
  label: 58. Tipos estructurales eliminados
---


En TypeScript, los objetos no tienen que coincidir con un tipo concreto y exacto. Si creamos un objeto que cumple los requisitos de una interfaz, podemos utilizarlo donde se exija dicha interfaz aunque no exista una conexión explícita entre ambos.
Ejemplo:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Valid
```

