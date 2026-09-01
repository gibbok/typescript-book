# Kesişim Türleri



Kesişim Türü, iki veya daha fazla türün tüm özelliklerine sahip bir değeri temsil eden türdür. Kesişim Türleri, her türün arasında `&` simgesi kullanılarak gösterilir.

```typescript
type X = {
    a: string;
};

type Y = {
    b: string;
};

type J = X & Y; // Intersection

const j: J = {
    a: 'a',
    b: 'b',
};
```

