# Literálové typy



Literálový typ je jednoprvková množina v rámci obecnějšího typu; definuje zcela konkrétní hodnotu, která je primitivem JavaScriptu.

Literálové typy v TypeScriptu jsou čísla, řetězce a booleovské hodnoty.

Příklad literálů:

```typescript
const a = 'a'; // Řetězcový literálový typ
const b = 1; // Číselný literálový typ
const c = true; // Booleovský literálový typ
```

Řetězcové, číselné a booleovské literálové typy se používají ve sjednoceních, typových strážcích a typových aliasech.
V následujícím příkladu vidíte typový alias sjednocení. `O` se skládá pouze z uvedených hodnot, žádný jiný řetězec není platný:

```typescript
type O = 'a' | 'b' | 'c';
```

