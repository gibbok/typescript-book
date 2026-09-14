---
title: Direktivy s trojitým lomítkem
sidebar:
  order: 60
  label: 60. Direktivy s trojitým lomítkem
---


Direktivy s trojitým lomítkem jsou speciální komentáře, které kompilátoru poskytují pokyny ke zpracování souboru. Tyto direktivy začínají třemi po sobě jdoucími lomítky (`///`), obvykle se umísťují na začátek souboru TypeScriptu a nemají žádný vliv na chování za běhu.

Direktivy s trojitým lomítkem se používají k odkazování na externí závislosti, určení chování při načítání modulů, povolování nebo zakazování určitých funkcí kompilátoru a dalším účelům. Několik příkladů:

Odkaz na deklarační soubor:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Určení formátu modulu:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Povolení voleb kompilátoru, v následujícím příkladu striktního režimu:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

