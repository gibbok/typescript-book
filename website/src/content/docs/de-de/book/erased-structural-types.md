---
title: Strukturelle Typen mit Typlöschung
sidebar:
  order: 57
  label: 57. Strukturelle Typen mit Typlöschung
---


In TypeScript müssen Objekte keinem bestimmten, exakten Typ entsprechen. Wenn wir beispielsweise ein Objekt erstellen, das die Anforderungen eines Interfaces erfüllt, können wir dieses Objekt an Stellen verwenden, an denen dieses Interface erforderlich ist, selbst wenn zwischen beiden keine explizite Verbindung besteht.
Beispiel:

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

