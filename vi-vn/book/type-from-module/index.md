# Kiểu từ module



Type from Module nói đến khả năng sử dụng các giá trị được export của một module để tự động suy luận kiểu của chúng. Khi một module export một giá trị có kiểu cụ thể, TypeScript có thể dùng thông tin đó để tự động suy luận kiểu của giá trị khi nó được import vào module khác.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

