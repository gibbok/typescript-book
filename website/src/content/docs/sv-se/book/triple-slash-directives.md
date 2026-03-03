---
title: Trippelsnedstreck-direktiv
sidebar:
  order: 59
  label: 59. Trippelsnedstreck-direktiv
---


Trippelsnedstreck-direktiv är speciella kommentarer som ger instruktioner till kompilatorn om hur en fil ska bearbetas. Dessa direktiv börjar med tre på varandra följande snedstreck (`///`) och placeras vanligtvis överst i en TypeScript-fil och har ingen effekt på körbeteendet.

Trippelsnedstreck-direktiv används för att referera till externa beroenden, specificera modulinläsningsbeteende, aktivera/inaktivera vissa kompilatorfunktioner, med mera. Några exempel:

Referera till en deklarationsfil:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Ange modulformat:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Aktivera kompilatoralternativ, i följande exempel strikt läge:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

