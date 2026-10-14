# 値から型を取得する



TypeScript で値から型を取得するとは、型推論を通じて値または式から型が自動的に推論されることを指します。

```typescript
const x = 'x'; // TypeScript は 'const' (不変) では 'x' を文字列リテラル型と推論するが、'let' (再代入可能) では 'string' に拡大する。
```

