# 交差型



交差型は、2 つ以上の型のすべてのプロパティを持つ値を表す型です。交差型は、各型の間に `&` 記号を使用して表します。

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

