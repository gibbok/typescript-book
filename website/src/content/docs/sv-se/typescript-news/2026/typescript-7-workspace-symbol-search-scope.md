---
title: TypeScript 7 lägger till ett sökomfång för arbetsytans symboler
description: Den inbyggda språktjänsten lägger till en inställning som kan begränsa sökningen efter arbetsytans symboler till det aktuella projektet.
lastUpdated: 2026-08-07
sidebar:
    order: 2
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-07'
---

**Publicerad:** 7 augusti 2026

Microsoft har infört ett sökomfång för arbetsytans symboler i TypeScripts inbyggda språktjänst.

## Vad har ändrats

Den nya inställningen `workspaceSymbols.scope` har två värden. `allOpenProjects` är standardvärdet och söker symboler i alla öppna projekt. `currentProject` begränsar sökningen till projekt som innehåller det angivna dokumentet.

Det inbyggda tillägget för VS Code lägger nu till ett TypeScript- eller JavaScript-dokument som stöds i `workspace/symbol`-begäranden. Det prioriterar det aktiva dokumentet och använder annars ett öppet dokument som stöds. Språktjänsten använder dokumentet endast när `workspaceSymbols.scope` är `currentProject`; annars behålls sökningen i alla öppna projekt.

## Varför det är viktigt

I en arbetsyta med flera projekt som har symboler med liknande namn kan `currentProject` begränsa resultatet till det relevanta projektet. Standardvärdet behåller det befintliga beteendet, så ändringen är valfri.

## Tillgänglighet

Ändringen infördes i TypeScripts inbyggda kodbas efter TypeScript 7.0. Källan anger inte vilken stabil npm-version som innehåller den, så kontrollera versionsinformationen för den installerade versionen innan du förlitar dig på inställningen.
