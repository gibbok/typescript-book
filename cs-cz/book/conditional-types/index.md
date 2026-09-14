# Podmíněné typy



Podmíněné typy představují způsob, jak vytvořit typ závislý na podmínce, kdy je vytvářený typ určen na základě výsledku podmínky. Definují se pomocí klíčového slova `extends` a ternárního operátoru pro podmíněný výběr mezi dvěma typy.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

