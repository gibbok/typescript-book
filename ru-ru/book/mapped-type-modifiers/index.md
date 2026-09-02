# Модификаторы сопоставляемых типов



Модификаторы сопоставляемых типов в TypeScript позволяют преобразовывать свойства существующего типа:

* `readonly` или `+readonly`: делает свойство сопоставляемого типа доступным только для чтения.
* `-readonly`: делает свойство сопоставляемого типа изменяемым.
* `?`: обозначает свойство сопоставляемого типа как необязательное.

Примеры:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // All properties marked as read-only

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // All properties marked as mutable

type MyPartial<T> = { [P in keyof T]?: T[P] }; // All properties marked as optional
```

