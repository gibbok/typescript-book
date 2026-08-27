# ユニオン型



ユニオン型は、複数の型のうちいずれか 1 つになり得る値を表す型です。ユニオン型は、取り得る各型の間に `|` 記号を使用して表します。

```typescript
let x: string | number;
x = 'hello'; // Valid
x = 123; // Valid
```

