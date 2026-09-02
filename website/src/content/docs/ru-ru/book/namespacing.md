---
title: Пространства имён
sidebar:
  order: 58
  label: 58. Пространства имён
---


В TypeScript пространства имён используются для организации кода в логические контейнеры, предотвращая конфликты имён и позволяя объединять связанный код.
Ключевое слово `export` позволяет обращаться к пространству имён извне модулей.

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

