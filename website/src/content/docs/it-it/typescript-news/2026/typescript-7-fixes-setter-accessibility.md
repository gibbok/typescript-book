---
title: TypeScript 7 corregge l'accessibilità dei setter in union e intersection
description: Il checker nativo ora rispetta separatamente l'accessibilità dei setter e dei getter nelle proprietà di union e intersection.
lastUpdated: 2026-08-24
sidebar:
    order: 2
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**Pubblicato:** 24 agosto 2026

Microsoft ha integrato una correzione nel checker nativo di TypeScript che mantiene separate l'accessibilità in lettura e in scrittura per le proprietà sintetizzate da union e intersection.

## Cosa è cambiato

In precedenza, l'accessibilità del setter poteva essere ignorata per queste proprietà sintetiche perché il controllo usava di fatto l'accessibilità del getter. Un getter pubblico associato a un setter protetto poteva quindi consentire una scrittura non valida attraverso una union o una intersection.

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

Il checker ora registra separatamente l'accessibilità in scrittura. La lettura di `foo` resta valida, mentre l'assegnazione segnala correttamente un errore di accessibilità.

## Perché è importante

Le classi possono esporre intenzionalmente la lettura pubblica limitando le scritture. La correzione preserva questo confine quando TypeScript combina tipi di oggetto in union o intersection, senza ampliare accidentalmente l'accesso in scrittura.

## Disponibilità

La modifica è stata integrata nel codice nativo di TypeScript dopo TypeScript 7.0. La fonte non indica una versione npm stabile che la includa, quindi è opportuno controllare le note di rilascio della versione installata prima di fare affidamento su questo comportamento.

## Fonte

Leggi la pull request TypeScript integrata: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
