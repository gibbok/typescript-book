# Průnikové typy



Průnikový typ je typ, který představuje hodnotu se všemi vlastnostmi dvou nebo více typů. Průnikové typy se zapisují pomocí symbolu `&` mezi jednotlivými typy.

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

