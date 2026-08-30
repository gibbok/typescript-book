# Sonstiges



### Fehler- und Ausnahmebehandlung

TypeScript ermöglicht es Ihnen, Fehler mit den standardmäßigen Fehlerbehandlungsmechanismen von JavaScript abzufangen und zu behandeln:

Try-Catch-Finally-Blöcke:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

Sie können auch verschiedene Fehlertypen behandeln:

```typescript
try {
    // Code that might throw different types of errors
} catch (error) {
    if (error instanceof TypeError) {
        // Handle TypeError
    } else if (error instanceof RangeError) {
        // Handle RangeError
    } else {
        // Handle other errors
    }
}
```

Benutzerdefinierte Fehlertypen:

Durch Erweitern der `Error`-Klasse können spezifischere Fehler definiert werden:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Mixin-Klassen

Mixin-Klassen ermöglichen es Ihnen, das Verhalten mehrerer Klassen in einer einzigen Klasse zu kombinieren und zusammenzustellen. Sie bieten eine Möglichkeit, Funktionalität wiederzuverwenden und zu erweitern, ohne tiefe Vererbungsketten zu benötigen.

```typescript
abstract class Identifiable {
    name: string = '';
    logId() {
        console.log('id:', this.name);
    }
}
abstract class Selectable {
    selected: boolean = false;
    select() {
        this.selected = true;
        console.log('Select');
    }
    deselect() {
        this.selected = false;
        console.log('Deselect');
    }
}
class MyClass {
    constructor() {}
}

// Extend MyClass to include the behavior of Identifiable and Selectable
interface MyClass extends Identifiable, Selectable {}

// Function to apply mixins to a class
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            let descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Apply the mixins to MyClass
applyMixins(MyClass, [Identifiable, Selectable]);
let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### Asynchrone Sprachfunktionen

Da TypeScript eine Obermenge von JavaScript ist, verfügt es über die integrierten asynchronen Sprachfunktionen von JavaScript, darunter:

Promises:

Promises bieten eine Möglichkeit, asynchrone Operationen und deren Ergebnisse zu verarbeiten. Dabei werden Methoden wie `.then()` und `.catch()` verwendet, um Erfolgs- und Fehlerfälle zu behandeln.

Weitere Informationen: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Die Schlüsselwörter `async` und `await` ermöglichen bei der Arbeit mit Promises eine Syntax, die eher wie synchroner Code aussieht. Mit dem Schlüsselwort `async` wird eine asynchrone Funktion definiert. Das Schlüsselwort `await` wird innerhalb einer asynchronen Funktion verwendet, um die Ausführung anzuhalten, bis ein Promise erfüllt oder abgelehnt wird.

Weitere Informationen:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

Die folgenden APIs werden in TypeScript umfassend unterstützt:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Iteratoren und Generatoren

Sowohl Iteratoren als auch Generatoren werden in TypeScript umfassend unterstützt.

Iteratoren sind Objekte, die das Iterator-Protokoll implementieren und den schrittweisen Zugriff auf die Elemente einer Sammlung oder Sequenz ermöglichen. Ein Iterator ist eine Struktur, die einen Zeiger auf das nächste Element der Iteration enthält. Iteratoren besitzen eine `next()`-Methode, die den nächsten Wert der Sequenz zusammen mit einem booleschen Wert zurückgibt, der angibt, ob die Sequenz `done` ist.

```typescript
class NumberIterator implements Iterable<number> {
    private current: number;

    constructor(
        private start: number,
        private end: number
    ) {
        this.current = start;
    }

    public next(): IteratorResult<number> {
        if (this.current <= this.end) {
            const value = this.current;
            this.current++;
            return { value, done: false };
        } else {
            return { value: undefined, done: true };
        }
    }

    [Symbol.iterator](): Iterator<number> {
        return this;
    }
}

const iterator = new NumberIterator(1, 3);

for (const num of iterator) {
    console.log(num);
}
```

Generatoren sind spezielle Funktionen, die mit der `function*`-Syntax definiert werden und das Erstellen von Iteratoren vereinfachen. Sie verwenden das Schlüsselwort `yield`, um die Folge von Werten zu definieren, und halten die Ausführung automatisch an beziehungsweise setzen sie fort, wenn Werte angefordert werden.

Generatoren erleichtern das Erstellen von Iteratoren und sind besonders bei der Arbeit mit großen oder unendlichen Sequenzen nützlich.

Beispiel:

```typescript
function* numberGenerator(start: number, end: number): Generator<number> {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const generator = numberGenerator(1, 5);

for (const num of generator) {
    console.log(num);
}
```

TypeScript unterstützt außerdem asynchrone Iteratoren und asynchrone Generatoren.

Weitere Informationen:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### TsDocs-JSDoc-Referenz

Bei der Arbeit mit einer JavaScript-Codebasis können Sie TypeScript durch JSDoc-Kommentare mit zusätzlichen Annotationen Typinformationen bereitstellen und so bei der korrekten Typinferenz unterstützen.

Beispiel:

```typescript
/**
 * Computes the power of a given number
 * @constructor
 * @param {number} base – The base value of the expression
 * @param {number} exponent – The exponent value of the expression
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

Die vollständige Dokumentation finden Sie unter diesem Link:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Ab Version 3.7 können .d.ts-Typdefinitionen aus der JavaScript-JSDoc-Syntax generiert werden.
Weitere Informationen finden Sie hier:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Pakete unter der @types-Organisation folgen einer speziellen Namenskonvention und stellen Typdefinitionen für vorhandene JavaScript-Bibliotheken oder -Module bereit. Beispielsweise wird durch:

```shell
npm install --save-dev @types/lodash
```

die Typdefinition von `lodash` in Ihrem aktuellen Projekt installiert.

Wenn Sie zu den Typdefinitionen eines `@types`-Pakets beitragen möchten, reichen Sie bitte einen Pull Request unter [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) ein.

### JSX

JSX (JavaScript XML) ist eine Erweiterung der JavaScript-Syntax, mit der Sie HTML-ähnlichen Code in Ihren JavaScript- oder TypeScript-Dateien schreiben können. JSX wird häufig in React verwendet, um die HTML-Struktur zu definieren.

TypeScript erweitert die Möglichkeiten von JSX durch Typprüfung und statische Analyse.

Um JSX zu verwenden, müssen Sie die Compileroption `jsx` in Ihrer Datei `tsconfig.json` festlegen. Zwei häufig verwendete Konfigurationsoptionen sind:

* "preserve": Gibt .jsx-Dateien mit unverändertem JSX aus. Diese Option weist TypeScript an, die JSX-Syntax unverändert beizubehalten und sie während des Kompilierungsvorgangs nicht zu transformieren. Sie können diese Option verwenden, wenn ein separates Tool wie Babel die Transformation übernimmt.
* "react": Aktiviert die integrierte JSX-Transformation von TypeScript. React.createElement wird verwendet.

Alle Optionen finden Sie hier:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### ES6-Module

TypeScript unterstützt ES6 (ECMAScript 2015) und viele nachfolgende Versionen. Das bedeutet, dass Sie ES6-Syntax wie Arrow Functions, Template Literals, Klassen, Module, Destrukturierung und mehr verwenden können.

Um ES6-Features in Ihrem Projekt zu aktivieren, können Sie die Eigenschaft `target` in der tsconfig.json angeben.

Ein Konfigurationsbeispiel:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### ES7-Potenzierungsoperator

Der Potenzierungsoperator (`**`) berechnet den Wert, der sich ergibt, wenn der erste Operand mit dem zweiten Operanden potenziert wird. Er funktioniert ähnlich wie `Math.pow()`, kann jedoch zusätzlich BigInts als Operanden verarbeiten.
TypeScript unterstützt diesen Operator vollständig, wenn `target` in Ihrer Datei tsconfig.json auf `es2016` oder höher gesetzt ist.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### Die for-await-of-Anweisung

Dies ist ein in TypeScript vollständig unterstütztes JavaScript-Feature, mit dem Sie bei der Zielversion `es2018` über asynchron iterierbare Objekte iterieren können.

```typescript
async function* asyncNumbers(): AsyncIterableIterator<number> {
    yield Promise.resolve(1);
    yield Promise.resolve(2);
    yield Promise.resolve(3);
}

(async () => {
    for await (const num of asyncNumbers()) {
        console.log(num);
    }
})();
```

### Neue target-Metaeigenschaft

Sie können die Metaeigenschaft `new.target` in TypeScript verwenden, um festzustellen, ob eine Funktion oder ein Konstruktor mit dem new-Operator aufgerufen wurde. Damit können Sie erkennen, ob ein Objekt durch einen Konstruktoraufruf erstellt wurde.

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Logs the constructor function used to create an instance
    }
}

class Child extends Parent {
    constructor() {
        super();
    }
}

const parentX = new Parent(); // [Function: Parent]
const child = new Child(); // [Function: Child]
```

### Dynamische Importausdrücke

Mit dem von TypeScript unterstützten ECMAScript-Vorschlag für dynamische Imports können Module bedingt oder bei Bedarf verzögert geladen werden.

Die Syntax für dynamische Importausdrücke in TypeScript lautet wie folgt:

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Dynamic import
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

Dieser Befehl startet den TypeScript-Compiler mit dem Parameter `--watch`, sodass TypeScript-Dateien bei jeder Änderung automatisch neu kompiliert werden können.

```shell
tsc --watch
```

Ab TypeScript-Version 4.9 basiert die Dateiüberwachung hauptsächlich auf Dateisystemereignissen. Wenn kein ereignisbasierter Watcher eingerichtet werden kann, wird automatisch auf Polling zurückgegriffen.

### Non-Null-Assertion-Operator

Der Non-Null-Assertion-Operator (Postfix !), auch als Definite Assignment Assertion bezeichnet, ist ein TypeScript-Feature, mit dem Sie bestätigen können, dass eine Variable oder Eigenschaft weder null noch undefined ist, selbst wenn die statische Typanalyse von TypeScript darauf hindeutet, dass dies möglich sein könnte. Mit diesem Feature können Sie auf explizite Prüfungen verzichten.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Deklarationen mit Standardwerten

Deklarationen mit Standardwerten werden verwendet, wenn einer Variablen oder einem Parameter ein Standardwert zugewiesen wird. Wird für diese Variable oder diesen Parameter kein Wert angegeben, wird stattdessen der Standardwert verwendet.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Optional Chaining

Der Optional-Chaining-Operator `?.` funktioniert beim Zugriff auf Eigenschaften oder Methoden wie der reguläre Punktoperator (`.`). Werte, die null oder undefined sind, werden jedoch abgefangen, indem der Ausdruck beendet und `undefined` zurückgegeben wird, anstatt einen Fehler auszulösen.

```typescript
type Person = {
    name: string;
    age?: number;
    address?: {
        street?: string;
        city?: string;
    };
};

const person: Person = {
    name: 'John',
};

console.log(person.address?.city); // undefined
```

### Nullish-Coalescing-Operator

Der Nullish-Coalescing-Operator `??` gibt den Wert auf der rechten Seite zurück, wenn der Wert auf der linken Seite `null` oder `undefined` ist. Andernfalls gibt er den Wert auf der linken Seite zurück.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Template Literal Types

Mit Template Literal Types können Sie Stringwerte auf Typebene manipulieren und auf der Grundlage vorhandener Typen neue Stringtypen erzeugen. Sie eignen sich dazu, aus stringbasierten Operationen ausdrucksstärkere und präzisere Typen zu erstellen.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Funktionsüberladung

Mit Funktionsüberladung können Sie mehrere Funktionssignaturen für denselben Funktionsnamen definieren, jeweils mit unterschiedlichen Parameter- und Rückgabetypen.
Wenn Sie eine überladene Funktion aufrufen, ermittelt TypeScript anhand der angegebenen Argumente die richtige Funktionssignatur:

```typescript
function makeGreeting(name: string): string;
function makeGreeting(names: string[]): string[];

function makeGreeting(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Hi ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Hi, ${name}!`);
    }
    throw new Error('Unable to greet');
}

makeGreeting('Simon');
makeGreeting(['Simone', 'John']);
```

### Rekursive Typen

Ein rekursiver Typ ist ein Typ, der auf sich selbst verweisen kann. Dies ist nützlich, um Datenstrukturen mit einer hierarchischen oder rekursiven Struktur (potenziell unendlicher Verschachtelung) zu definieren, beispielsweise verkettete Listen, Bäume und Graphen.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Rekursive Conditional Types

In TypeScript können komplexe Typbeziehungen mithilfe von Logik und Rekursion definiert werden.
Betrachten wir dies in einfachen Schritten:

Mit Conditional Types können Sie Typen auf der Grundlage boolescher Bedingungen definieren:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

Rekursion bezeichnet eine Typdefinition, die innerhalb ihrer eigenen Definition auf sich selbst verweist:

```typescript
type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const data: Json = {
    prop1: true,
    prop2: 'prop2',
    prop3: {
        prop4: [],
    },
};
```

Rekursive Conditional Types kombinieren bedingte Logik und Rekursion. Das bedeutet, dass eine Typdefinition durch bedingte Logik von sich selbst abhängen kann, wodurch komplexe und flexible Typbeziehungen entstehen.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Unterstützung von ECMAScript-Modulen in Node

Node.js unterstützt ECMAScript-Module seit Version 15.3.0, und TypeScript unterstützt ECMAScript-Module für Node.js seit Version 4.7. Diese Unterstützung kann aktiviert werden, indem Sie in der Datei tsconfig.json die Eigenschaft `module` auf den Wert `nodenext` setzen. Hier ist ein Beispiel:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js unterstützt zwei Dateierweiterungen für Module: `.mjs` für ES-Module und `.cjs` für CommonJS-Module. Die entsprechenden Dateierweiterungen in TypeScript sind `.mts` für ES-Module und `.cts` für CommonJS-Module. Wenn der TypeScript-Compiler diese Dateien in JavaScript transpiliert, erstellt er `.mjs`- und `.cjs`-Dateien.

Wenn Sie ES-Module in Ihrem Projekt verwenden möchten, können Sie die Eigenschaft `type` in Ihrer Datei package.json auf "module" setzen. Dadurch wird Node.js angewiesen, das Projekt als ES-Modulprojekt zu behandeln.

Darüber hinaus unterstützt TypeScript Typdeklarationen in .d.ts-Dateien. Diese Deklarationsdateien stellen Typinformationen für in TypeScript geschriebene Bibliotheken oder Module bereit, sodass andere Entwickler sie mit der Typprüfung und den Autovervollständigungsfunktionen von TypeScript verwenden können.

### Assertion Functions

In TypeScript sind Assertion Functions Funktionen, die anhand ihres Rückgabewerts die Überprüfung einer bestimmten Bedingung anzeigen. In ihrer einfachsten Form prüft eine Assert-Funktion ein angegebenes Prädikat und löst einen Fehler aus, wenn das Prädikat false ergibt.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Alternativ kann sie als Funktionsausdruck deklariert werden:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Assertion Functions weisen Ähnlichkeiten mit Type Guards auf. Type Guards wurden ursprünglich eingeführt, um Laufzeitprüfungen durchzuführen und den Typ eines Werts innerhalb eines bestimmten Gültigkeitsbereichs sicherzustellen.
Genauer gesagt ist ein Type Guard eine Funktion, die ein Typprädikat auswertet und einen booleschen Wert zurückgibt, der angibt, ob das Prädikat true oder false ist. Dies unterscheidet sich geringfügig von Assertion Functions, bei denen ein Fehler ausgelöst werden soll, anstatt false zurückzugeben, wenn das Prädikat nicht erfüllt ist.

Beispiel für einen Type Guard:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Variadische Tupeltypen

Variadische Tupeltypen sind ein mit TypeScript-Version 4.0 eingeführtes Feature. Sehen wir uns daher zunächst noch einmal an, was ein Tupel ist:

Ein Tupeltyp ist ein Array mit einer festgelegten Länge, bei dem der Typ jedes Elements bekannt ist:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

Der Begriff "variadisch" bezeichnet eine unbestimmte Stelligkeit (das Akzeptieren einer variablen Anzahl von Argumenten).

Ein variadisches Tupel ist ein Tupeltyp mit allen zuvor genannten Eigenschaften, dessen genaue Form jedoch noch nicht definiert ist:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

Im vorherigen Code ist zu sehen, dass die Form des Tupels durch den übergebenen generischen Typ `T` definiert wird.

Variadische Tupel können mehrere generische Typen akzeptieren, wodurch sie sehr flexibel sind:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Mit den neuen variadischen Tupeln können wir Folgendes verwenden:

* Spreads in der Tupeltypsyntax können jetzt generisch sein. Dadurch können wir Operationen höherer Ordnung für Tupel und Arrays darstellen, selbst wenn wir die tatsächlichen Typen, mit denen wir arbeiten, nicht kennen.
* Rest-Elemente können an jeder beliebigen Stelle in einem Tupel vorkommen.

Beispiel:

```typescript
type Items = readonly unknown[];

function concat<T extends Items, U extends Items>(
    arr1: T,
    arr2: U
): [...T, ...U] {
    return [...arr1, ...arr2];
}

concat([1, 2, 3], ['4', '5', '6']); // [1, 2, 3, "4", "5", "6"]
```

### Boxed Types

Boxed Types bezeichnen Wrapper-Objekte, mit denen primitive Typen als Objekte dargestellt werden. Diese Wrapper-Objekte bieten zusätzliche Funktionen und Methoden, die für die primitiven Werte nicht direkt verfügbar sind.

Wenn Sie auf eine Methode wie `charAt` oder `normalize` eines primitiven `string`-Werts zugreifen, umschließt JavaScript ihn mit einem `String`-Objekt, ruft die Methode auf und verwirft das Objekt anschließend.

Demonstration:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript bildet diese Unterscheidung durch separate Typen für die primitiven Werte und die entsprechenden Objekt-Wrapper ab:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Boxed Types werden normalerweise nicht benötigt. Vermeiden Sie Boxed Types und verwenden Sie stattdessen primitive Typen, beispielsweise `string` anstelle von `String`.

### Kovarianz und Kontravarianz in TypeScript

Kovarianz und Kontravarianz beschreiben, wie sich Typbeziehungen in generischen Typen verhalten.

In TypeScript gilt:

* Arrays sind **kovariant**, dies ist jedoch nicht vollständig typsicher.
* Funktionsparametertypen sind:
  * **kontravariant**, wenn `strictFunctionTypes` aktiviert ist
  * andernfalls **bivariant**

Kovarianz bedeutet, dass die Beziehung erhalten bleibt: Wenn Typ A ein Subtyp von Typ B ist, ist `F<A>` ebenfalls ein Subtyp von `F<B>`. In TypeScript tritt dies häufig bei Rückgabetypen und Arrays auf (obwohl die Kovarianz von Arrays nicht vollständig typsicher ist).

Kontravarianz bedeutet, dass die Beziehung umgekehrt wird: Wenn Typ A ein Subtyp von Typ B ist, ist `F<B>` ein Subtyp von `F<A>`. In TypeScript sollen Funktionsparametertypen kontravariant sein. Das bedeutet, dass eine Funktion, die einen allgemeineren Typ akzeptiert, dort verwendet werden kann, wo ein spezifischerer Typ erwartet wird.

In der Praxis lässt TypeScript für Funktionsparameter jedoch häufig Bivarianz zu (sofern `strictFunctionTypes` nicht aktiviert ist). Das bedeutet, dass beide Richtungen akzeptiert werden können, selbst wenn dies nicht streng typsicher ist.

Beispiel: Stellen Sie sich einen Bereich für alle Tiere und einen separaten Bereich nur für Hunde vor.

* **Kovarianz**:  
  Sie können einen „Hundebereich“ dort verwenden, wo ein „Tierbereich“ erwartet wird, da alle Hunde Tiere sind.  
  Sie können jedoch keinen „Tierbereich“ dort verwenden, wo ein „Hundebereich“ erwartet wird, da er andere Tiere als Hunde enthalten könnte.

* **Kontravarianz** (bezogen auf Funktionen):  
  Wenn etwas **jedes Tier** verarbeiten kann, können Sie es dort verwenden, wo etwas erwartet wird, das **nur Hunde** verarbeitet.  
  Umgekehrt ist dies jedoch nicht möglich.

Beispiel für Kovarianz:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

let animals: Animal[] = [];
let dogs: Dog[] = [];

// Arrays are covariant in TypeScript (but not type-safe)
animals = dogs; // allowed
dogs = animals; // error
```

Beispiel für Kontravarianz:

<!-- skip -->
```typescript
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    breed: string;
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
}

type Feed<T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = animal => {
    console.log(animal.name);
};

let feedDog: Feed<Dog> = dog => {
    console.log(dog.breed);
};

// Intended contravariance:
feedDog = feedAnimal; // safe

// This depends on compiler settings:
feedAnimal = feedDog; // error only with strictFunctionTypes
```

#### Optionale Varianzannotationen für Typparameter

Seit TypeScript 4.7.0 können wir mit den Schlüsselwörtern `out` und `in` Varianzannotationen angeben.

Verwenden Sie für Kovarianz das Schlüsselwort `out`:

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

Verwenden Sie für Kontravarianz das Schlüsselwort `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### Template-String-Pattern-Indexsignaturen

Mit Template-String-Pattern-Indexsignaturen können wir flexible Indexsignaturen anhand von Template-String-Mustern definieren. Dieses Feature ermöglicht es uns, Objekte zu erstellen, die mit bestimmten Mustern von Stringschlüsseln indiziert werden können. Dadurch erhalten wir beim Zugriff auf und bei der Manipulation von Eigenschaften mehr Kontrolle und Spezifität.

Seit Version 4.4 unterstützt TypeScript Indexsignaturen für Symbole und Template-String-Muster.

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Unique symbol key',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Unique symbol key
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### Der satisfies-Operator

Mit dem Operator `satisfies` können Sie prüfen, ob ein bestimmter Typ einem bestimmten Interface oder einer bestimmten Bedingung entspricht. Mit anderen Worten stellt er sicher, dass ein Typ alle erforderlichen Eigenschaften und Methoden eines bestimmten Interfaces besitzt. So kann sichergestellt werden, dass eine Variable zu einer Typdefinition passt.
Hier ist ein Beispiel:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Type Annotation using `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// In the following lines, TypeScript won't be able to infer properly
user.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user.nickName; // string | string[] | undefined

// Type assertion using `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Here too, TypeScript won't be able to infer properly
user2.attributes?.map(console.log); // Property 'map' does not exist on type 'string | string[]'. Property 'map' does not exist on type 'string'.
user2.nickName; // string | string[] | undefined

// Using the `satisfies` operator we can properly infer the types now
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infers correctly: string[]
user3.nickName; // TypeScript infers correctly: undefined
```

### Type-Only Imports und Export

Mit Type-Only Imports und Exports können Sie Typen importieren oder exportieren, ohne die mit diesen Typen verbundenen Werte oder Funktionen zu importieren beziehungsweise zu exportieren. Dies kann dazu beitragen, die Größe Ihres Bundles zu reduzieren.

Für Type-Only Imports können Sie das Schlüsselwort `import type` verwenden.

TypeScript erlaubt in Type-Only Imports sowohl Dateierweiterungen für Deklarations- als auch für Implementierungsdateien (.ts, .mts, .cts und .tsx), unabhängig von den Einstellungen für `allowImportingTsExtensions`.

Zum Beispiel:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Die folgenden Formen werden unterstützt:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### using-Deklaration und Explicit Resource Management

Eine `using`-Deklaration ist eine unveränderliche Bindung mit Blockgültigkeitsbereich, ähnlich wie `const`, die zum Verwalten freizugebender Ressourcen verwendet wird. Bei der Initialisierung mit einem Wert wird die Methode `Symbol.dispose` dieses Werts registriert und anschließend beim Verlassen des umgebenden Blockgültigkeitsbereichs ausgeführt.

Dies basiert auf dem Resource-Management-Feature von ECMAScript, das zur Durchführung wichtiger Bereinigungsaufgaben nach der Objekterstellung dient, beispielsweise zum Schließen von Verbindungen, Löschen von Dateien und Freigeben von Speicher.

Hinweise:

* Da diese Funktion erst kürzlich mit TypeScript-Version 5.2 eingeführt wurde, unterstützen die meisten Laufzeitumgebungen sie nicht nativ. Sie benötigen Polyfills für: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
* Darüber hinaus müssen Sie Ihre tsconfig.json wie folgt konfigurieren:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

Beispiel:

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // Simple polyfill

const doWork = (): Disposable => {
    return {
        [Symbol.dispose]: () => {
            console.log('disposed');
        },
    };
};

console.log(1);

{
    using work = doWork(); // Resource is declared
    console.log(2);
} // Resource is disposed (e.g., `work[Symbol.dispose]()` is evaluated)

console.log(3);
```

Der Code gibt Folgendes aus:

```shell
1
2
disposed
3
```

Eine Ressource, die freigegeben werden kann, muss dem Interface `Disposable` entsprechen:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

Die `using`-Deklarationen speichern die Operationen zur Ressourcenfreigabe in einem Stack, sodass die Ressourcen in umgekehrter Reihenfolge ihrer Deklaration freigegeben werden:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

Die Freigabe von Ressourcen ist auch dann garantiert, wenn nachfolgender Code ausgeführt wird oder Ausnahmen auftreten. Dies kann dazu führen, dass die Freigabe selbst eine Ausnahme auslöst und dabei möglicherweise eine andere unterdrückt. Um Informationen zu unterdrückten Fehlern zu erhalten, wird die neue native Ausnahme `SuppressedError` eingeführt.

#### await using-Deklaration

Eine `await using`-Deklaration verarbeitet eine asynchron freizugebende Ressource. Der Wert muss über eine Methode `Symbol.asyncDispose` verfügen, deren Abschluss am Ende des Blocks abgewartet wird.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

Eine asynchron freizugebende Ressource muss entweder dem Interface `Disposable` oder `AsyncDisposable` entsprechen:

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Simple polyfill

class DatabaseConnection implements AsyncDisposable {
    // A method that is called when the object is disposed asynchronously
    [Symbol.asyncDispose]() {
        // Close the connection and return a promise
        return this.close();
    }

    async close() {
        console.log('Closing the connection...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connection closed.');
    }
}

async function doWork() {
    // Create a new connection and dispose it asynchronously when it goes out of scope
    await using connection = new DatabaseConnection(); //  Resource is declared
    console.log('Doing some work...');
} // Resource is disposed (e.g., `await connection[Symbol.asyncDispose]()` is evaluated)

doWork();
```

Der Code gibt Folgendes aus:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

Die Deklarationen `using` und `await using` sind in folgenden Anweisungen zulässig: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Importattribute

Die Importattribute von TypeScript 5.3 (Kennzeichnungen für Imports) teilen der Laufzeitumgebung mit, wie Module (JSON usw.) behandelt werden sollen. Dies verbessert die Sicherheit durch eindeutige Imports und ist auf die Content Security Policy (CSP) abgestimmt, um Ressourcen sicherer zu laden. TypeScript stellt ihre Gültigkeit sicher, überlässt jedoch der Laufzeitumgebung ihre Interpretation für die jeweilige Modulverarbeitung.

Beispiel:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

mit dynamischem Import:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### Syntaxprüfung regulärer Ausdrücke

Seit TypeScript 5.5.4 werden Regex-Literale zur Kompilierzeit auf häufige Fehler geprüft (z. B. ungültige Syntax, falsche Rückverweise oder für Ihre JS-Zielversion nicht unterstützte Funktionen). Dadurch können Fehler früher erkannt werden, Zeichenfolgen in new RegExp("...") werden jedoch nicht geprüft.

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

Mit `import defer` können Sie ein Modul laden, seine Ausführung jedoch verzögern, bis Sie tatsächlich etwas daraus verwenden. Dadurch lassen sich unnötige Arbeit und Seiteneffekte vermeiden.

* Funktioniert nur mit: `import defer * as name from "module"`
* Der Code wird erst ausgeführt, wenn Sie auf einen Export zugreifen
