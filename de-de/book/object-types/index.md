# Objekttypen



In TypeScript beschreiben Objekttypen die Struktur eines Objekts. Sie geben die Namen und Typen der Eigenschaften des Objekts sowie an, ob diese Eigenschaften erforderlich oder optional sind.

In TypeScript können Sie Objekttypen auf zwei grundlegende Arten definieren:

Ein Interface definiert die Struktur eines Objekts, indem es die Namen, Typen und Optionalität seiner Eigenschaften angibt.

```typescript
interface User {
    name: string;
    age: number;
    email?: string;
}
```

Ein Typalias definiert ähnlich wie ein Interface die Struktur eines Objekts. Er kann jedoch auch einen neuen benutzerdefinierten Typ erstellen, der auf einem bestehenden Typ oder einer Kombination bestehender Typen basiert. Dazu gehört die Definition von Union-Typen, Schnittmengentypen und anderen komplexen Typen.

```typescript
type Point = {
    x: number;
    y: number;
};
```

Ein Typ kann auch anonym definiert werden:

```typescript
const sum = (x: { a: number; b: number }) => x.a + x.b;
console.log(sum({ a: 5, b: 1 }));
```

