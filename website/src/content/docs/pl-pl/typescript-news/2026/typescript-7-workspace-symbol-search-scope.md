---
title: TypeScript 7 dodaje zakres wyszukiwania symboli w obszarze roboczym
description: Natywna usługa językowa dodaje ustawienie, które może ograniczyć wyszukiwanie symboli w obszarze roboczym do bieżącego projektu.
lastUpdated: 2026-08-07
sidebar:
    order: 2
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-07'
---

**Opublikowano:** 7 sierpnia 2026 r.

Firma Microsoft scaliła zmianę wprowadzającą zakres wyszukiwania symboli w obszarze roboczym w natywnej usłudze językowej TypeScript.

## Co się zmieniło

Nowa preferencja `workspaceSymbols.scope` ma dwie wartości. `allOpenProjects` jest wartością domyślną i wyszukuje symbole we wszystkich otwartych projektach. `currentProject` ogranicza wyszukiwanie do projektów zawierających wskazany dokument.

Natywne rozszerzenie VS Code dodaje teraz obsługiwany dokument TypeScript lub JavaScript do żądań `workspace/symbol`. Priorytetowo traktuje aktywny dokument, a w przeciwnym razie używa otwartego obsługiwanego dokumentu. Usługa językowa korzysta z tego dokumentu tylko wtedy, gdy `workspaceSymbols.scope` ma wartość `currentProject`; w przeciwnym razie zachowuje wyszukiwanie we wszystkich otwartych projektach.

## Dlaczego ma to znaczenie

W obszarze roboczym zawierającym wiele projektów z symbolami o podobnych nazwach wartość `currentProject` może ograniczyć zestaw wyników do właściwego projektu. Wartość domyślna zachowuje dotychczasowe działanie, więc zmiana jest opcjonalna.

## Dostępność

Zmiana została scalona z natywną bazą kodu TypeScript po wydaniu TypeScript 7.0. Źródło nie wskazuje stabilnej wersji pakietu npm, która ją zawiera, dlatego przed skorzystaniem z tego ustawienia należy sprawdzić informacje o wydaniu zainstalowanej wersji.
