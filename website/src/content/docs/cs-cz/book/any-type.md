---
title: Typ any
sidebar:
  order: 45
  label: 45. Typ any
---


Typ `any` je speciální typ (univerzální nadtyp), který lze použít k reprezentaci jakéhokoli typu hodnoty (primitivních hodnot, objektů, polí, funkcí, chyb, symbolů). Často se používá v situacích, kdy typ hodnoty není znám v době kompilace, nebo při práci s hodnotami z externích API či knihoven, které nemají typové definice pro TypeScript.

Použitím typu `any` dáváte kompilátoru TypeScriptu najevo, že hodnoty mají být reprezentovány bez jakýchkoli omezení. Chcete-li v kódu maximalizovat typovou bezpečnost, zvažte následující:

* Omezte používání `any` na konkrétní případy, kdy je typ skutečně neznámý.
* Nevracejte z funkce hodnoty typu `any`, protože to oslabuje typovou bezpečnost kódu, který ji používá.
* Pokud potřebujete potlačit hlášení kompilátoru, použijte místo `any` direktivu `@ts-ignore`.

```typescript
let value: any;
value = true; // Valid
value = 7; // Valid
```

