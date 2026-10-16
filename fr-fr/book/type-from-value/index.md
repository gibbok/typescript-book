# Type à partir d'une valeur



En TypeScript, un type à partir d'une valeur désigne l'inférence automatique d'un type à partir d'une valeur ou d'une expression.

```typescript
const x = 'x'; // TypeScript infère 'x' comme un littéral de chaîne avec 'const' (immuable), mais l'élargit à 'string' avec 'let' (réaffectable).
```

