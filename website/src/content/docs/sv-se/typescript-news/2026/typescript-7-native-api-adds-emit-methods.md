---
title: TypeScript 7:s inbyggda API får emit-metoder
description: TypeScripts inbyggda API får emit-metoder för filsystem och minne, både för hela program och valda JavaScript- eller deklarationsutdata.
lastUpdated: 2026-07-24
sidebar:
    order: 7
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**Publicerad:** 24 juli 2026

TypeScripts inbyggda kodbas har fått programmatiska emit-API:er för verktyg som behöver generera JavaScript- eller deklarationsutdata.

## Vad har ändrats

Det integrerade API:t erbjuder fyra emit-vägar med olika beteende för utdata och filval.

* `program.emit(emitOnly?: EmitOnly)` skriver ut hela programmet till filsystemet, inklusive ett konfigurerat virtuellt filsystem, och respekterar alternativ som blockerar emit, till exempel `noEmit` och `noEmitOnError`.
* `program.emitToString(emitOnly?: EmitOnly)` skriver ut hela programmet som strängresultat i minnet och respekterar också alternativ som blockerar emit.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` returnerar JavaScript-utdata i minnet för valda filer och kringgår alternativ som blockerar emit.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` ger motsvarande deklarationsutdata för valda filer.

Det ger API-konsumenter separata val för vanlig emit av hela programmet och riktade utdata i minnet.

## Tillgänglighet

Ändringen slogs samman i TypeScripts inbyggda kodbas den 24 juli 2026. Källan anger inte någon stabil npm-version som innehåller dessa API:er, så verktyg bör kontrollera stöd i den TypeScript-version de använder.

## Källa

Läs den officiella pull requesten: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
