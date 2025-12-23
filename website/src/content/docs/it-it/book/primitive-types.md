---
title: Tipi primitivi
sidebar:
  order: 10
  label: 10. Tipi primitivi
---


TypeScript supporta 7 tipi primitivi. Un tipo di dati primitivo si riferisce a un tipo che non è un oggetto e non ha metodi associati. In TypeScript, tutti i tipi primitivi sono immutabili, il che significa che i loro valori non possono essere modificati una volta assegnati.

### string

Il tipo primitivo `string` memorizza dati testuali e il valore è sempre racchiuso tra virgolette doppie o singole.

```typescript
const x: string = 'x';
const y: string = 'y';
```

Le stringhe possono estendersi su più righe se racchiuse dal carattere di apice inverso (`):

```typescript
let sentence: string = `xxx,
yyy`;
```

### boolean

Il tipo di dati `boolean` in TypeScript memorizza un valore binario, `true` o `false`.

```typescript
const isReady: boolean = true;
```

### number

Un tipo di dati `number` in TypeScript è rappresentato da un valore in virgola mobile a 64 bit. Un tipo di dati `number` può rappresentare numeri interi e frazioni.
TypeScript supporta anche i sistemi di numerazione esadecimale, binario e ottale, ad esempio:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // L'esadecimale inizia con 0x
const binary: number = 0b1010; // Il binario inizia con 0b
const octal: number = 0o633; // L'ottale inizia con 0o
```

### bigInt

Un `bigInt` rappresenta valori numerici molto grandi (253 – 1) e non possono essere rappresentati con un `number`.

Un `bigInt` può essere creato chiamando la funzione integrata `BigInt()` o aggiungendo `n` alla fine di qualsiasi letterale numerico intero:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Note:

* I valori `bigInt` non possono essere combinati con `number` e non possono essere utilizzati con `Math` integrato, devono essere forzati allo stesso tipo.
* I valori `bigInt` sono disponibili solo se la configurazione di destinazione è ES2020 o superiore.

### Simbolo

I simboli sono identificatori univoci che possono essere utilizzati come chiavi di proprietà negli oggetti per evitare conflitti di denominazione.

```typescript
type Obj = {
    [sym: symbol]: number;
};

const a = Symbol('a');
const b = Symbol('b');
let obj: Obj = {};
obj[a] = 123;
obj[b] = 456;

console.log(obj[a]); // 123
console.log(obj[b]); // 456
```

### null e undefined

I tipi `null` e `undefined` rappresentano entrambi nessun valore o l'assenza di qualsiasi valore.

Il tipo `undefined` indica che il valore non è assegnato o inizializzato o indica un'assenza involontaria di valore.

Il tipo `null` indica che sappiamo che il campo non ha un valore, quindi il valore non è disponibile, e indica un'assenza intenzionale di valore.

### Array

Un `array` è un tipo di dati che può memorizzare più valori dello stesso tipo o meno. Può essere definito utilizzando la seguente sintassi:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Unione
```

TypeScript supporta array di sola lettura utilizzando la seguente sintassi:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Modificatore di sola lettura
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Non valido
```

TypeScript supporta tuple e tuple di sola lettura:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

Il tipo di dati ``any` rappresenta letteralmente un valore "qualsiasi", ed è il valore predefinito quando TypeScript non può dedurre il tipo o non è specificato.

Quando si utilizza `any`, il compilatore TypeScript salta il controllo del tipo, quindi non c'è sicurezza di tipo quando si utilizza `any`. In genere, non utilizzare `any` per silenziare il compilatore quando si verifica un errore, ma concentrarsi sulla correzione dell'errore, poiché utilizzando `any` è possibile interrompere i contratti e perdere i vantaggi del completamento automatico di TypeScript.

Il tipo `any` potrebbe essere utile durante una migrazione graduale da JavaScript a TypeScript, in quanto può silenziare il compilatore.

Per i nuovi progetti, utilizzare la configurazione TypeScript `noImplicitAny`, che consente a TypeScript di generare errori quando viene utilizzato o dedotto `any`.

Il tipo `any` è solitamente fonte di errori che possono mascherare problemi reali con i tipi. Evitatelo il più possibile.

