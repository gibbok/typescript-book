---
title: Inne
sidebar:
  order: 62
  label: 62. Inne
---


### Obsługa błędów i wyjątków

TypeScript pozwala przechwytywać i obsługiwać błędy za pomocą standardowych mechanizmów obsługi błędów języka JavaScript:

Bloki try-catch-finally:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

Można także obsługiwać różne typy błędów:

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

Niestandardowe typy błędów:

Można określić bardziej szczegółowe błędy, rozszerzając klasę `Error`:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Klasy domieszkowe

Klasy domieszkowe pozwalają łączyć i komponować zachowania z wielu klas w jedną klasę. Umożliwiają ponowne wykorzystywanie i rozszerzanie funkcjonalności bez potrzeby tworzenia głębokich łańcuchów dziedziczenia.

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

### Asynchroniczne funkcje języka

Ponieważ TypeScript jest nadzbiorem języka JavaScript, ma wbudowane asynchroniczne funkcje języka JavaScript, takie jak:

Obietnice:

Obietnice są sposobem obsługi operacji asynchronicznych i ich wyników za pomocą metod takich jak `.then()` i `.catch()`, które pozwalają obsługiwać pomyślne zakończenie oraz błędy.

Więcej informacji: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Słowa kluczowe `async`/`await` zapewniają składnię przypominającą kod synchroniczny podczas pracy z obietnicami. Słowo kluczowe `async` służy do definiowania funkcji asynchronicznej, a słowo kluczowe `await` jest używane wewnątrz funkcji asynchronicznej do wstrzymania wykonywania do czasu rozwiązania lub odrzucenia obietnicy.

Więcej informacji:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

Następujące interfejsy API są dobrze obsługiwane w TypeScript:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Iteratory i generatory

Zarówno iteratory, jak i generatory są dobrze obsługiwane w TypeScript.

Iteratory to obiekty implementujące protokół iteratora, który umożliwia dostęp po kolei do elementów kolekcji lub sekwencji. Jest to struktura zawierająca wskaźnik do następnego elementu iteracji. Iteratory mają metodę `next()`, która zwraca następną wartość w sekwencji wraz z wartością logiczną właściwości `done`, wskazującą, czy sekwencja została zakończona.

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

Generatory to specjalne funkcje definiowane przy użyciu składni `function*`, która upraszcza tworzenie iteratorów. Używają słowa kluczowego `yield` do definiowania sekwencji wartości oraz automatycznie wstrzymują i wznawiają wykonywanie, gdy wymagane są wartości.

Generatory ułatwiają tworzenie iteratorów i są szczególnie przydatne podczas pracy z dużymi lub nieskończonymi sekwencjami.

Przykład:

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

TypeScript obsługuje również iteratory asynchroniczne i generatory asynchroniczne.

Więcej informacji:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### Dokumentacja TsDocs JSDoc

Podczas pracy z bazą kodu JavaScript można pomóc TypeScriptowi w wywnioskowaniu właściwego typu, używając komentarzy JSDoc z dodatkowymi adnotacjami dostarczającymi informacje o typie.

Przykład:

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

Pełna dokumentacja jest dostępna pod tym adresem:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Od wersji 3.7 można generować definicje typów `.d.ts` ze składni JavaScript JSDoc.
Więcej informacji można znaleźć tutaj:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Pakiety należące do organizacji `@types` korzystają ze specjalnej konwencji nazewnictwa, która służy do dostarczania definicji typów dla istniejących bibliotek lub modułów JavaScript. Na przykład użycie:

```shell
npm install --save-dev @types/lodash
```

zainstaluje definicje typów biblioteki `lodash` w bieżącym projekcie.

Aby współtworzyć definicje typów pakietu `@types`, prześlij pull request do [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) to rozszerzenie składni języka JavaScript, które pozwala pisać kod podobny do HTML w plikach JavaScript lub TypeScript. Jest powszechnie używane w React do definiowania struktury HTML.

TypeScript rozszerza możliwości JSX, zapewniając sprawdzanie typów i analizę statyczną.

Aby używać JSX, należy ustawić opcję kompilatora `jsx` w pliku `tsconfig.json`. Dwie typowe opcje konfiguracji:

* `preserve`: generuje pliki `.jsx` z niezmienionym JSX. Ta opcja nakazuje TypeScriptowi zachować składnię JSX bez zmian i nie przekształcać jej podczas procesu kompilacji. Można jej użyć, jeśli osobne narzędzie, takie jak Babel, obsługuje przekształcanie.
* `react`: włącza wbudowane przekształcanie JSX w TypeScript. Zostanie użyte `React.createElement`.

Wszystkie opcje są dostępne tutaj:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### Moduły ES6

TypeScript obsługuje ES6 (ECMAScript 2015) i wiele późniejszych wersji. Oznacza to, że można używać składni ES6, takiej jak funkcje strzałkowe, literały szablonowe, klasy, moduły, destrukturyzacja i inne.

Aby włączyć funkcje ES6 w projekcie, można określić właściwość `target` w pliku `tsconfig.json`.

Przykład konfiguracji:

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

### Operator potęgowania ES7

Operator potęgowania (`**`) oblicza wartość otrzymaną przez podniesienie pierwszego operandu do potęgi określonej przez drugi operand. Działa podobnie do `Math.pow()`, ale dodatkowo może przyjmować wartości BigInt jako operandy.
TypeScript w pełni obsługuje ten operator po ustawieniu `target` w pliku `tsconfig.json` na `es2016` lub nowszy.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### Instrukcja for-await-of

Jest to funkcja języka JavaScript w pełni obsługiwana w TypeScript, która pozwala iterować po asynchronicznych obiektach iterowalnych, gdy wersja docelowa to `es2018`.

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

### Metawłaściwość new.target

W TypeScript można używać metawłaściwości `new.target`, która pozwala ustalić, czy funkcja lub konstruktor zostały wywołane przy użyciu operatora `new`. Umożliwia ona wykrycie, czy obiekt został utworzony w wyniku wywołania konstruktora.

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

### Wyrażenia importu dynamicznego

Można warunkowo lub leniwie ładować moduły na żądanie za pomocą propozycji ECMAScript dotyczącej importu dynamicznego, która jest obsługiwana w TypeScript.

Składnia wyrażeń importu dynamicznego w TypeScript wygląda następująco:

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

To polecenie uruchamia kompilator TypeScript z parametrem `--watch`, umożliwiając automatyczną ponowną kompilację plików TypeScript za każdym razem, gdy zostaną zmodyfikowane.

```shell
tsc --watch
```

Począwszy od TypeScript w wersji 4.9, monitorowanie plików opiera się głównie na zdarzeniach systemu plików i automatycznie przełącza się na odpytywanie, jeśli nie można ustanowić obserwatora opartego na zdarzeniach.

### Operator asercji non-null

Operator asercji non-null (przyrostkowy !), nazywany również asercją określonego przypisania, jest funkcją TypeScript, która pozwala zadeklarować, że zmienna lub właściwość nie jest równa null ani undefined, nawet jeśli statyczna analiza typów w TypeScript sugeruje, że może tak być. Ta funkcja umożliwia usunięcie jawnego sprawdzania.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Deklaracje z wartościami domyślnymi

Deklaracje z wartościami domyślnymi są używane, gdy zmiennej lub parametrowi przypisano wartość domyślną. Oznacza to, że jeśli dla tej zmiennej lub tego parametru nie zostanie podana żadna wartość, użyta zostanie wartość domyślna.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Łańcuch opcjonalny

Operator łańcucha opcjonalnego `?.` działa jak zwykły operator kropki (`.`), służący do uzyskiwania dostępu do właściwości lub metod. Jednak bezpiecznie obsługuje wartości null i undefined, kończąc obliczanie wyrażenia i zwracając `undefined` zamiast zgłaszania błędu.

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

### Operator koalescencji null

Operator koalescencji null `??` zwraca wartość prawego operandu, jeśli lewy operand ma wartość `null` lub `undefined`; w przeciwnym razie zwraca wartość lewego operandu.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Typy literałów szablonowych

Typy literałów szablonowych pozwalają manipulować wartościami ciągów znaków na poziomie typów i generować nowe typy ciągów na podstawie istniejących. Są przydatne do tworzenia bardziej wyrazistych i precyzyjnych typów na podstawie operacji na ciągach znaków.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Przeciążanie funkcji

Przeciążanie funkcji pozwala zdefiniować wiele sygnatur funkcji o tej samej nazwie, z których każda ma inne typy parametrów i typy zwracane.
Gdy wywoływana jest przeciążona funkcja, TypeScript używa przekazanych argumentów do określenia właściwej sygnatury funkcji:

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

### Typy rekurencyjne

Typ rekurencyjny to typ, który może odwoływać się do samego siebie. Jest to przydatne podczas definiowania hierarchicznych lub rekurencyjnych struktur danych (potencjalnie zagnieżdżonych w nieskończoność), takich jak listy wiązane, drzewa i grafy.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Rekurencyjne typy warunkowe

W TypeScript można definiować złożone relacje między typami za pomocą logiki i rekurencji.
Omówmy to w prosty sposób:

Typy warunkowe umożliwiają definiowanie typów na podstawie warunków logicznych:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

Rekurencja oznacza, że typ odwołuje się do samego siebie we własnej definicji:

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

Rekurencyjne typy warunkowe łączą logikę warunkową i rekurencję. Oznacza to, że definicja typu może zależeć od samej siebie poprzez logikę warunkową, tworząc złożone i elastyczne relacje między typami.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Obsługa modułów ECMAScript w Node

Node.js dodał obsługę modułów ECMAScript od wersji 15.3.0, a TypeScript obsługuje moduły ECMAScript dla Node.js od wersji 4.7. Obsługę tę można włączyć za pomocą właściwości `module` z wartością `nodenext` w pliku `tsconfig.json`. Oto przykład:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js obsługuje dwa rozszerzenia plików modułów: `.mjs` dla modułów ES i `.cjs` dla modułów CommonJS. Odpowiednie rozszerzenia plików w TypeScript to `.mts` dla modułów ES oraz `.cts` dla modułów CommonJS. Gdy kompilator TypeScript transpiluje te pliki do JavaScript, tworzy pliki `.mjs` i `.cjs`.

Aby używać modułów ES w projekcie, można ustawić właściwość `type` na `module` w pliku `package.json`. Informuje to środowisko Node.js, że projekt ma być traktowany jako projekt korzystający z modułów ES.

Ponadto TypeScript obsługuje także deklaracje typów w plikach `.d.ts`. Te pliki deklaracji dostarczają informacje o typach dla bibliotek lub modułów napisanych w TypeScript, umożliwiając innym programistom korzystanie z nich wraz ze sprawdzaniem typów i automatycznym uzupełnianiem w TypeScript.

### Funkcje asercji

W TypeScript funkcje asercji to funkcje, które poprzez swój typ zwracany wskazują, że określony warunek został zweryfikowany. W najprostszej postaci funkcja asercji sprawdza przekazany predykat i zgłasza błąd, gdy predykat przyjmuje wartość `false`.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Można ją również zadeklarować jako wyrażenie funkcyjne:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Funkcje asercji są podobne do strażników typów. Strażniki typów zostały pierwotnie wprowadzone w celu wykonywania kontroli w czasie działania i zapewnienia poprawnego typu wartości w określonym zakresie.
Strażnik typu jest funkcją, która oblicza predykat typu i zwraca wartość logiczną wskazującą, czy predykat jest prawdziwy, czy fałszywy. Różni się to nieco od funkcji asercji, których celem jest zgłoszenie błędu zamiast zwrócenia `false`, gdy predykat nie jest spełniony.

Przykład strażnika typu:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Wariadyczne typy krotek

Wariadyczne typy krotek to funkcja wprowadzona w TypeScript w wersji 4.0. Zacznijmy więc od przypomnienia, czym jest krotka:

Typ krotki to tablica o określonej długości, w której znany jest typ każdego elementu:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

Termin „wariadyczny” oznacza nieokreśloną arność (przyjmowanie zmiennej liczby argumentów).

Krotka wariadyczna jest typem krotki mającym wszystkie dotychczasowe właściwości, ale jej dokładny kształt nie został jeszcze zdefiniowany:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

W powyższym kodzie widać, że kształt krotki jest definiowany przez przekazany typ generyczny `T`.

Krotki wariadyczne mogą przyjmować wiele typów generycznych, dzięki czemu są bardzo elastyczne:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Dzięki nowym krotkom wariadycznym możemy korzystać z następujących możliwości:

* Elementy rozwijane w składni typu krotki mogą teraz być generyczne, dzięki czemu możemy reprezentować operacje wyższego rzędu na krotkach i tablicach, nawet gdy nie znamy rzeczywistych typów, na których działamy.
* Elementy reszty mogą występować w dowolnym miejscu krotki.

Przykład:

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

### Typy opakowujące

Typy opakowujące odnoszą się do obiektów opakowujących, które służą do reprezentowania typów pierwotnych jako obiektów. Obiekty te zapewniają dodatkowe funkcje i metody niedostępne bezpośrednio dla wartości pierwotnych.

Podczas uzyskiwania dostępu do metody takiej jak `charAt` lub `normalize` na wartości pierwotnego typu `string` JavaScript opakowuje ją w obiekt `String`, wywołuje metodę, a następnie odrzuca ten obiekt.

Przykład:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript odzwierciedla to rozróżnienie, udostępniając osobne typy dla wartości pierwotnych i odpowiadających im obiektów opakowujących:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Typy opakowujące zwykle nie są potrzebne. Należy unikać ich używania i zamiast tego korzystać z typów pierwotnych, na przykład `string` zamiast `String`.

### Kowariancja i kontrawariancja w TypeScript

Kowariancja i kontrawariancja opisują zachowanie relacji między typami w typach generycznych.

W TypeScript:

* Tablice są **kowariantne**, ale nie jest to w pełni bezpieczne pod względem typów.
* Typy parametrów funkcji są:
  * **kontrawariantne**, gdy włączona jest opcja `strictFunctionTypes`
  * **biwariantne** w przeciwnym razie

Kowariancja oznacza zachowanie relacji: jeśli typ A jest podtypem typu B, wówczas `F<A>` jest również podtypem `F<B>`. W TypeScript często występuje to w typach zwracanych i tablicach (chociaż kowariancja tablic nie jest w pełni bezpieczna pod względem typów).

Kontrawariancja oznacza odwrócenie relacji: jeśli typ A jest podtypem typu B, wówczas `F<B>` jest podtypem `F<A>`. W TypeScript typy parametrów funkcji mają być kontrawariantne, co oznacza, że funkcji przyjmującej szerszy typ można użyć tam, gdzie oczekiwana jest funkcja przyjmująca węższy typ.

W praktyce TypeScript często dopuszcza jednak biwariancję parametrów funkcji (chyba że włączono `strictFunctionTypes`), co oznacza, że mogą być akceptowane oba kierunki, nawet jeśli nie jest to ściśle bezpieczne pod względem typów.

Przykład: wyobraź sobie przestrzeń dla wszystkich zwierząt i oddzielną przestrzeń przeznaczoną tylko dla psów.

* **Kowariancja**:  
  Można użyć „przestrzeni dla psów” tam, gdzie oczekiwana jest „przestrzeń dla zwierząt”, ponieważ wszystkie psy są zwierzętami.  
  Nie można jednak użyć „przestrzeni dla zwierząt” tam, gdzie oczekiwana jest „przestrzeń dla psów”, ponieważ mogłaby zawierać zwierzęta inne niż psy.

* **Kontrawariancja** (w kontekście funkcji):  
  Jeśli mamy coś, co potrafi obsłużyć **dowolne zwierzę**, możemy tego użyć tam, gdzie oczekiwane jest coś, co obsługuje **tylko psy**.  
  Nie działa to jednak w drugą stronę.

Przykład kowariancji:

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

Przykład kontrawariancji:

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

#### Opcjonalne adnotacje wariancji parametrów typów

Od TypeScript w wersji 4.7.0 można używać słów kluczowych `out` i `in` do określania adnotacji wariancji.

W przypadku kowariancji należy użyć słowa kluczowego `out`:

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

W przypadku kontrawariancji należy użyć słowa kluczowego `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### Sygnatury indeksowe ze wzorcami ciągów szablonowych

Sygnatury indeksowe ze wzorcami ciągów szablonowych pozwalają definiować elastyczne sygnatury indeksowe przy użyciu wzorców ciągów szablonowych. Ta funkcja umożliwia tworzenie obiektów, które można indeksować za pomocą określonych wzorców kluczy tekstowych, zapewniając większą kontrolę i precyzję podczas uzyskiwania dostępu do właściwości oraz manipulowania nimi.

Od wersji 4.4 TypeScript pozwala stosować sygnatury indeksowe dla symboli i wzorców ciągów szablonowych.

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

### Operator satisfies

Operator `satisfies` pozwala sprawdzić, czy dany typ spełnia określony interfejs lub warunek. Innymi słowy, zapewnia, że typ ma wszystkie wymagane właściwości i metody konkretnego interfejsu. Jest to sposób na upewnienie się, że zmienna pasuje do definicji typu.
Oto przykład:

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

### Importy i eksporty wyłącznie typów

Importy i eksporty wyłącznie typów pozwalają importować lub eksportować typy bez importowania albo eksportowania wartości lub funkcji powiązanych z tymi typami. Może to być przydatne do zmniejszenia rozmiaru pakietu wynikowego.

Aby używać importów wyłącznie typów, można zastosować słowo kluczowe `import type`.

TypeScript pozwala używać rozszerzeń zarówno plików deklaracji, jak i implementacji (`.ts`, `.mts`, `.cts` oraz `.tsx`) w importach wyłącznie typów, niezależnie od ustawienia `allowImportingTsExtensions`.

Na przykład:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Obsługiwane są następujące formy:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### Deklaracja using i jawne zarządzanie zasobami

Deklaracja `using` jest niemutowalnym wiązaniem o zasięgu blokowym, podobnym do `const`, używanym do zarządzania zasobami wymagającymi zwolnienia. Po zainicjowaniu wiązania wartością metoda `Symbol.dispose` tej wartości jest rejestrowana, a następnie wykonywana przy opuszczaniu otaczającego zakresu blokowego.

Rozwiązanie to opiera się na mechanizmie Resource Management standardu ECMAScript, który jest przydatny do wykonywania niezbędnych zadań porządkowych po utworzeniu obiektu, takich jak zamykanie połączeń, usuwanie plików i zwalnianie pamięci.

Uwagi:

* Ze względu na niedawne wprowadzenie w TypeScript w wersji 5.2 większość środowisk wykonawczych nie obsługuje tej funkcji natywnie. Potrzebne będą polyfille dla: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
* Ponadto należy skonfigurować plik `tsconfig.json` w następujący sposób:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

Przykład:

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

Kod wyświetli:

```shell
1
2
disposed
3
```

Zasób kwalifikujący się do zwolnienia musi być zgodny z interfejsem `Disposable`:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

Deklaracje `using` rejestrują operacje zwalniania zasobów na stosie, zapewniając ich zwalnianie w kolejności odwrotnej do kolejności deklarowania:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

Zasoby zostaną zwolnione nawet wtedy, gdy późniejszy kod spowoduje wystąpienie wyjątków. Może to spowodować, że zwalnianie zasobu zgłosi wyjątek, potencjalnie tłumiąc inny. W celu zachowania informacji o stłumionych błędach wprowadzono nowy natywny wyjątek `SuppressedError`.

#### Deklaracja await using

Deklaracja `await using` obsługuje zasób zwalniany asynchronicznie. Wartość musi mieć metodę `Symbol.asyncDispose`, na którą oczekuje się na końcu bloku.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

Zasób zwalniany asynchronicznie musi być zgodny z interfejsem `Disposable` lub `AsyncDisposable`:

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

Kod wyświetla:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

Deklaracje `using` i `await using` są dozwolone w instrukcjach: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Atrybuty importu

Atrybuty importu w TypeScript 5.3 (etykiety importów) informują środowisko wykonawcze, jak obsługiwać moduły (JSON itp.). Zwiększa to bezpieczeństwo poprzez zapewnienie jednoznacznych importów i jest zgodne z Content Security Policy (CSP), umożliwiając bezpieczniejsze ładowanie zasobów. TypeScript zapewnia ich poprawność, ale interpretację dotyczącą obsługi konkretnych modułów pozostawia środowisku wykonawczemu.

Przykład:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

Z importem dynamicznym:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### Sprawdzanie składni wyrażeń regularnych

Od wersji 5.5.4 TypeScript sprawdza literały wyrażeń regularnych podczas kompilacji pod kątem typowych błędów (np. nieprawidłowej składni, błędnych odwołań wstecznych, funkcji nieobsługiwanych przez docelową wersję JavaScript). Pomaga to wcześniej wykrywać błędy, ale nie obejmuje ciągów przekazywanych do `new RegExp("...")`.

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

`import defer` pozwala załadować moduł, ale opóźnić jego wykonanie do chwili rzeczywistego użycia czegoś z tego modułu. Pomaga to uniknąć niepotrzebnej pracy i efektów ubocznych.

* Działa tylko z: `import defer * as name from "module"`.
* Kod jest wykonywany dopiero po uzyskaniu dostępu do eksportowanego elementu.
