---
title: TypeScript 7 corrige a acessibilidade de setters em unions e intersections
description: O verificador nativo agora respeita separadamente a acessibilidade de setters e getters em propriedades de unions e intersections.
lastUpdated: 2026-08-24
sidebar:
    order: 2
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**Publicado:** 24 de agosto de 2026

A Microsoft integrou uma correção no verificador nativo do TypeScript que mantém separadas as acessibilidades de leitura e escrita para propriedades sintetizadas a partir de unions e intersections.

## O que mudou

Antes, a acessibilidade do setter podia ser ignorada nessas propriedades sintéticas porque a verificação usava efetivamente a acessibilidade do getter. Assim, um getter público combinado com um setter protegido podia permitir uma escrita inválida por meio de uma union ou intersection.

<!-- skip -->
```typescript
declare class C1 {
    get foo(): number;
    protected set foo(value: number);
}

declare class C2 {
    get foo(): number;
    protected set foo(value: number);
}

declare const c: C1 | C2;
c.foo; // Valid: read access is public
c.foo = 123; // Invalid: write access is protected
```

O verificador agora registra a acessibilidade de escrita separadamente. A leitura de `foo` continua válida, enquanto a atribuição relata corretamente um erro de acessibilidade.

## Por que isso importa

Classes podem expor leituras públicas de forma intencional enquanto restringem escritas. A correção preserva esse limite quando o TypeScript combina tipos de objeto em unions ou intersections, em vez de ampliar acidentalmente o acesso de escrita.

## Disponibilidade

A mudança foi integrada ao código nativo do TypeScript após o TypeScript 7.0. A fonte não identifica uma versão npm estável que a inclua; portanto, consulte as notas de versão da versão instalada antes de depender desse comportamento.

## Fonte

Leia a pull request integrada do TypeScript: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
