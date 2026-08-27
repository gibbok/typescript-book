# モジュールから型を取得する



モジュールから型を取得するとは、モジュールがエクスポートした値を使用して、その型を自動的に推論する機能を指します。モジュールが特定の型を持つ値をエクスポートすると、TypeScript はその情報を使用して、別のモジュールへインポートされた際に、その値の型を自動的に推論できます。

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

