# Typ aus dem Funktionsrückgabewert



Ein Typ aus dem Funktionsrückgabewert bezeichnet die Möglichkeit, den Rückgabetyp einer Funktion anhand ihrer Implementierung automatisch abzuleiten. Dadurch kann TypeScript den Typ des von der Funktion zurückgegebenen Werts ohne explizite Typannotationen bestimmen.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript kann ableiten, dass der Rückgabetyp der Funktion number ist
```

