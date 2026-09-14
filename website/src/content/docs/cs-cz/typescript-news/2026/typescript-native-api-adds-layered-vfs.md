---
title: Nativní API TypeScriptu přidává vrstvené virtuální souborové systémy
description: Nativní API TypeScriptu dokáže aktualizovat snapshoty pomocí virtuálních souborových systémů v paměti nebo ve vrstvách, včetně přidávání, změn, odstraňování a záložního přístupu k hostitelskému systému.
lastUpdated: 2026-09-09
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-09'
---

**Zveřejněno:** 9. září 2026

Nativní API TypeScriptu nyní dokáže vytvářet a aktualizovat snapshoty s explicitními daty virtuálního souborového systému. Nástrojům to umožňuje modelovat přidávání, úpravy a odstraňování souborů bez opětovného vytváření celého vstupu souborového systému.

## Co se změnilo

Nové pomocné funkce `createFileSystem`, `createFileSystemWithLib` a `createFileSystemLayer` vytvářejí objekty VFS přijímané rozhraními API pro snapshoty. `Snapshot.update` dokáže aplikovat novou vrstvu mezipaměti na existující snapshot.

VFS typu `full` zůstává zcela v paměti a nevyužívá jako zálohu callbacky souborového systému hostitele ani relace. VFS typu `layer` při nenalezení dat v mezipaměti využívá záložní přístup a pomocí `removedPaths` dokáže skrýt soubory nebo adresáře existující na hostiteli. Obě formy podporují symbolické odkazy uvnitř virtuálního souborového systému i na cesty hostitele.

## Aktuální omezení

Snapshoty využívající VFS se stále počítají jako skutečné snapshoty, takže nativní API zachovává své současné omezení na jeden skutečný snapshot v danou chvíli. Operace se snapshoty proto zatím zůstávají sériové.

## Zdroj

Přečtěte si sloučený pull request TypeScriptu: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
