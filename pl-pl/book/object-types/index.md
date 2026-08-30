# Typy obiektowe



W TypeScript typy obiektowe opisują strukturę obiektu. Określają nazwy i typy właściwości obiektu, a także to, czy właściwości te są wymagane, czy opcjonalne.

W TypeScript typy obiektowe można definiować na dwa podstawowe sposoby:

Interfejs definiuje strukturę obiektu przez określenie nazw, typów i opcjonalności jego właściwości.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Alias typu, podobnie jak interfejs, definiuje strukturę obiektu. Może jednak również utworzyć nowy typ niestandardowy oparty na istniejącym typie lub kombinacji istniejących typów. Obejmuje to definiowanie typów unii, typów przecięcia i innych typów złożonych.

```typescript
type Point = {
    x: number;
    y: number;
};
```

Można również zdefiniować typ anonimowo:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

