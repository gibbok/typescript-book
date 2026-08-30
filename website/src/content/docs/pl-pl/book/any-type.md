---
title: Typ any
sidebar:
  order: 45
  label: 45. Typ any
---


Typ `any` jest specjalnym typem (uniwersalnym nadtypem), którego można użyć do reprezentowania wartości dowolnego typu (typów pierwotnych, obiektów, tablic, funkcji, błędów, symboli). Jest często używany w sytuacjach, gdy typ wartości nie jest znany w czasie kompilacji lub podczas pracy z wartościami pochodzącymi z zewnętrznych interfejsów API albo bibliotek, które nie mają typów TypeScript.

Używając typu `any`, informuje się kompilator TypeScript, że wartości powinny być reprezentowane bez żadnych ograniczeń. Aby zmaksymalizować bezpieczeństwo typów w kodzie, należy rozważyć następujące kwestie:

* Ograniczyć użycie `any` do konkretnych przypadków, w których typ jest rzeczywiście nieznany.
* Nie zwracać typów `any` z funkcji, ponieważ osłabia to bezpieczeństwo typów w kodzie, który ich używa.
* Zamiast `any` użyć `@ts-ignore`, jeśli trzeba wyciszyć kompilator.

```typescript
let value: any;
value = true; // Valid
value = 7; // Valid
```

