# Typ från värde



Typ från värde i TypeScript avser den automatiska härledningen av en typ från ett värde eller uttryck genom typinferens.

```typescript
const x = 'x'; // TypeScript härleder 'x' som en strängliteral med 'const' (oföränderlig), men breddar den till 'string' med 'let' (kan tilldelas på nytt).
```

