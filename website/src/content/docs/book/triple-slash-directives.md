---
title: Triple-Slash Directives
sidebar:
  order: 59
  label: 59. Triple-Slash Directives
---


Triple-slash directives are special comments that provide instructions to the compiler about how to process a file. These directives begin with three consecutive slashes (`///`) and are typically placed at the top of a TypeScript file and have no effects on the runtime behavior.

Triple-slash directives are used to reference external dependencies, specify module loading behavior, enable/disable certain compiler features, and more. Few examples:

Referencing a declaration file:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Indicate the module format:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Enable compiler options, in the following example strict mode:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

