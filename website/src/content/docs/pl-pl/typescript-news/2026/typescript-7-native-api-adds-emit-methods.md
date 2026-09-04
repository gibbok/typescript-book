---
title: Natywny interfejs API TypeScript 7 dodaje metody generowania danych wyjściowych
description: Natywny interfejs API TypeScript dodaje metody generowania danych wyjściowych w systemie plików i w pamięci dla całych programów oraz wybranych danych wyjściowych JavaScript lub deklaracji.
lastUpdated: 2026-07-24
sidebar:
    order: 7
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**Opublikowano:** 24 lipca 2026 r.

Do natywnej bazy kodu TypeScript dodano programistyczne interfejsy API generowania danych wyjściowych przeznaczone dla narzędzi, które muszą generować kod JavaScript lub deklaracje.

## Co się zmieniło

Scalony interfejs API udostępnia cztery ścieżki generowania danych wyjściowych, różniące się miejscem docelowym danych i sposobem wyboru plików.

* `program.emit(emitOnly?: EmitOnly)` generuje dane wyjściowe całego programu w systemie plików, w tym w skonfigurowanym wirtualnym systemie plików, i respektuje opcje blokujące generowanie, takie jak `noEmit` oraz `noEmitOnError`.
* `program.emitToString(emitOnly?: EmitOnly)` generuje dane wyjściowe całego programu jako przechowywane w pamięci wyniki tekstowe i również respektuje opcje blokujące generowanie.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` zwraca przechowywane w pamięci dane wyjściowe JavaScript dla wybranych plików i pomija opcje blokujące generowanie.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` zwraca analogiczne dane wyjściowe deklaracji dla wybranych plików.

Daje to użytkownikom interfejsu API odrębne możliwości zwykłego generowania danych wyjściowych dla całego programu oraz ukierunkowanego generowania w pamięci.

## Dostępność

Zmiana została scalona z natywną bazą kodu TypeScript 24 lipca 2026 r. W źródle nie wskazano stabilnej wersji pakietu npm zawierającej te interfejsy API, dlatego narzędzia powinny sprawdzić ich obsługę w używanej wersji TypeScript.

## Źródło

Przeczytaj oficjalny pull request: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
