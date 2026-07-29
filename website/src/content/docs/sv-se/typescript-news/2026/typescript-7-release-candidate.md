---
title: TypeScript 7.0 Release Candidate har tillkännagivits
description: TypeScript 7.0 Release Candidate förhandsvisade den inbyggda kompilatorn, parallella byggen, kompatibilitetsändringar och utökat redigeringsstöd.
lastUpdated: 2026-06-18
sidebar:
    order: -20260618
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**Publicerad:** 18 juni 2026

Microsoft släppte TypeScript 7.0 Release Candidate som den slutliga förhandsversionen före den stabila utgåvan av TypeScript 7.

## Vad har ändrats

Förhandsversionen flyttade TypeScript till den nya Go-baserade kompilatorn och språktjänsten. Typkontrollens logik porterades från TypeScript 6 för att bevara befintlig semantik och samtidigt förbättra prestandan genom inbyggd kod och parallellism med delat minne.

TypeScript 7 lade till parallell typkontroll och byggen med projektreferenser. Alternativet `--checkers` styr antalet processer för typkontroll, medan `--builders` styr antalet byggprocesser för projektreferenser.

Vid tiden för tillkännagivandet kunde förhandsversionen installeras från npm:

```shell
npm install --save-dev typescript@rc
```

## Kompatibilitet

Förhandsversionen innehöll inte ett stabilt programmatiskt API. TypeScript-teamet tillhandahöll kompatibilitetspaketet `@typescript/typescript6`, så att verktyg som kräver TypeScript 6-API:t kunde köras tillsammans med den nya kompilatorn.

Förhandsversionen använde också standardinställningarna från TypeScript 6 och behandlade alternativ som hade föråldrats i TypeScript 6 som fel. Team rekommenderades att först migrera till TypeScript 6 innan de utvärderade TypeScript 7.

## Källa

Läs det officiella tillkännagivandet: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
