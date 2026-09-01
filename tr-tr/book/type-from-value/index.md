# Değerden Tür



TypeScript'te Değerden Tür, tür çıkarımı aracılığıyla bir değer veya ifadeden türün otomatik olarak çıkarılmasını ifade eder.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

