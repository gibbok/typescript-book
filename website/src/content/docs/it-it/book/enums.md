---
title: Enumerazioni
sidebar:
  order: 19
  label: 19. Enumerazioni
---


In TypeScript, un `enum` è un insieme di valori costanti denominati.

```typescript
enum Colore {
    Rosso = '#ff0000',
    Verde = '#00ff00',
    Blu = '#0000ff',
}
```

Gli enum possono essere definiti in diversi modi:

### Enumerazioni numeriche

In TypeScript, un enum numerico è un enum in cui a ogni costante viene assegnato un valore numerico, a partire da 0 per impostazione predefinita.

```typescript
enum Size {
    Small, // il valore inizia da 0
    Medium,
    Large,
}
```

È possibile specificare valori personalizzati assegnandoli esplicitamente:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Enum String

In TypeScript, un enum String è un enum in cui a ogni costante viene assegnato un valore stringa.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Nota: TypeScript consente l'utilizzo di enum eterogenei in cui stringhe e membri numerici possono coesistere.

### Enum Constant

Un enum Constant in TypeScript è un tipo speciale di enum in cui tutti i valori sono noti in fase di compilazione e vengono inlineati ovunque venga utilizzato l'enum, con conseguente maggiore efficienza del codice.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Verrà compilato in:

```typescript
console.log('EN' /* Language.English */);
```

Note:

Gli enum costanti hanno valori hardcoded, che cancellano l'enum, il che può essere più efficiente nelle librerie autonome, ma generalmente non è auspicabile. Inoltre, gli enum costanti non possono avere membri calcolati.

### Mapping inverso

In TypeScript, i mapping inversi negli enum si riferiscono alla possibilità di recuperare il nome del membro dell'enum dal suo valore. Per impostazione predefinita, i membri dell'enum hanno mapping in avanti dal nome al valore, ma i mapping inversi possono essere creati impostando esplicitamente i valori per ciascun membro. I mapping inversi sono utili quando è necessario cercare un membro dell'enum in base al suo valore o quando è necessario iterare su tutti i membri dell'enum. Si noti che solo i membri dell'enum numerico genereranno mapping inversi, mentre i membri dell'enum stringa non generano alcun mapping inverso.

Il seguente enum:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

Compila in:

<!-- skip -->
```javascript
"use strict";
var Grade;
(function (Grade) {
  Grade[(Grade["A"] = 90)] = "A";
  Grade[(Grade["B"] = 80)] = "B";
  Grade[(Grade["C"] = 70)] = "C";
  Grade["F"] = "fail";
})(Grade || (Grade = {}));
```

Pertanto, la mappatura dei valori alle chiavi funziona per i membri enum numerici, ma non per i membri enum stringa:

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // Element ha implicitamente un tipo 'any' perché l'espressione indice non è di tipo 'number'.
```

### Enum ambientali

Un enum ambientale in TypeScript è un tipo di Enum definito in un file di dichiarazione (\*.d.ts) senza un'implementazione associata. Permette di definire un set di costanti denominate che possono essere utilizzate in modo sicuro tra file diversi senza dover importare i dettagli di implementazione in ogni file.

### Membri calcolati e costanti

In TypeScript, un membro calcolato è un membro di un Enum il cui valore è calcolato in fase di esecuzione, mentre un membro costante è un membro il cui valore è impostato in fase di compilazione e non può essere modificato in fase di esecuzione. I membri calcolati sono consentiti negli Enum normali, mentre i membri costanti sono consentiti sia negli enum normali che in quelli costanti.

```typescript
// Membri costanti
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 generazioni in fase di compilazione
```

```typescript
// Membri calcolati
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // numero casuale generato in fase di esecuzione
```

Gli enum sono indicati da unioni che comprendono i loro tipi di membri. I valori di ciascun membro possono essere determinati tramite espressioni costanti o non costanti, con i membri che possiedono valori costanti a cui vengono assegnati tipi letterali. Per illustrare, si consideri la dichiarazione del tipo E e dei suoi sottotipi E.A, E.B ed E.C. In questo caso, E rappresenta l'unione E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Letterale numerico
    B = 'bar', // Letterale stringa
    C = identity(42), // Calcolato opaco
}

console.log(E.C); //42
```

