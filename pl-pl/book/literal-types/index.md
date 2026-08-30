# Typy literałowe



Typ literałowy jest zbiorem jednoelementowym należącym do typu zbiorczego; definiuje bardzo dokładną wartość, która jest typem pierwotnym JavaScript.

Typami literałowymi w TypeScript są liczby, ciągi znaków i wartości logiczne.

Przykład literałów:

```typescript
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

Literałowe typy ciągów znaków, liczb i wartości logicznych są używane w uniach, strażnikach typów i aliasach typów.
W poniższym przykładzie można zobaczyć alias typu unii. `O` składa się wyłącznie z określonych wartości; żaden inny ciąg znaków nie jest prawidłowy:

```typescript
type O = 'a' | 'b' | 'c';
```

