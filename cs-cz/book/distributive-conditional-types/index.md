# Distributivní podmíněné typy



Distributivní podmíněné typy jsou funkcí jazyka, která umožňuje distribuovat typ přes sjednocení typů tím, že se transformace aplikuje na každého člena sjednocení samostatně.
To může být užitečné zejména při práci s mapovanými typy nebo typy vyšších řádů.

```typescript
type Nullable<T> = T extends any ? T | null : never;
type NumberOrBool = number | boolean;
type NullableNumberOrBool = Nullable<NumberOrBool>; // number | boolean | null
```

