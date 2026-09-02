# Вывод типа с помощью infer в условных типах



Ключевое слово `infer` используется в условных типах для вывода (извлечения) типа обобщённого параметра из зависящего от него типа. Это позволяет создавать более гибкие определения типов, пригодные для повторного использования.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

