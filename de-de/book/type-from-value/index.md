# Typ aus einem Wert



Ein Typ aus einem Wert bezeichnet in TypeScript die automatische Ableitung eines Typs aus einem Wert oder Ausdruck durch Typinferenz.

```typescript
const x = 'x'; // TypeScript leitet 'x' mit 'const' als String-Literal ab (unveränderlich), erweitert den Typ mit 'let' jedoch zu 'string' (neu zuweisbar).
```

