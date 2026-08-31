---
title: Modülden Tür
sidebar:
  order: 37
  label: 37. Modülden Tür
---


Modülden Tür, bir modülün dışa aktarılan değerlerini kullanarak bunların türlerini otomatik olarak çıkarma yeteneğini ifade eder. Bir modül belirli bir türe sahip bir değeri dışa aktardığında TypeScript, bu değer başka bir modüle içe aktarılırken türünü otomatik olarak çıkarmak için bu bilgiyi kullanabilir.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

