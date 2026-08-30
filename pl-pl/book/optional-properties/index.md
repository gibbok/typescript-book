# Właściwości opcjonalne



Obiekt może określać właściwości opcjonalne przez dodanie znaku zapytania `?` na końcu nazwy właściwości:

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

Gdy właściwość jest opcjonalna, można określić dla niej wartość domyślną:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

