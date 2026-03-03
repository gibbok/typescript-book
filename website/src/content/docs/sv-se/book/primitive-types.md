---
title: Primitiva typer
sidebar:
  order: 10
  label: 10. Primitiva typer
---


TypeScript stöder 7 primitiva typer. En primitiv datatyp avser en typ som inte är ett objekt och som inte har några metoder kopplade till sig. I TypeScript är alla primitiva typer oföränderliga, vilket innebär att deras värden inte kan ändras efter att de har tilldelats.

### string

Den primitiva typen `string` lagrar textdata, och värdet omges alltid av dubbla eller enkla citattecken.

```typescript
const x: string = 'x';
const y: string = 'y';
```

Strängar kan sträcka sig över flera rader om de omges av backtick-tecknet (`):

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

Datatypen `boolean` i TypeScript lagrar ett binärt värde, antingen `true` eller `false`.

```typescript
const isReady: boolean = true;
```

### number

En `number`-datatyp i TypeScript representeras med ett 64-bitars flyttalsvärde. En `number`-typ kan representera heltal och bråktal.
TypeScript stöder även hexadecimala, binära och oktala tal, till exempel:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigInt

En `bigInt` representerar numeriska värden som är mycket stora (253 – 1) och inte kan representeras med en `number`.

En `bigInt` kan skapas genom att anropa den inbyggda funktionen `BigInt()` eller genom att lägga till `n` i slutet av ett heltalsliteral:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Noteringar:

* `bigInt`-värden kan inte blandas med `number` och kan inte användas med inbyggd `Math`, de måste konverteras till samma typ.
* `bigInt`-värden är bara tillgängliga om målkonfigurationen är ES2020 eller högre.

### Symbol

Symboler är unika identifierare som kan användas som egenskapsnycklar i objekt för att förhindra namnkonflikter.

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

### null och undefined

`null` och `undefined`-typerna representerar båda inget värde eller frånvaron av något värde.

Typen `undefined` betyder att värdet inte är tilldelat eller initierat och indikerar en oavsiktlig frånvaro av värde.

Typen `null` betyder att vi vet att fältet inte har något värde, alltså är värdet otillgängligt, och det indikerar en avsiktlig frånvaro av värde.

### Array

En `array` är en datatyp som kan lagra flera värden av samma typ eller inte. Den kan definieras med följande syntax:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript stöder skrivskyddade arrayer med följande syntax:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript stöder tupler och skrivskyddade tupler:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

Datatypen `any` representerar bokstavligen "vilket som helst" värde, det är standardvärdet när TypeScript inte kan härleda typen eller den inte är specificerad.

När `any` används hoppar TypeScript-kompilatorn över typkontrollen, så det finns ingen typsäkerhet när `any` används. Använd i allmänhet inte `any` för att tysta kompilatorn när ett fel uppstår, fokusera istället på att åtgärda felet eftersom det med `any` är möjligt att bryta kontrakt och vi förlorar fördelarna med TypeScripts autokomplettering.

Typen `any` kan vara användbar vid en gradvis migrering från JavaScript till TypeScript, eftersom den kan tysta kompilatorn.

För nya projekt, använd TypeScript-konfigurationen `noImplicitAny` som gör att TypeScript ger fel där `any` används eller härleds.

Typen `any` är vanligtvis en källa till fel som kan dölja verkliga problem med dina typer. Undvik att använda den så mycket som möjligt.

