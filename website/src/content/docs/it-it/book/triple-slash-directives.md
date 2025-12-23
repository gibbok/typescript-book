---
title: Direttive con tripla barra
sidebar:
  order: 59
  label: 59. Direttive con tripla barra
---


Le direttive con tripla barra sono commenti speciali che forniscono istruzioni al compilatore su come elaborare un file. Queste direttive iniziano con tre barre consecutive (`///`) e sono in genere posizionate all'inizio di un file TypeScript e non hanno alcun effetto sul comportamento in fase di esecuzione.

Le direttive con tripla barra vengono utilizzate per fare riferimento a dipendenze esterne, specificare il comportamento di caricamento dei moduli, abilitare/disabilitare determinate funzionalità del compilatore e altro ancora. Alcuni esempi:

Riferimento a un file di dichiarazione:

<!-- skip -->
```typescript
/// <reference path="path/to/declaration/file.d.ts" />
```

Indicare il formato del modulo:

<!-- skip -->
```typescript
/// <amd|commonjs|system|umd|es6|es2015|none>
```

Abilitare le opzioni del compilatore, nell'esempio seguente, in modalità strict:

<!-- skip -->
```typescript
/// <strict|noImplicitAny|noUnusedLocals|noUnusedParameters>
```

