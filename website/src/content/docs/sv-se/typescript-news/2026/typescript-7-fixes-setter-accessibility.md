---
title: TypeScript 7 rättar setter-åtkomst i unions- och intersection-typer
description: Den inbyggda typkontrollen respekterar nu setter-åtkomst separat från getter-åtkomst för egenskaper i unions- och intersection-typer.
lastUpdated: 2026-08-24
sidebar:
    order: 2
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**Publicerad:** 24 augusti 2026

Microsoft har slagit ihop en rättning i TypeScripts inbyggda typkontroll som håller läs- och skrivåtkomst separata för egenskaper som syntetiseras från unions- och intersection-typer.

## Vad har ändrats

Tidigare kunde setter-åtkomsten ignoreras för dessa syntetiska egenskaper eftersom kontrollen i praktiken använde getterns åtkomst. En offentlig getter tillsammans med en skyddad setter kunde därför tillåta en ogiltig skrivning genom en union eller intersection.

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

Typkontrollen registrerar nu skrivåtkomsten separat. Att läsa `foo` är fortfarande giltigt, medan en tilldelning korrekt ger ett åtkomstfel.

## Varför det är viktigt

Klasser kan avsiktligt tillåta offentlig läsning samtidigt som skrivning begränsas. Rättningen bevarar den gränsen när TypeScript kombinerar objekttyper i unions- eller intersection-typer i stället för att oavsiktligt utöka skrivåtkomsten.

## Tillgänglighet

Ändringen slogs ihop i TypeScripts inbyggda kodbas efter TypeScript 7.0. Källan anger ingen stabil npm-version som innehåller den, så kontrollera versionsinformationen för den installerade versionen innan du förlitar dig på beteendet.

## Källa

Läs den sammanslagna TypeScript-pull requesten: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
