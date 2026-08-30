# Typ aus dem Funktionsrückgabewert



Ein Typ aus dem Funktionsrückgabewert bezeichnet die Möglichkeit, den Rückgabetyp einer Funktion anhand ihrer Implementierung automatisch abzuleiten. Dadurch kann TypeScript den Typ des von der Funktion zurückgegebenen Werts ohne explizite Typannotationen bestimmen.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript can infer that the return type of the function is a number
```

