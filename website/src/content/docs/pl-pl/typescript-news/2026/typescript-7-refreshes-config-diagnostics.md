---
title: TypeScript 7 odświeża diagnostykę konfiguracji po zmianach plików
description: Natywna usługa językowa ponownie publikuje błędy dotyczące plików tsconfig.json i jsconfig.json po zmianie obserwowanych plików konfiguracyjnych.
lastUpdated: 2026-07-30
sidebar:
    order: 4
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Opublikowano:** 30 lipca 2026 r.

Firma Microsoft scaliła poprawkę, która odświeża diagnostykę plików konfiguracyjnych w natywnej usłudze językowej TypeScript po zmianie śledzonego pliku `tsconfig.json` lub `jsconfig.json`.

## Co się zmieniło

Diagnostyka plików konfiguracyjnych jest publikowana podczas aktualizacji migawki usługi językowej. Wcześniej zmiana obserwowanego pliku konfiguracyjnego planowała odświeżenie diagnostyki, ale nie planowała aktualizacji migawki. W rezultacie diagnostyka nowych błędów konfiguracji mogła pozostawać nieaktualna do czasu wysłania przez edytor kolejnego żądania, które aktualizowało migawkę.

Usługa językowa wykrywa teraz zmiany w śledzonych plikach konfiguracyjnych i planuje aktualizację migawki z mechanizmem debounce. Powoduje to ponowne opublikowanie przesyłanej diagnostyki bez konieczności oczekiwania na kolejne żądanie z edytora.

## Dlaczego ma to znaczenie

Gdy edytor lub narzędzie zewnętrzne zmieni śledzony plik `tsconfig.json` lub `jsconfig.json`, natywna usługa językowa może zgłosić zaktualizowane błędy konfiguracji wyłącznie na podstawie zdarzenia obserwatora plików. Test regresji weryfikuje to zachowanie przy użyciu nieprawidłowej wartości `target`.

## Dostępność

Zmiana została scalona z natywną bazą kodu TypeScript po wydaniu TypeScript 7.0. Źródło nie wskazuje stabilnej wersji pakietu npm, która ją zawiera, dlatego przed skorzystaniem z tej poprawki należy sprawdzić informacje o wydaniu zainstalowanej wersji.

## Źródło

Przeczytaj opis oficjalnej zmiany: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
