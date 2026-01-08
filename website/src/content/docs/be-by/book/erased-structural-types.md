---
title: Erased Structural Types
sidebar:
  order: 56
  label: 56. Erased Structural Types
---


In TypeScript, objects do not have to match a specific, exact type. For instance, if we create an object that fulfills an interface's requirements, we can utilize that object in places where that interface is required, even if there was no explicit connection between them.
Example:

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

