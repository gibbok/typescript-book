# النوع من القيمة



يشير «النوع من القيمة» في TypeScript إلى الاستدلال التلقائي لنوع من قيمة أو تعبير من خلال استدلال النوع.

```typescript
const x = 'x'; // TypeScript infers 'x' as a string literal with 'const' (immutable), but widens it to 'string' with 'let' (reassignable).
```

