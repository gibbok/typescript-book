# リテラル型



リテラル型は、集合型の中にある要素が 1 つだけの集合です。JavaScript のプリミティブである、非常に限定された値を定義します。

TypeScript のリテラル型には、数値、文字列、真偽値があります。

リテラルの例を次に示します。

```typescript
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

文字列、数値、真偽値のリテラル型は、ユニオン、型ガード、型エイリアスで使用されます。
次の例では、ユニオン型エイリアスを確認できます。`O` は指定された値のみで構成され、ほかの文字列は有効ではありません。

```typescript
type O = 'a' | 'b' | 'c';
```

