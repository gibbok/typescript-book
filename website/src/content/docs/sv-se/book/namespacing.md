---
title: Namnrymder
sidebar:
  order: 57
  label: 57. Namnrymder
---


I TypeScript används namnrymder (namespaces) för att organisera kod i logiska behållare, förhindra namnkollisioner och ge ett sätt att gruppera relaterad kod tillsammans.
Användningen av nyckelordet `export` tillåter åtkomst till namnrymden i "utomstående" moduler.

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

