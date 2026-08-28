---
title: Autres
sidebar:
  order: 62
  label: 62. Autres
---


### Gestion des erreurs et des exceptions

TypeScript permet d'intercepter et de gérer les erreurs à l'aide des mécanismes standard de gestion des erreurs de JavaScript :

Blocs try-catch-finally :

```typescript
try {
    // Code that might throw an error
} catch (error) {
    // Handle the error
} finally {
    // Code that always executes, finally is optional
}
```

Vous pouvez également gérer différents types d'erreurs :

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

Types d'erreurs personnalisés :

Il est possible de spécifier des erreurs plus précises en étendant la `class` Error :

```typescript
class CustomError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'CustomError';
    }
}

throw new CustomError('This is a custom error.');
```

### Classes mixin

Les classes mixin permettent de combiner et de composer le comportement de plusieurs classes dans une seule classe. Elles permettent de réutiliser et d'étendre des fonctionnalités sans recourir à de profondes chaînes d'héritage.

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

### Fonctionnalités asynchrones du langage

TypeScript étant un sur-ensemble de JavaScript, il intègre les fonctionnalités asynchrones du langage JavaScript telles que :

Promesses :

Les promesses permettent de gérer les opérations asynchrones et leurs résultats à l'aide de méthodes telles que `.then()` et `.catch()` pour traiter les cas de réussite et d'erreur.

Pour en savoir plus : [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Async/await :

Les mots-clés async/await permettent d'utiliser une syntaxe d'apparence plus synchrone pour travailler avec les promesses. Le mot-clé `async` sert à définir une fonction asynchrone, et le mot-clé `await` est utilisé au sein d'une fonction asynchrone pour suspendre l'exécution jusqu'à ce qu'une promesse soit résolue ou rejetée.

Pour en savoir plus :
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

Les API suivantes sont bien prises en charge par TypeScript :

API Fetch :
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

Web Workers :
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)

Shared Workers :
[https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)

WebSocket :
[https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Itérateurs et générateurs

Les itérateurs et les générateurs sont tous deux bien pris en charge par TypeScript.

Les itérateurs sont des objets qui implémentent le protocole d’itération, permettant d’accéder un à un aux éléments d’une collection ou d’une séquence. Il s’agit d’une structure qui contient un pointeur vers l’élément suivant de l’itération. Ils disposent d’une méthode `next()` qui renvoie la valeur suivante de la séquence ainsi qu’un booléen indiquant si la séquence est `done`.

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

Les générateurs sont des fonctions spéciales définies à l’aide de la syntaxe `function*`, qui simplifie la création d’itérateurs. Ils utilisent le mot-clé `yield` pour définir la séquence de valeurs et suspendent puis reprennent automatiquement l’exécution lorsque des valeurs sont demandées.

Les générateurs facilitent la création d’itérateurs et sont particulièrement utiles pour travailler avec des séquences volumineuses ou infinies.

Exemple :

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

TypeScript prend également en charge les itérateurs asynchrones et les générateurs asynchrones.

Pour en savoir plus :

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)

[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator)

### Référence TsDocs JSDoc

Lorsque vous travaillez avec une base de code JavaScript, vous pouvez aider TypeScript à inférer le bon type en utilisant des commentaires JSDoc accompagnés d’annotations supplémentaires pour fournir des informations de type.

Exemple :

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

La documentation complète est disponible à ce lien :
[https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

Depuis la version 3.7, il est possible de générer des définitions de types .d.ts à partir de la syntaxe JSDoc de JavaScript.
Vous trouverez plus d’informations ici :
[https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html](https://www.typescriptlang.org/docs/handbook/declaration-files/dts-from-js.html)

### @types

Les paquets de l’organisation @types suivent une convention de nommage spéciale et servent à fournir des définitions de types pour les bibliothèques ou modules JavaScript existants. Par exemple, la commande :

```shell
npm install --save-dev @types/lodash
```

installera les définitions de types de `lodash` dans votre projet actuel.

Pour contribuer aux définitions de types d’un paquet `@types`, veuillez soumettre une pull request à [https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).

### JSX

JSX (JavaScript XML) est une extension de la syntaxe du langage JavaScript qui vous permet d’écrire du code semblable à du HTML dans vos fichiers JavaScript ou TypeScript. Il est couramment utilisé dans React pour définir la structure HTML.

TypeScript étend les fonctionnalités de JSX en fournissant une vérification des types et une analyse statique.

Pour utiliser JSX, vous devez définir l’option de compilation `jsx` dans votre fichier `tsconfig.json`. Deux options de configuration courantes :

* "preserve" : génère des fichiers .jsx en laissant JSX inchangé. Cette option indique à TypeScript de conserver la syntaxe JSX telle quelle et de ne pas la transformer pendant le processus de compilation. Vous pouvez utiliser cette option si vous disposez d’un outil distinct, comme Babel, qui se charge de la transformation.
* "react" : active la transformation JSX intégrée à TypeScript. React.createElement sera utilisé.

Toutes les options sont disponibles ici :
[https://www.typescriptlang.org/tsconfig#jsx](https://www.typescriptlang.org/tsconfig#jsx)

### Modules ES6

TypeScript prend en charge ES6 (ECMAScript 2015) ainsi que de nombreuses versions ultérieures. Cela signifie que vous pouvez utiliser la syntaxe ES6, comme les fonctions fléchées, les littéraux de gabarit, les classes, les modules, la déstructuration et bien plus encore.

Pour activer les fonctionnalités ES6 dans votre projet, vous pouvez spécifier la propriété `target` dans le tsconfig.json.

Exemple de configuration :

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

### Opérateur d’exponentiation ES7

L’opérateur d’exponentiation (`**`) calcule la valeur obtenue en élevant le premier opérande à la puissance du second. Il fonctionne de manière similaire à `Math.pow()`, avec la possibilité supplémentaire d’accepter des BigInts comme opérandes.
TypeScript prend entièrement en charge cet opérateur lorsque `target` est défini sur `es2016` ou une version ultérieure dans votre fichier tsconfig.json.

```typescript
console.log(2 ** (2 ** 2)); // 16
```

### L’instruction for-await-of

Il s’agit d’une fonctionnalité JavaScript entièrement prise en charge dans TypeScript, qui vous permet d’itérer sur des objets itérables asynchrones avec la version cible `es2018`.

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

### Métapropriété new.target

Vous pouvez utiliser la métapropriété `new.target` dans TypeScript, qui vous permet de déterminer si une fonction ou un constructeur a été invoqué à l’aide de l’opérateur new. Elle permet de détecter si un objet a été créé à la suite d’un appel de constructeur.

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

### Expressions d’importation dynamique

Il est possible de charger des modules de manière conditionnelle ou à la demande, grâce à la proposition ECMAScript d’importation dynamique, qui est prise en charge dans TypeScript.

La syntaxe des expressions d’importation dynamique dans TypeScript est la suivante :

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

Cette commande lance le compilateur TypeScript avec le paramètre `--watch`, ce qui lui permet de recompiler automatiquement les fichiers TypeScript chaque fois qu’ils sont modifiés.

```shell
tsc --watch
```

Depuis TypeScript 4.9, la surveillance des fichiers repose principalement sur les événements du système de fichiers et revient automatiquement à l’interrogation périodique si aucun mécanisme de surveillance fondé sur les événements ne peut être établi.

### Opérateur d’assertion non-null

L’opérateur d’assertion non-null (! postfixé), également appelé assertion d’affectation définie, est une fonctionnalité TypeScript qui vous permet d’affirmer qu’une variable ou une propriété n’est ni null ni undefined, même si l’analyse statique des types de TypeScript suggère qu’elle pourrait l’être. Cette fonctionnalité permet de supprimer toute vérification explicite.

```typescript
type Person = {
    name: string;
};

const printName = (person?: Person) => {
    console.log(`Name is ${person!.name}`);
};
```

### Déclarations avec valeurs par défaut

Les déclarations avec valeurs par défaut sont utilisées lorsqu’une valeur par défaut est affectée à une variable ou à un paramètre. Cela signifie que si aucune valeur n’est fournie pour cette variable ou ce paramètre, la valeur par défaut sera utilisée à la place.

```typescript
function greet(name: string = 'Anonymous'): void {
    console.log(`Hello, ${name}!`);
}
greet(); // Hello, Anonymous!
greet('John'); // Hello, John!
```

### Chaînage optionnel

L’opérateur de chaînage optionnel `?.` fonctionne comme l’opérateur point habituel (`.`) pour accéder aux propriétés ou aux méthodes. Toutefois, il gère sans erreur les valeurs null ou undefined en interrompant l’expression et en renvoyant `undefined`, au lieu de lever une erreur.

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

### Opérateur de coalescence des valeurs nulles

L’opérateur de coalescence des valeurs nulles `??` renvoie la valeur de droite si la valeur de gauche est `null` ou `undefined` ; sinon, il renvoie la valeur de gauche.

```typescript
const foo = null ?? 'foo';
console.log(foo); // foo

const baz = 1 ?? 'baz';
const baz2 = 0 ?? 'baz';
console.log(baz); // 1
console.log(baz2); // 0
```

### Types littéraux de gabarit

Les types littéraux de gabarit vous permettent de manipuler des valeurs de chaîne au niveau des types et de générer de nouveaux types de chaîne à partir de types existants. Ils sont utiles pour créer des types plus expressifs et plus précis à partir d’opérations sur des chaînes.

```typescript
type Department = 'engineering' | 'hr';
type Language = 'english' | 'spanish';
type Id = `${Department}-${Language}-id`; // "engineering-english-id" | "engineering-spanish-id" | "hr-english-id" | "hr-spanish-id"
```

### Surcharge de fonctions

La surcharge de fonctions vous permet de définir plusieurs signatures de fonction pour un même nom de fonction, chacune avec des types de paramètres et de retour différents.
Lorsque vous appelez une fonction surchargée, TypeScript utilise les arguments fournis pour déterminer la bonne signature de fonction :

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

### Types récursifs

Un type récursif est un type qui peut faire référence à lui-même. Cela est utile pour définir des structures de données dotées d’une structure hiérarchique ou récursive (avec une imbrication potentiellement infinie), telles que les listes chaînées, les arbres et les graphes.

```typescript
type ListNode<T> = {
    data: T;
    next: ListNode<T> | undefined;
};
```

### Types conditionnels récursifs

Il est possible de définir des relations de types complexes à l’aide de la logique et de la récursivité dans TypeScript.
Décomposons cela en termes simples :

Les types conditionnels vous permettent de définir des types en fonction de conditions booléennes :

```typescript
type CheckNumber<T> = T extends number ? 'Number' : 'Not a number';
type A = CheckNumber<123>; // 'Number'
type B = CheckNumber<'abc'>; // 'Not a number'
```

La récursivité désigne une définition de type qui fait référence à elle-même au sein de sa propre définition :

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

Les types conditionnels récursifs combinent la logique conditionnelle et la récursivité. Cela signifie qu’une définition de type peut dépendre d’elle-même par l’intermédiaire d’une logique conditionnelle, créant ainsi des relations de types complexes et flexibles.

```typescript
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;

type NestedArray = [1, [2, [3, 4], 5], 6];
type FlattenedArray = Flatten<NestedArray>; // 2 | 3 | 4 | 5 | 1 | 6
```

### Prise en charge des modules ECMAScript dans Node

Node.js a ajouté la prise en charge des modules ECMAScript à partir de la version 15.3.0, et TypeScript prend en charge les modules ECMAScript pour Node.js depuis la version 4.7. Cette prise en charge peut être activée en utilisant la propriété `module` avec la valeur `nodenext` dans le fichier tsconfig.json. Voici un exemple :

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./lib",
    "declaration": true
  }
}
```

Node.js prend en charge deux extensions de fichier pour les modules : `.mjs` pour les modules ES et `.cjs` pour les modules CommonJS. Les extensions de fichier équivalentes dans TypeScript sont `.mts` pour les modules ES et `.cts` pour les modules CommonJS. Lorsque le compilateur TypeScript transpile ces fichiers en JavaScript, il crée des fichiers `.mjs` et `.cjs`.

Si vous souhaitez utiliser les modules ES dans votre projet, vous pouvez définir la propriété `type` sur "module" dans votre fichier package.json. Cela indique à Node.js de traiter le projet comme un projet de modules ES.

TypeScript prend également en charge les déclarations de types dans les fichiers .d.ts. Ces fichiers de déclaration fournissent des informations de type pour les bibliothèques ou modules écrits en TypeScript, permettant ainsi aux autres développeurs de les utiliser avec la vérification des types et les fonctionnalités d’autocomplétion de TypeScript.

### Fonctions d’assertion

Dans TypeScript, les fonctions d’assertion sont des fonctions qui indiquent qu’une condition spécifique a été vérifiée en fonction de leur valeur de retour. Dans sa forme la plus simple, une fonction d’assertion examine un prédicat fourni et lève une erreur lorsque le prédicat est évalué à false.

```typescript
function isNumber(value: unknown): asserts value is number {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
}
```

Elle peut également être déclarée sous forme d’expression de fonction :

```typescript
type AssertIsNumber = (value: unknown) => asserts value is number;
const isNumber: AssertIsNumber = value => {
    if (typeof value !== 'number') {
        throw new Error('Not a number');
    }
};
```

Les fonctions d’assertion présentent des similitudes avec les gardes de type. Les gardes de type ont été introduites initialement pour effectuer des vérifications à l’exécution et garantir le type d’une valeur dans une portée spécifique.
Plus précisément, une garde de type est une fonction qui évalue un prédicat de type et renvoie une valeur booléenne indiquant si le prédicat est vrai ou faux. Cela diffère légèrement des fonctions d’assertion, dont l’objectif est de lever une erreur plutôt que de renvoyer false lorsque le prédicat n’est pas satisfait.

Exemple de garde de type :

```typescript
const isNumber = (value: unknown): value is number => typeof value === 'number';
```

### Types de tuples variadiques

Les types de tuples variadiques sont une fonctionnalité introduite dans TypeScript 4.0. Commençons donc par revoir ce qu’est un tuple :

Un type tuple est un tableau dont la longueur est définie et dont le type de chaque élément est connu :

```typescript
type Student = [string, number];
const [name, age]: Student = ['Simone', 20];
```

Le terme « variadique » désigne une arité indéfinie (l’acceptation d’un nombre variable d’arguments).

Un tuple variadique est un type tuple qui possède toutes les propriétés précédentes, mais dont la forme exacte n’est pas encore définie :

```typescript
type Bar<T extends unknown[]> = [boolean, ...T, number];

type A = Bar<[boolean]>; // [boolean, boolean, number]
type B = Bar<['a', 'b']>; // [boolean, 'a', 'b', number]
type C = Bar<[]>; // [boolean, number]
```

Dans le code précédent, nous pouvons voir que la forme du tuple est définie par le paramètre de type générique `T` fourni.

Les tuples variadiques peuvent accepter plusieurs paramètres de type génériques, ce qui les rend très flexibles :

```typescript
type Bar<T extends unknown[], G extends unknown[]> = [...T, boolean, ...G];

type A = Bar<[number], [string]>; // [number, boolean, string]
type B = Bar<['a', 'b'], [boolean]>; // ["a", "b", boolean, boolean]
```

Avec les nouveaux tuples variadiques, nous pouvons utiliser :

* Les opérateurs de décomposition dans la syntaxe des types tuples peuvent désormais être génériques. Nous pouvons ainsi représenter des opérations d’ordre supérieur sur des tuples et des tableaux, même lorsque nous ne connaissons pas les types réels sur lesquels nous opérons.
* Les éléments rest peuvent apparaître n’importe où dans un tuple.

Exemple :

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

### Types d'objets enveloppeurs

Les types d'objets enveloppeurs font référence aux objets enveloppeurs utilisés pour représenter les types primitifs sous forme d’objets. Ces objets enveloppeurs fournissent des fonctionnalités et des méthodes supplémentaires qui ne sont pas directement disponibles sur les valeurs primitives.

Lorsque vous accédez à une méthode comme `charAt` ou `normalize` sur une primitive `string`, JavaScript l’enveloppe dans un objet `String`, appelle la méthode, puis supprime l’objet.

Démonstration :

```typescript
const originalNormalize = String.prototype.normalize;
String.prototype.normalize = function () {
    console.log(this, typeof this);
    return originalNormalize.call(this);
};
console.log('\u0041'.normalize());
```

TypeScript représente cette distinction en fournissant des types distincts pour les primitives et les objets enveloppeurs correspondants :

* string => String
* number => Number
* boolean => Boolean
* symbol => Symbol
* bigint => BigInt

Les types d'objets enveloppeurs ne sont généralement pas nécessaires. Évitez de les utiliser et employez plutôt les types primitifs, par exemple `string` au lieu de `String`.

### Covariance et contravariance dans TypeScript

La covariance et la contravariance décrivent le comportement des relations entre les types dans les types génériques.

Dans TypeScript :

* Les tableaux sont **covariants**, mais cela n’est pas totalement sûr du point de vue du typage.
* Les types des paramètres de fonction sont :
  * **contravariants** lorsque `strictFunctionTypes` est activé
  * **bivariants** dans le cas contraire

La covariance signifie que la relation est préservée : si le type A est un sous-type du type B, alors `F<A>` est également un sous-type de `F<B>`. Dans TypeScript, cela apparaît couramment dans les types de retour et dans les tableaux (bien que la covariance des tableaux ne soit pas totalement sûre du point de vue du typage).

La contravariance signifie que la relation est inversée : si le type A est un sous-type du type B, alors `F<B>` est un sous-type de `F<A>`. Dans TypeScript, les types des paramètres de fonction sont censés être contravariants, ce qui signifie qu’une fonction qui accepte un type plus général peut être utilisée là où une fonction acceptant un type plus restreint est attendue.

Cependant, dans la pratique, TypeScript autorise souvent la bivariance pour les paramètres de fonction (sauf lorsque `strictFunctionTypes` est activé), ce qui signifie que les deux directions peuvent être acceptées même lorsque cela n’est pas strictement sûr du point de vue du typage.

Exemple : imaginez un espace pour tous les animaux et un espace distinct réservé aux chiens.

* **Covariance** :  
  Vous pouvez utiliser un « espace pour chiens » lorsqu’un « espace pour animaux » est attendu, car tous les chiens sont des animaux.  
  Mais vous ne pouvez pas utiliser un « espace pour animaux » lorsqu’un « espace pour chiens » est attendu, car il pourrait contenir des animaux qui ne sont pas des chiens.

* **Contravariance** (raisonnez en termes de fonctions) :  
  Si vous disposez d’un gestionnaire capable de gérer **n’importe quel animal**, vous pouvez l’utiliser lorsqu’un gestionnaire qui gère **uniquement les chiens** est attendu.  
  Mais pas l’inverse.

Exemple de covariance :

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

Exemple de contravariance :

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

#### Annotations de variance facultatives pour les paramètres de type

Depuis TypeScript 4.7.0, nous pouvons utiliser les mots-clés `out` et `in` pour spécifier des annotations de variance.

Pour la covariance, utilisez le mot-clé `out` :

```typescript
type AnimalCallback<out T> = () => T; // T is Covariant here
```

Pour la contravariance, utilisez le mot-clé `in` :

```typescript
type AnimalCallback<in T> = (value: T) => void; // T is Contravariance here
```

### Signatures d’index avec motifs de chaînes de gabarit

Les signatures d’index avec motifs de chaînes de gabarit nous permettent de définir des signatures d’index flexibles à l’aide de motifs de chaînes de gabarit. Cette fonctionnalité permet de créer des objets qui peuvent être indexés avec des motifs spécifiques de clés de chaîne, offrant ainsi davantage de contrôle et de précision lors de l’accès aux propriétés et de leur manipulation.

Depuis la version 4.4, TypeScript autorise les signatures d’index pour les symboles et les motifs de chaînes de gabarit.

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

### L’opérateur satisfies

L’opérateur `satisfies` vous permet de vérifier si un type donné satisfait une interface ou une condition particulière. Autrement dit, il garantit qu’un type possède toutes les propriétés et méthodes requises par une interface particulière. C’est un moyen de s’assurer qu’une variable correspond à la définition d’un type.
Voici un exemple :

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

### Importations et exportations de types uniquement

Les importations et exportations de types uniquement vous permettent d’importer ou d’exporter des types sans importer ni exporter les valeurs ou fonctions associées à ces types. Cela peut être utile pour réduire la taille de votre bundle.

Pour utiliser des importations de types uniquement, vous pouvez employer le mot-clé `import type`.

TypeScript autorise l’utilisation des extensions de fichiers de déclaration et d’implémentation (.ts, .mts, .cts et .tsx) dans les importations de types uniquement, quel que soit le réglage de `allowImportingTsExtensions`.

Par exemple :

<!-- skip -->
```typescript
import type { House } from './house.ts';
```

Les formes suivantes sont prises en charge :

<!-- skip -->
```typescript
import type T from './mod';
import type { A, B } from './mod';
import type * as Types from './mod';
export type { T };
export type { T } from './mod';
```

### Déclaration using et gestion explicite des ressources

Une déclaration `using` est une liaison immuable à portée de bloc, similaire à `const`, utilisée pour gérer les ressources libérables. Lorsqu’elle est initialisée avec une valeur, la méthode `Symbol.dispose` de cette valeur est enregistrée puis exécutée lors de la sortie de la portée du bloc englobant.

Cette fonctionnalité repose sur la gestion des ressources d’ECMAScript, qui est utile pour effectuer les tâches de nettoyage essentielles après la création d’un objet, comme fermer des connexions, supprimer des fichiers et libérer de la mémoire.

Remarques :

* En raison de son introduction récente dans la version 5.2 de TypeScript, la plupart des environnements d’exécution ne la prennent pas en charge nativement. Vous aurez besoin de polyfills pour : `Symbol.dispose`, `Symbol.asyncDispose`, `DisposableStack`, `AsyncDisposableStack`, `SuppressedError`.
* En outre, vous devrez configurer votre tsconfig.json comme suit :

```json
{
    "compilerOptions": {
        "target": "es2022",
        "lib": ["es2022", "esnext.disposable", "dom"]
    }
}
```

Exemple :

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

Le code affichera :

```shell
1
2
disposed
3
```

Une ressource pouvant être libérée doit respecter l’interface `Disposable` :

```typescript
// lib.esnext.disposable.d.ts
interface Disposable {
    [Symbol.dispose](): void;
}
```

Les déclarations `using` enregistrent les opérations de libération des ressources dans une pile, garantissant qu’elles sont libérées dans l’ordre inverse de leur déclaration :

<!-- skip -->
```typescript
{
    using j = getA(),
        y = getB();
    using k = getC();
} // disposes `C`, then `B`, then `A`.
```

Il est garanti que les ressources seront libérées, même si du code ultérieur est exécuté ou si des exceptions surviennent. L’opération de libération peut ainsi lever une exception et éventuellement en masquer une autre. Afin de conserver les informations sur les erreurs masquées, une nouvelle exception native, `SuppressedError`, est introduite.

#### Déclaration await using

Une déclaration `await using` gère une ressource pouvant être libérée de manière asynchrone. La valeur doit posséder une méthode `Symbol.asyncDispose`, dont le résultat sera attendu à la fin du bloc.

<!-- skip -->
```typescript
async function doWorkAsync() {
    await using work = doWorkAsync(); // Resource is declared
} // Resource is disposed (e.g., `await work[Symbol.asyncDispose]()` is evaluated)
```

Pour une ressource pouvant être libérée de manière asynchrone, celle-ci doit respecter l’une des interfaces `Disposable` ou `AsyncDisposable` :

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

Le code affiche :

```shell
Doing some work...
Closing the connection...
Connection closed.
```

Les déclarations `using` et `await using` sont autorisées dans les instructions : `for`, `for-in`, `for-of`, `for-await-of`, `switch`.

### Attributs d’importation

Les attributs d’importation de TypeScript 5.3 (étiquettes pour les importations) indiquent à l’environnement d’exécution comment traiter les modules (JSON, etc.). Cela améliore la sécurité en garantissant des importations explicites et s’aligne sur la Content Security Policy (CSP) afin de rendre le chargement des ressources plus sûr. TypeScript vérifie leur validité, mais laisse l’environnement d’exécution les interpréter pour le traitement spécifique des modules.

Exemple :

<!-- skip -->
```typescript
import config from './config.json' with { type: 'json' };
```

avec une importation dynamique :

<!-- skip -->
```typescript
const config = import('./config.json', { with: { type: 'json' } });
```

### Vérification de la syntaxe des expressions régulières

Depuis TypeScript 5.5.4, les littéraux d’expression régulière sont vérifiés à la compilation afin de détecter les erreurs courantes (par exemple, une syntaxe non valide, des références arrière incorrectes ou des fonctionnalités non prises en charge par la version JavaScript cible). Cela permet de détecter les bogues plus tôt, mais les chaînes passées à new RegExp("...") ne sont pas vérifiées.

<!-- skip -->
```typescript
let r = /(a)\2/; // Error: This backreference refers to a group that does not exist.
```

### import defer

`import defer` vous permet de charger un module tout en retardant son exécution jusqu’à ce que vous utilisiez effectivement l’un de ses éléments. Cela permet d’éviter le travail et les effets secondaires inutiles.

* Fonctionne uniquement avec : `import defer * as name from "module"`
* Le code ne s’exécute que lorsque vous accédez à une exportation
