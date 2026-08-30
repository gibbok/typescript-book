# Primitive Typen



TypeScript unterstützt 7 primitive Typen. Ein primitiver Datentyp bezeichnet einen Typ, der kein Objekt ist und dem keine Methoden zugeordnet sind. In TypeScript sind alle primitiven Typen unveränderlich, das heißt, ihre Werte können nach der Zuweisung nicht mehr geändert werden.

### string

Der primitive Typ `string` speichert Textdaten, und der Wert steht immer in doppelten oder einfachen Anführungszeichen.

```typescript
const x: string = 'x';
const y: string = 'y';
```

Strings können sich über mehrere Zeilen erstrecken, wenn sie vom Backtick-Zeichen (`) umschlossen sind:

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

Der Datentyp `boolean` speichert in TypeScript einen binären Wert, entweder `true` oder `false`.

```typescript
const isReady: boolean = true;
```

### number

Ein `number`-Datentyp wird in TypeScript durch einen 64-Bit-Gleitkommawert dargestellt. Ein `number`-Typ kann ganze Zahlen und Brüche darstellen.
TypeScript unterstützt beispielsweise auch hexadezimale, binäre und oktale Zahlen:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigint

Ein `bigint` stellt Ganzzahlwerte dar, die größer als die von `number` unterstützte größte sichere Ganzzahl sein können, nämlich 2^53 - 1.

Ein `bigint` kann durch Aufrufen der integrierten Funktion `BigInt()` oder durch Anhängen von `n` an ein beliebiges ganzzahliges numerisches Literal erstellt werden:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Hinweise:

* `bigint`-Werte können nicht mit `number` gemischt und nicht mit dem integrierten `Math` verwendet werden; sie müssen in denselben Typ konvertiert werden.
* `bigint`-Werte sind nur verfügbar, wenn die Zielkonfiguration ES2020 oder höher ist.

### Symbol

Symbole sind eindeutige Bezeichner, die als Eigenschaftsschlüssel in Objekten verwendet werden können, um Namenskonflikte zu vermeiden.

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

### null und undefined

Die Typen `null` und `undefined` stellen beide keinen Wert beziehungsweise das Fehlen eines Werts dar.

Der Typ `undefined` bedeutet, dass der Wert nicht zugewiesen oder initialisiert wurde oder dass ein Wert unbeabsichtigt fehlt.

Der Typ `null` bedeutet, dass bekannt ist, dass das Feld keinen Wert besitzt und der Wert daher nicht verfügbar ist; er weist auf das beabsichtigte Fehlen eines Werts hin.

### Array

Ein `array` ist ein Datentyp, der mehrere Werte desselben oder unterschiedlicher Typen speichern kann. Er kann mit der folgenden Syntax definiert werden:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript unterstützt schreibgeschützte Arrays mit der folgenden Syntax:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript unterstützt Tupel und schreibgeschützte Tupel:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

Der Datentyp `any` stellt wörtlich einen beliebigen Wert dar und ist der Standard, wenn TypeScript den Typ nicht ableiten kann oder er nicht angegeben ist.

Bei Verwendung von `any` überspringt der TypeScript-Compiler die Typprüfung, sodass bei der Verwendung von `any` keine Typsicherheit besteht. Verwenden Sie `any` im Allgemeinen nicht, um den Compiler beim Auftreten eines Fehlers stummzuschalten. Konzentrieren Sie sich stattdessen darauf, den Fehler zu beheben, da `any` dazu führen kann, dass Verträge verletzt werden und die Vorteile der TypeScript-Autovervollständigung verloren gehen.

Der Typ `any` kann bei einer schrittweisen Migration von JavaScript zu TypeScript nützlich sein, da er den Compiler stummschalten kann.

Verwenden Sie für neue Projekte die TypeScript-Konfiguration `noImplicitAny`, durch die TypeScript Fehler ausgibt, wenn `any` verwendet oder abgeleitet wird.

Der Typ `any` ist häufig eine Fehlerquelle, die echte Probleme mit Ihren Typen verschleiern kann. Vermeiden Sie seine Verwendung so weit wie möglich.

