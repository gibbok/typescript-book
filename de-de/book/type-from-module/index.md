# Typ aus einem Modul



Ein Typ aus einem Modul bezeichnet die Möglichkeit, die exportierten Werte eines Moduls zu verwenden, um deren Typen automatisch abzuleiten. Wenn ein Modul einen Wert mit einem bestimmten Typ exportiert, kann TypeScript diese Information verwenden, um den Typ dieses Werts automatisch abzuleiten, wenn er in ein anderes Modul importiert wird.

<!-- skip -->
```typescript
// calc.ts
export const add = (x: number, y: number) => x + y;
// index.ts
import { add } from 'calc';
const r = add(1, 2); // r is number
```

