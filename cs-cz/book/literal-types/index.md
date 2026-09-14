# Literálové typy



Literálový typ je jednoprvková množina v rámci obecnějšího typu; definuje zcela konkrétní hodnotu, která je primitivem JavaScriptu.

Literálové typy v TypeScriptu jsou čísla, řetězce a booleovské hodnoty.

Příklad literálů:

```typescript
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

Řetězcové, číselné a booleovské literálové typy se používají ve sjednoceních, typových strážcích a typových aliasech.
V následujícím příkladu vidíte typový alias sjednocení. `O` se skládá pouze z uvedených hodnot, žádný jiný řetězec není platný:

```typescript
type O = 'a' | 'b' | 'c';
```

