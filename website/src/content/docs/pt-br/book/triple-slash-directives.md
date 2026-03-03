---
title: Diretivas Triple-Slash
sidebar:
  order: 59
  label: 59. Diretivas Triple-Slash
---


As diretivas triple-slash são comentários especiais que fornecem instruções ao compilador sobre como processar um arquivo. Essas diretivas começam com <SAME> consecutivas (`///`) e são normalmente colocadas no topo de um arquivo TypeScript e não têm efeitos no comportamento em tempo de execução.

As diretivas triple-slash são usadas para referenciar dependências externas, especificar o comportamento de carregamento de módulos, habilitar/desabilitar certos recursos do compilador e muito mais. Alguns exemplos:

Referenciando um arquivo de declaração:

<!-- skip -->
```typescript
/// <reference path="caminho/para/arquivo/de/declaracao.d.ts" />
```

Indicar o formato do módulo:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Habilitar opções do compilador, no exemplo a seguir, o modo estrito:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

