# İsteğe Bağlı Özellikler



Bir nesne, özellik adının sonuna soru işareti `?` ekleyerek İsteğe Bağlı Özellikler belirtebilir:

```typescript
type X = {
    a: number;
    b?: number; // Optional
};
```

Bir özellik isteğe bağlı olduğunda varsayılan değer belirtmek mümkündür:

```typescript
type X = {
    a: number;
    b?: number;
};
const x = ({ a, b = 100 }: X) => a + b;
```

