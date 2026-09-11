---
title: Natywne API TypeScript dodaje warstwowe wirtualne systemy plików
description: Natywne API TypeScript może aktualizować snapshoty za pomocą wirtualnych systemów plików w pamięci lub warstwowych, obsługując dodawanie, zmiany, usuwanie i fallback do hosta.
lastUpdated: 2026-09-09
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-09'
---

**Opublikowano:** 9 września 2026 r.

Natywne API TypeScript może teraz tworzyć i aktualizować snapshoty z jawnymi danymi wirtualnego systemu plików. Narzędzia mogą odwzorowywać dodawanie, modyfikowanie i usuwanie plików bez ponownego budowania całego wejścia systemu plików.

## Co się zmieniło

Nowe funkcje pomocnicze `createFileSystem`, `createFileSystemWithLib` i `createFileSystemLayer` tworzą obiekty VFS akceptowane przez API snapshotów. `Snapshot.update` może nałożyć nową warstwę pamięci podręcznej na istniejący snapshot.

VFS typu `full` pozostaje całkowicie w pamięci i nie korzysta z callbacków systemu plików hosta ani sesji. VFS typu `layer` korzysta z hosta przy braku danych w pamięci podręcznej i może używać `removedPaths`, aby ukrywać pliki lub katalogi istniejące na hoście. Obie formy obsługują dowiązania symboliczne wewnątrz wirtualnego systemu plików oraz do ścieżek hosta.

## Obecne ograniczenie

Snapshoty oparte na VFS nadal są liczone jako rzeczywiste snapshoty, więc natywne API zachowuje ograniczenie do jednego rzeczywistego snapshotu naraz. Operacje na snapshotach pozostają na razie sekwencyjne.

## Źródło

Przeczytaj scalony pull request TypeScript: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
