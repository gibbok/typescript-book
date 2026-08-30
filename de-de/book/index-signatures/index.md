# Indexsignaturen



In TypeScript können wir `string`, `number` und `symbol` als Indexsignaturen verwenden:

```typescript
type K = {
    [name: string | number]: string;
};
const k: K = { x: 'x', 1: 'b' };
console.log(k['x']);
console.log(k[1]);
console.log(k['1']); // Same result as k[1]
```

Beachten Sie, dass JavaScript einen Index vom Typ `number` automatisch in einen Index vom Typ `string` konvertiert, sodass `k[1]` und `k["1"]` denselben Wert zurückgeben.

