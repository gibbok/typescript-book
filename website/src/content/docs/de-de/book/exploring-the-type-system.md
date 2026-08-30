---
title: Das Typsystem erkunden
sidebar:
  order: 10
  label: 10. Das Typsystem erkunden
---


### Der TypeScript-Sprachdienst

Der TypeScript Language Service, auch als tsserver bekannt, bietet verschiedene Funktionen wie Fehlerberichte, Diagnosen, Kompilierung beim Speichern, Umbenennen, Springen zur Definition, Vervollständigungslisten, Signaturhilfe und mehr. Er wird hauptsächlich von integrierten Entwicklungsumgebungen (IDEs) verwendet, um IntelliSense-Unterstützung bereitzustellen. Er lässt sich nahtlos in Visual Studio Code integrieren und wird von Werkzeugen wie Conquer of Completion (Coc) genutzt.

Entwickler können eine spezielle API nutzen und eigene Plugins für den Sprachdienst erstellen, um die Bearbeitung von TypeScript zu verbessern. Dies kann besonders nützlich sein, um spezielle Linting-Funktionen zu implementieren oder die automatische Vervollständigung für eine benutzerdefinierte Template-Sprache zu ermöglichen.

<!-- markdownlint-disable MD044 -->
Ein Beispiel für ein benutzerdefiniertes Plugin aus der Praxis ist „typescript-styled-plugin“, das Syntaxfehlerberichte und IntelliSense-Unterstützung für CSS-Eigenschaften in Styled Components bereitstellt.
<!-- markdownlint-enable MD044 -->

Weitere Informationen und Schnellstartanleitungen finden Sie im offiziellen TypeScript-Wiki auf GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Strukturelle Typisierung

TypeScript basiert auf einem strukturellen Typsystem. Das bedeutet, dass die Kompatibilität und Gleichwertigkeit von Typen durch ihre tatsächliche Struktur oder Definition bestimmt werden und nicht durch ihren Namen oder den Ort ihrer Deklaration, wie dies bei nominalen Typsystemen etwa in C# oder C der Fall ist.

Das strukturelle Typsystem von TypeScript wurde nach dem Vorbild des dynamischen Duck-Typing-Systems von JavaScript zur Laufzeit entwickelt.

Das folgende Beispiel ist gültiger TypeScript-Code. Wie Sie sehen können, besitzen „X“ und „Y“ denselben Member „a“, obwohl sie unterschiedliche Deklarationsnamen haben. Die Typen werden durch ihre Strukturen bestimmt. Da die Strukturen in diesem Fall identisch sind, sind sie kompatibel und gültig.

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Valid
```

### Grundlegende Vergleichsregeln von TypeScript

Der Vergleichsprozess von TypeScript erfolgt rekursiv und wird auf Typen angewendet, die auf beliebiger Ebene verschachtelt sind.

Ein Typ „X“ ist mit „Y“ kompatibel, wenn „Y“ mindestens dieselben Elemente wie „X“ besitzt.

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

Funktionsparameter werden anhand ihrer Typen und nicht anhand ihrer Namen verglichen:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

Die Rückgabetypen von Funktionen müssen identisch sein:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

Der Rückgabetyp einer Quellfunktion muss ein Untertyp des Rückgabetyps einer Zielfunktion sein:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

Das Verwerfen von Funktionsparametern ist zulässig, da dies in JavaScript gängige Praxis ist, beispielsweise bei der Verwendung von „Array.prototype.map()“:

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Daher sind die folgenden Typdeklarationen vollständig gültig:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

Alle zusätzlichen optionalen Parameter des Quelltyps sind gültig:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

Alle optionalen Parameter des Zieltyps ohne entsprechende Parameter im Quelltyp sind gültig und stellen keinen Fehler dar:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

Der Restparameter wird als unendliche Reihe optionaler Parameter behandelt:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

Funktionen mit Überladungen sind gültig, wenn die Überladungssignatur mit ihrer Implementierungssignatur kompatibel ist:

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Valid
x('a', 1); // Valid

function y(a: string): void; // Invalid, not compatible with implementation signature
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

Der Vergleich von Funktionsparametern ist erfolgreich, wenn die Quell- und Zielparameter Ober- oder Untertypen zugewiesen werden können (Bivarianz).

```typescript
// Supertype
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Subtype
class Y extends X {}
// Subtype
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Bivariance does accept supertypes
console.log(getA(new X('x'))); // Valid
console.log(getA(new Y('Y'))); // Valid
console.log(getA(new Z('z'))); // Valid
```

Enums können mit Zahlen verglichen und diesen zugewiesen werden und umgekehrt. Der Vergleich von Enum-Werten verschiedener Enum-Typen ist jedoch ungültig.

<!-- skip -->
```typescript
enum X {
    A,
    B,
}
enum Y {
    A,
    B,
    C,
}
const xa: number = X.A; // Valid
const ya: Y = 0; // Valid
X.A === Y.A; // Invalid
```

Bei Instanzen einer Klasse wird eine Kompatibilitätsprüfung ihrer privaten und geschützten Elemente durchgeführt:

<!-- skip -->
```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}

class Y {
    private a: string;
    constructor(value: string) {
        this.a = value;
    }
}

let x: X = new Y('y'); // Invalid
```

Die Vergleichsprüfung berücksichtigt unterschiedliche Vererbungshierarchien nicht, zum Beispiel:

```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
class Y extends X {
    public a: string;
    constructor(value: string) {
        super(value);
        this.a = value;
    }
}
class Z {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
let x: X = new X('x');
let y: Y = new Y('y');
let z: Z = new Z('z');
x === y; // Valid
x === z; // Valid even if z is from a different inheritance hierarchy
```

Generische Typen werden anhand ihrer Strukturen verglichen, die sich nach Anwendung des generischen Parameters ergeben. Nur das Endergebnis wird als nicht generischer Typ verglichen.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Invalid as the type argument is used in the final structure
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Valid as the type argument is not used in the final structure
```

Wenn bei generischen Typen kein Typargument angegeben ist, werden alle nicht angegebenen Argumente als Typen mit „any“ behandelt:

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

Beachten Sie:

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Valid, everything is assignable to itself

let c: any;
c = 1; // Valid, all types are assignable to any

let d: unknown;
d = 1; // Valid, all types are assignable to unknown

let e: unknown;
let e1: unknown = e; // Valid, unknown is only assignable to itself and any
let e2: any = e; // Valid
let e3: number = e; // Invalid

let f: never;
f = 1; // Invalid, nothing is assignable to never

let g: void;
let g1: any;
g = 1; // Invalid, void is not assignable to or from anything except any
g = g1; // Valid
```

Beachten Sie, dass „null“ und „undefined“ bei aktiviertem „strictNullChecks“ ähnlich wie „void“ behandelt werden; andernfalls verhalten sie sich ähnlich wie „never“.

### Typen als Mengen

In TypeScript ist ein Typ eine Menge möglicher Werte. Diese Menge wird auch als Wertebereich des Typs bezeichnet. Jeder Wert eines Typs kann als Element einer Menge betrachtet werden. Ein Typ legt die Bedingungen fest, die jedes Element der Menge erfüllen muss, um als Mitglied dieser Menge zu gelten.
Die Hauptaufgabe von TypeScript besteht darin, zu prüfen und zu verifizieren, ob eine Menge eine Teilmenge einer anderen ist.

TypeScript unterstützt verschiedene Arten von Mengen:

| Mengenbegriff      | TypeScript                      | Hinweise                                                                                                           |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Leere Menge        | never                           | „never“ enthält nichts außer sich selbst                                                                           |
| Einelementige Menge | undefined / null / literal type |                                                                                                                    |
| Endliche Menge     | boolean / union                 |                                                                                                                    |
| Unendliche Menge   | string / number / object        |                                                                                                                    |
| Universelle Menge  | any / unknown                   | Jedes Element gehört zu „any“, und jede Menge ist eine Teilmenge davon / „unknown“ ist ein typsicheres Gegenstück zu „any“ |

Hier sind einige Beispiele:

| TypeScript            | Mengenbegriff          | Beispiel                                                                        |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (leere Menge)        | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                        |
| Literaltyp            | Einelementige Menge    | type X = 'X';                                                                   |
|                       |                        | type Y = 7;                                                                     |
|                       |                        |
| T zuweisbarer Wert    | Wert ∈ T (Element von) | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        |
| T1 ist T2 zuweisbar   | T1 ⊆ T2 (Teilmenge von) | type XY = 'X' \| 'Y';                                                          |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                        |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (Teilmenge von) | type X = 'X' extends string ? true : false;                                    |
|                       |                        |
| T1 \| T2              | T1 ∪ T2 (Vereinigung)  | type XY = 'X' \| 'Y';                                                           |
|                       |                        | type JK = 1 \| 2;                                                               |
|                       |                        |
| T1 & T2               | T1 ∩ T2 (Schnittmenge) | type X = \{ a: string \}                                                       |
|                       |                        | type Y = \{ b: string \}                                                          |
|                       |                        | type XY = X & Y                                                                 |
|                       |                        | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                        |
| unknown               | Universelle Menge      | const x: unknown = 1                                                            |

Eine Union (T1 | T2) erzeugt eine größere Menge (beide):

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Valid
```

Eine Schnittmenge (T1 & T2) erzeugt eine kleinere Menge (nur gemeinsame Werte):

<!-- skip -->
```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
    b: string;
};
type XY = X & Y;
const r: XY = { a: 'a' }; // Invalid
const j: XY = { a: 'a', b: 'b' }; // Valid
```

Das Schlüsselwort `extends` kann in diesem Zusammenhang als „Teilmenge von“ verstanden werden. Es legt eine Einschränkung für einen Typ fest. Wird `extends` mit einem generischen Typ verwendet, schränkt es den generischen Typparameter auf einen spezifischeren Typ ein.

Beachten Sie, dass `extends` hier nichts mit Klassenvererbung im Sinne der objektorientierten Programmierung zu tun hat.

TypeScript arbeitet mit strukturellen Typen und besitzt keine strikte nominale Hierarchie. Wie im folgenden Beispiel können sich zwei Typen überschneiden, ohne dass einer ein Untertyp des anderen ist, da TypeScript die Struktur beziehungsweise Form von Objekten berücksichtigt.

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
interface Z extends Y {
    c: string;
}
const z: Z = { a: 'a', b: 'b', c: 'c' };
interface X1 {
    a: string;
}
interface Y1 {
    a: string;
    b: string;
}
interface Z1 {
    a: string;
    b: string;
    c: string;
}
const z1: Z1 = { a: 'a', b: 'b', c: 'c' };

const r: Z1 = z; // Valid
```

### Einen Typ zuweisen: Typdeklarationen und Typassertionen

In TypeScript kann ein Typ auf unterschiedliche Weise zugewiesen werden:

#### Typdeklaration

Im folgenden Beispiel verwenden wir x: X („: Type“), um einen Typ für die Variable x zu deklarieren.

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

Wenn die Variable nicht dem angegebenen Format entspricht, meldet TypeScript einen Fehler. Zum Beispiel:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Error: Object literal may only specify known properties
};
```

#### Typassertion

Mit dem Schlüsselwort `as` kann eine Typassertion hinzugefügt werden. Dadurch wird dem Compiler mitgeteilt, dass der Entwickler über zusätzliche Informationen zu einem Typ verfügt, und eventuell auftretende Fehler werden unterdrückt.

Zum Beispiel:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

Im obigen Beispiel wird mithilfe des Schlüsselworts as festgelegt, dass das Objekt x den Typ X besitzt. Dadurch wird dem TypeScript-Compiler mitgeteilt, dass das Objekt dem angegebenen Typ entspricht, obwohl es die zusätzliche Eigenschaft b besitzt, die in der Typdefinition nicht enthalten ist.

Typassertionen sind in Situationen nützlich, in denen ein spezifischerer Typ angegeben werden muss, insbesondere bei der Arbeit mit dem DOM. Zum Beispiel:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Hier wird die Typassertion as HTMLInputElement verwendet, um TypeScript mitzuteilen, dass das Ergebnis von getElementById als HTMLInputElement behandelt werden soll.
Typassertionen können auch zum Neuzuordnen von Schlüsseln verwendet werden, wie das folgende Beispiel mit Template-Literalen zeigt:

```typescript
type J<Type> = {
    [Property in keyof Type as `prefix_${string &
        Property}`]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

In diesem Beispiel verwendet der Typ `J<Type>` einen gemappten Typ mit einem Template-Literal, um die Schlüssel von Type neu zuzuordnen. Er erstellt neue Eigenschaften, bei denen jedem Schlüssel „prefix_“ vorangestellt wird. Die zugehörigen Werte sind Funktionen, welche die ursprünglichen Eigenschaftswerte zurückgeben.

Beachten Sie, dass TypeScript bei Verwendung einer Typassertion keine Prüfung auf überschüssige Eigenschaften durchführt. Daher ist es im Allgemeinen vorzuziehen, eine Typdeklaration zu verwenden, wenn die Struktur des Objekts im Voraus bekannt ist.

#### Umgebungsdeklarationen

Umgebungsdeklarationen sind Dateien, die Typen für JavaScript-Code beschreiben; ihre Dateinamen haben das Format `.d.ts.`. Sie werden üblicherweise importiert und verwendet, um bestehende JavaScript-Bibliotheken zu annotieren oder vorhandenen JS-Dateien in Ihrem Projekt Typen hinzuzufügen.

Typen für viele gängige Bibliotheken finden Sie unter:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

und können wie folgt installiert werden:

```shell
npm install --save-dev @types/library-name
```

Ihre selbst definierten Umgebungsdeklarationen können Sie über die „Triple-Slash“-Referenz importieren:

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Mit `// @ts-check` können Sie Umgebungsdeklarationen sogar innerhalb von JavaScript-Dateien verwenden.

Das Schlüsselwort `declare` ermöglicht Typdefinitionen für vorhandenen JavaScript-Code, ohne diesen zu importieren, und dient als Platzhalter für Typen aus einer anderen Datei oder aus dem globalen Gültigkeitsbereich.

### Eigenschaftsprüfung und Prüfung auf überschüssige Eigenschaften

TypeScript basiert auf einem strukturellen Typsystem. Die Prüfung auf überschüssige Eigenschaften ist jedoch eine Funktion von TypeScript, mit der geprüft werden kann, ob ein Objekt genau die im Typ angegebenen Eigenschaften besitzt.

Die Prüfung auf überschüssige Eigenschaften wird beispielsweise durchgeführt, wenn Objektliterale Variablen zugewiesen oder als Argumente an Funktionen übergeben werden.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### Schwache Typen

Ein Typ gilt als schwach, wenn er ausschließlich aus optionalen Eigenschaften besteht:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript betrachtet eine Zuweisung an einen schwachen Typ als Fehler, wenn keine Überschneidung besteht. Das folgende Beispiel löst etwa einen Fehler aus:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

Obwohl dies nicht empfohlen wird, kann diese Prüfung bei Bedarf mithilfe einer Typassertion umgangen werden:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

Oder indem dem schwachen Typ eine Indexsignatur mit `unknown` hinzugefügt wird:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### Strikte Prüfung von Objektliteralen (Freshness)

Die strikte Prüfung von Objektliteralen, manchmal als „Freshness“ bezeichnet, ist eine TypeScript-Funktion, mit der überschüssige oder falsch geschriebene Eigenschaften erkannt werden können, die bei normalen strukturellen Typprüfungen andernfalls unbemerkt blieben.

Beim Erstellen eines Objektliterals betrachtet der TypeScript-Compiler dieses als „fresh“. Wird das Objektliteral einer Variablen zugewiesen oder als Parameter übergeben, gibt TypeScript einen Fehler aus, wenn das Objektliteral Eigenschaften angibt, die im Zieltyp nicht vorhanden sind.

„Freshness“ geht jedoch verloren, wenn ein Objektliteral erweitert oder eine Typassertion verwendet wird.

Die folgenden Beispiele veranschaulichen dies:

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Freshness check: Invalid assignment
var y: Y;
y = { a: 'a', bx: 'bx' }; // Freshness check: Invalid assignment

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Widening: No errors, structurally type compatible

fn({ a: 'a', bx: 'b' }); // Freshness check: Invalid argument

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Widening: No Freshness check
```

### Typinferenz

TypeScript kann Typen ableiten, wenn in folgenden Situationen keine Annotation angegeben wird:

* Initialisierung einer Variablen.
* Initialisierung eines Members.
* Festlegen von Standardwerten für Parameter.
* Rückgabetyp einer Funktion.

Zum Beispiel:

```typescript
let x = 'x'; // The type inferred is string
```

Der TypeScript-Compiler analysiert den Wert oder Ausdruck und bestimmt dessen Typ anhand der verfügbaren Informationen.

### Fortgeschrittenere Typinferenz

Wenn bei der Typinferenz mehrere Ausdrücke verwendet werden, sucht TypeScript nach den „besten gemeinsamen Typen“. Zum Beispiel:

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

Wenn der Compiler keine besten gemeinsamen Typen finden kann, gibt er einen Union-Typ zurück. Zum Beispiel:

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript nutzt „kontextuelle Typisierung“, um Typen anhand der Position einer Variablen abzuleiten. Im folgenden Beispiel weiß der Compiler, dass `e` vom Typ `MouseEvent` ist. Grundlage dafür ist der in der Datei lib.d.ts definierte Ereignistyp `click`; diese Datei enthält Umgebungsdeklarationen für verschiedene gängige JavaScript-Konstrukte und das DOM:

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### Typerweiterung

Bei der Typerweiterung weist TypeScript einer ohne Typannotation initialisierten Variablen einen Typ zu. Sie ermöglicht den Übergang von engeren zu weiteren Typen, jedoch nicht umgekehrt.
Im folgenden Beispiel:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript weist den Typ `string` der Variablen `x` anhand des einzelnen bei der Initialisierung angegebenen Werts (`x`) zu. Dies ist ein Beispiel für eine Typerweiterung.

TypeScript bietet Möglichkeiten, den Erweiterungsprozess zu steuern, beispielsweise mithilfe von „const“.

### Const

Die Verwendung des Schlüsselworts `const` bei der Deklaration einer Variablen führt in TypeScript zu einer engeren Typinferenz.

Zum Beispiel:

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

Durch die Deklaration der Variablen x mit `const` wird ihr Typ auf den konkreten Literalwert 'x' eingegrenzt. Da der Typ von x eingegrenzt ist, kann er der Variablen y fehlerfrei zugewiesen werden.
Der Typ kann abgeleitet werden, weil `const`-Variablen nicht neu zugewiesen werden können. Ihr Typ kann daher auf einen bestimmten Literaltyp eingegrenzt werden, in diesem Fall auf den Literaltyp 'x'.

#### Const-Modifikator für Typparameter

Ab TypeScript-Version 5.0 kann das Attribut `const` für einen generischen Typparameter angegeben werden. Dadurch lässt sich der genauestmögliche Typ ableiten. Betrachten wir ein Beispiel ohne `const`:

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

Wie Sie sehen, wird für die Eigenschaften `a` und `b` der Typ `string` abgeleitet.

Betrachten wir nun den Unterschied bei der Variante mit `const`:

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
```

Nun ist zu erkennen, dass die Eigenschaften `a` und `b` als Zeichenkettenliterale statt lediglich als `string`-Typen abgeleitet werden.

#### Const-Assertion

Mit dieser Funktion können Sie eine Variable anhand ihres Initialisierungswerts mit einem genaueren Literaltyp deklarieren und dem Compiler damit mitteilen, dass der Wert als unveränderliches Literal behandelt werden soll. Hier sind einige Beispiele:

Für eine einzelne Eigenschaft:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

Für ein gesamtes Objekt:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

Dies kann bei der Definition des Typs für ein Tupel besonders nützlich sein:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### Explizite Typannotation

Wir können einen Typ explizit angeben. Im folgenden Beispiel ist die Eigenschaft `x` vom Typ `number`:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

Mithilfe einer Union von Literaltypen können wir die Typannotation spezifischer gestalten:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### Type Narrowing

Type Narrowing bezeichnet in TypeScript den Vorgang, bei dem ein allgemeiner Typ auf einen spezifischeren Typ eingegrenzt wird. Dies geschieht, wenn TypeScript den Code analysiert und feststellt, dass bestimmte Bedingungen oder Operationen die Typinformationen präzisieren können.

Typen können unter anderem auf folgende Arten eingegrenzt werden:

#### Bedingungen

Mithilfe bedingter Anweisungen wie `if` oder `switch` kann TypeScript den Typ anhand des Ergebnisses der Bedingung eingrenzen. Zum Beispiel:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### Auslösen eines Fehlers oder Zurückkehren

Das Auslösen eines Fehlers oder das vorzeitige Zurückkehren aus einem Zweig kann TypeScript dabei helfen, einen Typ einzugrenzen. Zum Beispiel:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

Weitere Möglichkeiten zur Eingrenzung von Typen in TypeScript sind:

* Operator `instanceof`: Prüft, ob ein Objekt eine Instanz einer bestimmten Klasse ist.
* Operator `in`: Prüft, ob eine Eigenschaft in einem Objekt vorhanden ist.
* Operator `typeof`: Prüft den Typ eines Werts zur Laufzeit.
* Integrierte Funktionen wie `Array.isArray()`: Prüfen, ob ein Wert ein Array ist.

#### Diskriminierte Union

Eine „diskriminierte Union“ ist ein Muster in TypeScript, bei dem Objekten ein explizites „Tag“ hinzugefügt wird, um verschiedene Typen innerhalb einer Union zu unterscheiden. Dieses Muster wird auch als „Tagged Union“ bezeichnet. Im folgenden Beispiel wird das „Tag“ durch die Eigenschaft „type“ dargestellt:

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // type is A
        case 'type_b':
            return input.value + 'extra'; // type is B
    }
};
```

#### Benutzerdefinierte Type Guards

Wenn TypeScript einen Typ nicht bestimmen kann, lässt sich eine Hilfsfunktion schreiben, die als „benutzerdefinierter Type Guard“ bezeichnet wird. Im folgenden Beispiel verwenden wir ein Typprädikat, um den Typ nach einer bestimmten Filterung einzugrenzen:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

#### Switch-true Narrowing

TypeScript 5.3 führt Switch-true Narrowing ein. Damit können unübersichtliche if/else-Ketten durch switch (true) mit booleschen Bedingungen ersetzt werden. Dies verbessert die Lesbarkeit und grenzt die Typen weiterhin ein. Es ähnelt dem Pattern Matching, ist jedoch einfacher.

```typescript
function classify(x: unknown) {
    switch (true) {
        case typeof x === 'string':
            return `"${x.toUpperCase()}"`;
        case typeof x === 'number':
            return x > 0 ? 'positive' : 'negative';
        case Array.isArray(x):
            return `[${x.length} items]`;
        default:
            return 'something else';
    }
}
```

