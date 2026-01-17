---
title: Diretivas Triple-Slash
sidebar:
  order: 59
  label: 59. Diretivas Triple-Slash
---


Diretivas triple-slash são comentários especiais que fornecem instruções ao compilador sobre como processar um arquivo. Essas diretivas começam com três barras consecutivas (`///`) e são tipicamente colocadas no topo de um arquivo TypeScript e não têm efeitos no comportamento em tempo de execução.

Diretivas triple-slash são usadas para referenciar dependências externas, especificar comportamento de carregamento de módulo, habilitar/desabilitar certos recursos do compilador e muito mais. Alguns exemplos:

Referenciando um arquivo de declaração:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Indicar o formato do módulo:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Habilitar opções do compilador, no exemplo a seguir modo strict:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

