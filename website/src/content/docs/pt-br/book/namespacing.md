---
title: Namespacing
sidebar:
  order: 57
  label: 57. Namespacing
---


Namespaces em TypeScript são usados para organizar código em contêineres lógicos, prevenindo colisões de nome e fornecendo uma maneira de agrupar código relacionado junto.

```typescript
namespace Validation {
    export interface StringValidator {
        isValid(s: string): boolean;
    }

    export class LettersValidator implements StringValidator {
        isValid(s: string): boolean {
            return /^[A-Za-z]+$/.test(s);
        }
    }
}

const validator = new Validation.LettersValidator();
```

