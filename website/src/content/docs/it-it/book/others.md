---
title: Altri
sidebar:
  order: 61
  label: 61. Altri
---


### Gestione degli errori e delle eccezioni

TypeScript consente di rilevare e gestire gli errori utilizzando i meccanismi standard di gestione degli errori JavaScript:

Blocchi Try-Catch-Finally:

```typescript
try {
    // Codice che potrebbe generare un errore
} catch (error) {
    // Gestisci l'errore
} finally {
    // Codice che viene sempre eseguito, finally è facoltativo
}
```

È anche possibile gestire diversi tipi di errore:

```typescript
try {
    // Codice che potrebbe generare diversi tipi di errore
} catch (error) {
    if (error instanceof TypeError) {
        // Gestisci TypeError
    } else if (error instanceof RangeError) {
        // Gestisci RangeError
    } else {
        // Gestisci altri errori
    }
}
```

Tipi di errore personalizzati:

È possibile specificare errori più specifici estendendo la classe `Error`:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('Questo è un errore personalizzato.');
```

### Classi Mixin

Le classi Mixin consentono di combinare e comporre il comportamento di più classi in un'unica classe. Forniscono un modo per riutilizzare ed estendere le funzionalità senza la necessità di catene di ereditarietà profonde.

```typescript
abstract class Identificabile {
    name: string = '';

    logId() {
        console.log('id:', this.name);
    }
}

abstract class Selezionabile {
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

// Estendi MyClass per includere il comportamento di Identificabile e Selezionabile
interface MyClass extends Identificabile, Selezionabile {}

// Funzione per applicare i mixin a una classe
function applyMixins(source: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            const descriptor = Object.getOwnPropertyDescriptor(
                baseCtor.prototype,
                name
            );
            if (descriptor) {
                Object.defineProperty(source.prototype, name, descriptor);
            }
        });
    });
}

// Applica i mixin a MyClass
applyMixins(MyClass, [Identificabile, Selezionabile]);

let o = new MyClass();
o.name = 'abc';
o.logId();
o.select();
```

### Funzionalità del linguaggio asincrono

Essendo TypeScript un superset di JavaScript, integra funzionalità del linguaggio asincrono come:

Promise:

Le promise sono un modo per gestire le operazioni asincrone e i loro risultati utilizzando metodi come `.then()` e `.catch()` per gestire le condizioni di successo e di errore.

Per saperne di più: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Le parole chiave Async/await sono un modo per fornire una sintassi più sincrona per lavorare con le promise. La parola chiave `async` viene utilizzata per definire una funzione asincrona, mentre la parola chiave `await` viene utilizzata all'interno di una funzione asincrona per mettere in pausa l'esecuzione finché una Promise non viene risolta o rifiutata.

Per saperne di più:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

Le seguenti API sono ben supportate in TypeScript:

API Fetch:

[https://developer.mozilla.org/it/docs/Web/API/Fetch_API](https://developer.mozilla.org/it/docs/Web/API/Fetch_API)

Web Worker:
[https://developer.mozilla.org/it/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/it/docs/Web/API/Web_Workers_API)

Condiviso Worker:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Iteratori e Generatori

Sia gli Iteratori che i Generatori sono ben supportati in TypeScript.

Gli Iteratori sono oggetti che implementano il protocollo Iterator, fornendo un modo per accedere agli elementi di una collezione o sequenza uno alla volta. Si tratta di una struttura che contiene un puntatore all'elemento successivo nell'iterazione. Hanno un metodo `next()` che restituisce il valore successivo nella sequenza insieme a un valore booleano che indica se la sequenza è `completata`.

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

I generatori sono funzioni speciali definite utilizzando la sintassi `function*` che semplifica la creazione di iteratori. Utilizzano la parola chiave `yield` per definire la sequenza di valori e mettono automaticamente in pausa e riprendono l'esecuzione quando vengono richiesti valori.

I generatori semplificano la creazione di iteratori e sono particolarmente utili per lavorare con sequenze di grandi dimensioni o infinite.

Esempio:

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

TypeScript supporta anche iteratori e generatori asincroni.

Per saperne di più:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### Riferimento JSDoc di TsDocs

Quando si lavora con una base di codice JavaScript, è possibile aiutare TypeScript a dedurre il tipo corretto utilizzando commenti JSDoc con annotazioni aggiuntive per fornire informazioni sul tipo.

Esempio:

```typescript
/**
 * Calcola la potenza di un numero dato
 * @constructor
 * @param {number} base – Il valore base dell'espressione
 * @param {number} exponent – ​​Il valore esponente dell'espressione
 */
function power(base: number, exponent: number) {
    return Math.pow(base, exponent);
}
power(10, 2); // function power(base: number, exponent: number): number
```

La documentazione completa è disponibile a questo link:

[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Dalla versione 3.7 è possibile generare definizioni di tipo .d.ts dalla sintassi JavaScript JSDoc.
Ulteriori informazioni sono disponibili qui:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

I pacchetti nell'organizzazione @types sono convenzioni di denominazione speciali utilizzate per fornire definizioni di tipo per librerie o moduli JavaScript esistenti. Ad esempio, usando:

```shell
npm install --save-dev @types/lodash
```

Installerà le definizioni di tipo di `lodash` nel tuo progetto corrente.

Per contribuire alle definizioni di tipo del pacchetto @types, invia una pull request a [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) è un'estensione della sintassi del linguaggio JavaScript che consente di scrivere codice simile a HTML all'interno dei file JavaScript o TypeScript. Viene comunemente utilizzato in React per definire la struttura HTML.

TypeScript extends le funzionalità di JSX fornendo il controllo dei tipi e l'analisi statica.

Per utilizzare JSX è necessario impostare l'opzione del compilatore `jsx` nel file `tsconfig.json`. Due opzioni di configurazione comuni:

* "preserve": emette file .jsx con il JSX invariato. Questa opzione indica a TypeScript di mantenere la sintassi JSX così com'è e di non trasformarla durante il processo di compilazione. È possibile utilizzare questa opzione se si dispone di uno strumento separato, come Babel, che gestisce la trasformazione.
* "react": abilita la trasformazione JSX integrata di TypeScript. Verrà utilizzato React.createElement.

Tutte le opzioni sono disponibili qui:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### Moduli ES6

TypeScript supporta ES6 (ECMAScript 2015) e molte versioni successive. Ciò significa che è possibile utilizzare la sintassi ES6, come funzioni freccia, letterali template, classi, moduli, destrutturazione e altro ancora.

Per abilitare le funzionalità ES6 nel progetto, è possibile specificare la proprietà `target` nel file tsconfig.json.

Un esempio di configurazione:

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

### Operatore di elevamento a potenza ES7

L'operatore di elevamento a potenza (`**`) calcola il valore ottenuto elevando il primo operando alla potenza del secondo operando. Funziona in modo simile a `Math.pow()`, ma con la possibilità aggiuntiva di accettare BigInt come operandi.
TypeScript supporta pienamente questo operatore, utilizzandolo come `target` nel file tsconfig.json `es2016` o versione successiva.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### L'istruzione for-await-of

Questa è una funzionalità JavaScript completamente supportata in TypeScript che consente di iterare su oggetti iterabili asincroni dalla versione target es2018.

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

### Nuova meta-proprietà target

In TypeScript è possibile utilizzare la meta-proprietà `new.target`, che consente di determinare se una funzione o un costruttore è stato invocato utilizzando l'operatore new. Permette inoltre di rilevare se un oggetto è stato creato a seguito di una chiamata al costruttore.

```typescript
class Parent {
    constructor() {
        console.log(new.target); // Registra la funzione costruttore utilizzata per creare un'istanza
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

### Espressioni di importazione dinamica

È possibile caricare i moduli in modo condizionale o caricarli in modo differito su richiesta utilizzando la proposta ECMAScript per l'importazione dinamica, supportata in TypeScript.

La sintassi per le espressioni di importazione dinamica in TypeScript è la seguente:

<!-- skip -->
```typescript
async function renderWidget() {
    const container = document.getElementById('widget');
    if (container !== null) {
        const widget = await import('./widget'); // Importazione dinamica
        widget.render(container);
    }
}

renderWidget();
```

### "tsc –watch"

Questo comando avvia un compilatore TypeScript con il parametro `--watch`, con la possibilità di ricompilare automaticamente i file TypeScript ogni volta che vengono modificati.

```shell
tsc --watch
```

A partire dalla versione 4.9 di TypeScript, il monitoraggio dei file si basa principalmente sugli eventi del file system, ricorrendo automaticamente al polling se non è possibile stabilire un watcher basato sugli eventi.

### Operatore di asserzione non nullo

L'operatore di asserzione non nullo (Postfix !), noto anche come asserzione di assegnazione definita, è una funzionalità di TypeScript che consente di affermare che una variabile o una proprietà non è nulla o indefinita, anche se l'analisi statica dei tipi di TypeScript suggerisce che potrebbe esserlo. Con questa funzionalità è possibile rimuovere qualsiasi controllo esplicito.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Dichiarazioni predefinite

Le dichiarazioni predefinite vengono utilizzate quando a una variabile o a un parametro viene assegnato un valore predefinito. Ciò significa che se non viene fornito alcun valore per quella variabile o parametro, verrà utilizzato il valore predefinito.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Ciao, ${name}!`);
}
greet(); // Ciao, Anonymous!
greet('John'); // Ciao, John!
```

### Concatenamento opzionale

L'operatore di concatenamento opzionale `?.` funziona come il normale operatore punto (`.`) per accedere a proprietà o metodi. Tuttavia, gestisce in modo elegante i valori nulli o indefiniti terminando l'espressione e restituendo `undefined`, invece di generare un errore.

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

console.log(person.address?.city); // indefinito
```

### Operatore di coalescenza nullo

L'operatore di coalescenza nullo `??` restituisce il valore del lato destro se il lato sinistro è `null` o `undefined`; in caso contrario, restituisce il valore del lato sinistro.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Tipi letterali di template

I tipi letterali modello consentono di manipolare i valori stringa a livello di tipo e di generare nuovi tipi stringa basati su quelli esistenti. Sono utili per creare tipi più espressivi e precisi da operazioni basate su stringhe.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Sovraccarico di funzioni

Il sovraccarico di funzioni consente di definire più firme di funzione per lo stesso nome di funzione, ciascuna con tipi di parametro e tipo di ritorno diversi.
Quando si chiama una funzione sovraccaricata, TypeScript utilizza gli argomenti forniti per determinare la firma di funzione corretta:

```typescript
function makeGreeting(name: string): string;
function makeGreeting(names: string[]): string[];

function makeGreeting(person: unknown): unknown {
    if (typeof person === 'string') {
        return `Ciao ${person}!`;
    } else if (Array.isArray(person)) {
        return person.map(name => `Ciao, ${name}!`);
    }
    throw new Error('Impossibile salutare');
}

makeGreeting('Simon');
makeGreeting(['Simone', 'John']);
```

### Tipi ricorsivi

Un tipo ricorsivo è un tipo che può fare riferimento a se stesso. Questo è utile per definire strutture dati che hanno una struttura gerarchica o ricorsiva (annidamento potenzialmente infinito), come liste concatenate, alberi e grafi.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Tipi condizionali ricorsivi

È possibile definire relazioni di tipo complesse utilizzando la logica e la ricorsione in TypeScript.
Analizziamole in termini semplici:

Tipi condizionali: consente di definire tipi in base a condizioni booleane:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

Ricorsione: indica una definizione di tipo che fa riferimento a se stessa all'interno della propria definizione:

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

I tipi condizionali ricorsivi combinano sia la logica condizionale che la ricorsione. Ciò significa che una definizione di tipo può dipendere da se stessa tramite la logica condizionale, creando relazioni di tipo complesse e flessibili.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Supporto per i moduli ECMAScript in Node

Node.js ha aggiunto il supporto per i moduli ECMAScript a partire dalla versione 15.3.0, mentre TypeScript supporta i moduli ECMAScript per Node.js dalla versione 4.7. Questo supporto può essere abilitato utilizzando la proprietà `module` con il valore `nodenext` nel file tsconfig.json. Ecco un esempio:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js supporta due estensioni di file per i moduli: `.mjs` per i moduli ES e `.cjs` per i moduli CommonJS. Le estensioni di file equivalenti in TypeScript sono `.mts` per i moduli ES e `.cts` per i moduli CommonJS. Quando il compilatore TypeScript trascrive questi file in JavaScript, creerà i file `.mjs` e `.cjs`.

Se desideri utilizzare moduli ES nel tuo progetto, puoi impostare la proprietà `type` su "module" nel file package.json. Questo indica a Node.js di trattare il progetto come un progetto di modulo ES.

Inoltre, TypeScript supporta anche le dichiarazioni di tipo nei file .d.ts. Questi file di dichiarazione forniscono informazioni sul tipo per librerie o moduli scritti in TypeScript, consentendo ad altri sviluppatori di utilizzarli con le funzionalità di controllo del tipo e di completamento automatico di TypeScript.

### Funzioni di asserzione

In TypeScript, le funzioni di asserzione sono funzioni che indicano la verifica di una condizione specifica in base al loro valore di ritorno. Nella loro forma più semplice, una funzione di asserzione esamina un predicato fornito e genera un errore quando il predicato restituisce false.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Oppure può essere dichiarato come espressione di funzione:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Le funzioni di asserzione condividono alcune somiglianze con le type guard. Le type guard sono state inizialmente introdotte per eseguire controlli in fase di esecuzione e garantire il tipo di un valore all'interno di un ambito specifico.
Nello specifico, una type guard è una funzione che valuta un predicato di tipo e restituisce un valore booleano che indica se il predicato è vero o falso. Questo differisce leggermente dalle funzioni di asserzione, in cui l'intenzione è quella di generare un errore anziché restituire false quando il predicato non è soddisfatto.

Esempio di type guard:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Tipi di tupla variadici

I tipi di tupla variadici sono una funzionalità introdotta nella versione 4.0 di TypeScript. Iniziamo a conoscerli ripassando cos'è una tupla:

Un tipo di tupla è un array di lunghezza definita, di cui è noto il tipo di ogni elemento:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

Il termine "variadico" significa indefinito (accetta un numero variabile di argomenti).

Una tupla variadica è un tipo di tupla che ha tutte le proprietà di prima, ma la forma esatta non è ancora definita:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [booleano, booleano, numero]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

Nel codice precedente possiamo vedere che la forma della tupla è definita dal generico `T` passato.

Le tuple variadiche possono accettare più generici, il che le rende molto flessibili:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Con le nuove tuple variadiche possiamo usare:

* Gli spread nella sintassi dei tipi di tupla ora possono essere generici, quindi possiamo rappresentare operazioni di ordine superiore su tuple e array anche quando non conosciamo i tipi effettivi su cui stiamo operando.
* Gli elementi rimanenti possono trovarsi ovunque in una tupla.

Esempio:

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

### Tipi boxed

I tipi boxed si riferiscono agli oggetti wrapper utilizzati per rappresentare i tipi primitivi come oggetti. Questi oggetti wrapper forniscono funzionalità e metodi aggiuntivi che non sono disponibili direttamente sui valori primitivi.

Quando si accede a un metodo come `charAt` o `normalize` su una primitiva `string`, JavaScript lo racchiude in un oggetto `String`, chiama il metodo e quindi elimina l'oggetto.

Dimostrazione:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript rappresenta questa differenziazione fornendo tipi separati per le primitive e i corrispondenti wrapper di oggetti:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

I tipi boxed di solito non sono necessari. Evitare di utilizzare tipi boxed e utilizzare invece type per le primitive, ad esempio `string` invece di `String`.

### Covarianza e Controvarianza in TypeScript

Covarianza e Controvarianza vengono utilizzate per descrivere il funzionamento delle relazioni quando si ha a che fare con l'ereditarietà o l'assegnazione di tipi.

Covarianza significa che una relazione di tipo preserva la direzione dell'ereditarietà o dell'assegnazione, quindi se un tipo A è un sottotipo del tipo B, anche un array di tipo A è considerato un sottotipo di un array di tipo B. La cosa importante da notare qui è che la relazione di sottotipo viene mantenuta, il che significa che Covarianza accetta il sottotipo ma non il supertipo.

La controvarianza significa che una relazione di tipo inverte la direzione dell'ereditarietà o dell'assegnazione, quindi se un tipo A è un sottotipo del tipo B, allora un array di tipo B è considerato un sottotipo di un array di tipo A. La relazione di sottotipo è invertita, il che significa che la controvarianza accetta il supertipo ma non il sottotipo.

Note: La bivarianza significa accettare sia il supertipo che il sottotipo.

Esempio: supponiamo di avere uno spazio per tutti gli animali e uno spazio separato solo per i cani.

In covarianza, puoi inserire tutti i cani nello spazio degli animali perché i cani sono un tipo di animale. Ma non puoi inserire tutti gli animali nello spazio dei cani perché potrebbero esserci altri animali mescolati.

In controvarianza, non puoi inserire tutti gli animali nello spazio dei cani perché lo spazio degli animali potrebbe contenere anche altri animali. Tuttavia, puoi inserire tutti i cani nello spazio degli animali perché tutti i cani sono anche animali.

<!-- skip -->
```typescript
// Esempio di covarianza
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

// La covarianza consente di assegnare l'array del sottotipo (Dog) all'array del supertipo (Animal)
animals = dogs;
dogs = animals; // Non valido: il tipo 'Animal[]' non è assegnabile al tipo 'Dog[]'

// Esempio di controvarianza
type Feed<in T> = (animal: T) => void;

let feedAnimal: Feed<Animal> = (animal: Animal) => {
    console.log(`Nome animale: ${animal.name}`);
};

let feedDog: Feed<Dog> = (dog: Dog) => {
    console.log(`Nome del cane: ${dog.name}, Razza: ${dog.breed}`);
};

// La controvarianza consente di assegnare la callback del supertipo (Animal) alla callback del sottotipo (Dog)
feedDog = feedAnimal;
feedAnimal = feedDog; // Non valido: il tipo 'Feed<Dog>' non è assegnabile al tipo 'Feed<Animal>'.
```

In TypeScript, le relazioni di tipo per gli array sono covarianti, mentre le relazioni di tipo per i parametri di funzione sono controvarianti. Ciò significa che TypeScript presenta sia covarianza che controvarianza, a seconda del contesto.

#### Annotazioni di varianza opzionali per i parametri di tipo

A partire da TypeScript 4.7.0, possiamo usare le parole chiave `out` e `in` per specificare l'annotazione di varianza.

Per la covarianza, usare la parola chiave `out`:

```typescript
type AnimalCallback<out T> = () => T; // T è covariante in questo caso
```

E per la controvarianza, usare la parola chiave `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T è controvariante in questo caso
```

### Firme di indice con pattern di stringhe modello

Le firme di indice con pattern di stringhe modello ci consentono di definire firme di indice flessibili utilizzando pattern di stringhe modello. Questa funzionalità ci consente di creare oggetti che possono essere indicizzati con pattern specifici di chiavi stringa, offrendo maggiore controllo e specificità durante l'accesso e la manipolazione delle proprietà.

TypeScript dalla versione 4.4 consente firme di indice per simboli e pattern di stringhe modello.

```typescript
const uniqueSymbol = Symbol('description');

type MyKeys = `key-${string}`;

type MyObject = {
    [uniqueSymbol]: string;
    [key: MyKeys]: number;
};

const obj: MyObject = {
    [uniqueSymbol]: 'Chiave simbolo univoca',
    'key-a': 123,
    'key-b': 456,
};

console.log(obj[uniqueSymbol]); // Chiave simbolo univoca
console.log(obj['key-a']); // 123
console.log(obj['key-b']); // 456
```

### Operatore `satisfies`

L'operatore `satisfies` consente di verificare se un dato tipo soddisfa una specifica interfaccia o condizione. In altre parole, garantisce che un tipo abbia tutte le proprietà e i metodi richiesti da una specifica interfaccia. È un modo per garantire che una variabile rientri nella definizione di un tipo.
Ecco un esempio:

<!-- skip -->
```typescript
type Columns = 'name' | 'nickName' | 'attributes';

type User = Record<Columns, string | string[] | undefined>;

// Annotazione del tipo tramite `User`
const user: User = {
    name: 'Simone',
    nickName: undefined,
    attributes: ['dev', 'admin'],
};

// Nelle righe seguenti, TypeScript non sarà in grado di dedurre correttamente
user.attributes?.map(console.log); // La proprietà 'map' non esiste sul tipo 'string | string[]'. La proprietà 'map' non esiste sul tipo 'string'.
user.nickName; // string | string[] | undefined

// Asserzione di tipo tramite `as`
const user2 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} as User;

// Anche in questo caso, TypeScript non sarà in grado di dedurre correttamente
user2.attributes?.map(console.log); // La proprietà 'map' non esiste sul tipo 'string | string[]'. La proprietà 'map' non esiste sul tipo 'string'.
user2.nickName; // string | string[] | undefined

// Utilizzando gli operatori `satisfies` ora possiamo dedurre correttamente i tipi
const user3 = {
    name: 'Simon',
    nickName: undefined,
    attributes: ['dev', 'admin'],
} satisfies User;

user3.attributes?.map(console.log); // TypeScript deduce correttamente: string[]
user3.nickName; // TypeScript deduce correttamente: undefined
```

### Importazioni ed esportazioni solo per tipo

Le importazioni ed esportazioni solo per tipo consentono di importare o esportare tipi senza importare o esportare i valori o le funzioni associati a tali tipi. Questo può essere utile per ridurre le dimensioni del bundle.

Per utilizzare le importazioni solo per tipo, è possibile utilizzare la parola chiave `import type`.

TypeScript consente l'utilizzo di estensioni di file sia di dichiarazione che di implementazione (.ts, .mts, .cts e .tsx) nelle importazioni solo tipo, indipendentemente dalle impostazioni `allowImportingTsExtensions`.

Ad esempio:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Sono supportati i seguenti formati:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### Dichiarazione using e Gestione Risorse Esplicita

Una dichiarazione `using` è un binding immutabile con ambito a blocco, simile a `const`, utilizzato per la gestione delle risorse usa e getta. Quando inizializzato con un valore, il metodo `Symbol.dispose` di quel valore viene registrato e successivamente eseguito all'uscita dall'ambito del blocco che lo racchiude.

Questo si basa sulla funzionalità di Gestione Risorse di ECMAScript, utile per eseguire attività di pulizia essenziali dopo la creazione di oggetti, come la chiusura di connessioni, l'eliminazione di file e il rilascio di memoria.

Note:

* A causa della sua recente introduzione nella versione 5.2 di TypeScript, la maggior parte dei runtime non dispone di supporto nativo. Sono necessari polyfill per: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`. \* Inoltre, dovrai configurare il tuo file tsconfig.json come segue:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["es2022", "esnext.disposable", "dom"]
  }
}
```

Esempio:

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
    using work = doWork(); // La risorsa è dichiarata
    console.log(2);
} // La risorsa viene eliminata (ad esempio, viene valutata `work[Symbol.dispose]()`)

console.log(3);
```

Il codice registrerà:

```shell
1
2
disposed
3
```

Una risorsa idonea per l'eliminazione deve rispettare l'interfaccia `Disposable`:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

Le dichiarazioni `using` registrano le operazioni di eliminazione delle risorse in uno stack, assicurandosi che vengano eliminate nell'ordine inverso rispetto alla dichiarazione:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // elimina `C`, poi `B`, poi `A`.
```

È garantito che le risorse vengano eliminate, anche se si verificano codice o eccezioni successive. Questo potrebbe portare alla generazione di un'eccezione durante l'eliminazione, con la possibile soppressione di un'altra. Per conservare le informazioni sugli errori soppressi, è stata introdotta una nuova eccezione nativa, `SuppressedError`.

#### dichiarazione await using

Una dichiarazione `await using` gestisce una risorsa eliminabile in modo asincrono. Il valore deve avere un metodo `Symbol.asyncDispose`, che verrà atteso alla fine del blocco.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // La risorsa viene dichiarata
} // La risorsa viene eliminata (ad esempio, viene valutata `await work[Symbol.asyncDispose]()`)
```

Per una risorsa eliminabile in modo asincrono, deve aderire all'interfaccia `Disposable` o `AsyncDisposable`:

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
    // Un metodo che viene chiamato quando l'oggetto viene eliminato in modo asincrono
    [Symbol.asyncDispose]() {
        // Chiude la connessione e restituisce una promessa
        return this.close();
    }

    async close() {
        console.log('Chiusura della connessione...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Connessione chiusa.');
    }
}

async function doWork() {
    // Crea una nuova connessione e la elimina in modo asincrono quando esce dall'ambito
    await using connection = new DatabaseConnection(); // La risorsa viene dichiarata
    console.log('Sto lavorando...');
} // La risorsa viene eliminata (ad esempio, viene valutato `await connection[Symbol.asyncDispose]()`)

doWork();
```

Il codice registra:

```shell
Sto lavorando...
Chiusura della connessione...
Connessione chiusa.
```

Le dichiarazioni `using` e `await using` sono consentite nelle istruzioni: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Attributi di importazione

Gli attributi di importazione di TypeScript 5.3 (etichette per le importazioni) indicano al runtime come gestire i moduli (JSON, ecc.). Questo migliora la sicurezza garantendo importazioni chiare e si allinea con la Content Security Policy (CSP) per un caricamento più sicuro delle risorse. TypeScript garantisce che siano validi, ma lascia che sia il runtime a gestirne l'interpretazione per la gestione di moduli specifici.

Esempio:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

con importazione dinamica:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```
