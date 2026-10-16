# Modifizierer gemappter Typen



Modifizierer gemappter Typen ermöglichen in TypeScript die Transformation von Eigenschaften innerhalb eines vorhandenen Typs:

* `readonly` oder `+readonly`: Dadurch wird eine Eigenschaft im gemappten Typ schreibgeschützt.
* `-readonly`: Dadurch wird eine Eigenschaft im gemappten Typ veränderbar.
* `?`: Dadurch wird eine Eigenschaft im gemappten Typ als optional gekennzeichnet.

Beispiele:

```typescript
type ReadOnly<T> = { readonly [P in keyof T]: T[P] }; // Alle Eigenschaften als schreibgeschützt markiert

type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // Alle Eigenschaften als veränderlich markiert

type MyPartial<T> = { [P in keyof T]?: T[P] }; // Alle Eigenschaften als optional markiert
```

