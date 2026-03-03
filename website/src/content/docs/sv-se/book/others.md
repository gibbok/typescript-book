---
title: Övrigt
sidebar:
  order: 61
  label: 61. Övrigt
---


### Fel och undantagshantering

TypeScript låter dig fånga och hantera fel med hjälp av JavaScripts standardmekanismer för felhantering:

Try-Catch-Finally-block:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

Du kan också hantera olika typer av fel:

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

Anpassade feltyper:

Det är möjligt att specificera mer specifika fel genom att utöka `Error`-klassen:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Mixin-klasser

Mixin-klasser låter dig kombinera och komponera beteende från flera klasser till en enda klass. De erbjuder ett sätt att återanvända och utöka funktionalitet utan behov av djupa arvskedjor.

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

### Asynkrona språkfunktioner

Eftersom TypeScript är en superset av JavaScript har det inbyggda asynkrona språkfunktioner från JavaScript som:

Promises:

Promises är ett sätt att hantera asynkrona operationer och deras resultat med hjälp av metoder som `.then()` och `.catch()` för att hantera framgångs- och feltillstånd.

Läs mer: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Nyckelorden async/await erbjuder en mer synkront utseende syntax för att arbeta med Promises. Nyckelordet `async` används för att definiera en asynkron funktion, och nyckelordet `await` används inom en async-funktion för att pausa körningen tills ett Promise har lösts eller avvisats.

Läs mer:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

Följande API:er stöds väl i TypeScript:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Iteratorer och generatorer

Både iteratorer och generatorer stöds väl i TypeScript.

Iteratorer är objekt som implementerar iteratorprotokollet och erbjuder ett sätt att komma åt element i en samling eller sekvens ett i taget. Det är en struktur som innehåller en pekare till nästa element i iterationen. De har en `next()`-metod som returnerar nästa värde i sekvensen tillsammans med en boolean som anger om sekvensen är `done` (klar).

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

Generatorer är speciella funktioner definierade med syntaxen `function*` som förenklar skapandet av iteratorer. De använder nyckelordet `yield` för att definiera sekvensen av värden och pausar och återupptar automatiskt körningen när värden efterfrågas.

Generatorer gör det enklare att skapa iteratorer och är särskilt användbara för att arbeta med stora eller oändliga sekvenser.

Exempel:

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

TypeScript stöder också asynkrona iteratorer och asynkrona generatorer.

Läs mer:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### TsDocs JSDoc-referens

När man arbetar med en JavaScript-kodbas är det möjligt att hjälpa TypeScript att härleda rätt typ genom att använda JSDoc-kommentarer med ytterligare annotationer för att ge typinformation.

Exempel:

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

Fullständig dokumentation finns på denna länk:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Från version 3.7 är det möjligt att generera .d.ts-typdefinitioner från JavaScript JSDoc-syntax.
Mer information finns här:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Paket under @types-organisationen är speciella paketnamnkonventioner som används för att tillhandahålla typdefinitioner för befintliga JavaScript-bibliotek eller moduler. Till exempel genom att använda:

```shell
npm install --save-dev @types/lodash
```

Installeras typdefinitionerna för `lodash` i ditt nuvarande projekt.

För att bidra till typdefinitionerna för @types-paket, skicka in en pull request till [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) är en utökning av JavaScript-språksyntaxen som låter dig skriva HTML-liknande kod i dina JavaScript- eller TypeScript-filer. Det används vanligtvis i React för att definiera HTML-strukturen.

TypeScript utökar JSX:s kapacitet genom att tillhandahålla typkontroll och statisk analys.

För att använda JSX behöver du ställa in kompileringsalternativet `jsx` i din `tsconfig.json`-fil. Två vanliga konfigurationsalternativ:

* "preserve": genererar .jsx-filer med JSX oförändrad. Detta alternativ talar om för TypeScript att behålla JSX-syntaxen som den är och inte transformera den under kompileringsprocessen. Du kan använda detta alternativ om du har ett separat verktyg, som Babel, som hanterar transformationen.
* "react": aktiverar TypeScripts inbyggda JSX-transformation. React.createElement kommer att användas.

Alla alternativ finns tillgängliga här:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### ES6-moduler

TypeScript stöder ES6 (ECMAScript 2015) och många efterföljande versioner. Det innebär att du kan använda ES6-syntax, såsom pilfunktioner, mallsträngar, klasser, moduler, destrukturering och mer.

För att aktivera ES6-funktioner i ditt projekt kan du ange egenskapen `target` i tsconfig.json.

Ett konfigurationsexempel:

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

### ES7 exponentiationsoperator

Exponentiationsoperatorn (`**`) beräknar värdet som erhålls genom att upphöja den första operanden till den andra operandens potens. Den fungerar på liknande sätt som `Math.pow()`, men med den ytterligare förmågan att acceptera BigInts som operander.
TypeScript stöder denna operator fullt ut genom att använda `es2016` eller en senare version som `target` i din tsconfig.json-fil.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### for-await-of-satsen

Detta är en JavaScript-funktion som stöds fullt ut i TypeScript och som låter dig iterera över asynkrona iterbara objekt från målversion es2018.

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

### Metaegenskapen new.target

Du kan i TypeScript använda metaegenskapen `new.target` som gör det möjligt att avgöra om en funktion eller konstruktor anropades med new-operatorn. Det låter dig upptäcka om ett objekt skapades som ett resultat av ett konstruktoranrop.

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

### Dynamiska importuttryck

Det är möjligt att villkorligt ladda moduler eller lat-ladda dem vid behov med hjälp av ECMAScript-förslaget för dynamisk import som stöds i TypeScript.

Syntaxen för dynamiska importuttryck i TypeScript är följande:

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

Detta kommando startar TypeScript-kompilatorn med parametern `--watch`, med möjligheten att automatiskt kompilera om TypeScript-filer när de ändras.

```shell
tsc --watch
```

Från och med TypeScript version 4.9 förlitar sig filövervakning främst på filsystemhändelser och faller automatiskt tillbaka till polling om en händelsebaserad övervakare inte kan upprättas.

### Non-null Assertion Operator

Non-null Assertion Operator (Postfix !) även kallad Definite Assignment Assertions är en TypeScript-funktion som låter dig försäkra att en variabel eller egenskap inte är null eller undefined, även om TypeScripts statiska typanalys antyder att den kan vara det. Med denna funktion är det möjligt att ta bort all explicit kontroll.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Standarddeklarationer

Standarddeklarationer används när en variabel eller parameter tilldelas ett standardvärde. Det innebär att om inget värde anges för den variabeln eller parametern, kommer standardvärdet att användas istället.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Valfri kedjning (Optional Chaining)

Den valfria kedjningsoperatorn `?.` fungerar som den vanliga punktoperatorn (`.`) för att komma åt egenskaper eller metoder. Den hanterar dock null- eller undefined-värden smidigt genom att avsluta uttrycket och returnera `undefined`, istället för att kasta ett fel.

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

### Nullish coalescing-operatorn

Nullish coalescing-operatorn `??` returnerar högerledet om vänsterledet är `null` eller `undefined`; annars returnerar den vänsterledets värde.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Mallsträngslitteraltyper (Template Literal Types)

Mallsträngslitteraltyper gör det möjligt att manipulera strängvärden på typnivå och generera nya strängtyper baserade på befintliga. De är användbara för att skapa mer uttrycksfulla och precisa typer från strängbaserade operationer.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Funktionsöverlagring

Funktionsöverlagring låter dig definiera flera funktionssignaturer för samma funktionsnamn, var och en med olika parametertyper och returtyp.
När du anropar en överlagrad funktion använder TypeScript de angivna argumenten för att avgöra rätt funktionssignatur:

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

### Rekursiva typer

En rekursiv typ är en typ som kan referera till sig själv. Detta är användbart för att definiera datastrukturer som har en hierarkisk eller rekursiv struktur (potentiellt oändlig nästning), såsom länkade listor, träd och grafer.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Rekursiva villkorstyper

Det är möjligt att definiera komplexa typrelationer med hjälp av logik och rekursion i TypeScript.
Låt oss bryta ner det i enkla termer:

Villkorstyper: låter dig definiera typer baserade på booleska villkor:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

Rekursion: innebär en typdefinition som refererar till sig själv inom sin egen definition:

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

Rekursiva villkorstyper kombinerar både villkorslogik och rekursion. Det innebär att en typdefinition kan bero på sig själv genom villkorslogik, vilket skapar komplexa och flexibla typrelationer.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Stöd för ECMAScript-moduler i Node

Node.js lade till stöd för ECMAScript-moduler från och med version 15.3.0, och TypeScript har haft stöd för ECMAScript-moduler i Node.js sedan version 4.7. Detta stöd kan aktiveras genom att använda egenskapen `module` med värdet `nodenext` i tsconfig.json-filen. Här är ett exempel:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js stöder två filändelser för moduler: `.mjs` för ES-moduler och `.cjs` för CommonJS-moduler. Motsvarande filändelser i TypeScript är `.mts` för ES-moduler och `.cts` för CommonJS-moduler. När TypeScript-kompilatorn transpilerar dessa filer till JavaScript skapar den `.mjs`- och `.cjs`-filer.

Om du vill använda ES-moduler i ditt projekt kan du ställa in egenskapen `type` till "module" i din package.json-fil. Detta instruerar Node.js att behandla projektet som ett ES-modulprojekt.

Dessutom stöder TypeScript även typdeklarationer i .d.ts-filer. Dessa deklarationsfiler tillhandahåller typinformation för bibliotek eller moduler skrivna i TypeScript, vilket låter andra utvecklare använda dem med TypeScripts typkontroll och autokompletteringsfunktioner.

### Assertionsfunktioner

I TypeScript är assertionsfunktioner funktioner som indikerar verifieringen av ett specifikt villkor baserat på sitt returvärde. I sin enklaste form undersöker en assert-funktion ett givet predikat och kastar ett fel när predikatet utvärderas till false.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

De kan också deklareras som funktionsuttryck:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Assertionsfunktioner delar likheter med typskydd (type guards). Typskydd introducerades ursprungligen för att utföra körtidskontroller och säkerställa typen av ett värde inom ett specifikt scope.
Specifikt är ett typskydd en funktion som utvärderar ett typpredikat och returnerar ett booleskt värde som anger om predikatet är sant eller falskt. Detta skiljer sig något från assertionsfunktioner, där avsikten är att kasta ett fel snarare än att returnera false när predikatet inte uppfylls.

Exempel på typskydd:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Variadiska tuppeltyper

Variadiska tuppeltyper är en funktion som introducerades i TypeScript version 4.0. Låt oss börja med att repetera vad en tuppel är:

En tuppeltyp är en array som har en definierad längd, och där typen av varje element är känd:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

Termen "variadisk" betyder obestämd aritet (accepterar ett variabelt antal argument).

En variadisk tuppel är en tuppeltyp som har alla egenskaper som ovan men vars exakta form ännu inte är definierad:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

I den föregående koden kan vi se att tuppelns form definieras av den generiska typen `T` som skickas in.

Variadiska tuppler kan acceptera flera generiska typer vilket gör dem mycket flexibla:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Med de nya variadiska tupplerna kan vi använda:

* Spridningar i tuppeltypssyntax kan nu vara generiska, så vi kan representera högre ordningens operationer på tuppler och arrayer även när vi inte känner till de faktiska typerna vi opererar på.
* Restelement kan förekomma var som helst i en tuppel.

Exempel:

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

### Inkapslingstyper (Boxed types)

Inkapslingstyper refererar till omslagsobjekten som används för att representera primitiva typer som objekt. Dessa omslagsobjekt tillhandahåller ytterligare funktionalitet och metoder som inte är direkt tillgängliga på de primitiva värdena.

När du anropar en metod som `charAt` eller `normalize` på en primitiv `string`, omsluter JavaScript den i ett `String`-objekt, anropar metoden och kastar sedan bort objektet.

Demonstration:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript representerar denna skillnad genom att tillhandahålla separata typer för primitiverna och deras motsvarande objektomslag:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Inkapslingstyperna behövs vanligtvis inte. Undvik att använda inkapslingstyper och använd istället typer för primitiverna, till exempel `string` istället för `String`.

### Kovarians och kontravarians i TypeScript

Kovarians och kontravarians används för att beskriva hur relationer fungerar vid hantering av arv eller tilldelning av typer.

Kovarians innebär att en typrelation bevarar riktningen för arv eller tilldelning, så om en typ A är en subtyp av typ B, anses också en array av typ A vara en subtyp av en array av typ B. Det viktiga att notera här är att subtyprelationen bibehålls, vilket innebär att kovarians accepterar subtyper men inte accepterar supertyper.

Kontravarians innebär att en typrelation vänder riktningen för arv eller tilldelning, så om en typ A är en subtyp av typ B, anses en array av typ B vara en subtyp av en array av typ A. Subtyprelationen är omvänd, vilket innebär att kontravarians accepterar supertyper men inte accepterar subtyper.

Notera: Bivarians innebär att både supertyper och subtyper accepteras.

Exempel: Låt oss säga att vi har ett utrymme för alla djur och ett separat utrymme bara för hundar.

Vid kovarians kan du placera alla hundar i djurutrymmet eftersom hundar är en typ av djur. Men du kan inte placera alla djur i hundutrymmet eftersom det kan finnas andra djur inblandade.

Vid kontravarians kan du inte placera alla djur i hundutrymmet eftersom djurutrymmet kan innehålla andra djur också. Däremot kan du placera alla hundar i djurutrymmet eftersom alla hundar också är djur.

<!-- skip -->
```typescript
// Covariance example
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

// Covariance allows assigning subtype (Dog) array to supertype (Animal) array
animals = dogs;
dogs = animals; // Invalid: Type 'Animal[]' is not assignable to type 'Dog[]'

// Contravariance example
type Feed<in T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = (animal: Animal) => {
    console.log(`Animal name: ${animal.name}`);
};

let feedDog: Feed<Dog> = (dog: Dog) => {
    console.log(`Dog name: ${dog.name}, Breed: ${dog.breed}`);
};

// Contravariance allows assigning supertype (Animal) callback to subtype (Dog) callback
feedDog = feedAnimal;
feedAnimal = feedDog; // Invalid: Type 'Feed<Dog>' is not assignable to type 'Feed<Animal>'.
```

I TypeScript är typrelationer för arrayer kovarianta, medan typrelationer för funktionsparametrar är kontravarianta. Det innebär att TypeScript uppvisar både kovarians och kontravarians beroende på sammanhanget.

#### Valfria variansannotationer för typparametrar

Från och med TypeScript 4.7.0 kan vi använda nyckelorden `out` och `in` för att vara specifika med variansannotationer.

För kovarians, använd nyckelordet `out`:

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

Och för kontravarians, använd nyckelordet `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### Mallsträngsmönsterindexsignaturer

Mallsträngsmönsterindexsignaturer gör det möjligt att definiera flexibla indexsignaturer med hjälp av mallsträngsmönster. Denna funktion gör det möjligt att skapa objekt som kan indexeras med specifika mönster av strängnycklar, vilket ger mer kontroll och specificitet vid åtkomst och manipulering av egenskaper.

TypeScript tillåter från version 4.4 indexsignaturer för symboler och mallsträngsmönster.

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

### satisfies-operatorn

Operatorn `satisfies` låter dig kontrollera om en given typ uppfyller ett specifikt gränssnitt eller villkor. Med andra ord säkerställer den att en typ har alla nödvändiga egenskaper och metoder för ett specifikt gränssnitt. Det är ett sätt att säkerställa att en variabel passar in i en typdefinition.
Här är ett exempel:

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

// Using `satisfies` operators we can properly infer the types now
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript infers correctly: string[]
user3.nickName; // TypeScript infers correctly: undefined
```

### Importer och exporter av enbart typer

Importer och exporter av enbart typer låter dig importera eller exportera typer utan att importera eller exportera de värden eller funktioner som är associerade med dessa typer. Detta kan vara användbart för att minska storleken på ditt paket.

För att använda importer av enbart typer kan du använda nyckelordet `import type`.

TypeScript tillåter användning av både deklarations- och implementationsfiländelser (.ts, .mts, .cts och .tsx) i importer av enbart typer, oavsett inställningarna för `allowImportingTsExtensions`.

Till exempel:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Följande former stöds:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### using-deklaration och explicit resurshantering

En `using`-deklaration är en blockomfattande, oföränderlig bindning, liknande `const`, som används för att hantera disponibla resurser. När den initialiseras med ett värde registreras värdets `Symbol.dispose`-metod och körs sedan vid utgång ur det omslutande blockomfånget.

Detta baseras på ECMAScripts resurshanteringsfunktion, som är användbar för att utföra väsentliga uppstädningsuppgifter efter objektskapande, såsom att stänga anslutningar, radera filer och frigöra minne.

Noteringar:

* På grund av dess nyliga introduktion i TypeScript version 5.2 saknar de flesta körmiljöer inbyggt stöd. Du behöver polyfills för: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
* Dessutom behöver du konfigurera din tsconfig.json enligt följande:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

Exempel:

<!-- skip -->
```typescript
//@ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose'); // Simple polify

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

Koden loggar:

```shell
1
2
disposed
3
```

En resurs som kan disponeras måste följa `Disposable`-gränssnittet:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

`using`-deklarationer registrerar resursavyttringsoperationer i en stack, vilket säkerställer att de disponeras i omvänd ordning mot deklarationen:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

Resurser garanteras att disponeras, även om efterföljande kod eller undantag uppstår. Detta kan leda till att avyttringen potentiellt kastar ett undantag, som eventuellt undertrycker ett annat. För att behålla information om undertryckta fel introduceras ett nytt inbyggt undantag, `SuppressedError`.

#### await using-deklaration

En `await using`-deklaration hanterar en asynkront disponibel resurs. Värdet måste ha en `Symbol.asyncDispose`-metod, som kommer att inväntas vid blockets slut.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

För en asynkront disponibel resurs måste den följa antingen `Disposable`- eller `AsyncDisposable`-gränssnittet:

```typescript
// lib.esnext.disposable.d.ts
interface AsyncDisposable {
    [Symbol.asyncDispose](): Promise<void>;
}
```

<!-- skip -->
```typescript
//@ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDispose'); // Simple polify

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

Koden loggar:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

Deklarationerna `using` och `await using` är tillåtna i följande satser: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Importattribut

TypeScript 5.3:s importattribut (etiketter för importer) talar om för körmiljön hur moduler (JSON, etc.) ska hanteras. Detta förbättrar säkerheten genom att säkerställa tydliga importer och överensstämmer med Content Security Policy (CSP) för säkrare resursladdning. TypeScript säkerställer att de är giltiga men låter körmiljön hantera deras tolkning för specifik modulhantering.

Exempel:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

med dynamisk import:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```
