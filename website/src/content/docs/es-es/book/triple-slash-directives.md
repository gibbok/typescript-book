---
title: Directivas de triple barra
sidebar:
  order: 61
  label: 61. Directivas de triple barra
---


Las directivas de triple barra son comentarios especiales que indican al compilador cómo procesar un archivo. Comienzan con tres barras consecutivas (`///`), suelen situarse al principio de un archivo TypeScript y no afectan al comportamiento en tiempo de ejecución.

Se utilizan para referenciar dependencias externas, especificar el comportamiento de carga de módulos, activar o desactivar características del compilador y otros fines. Algunos ejemplos:

Referenciar un archivo de declaración:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Indicar el formato del módulo:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Activar opciones del compilador; en el siguiente ejemplo, el modo estricto:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

