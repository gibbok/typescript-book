---
title: Ostatní
sidebar:
  order: 62
  label: 62. Ostatní
---


### Chyby a zpracování výjimek

TypeScript umožňuje zachytávat a zpracovávat chyby pomocí standardních mechanismů JavaScriptu pro zpracování chyb:

Bloky Try-Catch-Finally:

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

Můžete také zpracovávat různé typy chyb:

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

Vlastní typy chyb:

Konkrétnější chyby lze definovat rozšířením třídy (`class`) Error:

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Mixinové třídy

Mixinové třídy umožňují kombinovat a skládat chování více tříd do jediné třídy. Poskytují způsob, jak opakovaně používat a rozšiřovat funkcionalitu bez nutnosti hlubokých řetězců dědičnosti.

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

### Asynchronní jazykové funkce

Protože je TypeScript nadmnožinou JavaScriptu, má vestavěné asynchronní jazykové funkce JavaScriptu, jako jsou:

Promise:

Promise představují způsob, jak zpracovávat asynchronní operace a jejich výsledky pomocí metod jako `.then()` a `.catch()` pro zpracování úspěšných a chybových stavů.

Další informace: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await:

Klíčová slova async/await poskytují syntaxi pro práci s Promise, která více připomíná synchronní kód. Klíčové slovo `async` slouží k definici asynchronní funkce a klíčové slovo `await` se používá uvnitř asynchronní funkce k pozastavení vykonávání, dokud není Promise splněna nebo odmítnuta.

Další informace:
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

Následující API jsou v TypeScriptu dobře podporována:

Fetch API:
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers:
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket:
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Iterátory a generátory

Iterátory i generátory jsou v TypeScriptu dobře podporovány.

Iterátory jsou objekty, které implementují protokol iterátoru a poskytují způsob, jak postupně přistupovat k jednotlivým prvkům kolekce nebo posloupnosti. Jde o strukturu, která obsahuje ukazatel na další prvek v iteraci. Mají metodu `next()`, která vrací další hodnotu v posloupnosti spolu s booleovskou hodnotou udávající, zda je posloupnost dokončena (`done`).

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

Generátory jsou speciální funkce definované pomocí syntaxe `function*`, která zjednodušuje vytváření iterátorů. Pomocí klíčového slova `yield` definují posloupnost hodnot a při požadavcích na hodnoty automaticky pozastavují a obnovují vykonávání.

Generátory usnadňují vytváření iterátorů a jsou zvláště užitečné při práci s velkými nebo nekonečnými posloupnostmi.

Příklad:

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

TypeScript také podporuje asynchronní iterátory a asynchronní generátory.

Další informace:

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### Referenční příručka TsDocs JSDoc

Při práci s kódovou základnou v JavaScriptu lze TypeScriptu pomoci odvodit správný typ pomocí komentářů JSDoc s dodatečnými anotacemi poskytujícími informace o typech.

Příklad:

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

Úplná dokumentace je k dispozici na tomto odkazu:
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Od verze 3.7 lze generovat definice typů .d.ts ze syntaxe JSDoc v JavaScriptu.
Další informace naleznete zde:
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Balíčky v organizaci @types využívají speciální konvenci pojmenování balíčků, které poskytují definice typů pro existující knihovny nebo moduly JavaScriptu. Například použitím:

```shell
npm install --save-dev @types/lodash
```

nainstalujete definice typů pro `lodash` do svého aktuálního projektu.

Chcete-li přispět k definicím typů balíčku `@types`, odešlete prosím pull request do [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) je rozšíření syntaxe jazyka JavaScript, které umožňuje psát kód podobný HTML v souborech JavaScriptu nebo TypeScriptu. Běžně se používá v Reactu k definování struktury HTML.

TypeScript rozšiřuje možnosti JSX tím, že poskytuje kontrolu typů a statickou analýzu.

Chcete-li používat JSX, musíte nastavit volbu kompilátoru `jsx` v souboru `tsconfig.json`. Dvě běžné možnosti konfigurace:

* "preserve": generuje soubory .jsx s nezměněným JSX. Tato volba říká TypeScriptu, aby zachoval syntaxi JSX tak, jak je, a během kompilace ji netransformoval. Tuto volbu můžete použít, pokud máte samostatný nástroj, například Babel, který transformaci provádí.
* "react": zapíná vestavěnou transformaci JSX v TypeScriptu. Bude použito React.createElement.

Všechny možnosti jsou k dispozici zde:
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### Moduly ES6

TypeScript podporuje ES6 (ECMAScript 2015) a mnoho následujících verzí. To znamená, že můžete používat syntaxi ES6, například šipkové funkce, šablonové literály, třídy, moduly, destrukturování a další.

Chcete-li ve svém projektu povolit funkce ES6, můžete v tsconfig.json zadat vlastnost `target`.

Příklad konfigurace:

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

### Operátor umocňování ES7

Operátor umocňování (`**`) vypočítá hodnotu získanou umocněním prvního operandu na mocninu danou druhým operandem. Funguje podobně jako `Math.pow()`, ale navíc může jako operandy přijímat hodnoty BigInt.
TypeScript tento operátor plně podporuje při nastavení `target` v souboru tsconfig.json na `es2016` nebo vyšší.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### Příkaz for-await-of

Jde o funkci JavaScriptu plně podporovanou v TypeScriptu, která umožňuje iterovat přes asynchronní iterovatelné objekty s cílovou verzí `es2018`.

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

### Metavlastnost new.target

V TypeScriptu můžete použít metavlastnost `new.target`, která umožňuje zjistit, zda byla funkce nebo konstruktor vyvolán pomocí operátoru new. Umožňuje rozpoznat, zda byl objekt vytvořen v důsledku volání konstruktoru.

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

### Výrazy dynamického importu

Pomocí návrhu ECMAScriptu pro dynamický import, který je v TypeScriptu podporován, lze moduly načítat podmíněně nebo je načítat odloženě na vyžádání.

Syntaxe výrazů dynamického importu v TypeScriptu je následující:

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

Tento příkaz spustí kompilátor TypeScriptu s parametrem `--watch`, který umožňuje automaticky znovu kompilovat soubory TypeScriptu při každé jejich změně.

```shell
tsc --watch
```

Od verze TypeScriptu 4.9 se sledování souborů spoléhá především na události souborového systému a automaticky přechází na pravidelné dotazování, pokud nelze zřídit sledování založené na událostech.

### Operátor potvrzení nenulové hodnoty

Operátor potvrzení nenulové hodnoty (postfix !), označovaný také jako potvrzení zaručeného přiřazení, je funkce TypeScriptu, která umožňuje deklarovat, že proměnná nebo vlastnost není null ani undefined, i když statická analýza typů TypeScriptu naznačuje, že by mohla být. Díky této funkci lze odstranit veškeré explicitní kontroly.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Deklarace s výchozími hodnotami

Deklarace s výchozími hodnotami se používají, když je proměnné nebo parametru přiřazena výchozí hodnota. To znamená, že pokud pro danou proměnnou nebo parametr není poskytnuta žádná hodnota, použije se místo ní výchozí hodnota.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Volitelné řetězení

Operátor volitelného řetězení `?.` funguje jako běžný tečkový operátor (`.`) pro přístup k vlastnostem nebo metodám. Hodnoty null a undefined však ošetřuje ukončením výrazu a vrácením `undefined` namísto vyvolání chyby.

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

### Operátor slučování nulových hodnot

Operátor slučování nulových hodnot `??` vrací hodnotu na pravé straně, pokud je hodnota na levé straně `null` nebo `undefined`; jinak vrací hodnotu na levé straně.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Typy šablonových literálů

Typy šablonových literálů umožňují manipulovat s řetězcovými hodnotami na úrovni typů a generovat nové řetězcové typy na základě existujících. Jsou užitečné pro vytváření výstižnějších a přesnějších typů z operací s řetězci.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Přetěžování funkcí

Přetěžování funkcí umožňuje definovat více signatur pro stejný název funkce, každou s jinými typy parametrů a návratovými typy.
Při volání přetížené funkce TypeScript použije předané argumenty k určení správné signatury funkce:

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

### Rekurzivní typy

Rekurzivní typ je typ, který může odkazovat sám na sebe. To je užitečné pro definování datových struktur s hierarchickou nebo rekurzivní strukturou (potenciálně nekonečným vnořením), například spojových seznamů, stromů a grafů.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Rekurzivní podmíněné typy

V TypeScriptu lze pomocí logiky a rekurze definovat složité vztahy mezi typy.
Rozeberme si to jednoduše:

Podmíněné typy umožňují definovat typy na základě booleovských podmínek:

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

Rekurze znamená definici typu, která v rámci své vlastní definice odkazuje sama na sebe:

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

Rekurzivní podmíněné typy kombinují podmíněnou logiku a rekurzi. To znamená, že definice typu může prostřednictvím podmíněné logiky záviset sama na sobě a vytvářet tak složité a flexibilní vztahy mezi typy.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Podpora modulů ECMAScript v Node

Node.js přidal podporu modulů ECMAScript od verze 15.3.0 a TypeScript podporuje moduly ECMAScript pro Node.js od verze 4.7. Tuto podporu lze zapnout pomocí vlastnosti `module` s hodnotou `nodenext` v souboru tsconfig.json. Zde je příklad:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js podporuje dvě přípony souborů pro moduly: `.mjs` pro moduly ES a `.cjs` pro moduly CommonJS. Odpovídající přípony souborů v TypeScriptu jsou `.mts` pro moduly ES a `.cts` pro moduly CommonJS. Když kompilátor TypeScriptu transpiluje tyto soubory do JavaScriptu, vytvoří soubory `.mjs` a `.cjs`.

Chcete-li ve svém projektu používat moduly ES, můžete v souboru package.json nastavit vlastnost `type` na "module". Tím sdělíte Node.js, aby projekt považoval za projekt s moduly ES.

TypeScript navíc podporuje deklarace typů v souborech .d.ts. Tyto deklarační soubory poskytují informace o typech pro knihovny nebo moduly napsané v TypeScriptu a umožňují ostatním vývojářům využívat je s kontrolou typů a automatickým doplňováním TypeScriptu.

### Aserční funkce

V TypeScriptu jsou aserční funkce takové funkce, které na základě své návratové hodnoty indikují ověření konkrétní podmínky. V nejjednodušší podobě aserční funkce zkoumá předaný predikát a vyvolá chybu, když se predikát vyhodnotí jako false.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Nebo ji lze deklarovat jako výraz funkce:

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Aserční funkce mají podobné vlastnosti jako typoví strážci. Typoví strážci byli původně zavedeni k provádění kontrol za běhu a k zajištění typu hodnoty v určitém rozsahu platnosti.
Konkrétně je typový strážce funkce, která vyhodnocuje typový predikát a vrací booleovskou hodnotu udávající, zda je predikát pravdivý, či nepravdivý. To se mírně liší od aserčních funkcí, jejichž záměrem je při nesplnění predikátu vyvolat chybu místo vrácení false.

Příklad typového strážce:

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Variadické typy n-tic

Variadické typy n-tic jsou funkcí zavedenou v TypeScriptu verze 4.0, proto si nejprve připomeňme, co je n-tice:

Typ n-tice je pole, které má definovanou délku a u něhož je znám typ každého prvku:

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

Termín „variadický“ znamená neurčitou aritu (přijímání proměnného počtu argumentů).

Variadická n-tice je typ n-tice, který má všechny výše uvedené vlastnosti, ale jeho přesná podoba ještě není definována:

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

V předchozím kódu vidíme, že podobu n-tice určuje předaný generický parametr `T`.

Variadické n-tice mohou přijímat více generických parametrů, díky čemuž jsou velmi flexibilní:

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

S novými variadickými n-ticemi můžeme využít následující:

* Rozvinutí v syntaxi typů n-tic mohou být nyní generická, takže můžeme reprezentovat operace vyššího řádu nad n-ticemi a poli, i když neznáme skutečné typy, nad kterými pracujeme.
* Zbytkové prvky se mohou v n-tici vyskytovat kdekoli.

Příklad:

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

### Obalové typy

Obalové typy označují obalové objekty, které slouží k reprezentaci primitivních typů jako objektů. Tyto obalové objekty poskytují další funkcionalitu a metody, které nejsou dostupné přímo u primitivních hodnot.

Když přistupujete k metodě jako `charAt` nebo `normalize` u primitivní hodnoty typu `string`, JavaScript ji zabalí do objektu `String`, zavolá metodu a poté objekt zahodí.

Ukázka:

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript toto rozlišení reprezentuje tím, že poskytuje samostatné typy pro primitivní hodnoty a jejich odpovídající objektové obaly:

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Obalové typy obvykle nejsou potřeba. Vyhněte se používání obalových typů a místo nich používejte primitivní typy, například `string` namísto `String`.

### Kovariance a kontravariance v TypeScriptu

Kovariance a kontravariance popisují, jak se vztahy mezi typy chovají v generických typech.

V TypeScriptu:

* Pole jsou **kovariantní**, ale není to plně typově bezpečné.
* Typy parametrů funkcí jsou:
  * **kontravariantní**, když je zapnuto `strictFunctionTypes`
  * **bivariantní** v ostatních případech

Kovariance znamená, že vztah zůstává zachován: pokud je typ A podtypem typu B, pak je `F<A>` také podtypem `F<B>`. V TypeScriptu se to běžně objevuje u návratových typů a polí (ačkoli kovariance polí není plně typově bezpečná).

Kontravariance znamená, že se vztah obrací: pokud je typ A podtypem typu B, pak je `F<B>` podtypem `F<A>`. V TypeScriptu mají být typy parametrů funkcí kontravariantní, což znamená, že funkci přijímající širší typ lze použít tam, kde se očekává užší typ.

V praxi však TypeScript často umožňuje u parametrů funkcí bivarianci (pokud není zapnuto `strictFunctionTypes`), což znamená, že mohou být přijaty oba směry, i když to není striktně typově bezpečné.

Příklad: Představte si prostor pro všechna zvířata a samostatný prostor pouze pro psy.

* **Kovariance**:  
  Můžete použít „prostor pro psy“ tam, kde se očekává „prostor pro zvířata“, protože všichni psi jsou zvířata.  
  Nemůžete však použít „prostor pro zvířata“ tam, kde se očekává „prostor pro psy“, protože by mohl obsahovat i jiná zvířata než psy.

* **Kontravariance** (uvažujte v pojmech funkcí):  
  Pokud máte něco, co dokáže pracovat s **jakýmkoli zvířetem**, můžete to použít tam, kde se očekává něco, co pracuje **pouze se psy**.  
  Opačně to ale neplatí.

Příklad kovariance:

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

Příklad kontravariance:

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

#### Volitelné anotace variance pro typové parametry

Od TypeScriptu 4.7.0 můžeme k určení anotací variance používat klíčová slova `out` a `in`.

Pro kovarianci použijte klíčové slovo `out`:

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

A pro kontravarianci použijte klíčové slovo `in`:

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### Indexové signatury se vzory šablonových řetězců

Indexové signatury se vzory šablonových řetězců umožňují definovat flexibilní indexové signatury pomocí vzorů šablonových řetězců. Tato funkce umožňuje vytvářet objekty, které lze indexovat pomocí konkrétních vzorů řetězcových klíčů, a poskytuje tak větší kontrolu a přesnost při přístupu k vlastnostem a manipulaci s nimi.

TypeScript od verze 4.4 umožňuje indexové signatury pro symboly a vzory šablonových řetězců.

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

### Operátor satisfies

Operátor `satisfies` umožňuje zkontrolovat, zda daný typ splňuje konkrétní rozhraní nebo podmínku. Jinými slovy zajišťuje, že typ má všechny požadované vlastnosti a metody určitého rozhraní. Je to způsob, jak zajistit, že proměnná odpovídá definici typu.
Zde je příklad:

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

### Importy a exporty pouze typů

Importy a exporty pouze typů umožňují importovat nebo exportovat typy bez importování nebo exportování hodnot či funkcí spojených s těmito typy. To může být užitečné pro zmenšení velikosti výsledného balíčku.

Pro importy pouze typů můžete použít klíčové slovo `import type`.

TypeScript umožňuje v importech pouze typů používat přípony deklaračních i implementačních souborů (.ts, .mts, .cts a .tsx) bez ohledu na nastavení `allowImportingTsExtensions`.

Například:

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Podporovány jsou následující formy:

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### Deklarace using a explicitní správa prostředků

Deklarace `using` představuje neměnnou vazbu s rozsahem platnosti v bloku, podobnou `const`, která slouží ke správě uvolnitelných prostředků. Při inicializaci hodnotou se zaznamená metoda `Symbol.dispose` této hodnoty a následně se vykoná při opuštění bloku, který deklaraci obsahuje.

Vychází to z funkce správy prostředků v ECMAScriptu, která je užitečná pro provádění nezbytných úklidových operací po vytvoření objektu, například uzavírání spojení, mazání souborů a uvolňování paměti.

Poznámky:

* Vzhledem k nedávnému zavedení v TypeScriptu verze 5.2 většina běhových prostředí postrádá nativní podporu. Budete potřebovat polyfilly pro: `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
* Dále budete muset nakonfigurovat svůj tsconfig.json následovně:

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

Příklad:

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

Kód vypíše:

```shell
1
2
disposed
3
```

Prostředek, který lze uvolnit, musí splňovat rozhraní `Disposable`:

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

Deklarace `using` zaznamenávají operace uvolnění prostředků do zásobníku, čímž zajišťují jejich uvolnění v opačném pořadí, než v jakém byly deklarovány:

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

Je zaručeno, že prostředky budou uvolněny, i když následuje další kód nebo dojde k výjimkám. Při uvolňování tak může dojít k vyvolání výjimky, která případně potlačí jinou výjimku. Pro zachování informací o potlačených chybách je zavedena nová nativní výjimka `SuppressedError`.

#### Deklarace await using

Deklarace `await using` spravuje asynchronně uvolnitelný prostředek. Hodnota musí mít metodu `Symbol.asyncDispose`, na jejíž dokončení se počká na konci bloku.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

Asynchronně uvolnitelný prostředek musí splňovat buď rozhraní `Disposable`, nebo `AsyncDisposable`:

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

Kód vypíše:

```shell
Doing some work...
Closing the connection...
Connection closed.
```

Deklarace `using` a `await using` jsou povoleny v příkazech: `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Atributy importu

Atributy importu (štítky pro importy) v TypeScriptu 5.3 říkají běhovému prostředí, jak zacházet s moduly (JSON atd.). Zvyšují bezpečnost tím, že zajišťují jednoznačné importy, a jsou v souladu s Content Security Policy (CSP) pro bezpečnější načítání prostředků. TypeScript zajišťuje jejich platnost, ale jejich interpretaci pro konkrétní zpracování modulů ponechává běhovému prostředí.

Příklad:

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

s dynamickým importem:

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### Kontrola syntaxe regulárních výrazů

Od verze 5.5.4 TypeScript při kompilaci kontroluje literály regulárních výrazů na běžné chyby (např. neplatnou syntaxi, chybné zpětné odkazy nebo funkce nepodporované cílovou verzí JS). Pomáhá odhalit chyby dříve, ale nekontroluje řetězce new RegExp("...").

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

`import defer` umožňuje načíst modul, ale odložit jeho vykonání, dokud z něj něco skutečně nepoužijete. Pomáhá to předejít zbytečné práci a vedlejším účinkům.

* Funguje pouze s: `import defer * as name from "module"`
* Kód se spustí pouze při přístupu k exportu
