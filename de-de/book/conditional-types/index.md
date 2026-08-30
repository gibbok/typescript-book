# Bedingte Typen



Bedingte Typen sind eine Möglichkeit, einen von einer Bedingung abhängigen Typ zu erstellen, wobei der zu erstellende Typ anhand des Ergebnisses der Bedingung bestimmt wird. Sie werden mit dem Schlüsselwort `extends` und einem ternären Operator definiert, um bedingt zwischen zwei Typen zu wählen.

```typescript
type IsArray<T> = T extends any[] ? true : false;

const myArray = [1, 2, 3];
const myNumber = 42;

type IsMyArrayAnArray = IsArray<typeof myArray>; // Type true
type IsMyNumberAnArray = IsArray<typeof myNumber>; // Type false
```

