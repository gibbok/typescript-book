# Typindizierung



Typindizierung bezeichnet die Möglichkeit, Typen zu definieren, die mit einem nicht im Voraus bekannten Schlüssel indiziert werden können. Dabei wird eine Indexsignatur verwendet, um den Typ für Eigenschaften anzugeben, die nicht explizit deklariert sind.

```typescript
type Dictionary<T> = {
    [key: string]: T;
};
const myDict: Dictionary<string> = { a: 'a', b: 'b' };
console.log(myDict['a']); // Returns a
```

