---
title: Ogłoszono wersję kandydującą TypeScript 7.0
description: Wersja kandydująca TypeScript 7.0 prezentowała natywny kompilator, kompilacje równoległe, zmiany zgodności i rozszerzoną obsługę edytorów.
lastUpdated: 2026-06-18
sidebar:
    order: 9
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**Opublikowano:** 18 czerwca 2026 r.

Firma Microsoft wydała wersję kandydującą TypeScript 7.0 jako ostatnią wersję przedpremierową przed stabilnym wydaniem TypeScript 7.

## Co się zmieniło

Wersja kandydująca przeniosła TypeScript na nowy kompilator i nową usługę językową, oparte na Go. Logika sprawdzania typów została przeniesiona z TypeScript 6, aby zachować dotychczasową semantykę, a jednocześnie poprawić wydajność dzięki natywnemu kodowi i równoległości z pamięcią współdzieloną.

TypeScript 7 dodał równoległe sprawdzanie typów i kompilowanie projektów z odwołaniami. Opcja `--checkers` steruje liczbą procesów roboczych sprawdzających typy, a `--builders` — liczbą procesów kompilujących projekty z odwołaniami.

W chwili ogłoszenia wersję kandydującą można było zainstalować z npm:

```shell
npm install --save-dev typescript@rc
```

## Zgodność

Wersja kandydująca nie zawierała stabilnego programistycznego interfejsu API. Zespół TypeScript udostępnił pakiet zgodności `@typescript/typescript6`, aby narzędzia wymagające API TypeScript 6 mogły być używane razem z nowym kompilatorem.

Wersja kandydująca przyjęła również wartości domyślne TypeScript 6 i traktowała jako błędy opcje oznaczone w TypeScript 6 jako przestarzałe. Zespołom zalecano najpierw migrację do TypeScript 6, a dopiero później ocenę TypeScript 7.

## Źródło

Przeczytaj oficjalne ogłoszenie: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
