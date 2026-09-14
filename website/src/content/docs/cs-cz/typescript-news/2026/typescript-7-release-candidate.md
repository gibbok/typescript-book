---
title: Oznámen kandidát na vydání TypeScriptu 7.0
description: Kandidát na vydání TypeScriptu 7.0 představil nativní kompilátor, paralelní sestavování, změny kompatibility a rozšířenou podporu editorů.
lastUpdated: 2026-06-18
sidebar:
    order: 10
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**Zveřejněno:** 18. června 2026

Microsoft vydal kandidáta na vydání TypeScriptu 7.0 jako poslední předběžnou verzi před stabilním vydáním TypeScriptu 7.

## Co se změnilo

Kandidát na vydání převedl TypeScript na nový kompilátor a jazykovou službu napsané v Go. Logika kontroly typů byla přenesena z TypeScriptu 6, aby zachovala stávající sémantiku a zároveň zlepšila výkon pomocí nativního kódu a paralelismu se sdílenou pamětí.

TypeScript 7 přidal paralelní kontrolu typů a sestavování projektů propojených referencemi. Volba `--checkers` určuje počet workerů pro kontrolu typů, zatímco `--builders` určuje počet workerů pro sestavování projektů propojených referencemi.

V době oznámení bylo možné kandidáta na vydání nainstalovat z npm:

```shell
npm install --save-dev typescript@rc
```

## Kompatibilita

Kandidát na vydání neobsahoval stabilní programové API. Tým TypeScriptu poskytl balíček pro kompatibilitu `@typescript/typescript6`, aby nástroje vyžadující API TypeScriptu 6 mohly běžet souběžně s novým kompilátorem.

Kandidát na vydání také převzal výchozí nastavení TypeScriptu 6 a volby označené v TypeScriptu 6 za zastaralé považoval za chyby. Týmům bylo doporučeno nejprve přejít na TypeScript 6 a teprve poté vyhodnotit TypeScript 7.

## Zdroj

Přečtěte si oficiální oznámení: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
