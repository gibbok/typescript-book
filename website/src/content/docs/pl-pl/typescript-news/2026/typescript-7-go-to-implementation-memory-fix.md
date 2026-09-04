---
title: TypeScript 7 usprawnia wykorzystanie pamięci przez funkcję Go to Implementation
description: Poprawka natywnej usługi językowej zapobiega kwadratowemu wzrostowi zużycia pamięci podczas wyszukiwania implementacji w dużych projektach ze złożonymi typami.
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

Microsoft scalił poprawkę skalowania zużycia pamięci przez funkcję Go to Implementation w natywnej usłudze językowej TypeScript.

## Co się zmieniło

Usługa językowa używa listy roboczej przeszukiwanej wszerz do znajdowania implementacji. W przypadku elementu interfejsu z wieloma implementacjami powtarzane wyszukiwania w całym programie mogły ponownie zwracać te same odwołania. Zachowane odwołania, zadania oczekujące w kolejce i grupy wyników mogły przez to rosnąć kwadratowo i wyczerpywać pamięć w dużych projektach ze złożonymi typami.

Poprawka usuwa zduplikowane węzły odwołań przed dodaniem ich do kolejki zadań i zapobiega przechowywaniu zduplikowanych definicji symboli. Test regresji sprawdza, czy podwojenie liczby implementacji powoduje w przybliżeniu liniowy, a nie kwadratowy wzrost.

## Dlaczego ma to znaczenie

Funkcja Go to Implementation może teraz przetwarzać ten wzorzec bez wielokrotnego przechowywania tych samych odwołań wewnętrznych. Końcowa odpowiedź edytora była już pozbawiona duplikatów, dlatego zmiana dotyczy ukrytego zużycia pamięci i pracy potrzebnej do jej utworzenia.

## Dostępność

Zmiana została scalona z natywną bazą kodu TypeScript po wydaniu TypeScript 7.0. W źródle nie wskazano stabilnej wersji pakietu npm zawierającej tę poprawkę, dlatego przed założeniem, że jest ona dostępna, użytkownicy powinni sprawdzić informacje o wydaniu zainstalowanej wersji.

## Źródło

Przeczytaj oficjalny opis zmiany: [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
