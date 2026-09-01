---
title: Ad Alanları
sidebar:
  order: 58
  label: 58. Ad Alanları
---


TypeScript'te ad alanları, kodu mantıksal kapsayıcılar içinde düzenlemek, ad çakışmalarını önlemek ve ilişkili kodları bir arada gruplandırmak için kullanılır.
`export` anahtar sözcüğünün kullanılması, modüllerin dışından ad alanına erişilmesine olanak tanır.

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

