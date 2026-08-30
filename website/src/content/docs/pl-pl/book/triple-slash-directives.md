---
title: Dyrektywy z potrójnym ukośnikiem
sidebar:
  order: 60
  label: 60. Dyrektywy z potrójnym ukośnikiem
---


Dyrektywy z potrójnym ukośnikiem to specjalne komentarze, które przekazują kompilatorowi instrukcje dotyczące sposobu przetwarzania pliku. Dyrektywy te zaczynają się od trzech kolejnych ukośników (`///`), są zazwyczaj umieszczane na początku pliku TypeScript i nie mają wpływu na zachowanie programu w czasie wykonywania.

Dyrektywy z potrójnym ukośnikiem służą między innymi do odwoływania się do zewnętrznych zależności, określania sposobu ładowania modułów oraz włączania lub wyłączania określonych funkcji kompilatora. Oto kilka przykładów:

Odwołanie do pliku deklaracji:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Wskazanie formatu modułu:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Włączenie opcji kompilatora — w poniższym przykładzie trybu ścisłego:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

