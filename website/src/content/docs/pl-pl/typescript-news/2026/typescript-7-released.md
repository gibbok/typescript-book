---
title: TypeScript 7.0 jest już dostępny
description: TypeScript 7.0 wprowadza natywny kompilator i natywną usługę językową, oparte na Go, zapewniając znaczny wzrost wydajności kompilacji i edytorów.
lastUpdated: 2026-07-08
sidebar:
    order: 8
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**Opublikowano:** 8 lipca 2026 r.

Firma Microsoft wydała TypeScript 7.0 — pierwszą stabilną wersję opartą na nowej natywnej bazie kodu projektu napisanej w Go.

## Co się zmieniło

TypeScript 7 korzysta z natywnego kodu, wielowątkowości z pamięcią współdzieloną i dodatkowych optymalizacji. Według zespołu TypeScript w opublikowanych przez niego testach wydajności pełne kompilacje były od 7.7 do 11.9 razy szybsze niż w TypeScript 6.

Wydanie przenosi także usługę językową na protokół Language Server Protocol. Obsługiwane edytory mogą korzystać z tej samej natywnej podstawy, aby szybciej ładować projekty, przeprowadzać diagnostykę, oferować uzupełnianie kodu i nawigację.

Zainstaluj stabilne wydanie z npm:

```shell
npm install --save-dev typescript
```

## Zgodność

TypeScript 7.0 nie udostępnia stabilnego programistycznego interfejsu API. Narzędzia osadzające TypeScript, w tym obecne wersje Astro, Vue, MDX, Svelte i niektóre przepływy pracy w Angularze, mogą nadal wymagać TypeScript 6 do czasu udostępnienia nowego API.

Zespół TypeScript spodziewa się wprowadzić nowe API w TypeScript 7.1. Przed aktualizacją projekty powinny sprawdzić, czy używane frameworki i narzędzia obsługują tę wersję.

## Źródło

Przeczytaj oficjalne ogłoszenie: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
