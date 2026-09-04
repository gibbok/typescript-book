---
title: TypeScript 7:s inbyggda verktyg konsolideras
description: TypeScript-underhållarna har klargjort att namnet tsgo försvinner, den inbyggda kodbasen återgår till TypeScripts huvudrepository och det inbyggda VS Code-tillägget kommer att paketeras med editorn.
lastUpdated: 2026-07-27
sidebar:
    order: 6
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-27'
---

**Publicerad:** 27 juli 2026

TypeScript-underhållarna har klargjort hur de inbyggda verktygen för TypeScript 7 kommer att konsolideras efter den stabila versionen.

## Vad har ändrats

Ryan Cavanaugh bekräftade att namnet `tsgo` i praktiken försvinner. Den inbyggda kodbasen förväntas flyttas tillbaka till huvudrepositoryt `microsoft/TypeScript`, så att projektet åter kan använda en gemensam ärendekö.

Jake Bailey klargjorde också att det inbyggda VS Code-tillägget inte planeras att fasas ut. I stället förväntas det paketeras med editorn inom en nära framtid, på liknande sätt som JavaScript-debuggertillägget.

För utvecklare innebär detta att de separata förhandsnamnen och repositoryt är övergångsdelar i migreringen till TypeScript 7, inte den avsedda långsiktiga projektstrukturen.

## Källa

Läs underhållarnas diskussion: [Now that TypeScript 7.0 has been released, what will happen to typescript-go?](https://github.com/microsoft/typescript-go/discussions/4576).
