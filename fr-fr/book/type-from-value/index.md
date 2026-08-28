# Type à partir d'une valeur



En TypeScript, un type à partir d'une valeur désigne l'inférence automatique d'un type à partir d'une valeur ou d'une expression.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

