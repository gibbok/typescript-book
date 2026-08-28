# Classe



### Syntaxe courante d'une classe

Le mot-clé `class` sert à définir une classe en TypeScript. Vous trouverez un exemple ci-dessous :

```typescript
class Person {
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public sayHi(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}
```

Le mot-clé `class` sert à définir une classe nommée « Person ».

La classe possède deux propriétés privées : name de type `string` et age de type `number`.

Le constructeur est défini à l'aide du mot-clé `constructor`. Il reçoit name et age en paramètres et les affecte aux propriétés correspondantes.

La classe possède une méthode `public` nommée sayHi qui affiche un message de salutation.

Pour créer une instance d'une classe en TypeScript, vous pouvez utiliser le mot-clé `new` suivi du nom de la classe, puis de parenthèses `()`. Par exemple :

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Constructeur

Les constructeurs sont des méthodes spéciales au sein d'une classe. Ils permettent d'initialiser les propriétés de l'objet lorsqu'une instance de la classe est créée.

```typescript
class Person {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(
            `Hello, my name is ${this.name} and I'm ${this.age} years old.`
        );
    }
}

const john = new Person('Simon', 17);
john.sayHello();
```

Il est possible de surcharger un constructeur à l'aide de la syntaxe suivante :

```typescript
type Sex = 'm' | 'f';

class Person {
    name: string;
    age: number;
    sex: Sex;

    constructor(name: string, age: number, sex?: Sex);
    constructor(name: string, age: number, sex: Sex) {
        this.name = name;
        this.age = age;
        this.sex = sex ?? 'm';
    }
}

const p1 = new Person('Simon', 17);
const p2 = new Person('Alice', 22, 'f');
```

En TypeScript, il est possible de définir plusieurs surcharges de constructeur, mais vous ne pouvez disposer que d'une seule implémentation, qui doit être compatible avec toutes les surcharges. Pour cela, vous pouvez utiliser un paramètre facultatif.

```typescript
class Person {
    name: string;
    age: number;

    constructor();
    constructor(name: string);
    constructor(name: string, age: number);
    constructor(name?: string, age?: number) {
        this.name = name ?? 'Unknown';
        this.age = age ?? 0;
    }

    displayInfo() {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

const person1 = new Person();
person1.displayInfo(); // Name: Unknown, Age: 0

const person2 = new Person('John');
person2.displayInfo(); // Name: John, Age: 0

const person3 = new Person('Jane', 25);
person3.displayInfo(); // Name: Jane, Age: 25
```

### Constructeurs privés et protégés

En TypeScript, les constructeurs peuvent être déclarés privés ou protégés, ce qui restreint leur accessibilité et leur utilisation.

Constructeurs privés :
Ils peuvent uniquement être appelés depuis la classe elle-même. Les constructeurs privés sont souvent utilisés lorsque vous souhaitez imposer un patron de conception singleton ou limiter la création d'instances à une méthode de fabrique au sein de la classe.

Constructeurs protégés :
Les constructeurs protégés sont utiles lorsque vous souhaitez créer une classe de base qui ne doit pas être instanciée directement, mais qui peut être étendue par des sous-classes.

```typescript
class BaseClass {
    protected constructor() {}
}

class DerivedClass extends BaseClass {
    private value: number;

    constructor(value: number) {
        super();
        this.value = value;
    }
}

// Attempting to instantiate the base class directly will result in an error
// const baseObj = new BaseClass(); // Error: Constructor of class 'BaseClass' is protected.

// Create an instance of the derived class
const derivedObj = new DerivedClass(10);
```

### Modificateurs d'accès

Les modificateurs d'accès `private`, `protected` et `public` servent à contrôler la visibilité et l'accessibilité des membres d'une classe, tels que les propriétés et les méthodes, dans les classes TypeScript. Ces modificateurs sont essentiels pour garantir l'encapsulation et établir des limites pour l'accès à l'état interne d'une classe et sa modification.

Le modificateur `private` restreint l'accès au membre de la classe à la classe qui le contient.

Le modificateur `protected` autorise l'accès au membre de la classe depuis la classe qui le contient et ses classes dérivées.

Le modificateur `public` accorde un accès sans restriction au membre de la classe, ce qui permet d'y accéder depuis n'importe où.

### Accesseurs get et set

Les accesseurs et mutateurs sont des méthodes spéciales qui permettent de définir un comportement personnalisé pour l'accès aux propriétés d'une classe et leur modification. Ils permettent d'encapsuler l'état interne d'un objet et d'ajouter une logique supplémentaire lors de la lecture ou de la définition des valeurs des propriétés.
En TypeScript, les accesseurs et les mutateurs sont définis respectivement à l'aide des mots-clés `get` et `set`. Voici un exemple :

```typescript
class MyClass {
    private _myProperty: string;

    constructor(value: string) {
        this._myProperty = value;
    }
    get myProperty(): string {
        return this._myProperty;
    }
    set myProperty(value: string) {
        this._myProperty = value;
    }
}
```

### Auto-accesseurs dans les classes

La version 4.9 de TypeScript ajoute la prise en charge des auto-accesseurs, une fonctionnalité ECMAScript à venir. Ils ressemblent aux propriétés de classe, mais sont déclarés avec le mot-clé « accessor ».

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Les auto-accesseurs sont « désucrés » en accesseurs `get` et `set` privés, opérant sur une propriété inaccessible.

<!-- skip -->
```typescript
class Animal {
    #__name: string;

    get name() {
        return this.#__name;
    }
    set name(value: string) {
        this.#__name = value;
    }

    constructor(name: string) {
        this.name = name;
    }
}
```

### this

En TypeScript, le mot-clé `this` fait référence à l'instance actuelle d'une classe au sein de ses méthodes ou de ses constructeurs. Il permet d'accéder aux propriétés et aux méthodes de la classe et de les modifier depuis sa propre portée.
Il fournit un moyen d'accéder à l'état interne d'un objet et de le manipuler au sein de ses propres méthodes.

```typescript
class Person {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    public introduce(): void {
        console.log(`Hello, my name is ${this.name}.`);
    }
}

const person1 = new Person('Alice');
person1.introduce(); // Hello, my name is Alice.
```

### Propriétés de paramètres

Les propriétés de paramètres permettent de déclarer et d'initialiser les propriétés d'une classe directement dans les paramètres du constructeur, ce qui évite le code répétitif. Par exemple :

```typescript
class Person {
    constructor(
        private name: string,
        public age: number
    ) {
        // The "private" and "public" keywords in the constructor
        // automatically declare and initialize the corresponding class properties.
    }
    public introduce(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }
}
const person = new Person('Alice', 25);
person.introduce();
```

### Classes abstraites

Les classes abstraites sont principalement utilisées en TypeScript pour l'héritage. Elles permettent de définir des propriétés et des méthodes communes dont les sous-classes peuvent hériter.
C'est utile lorsque vous souhaitez définir un comportement commun et imposer aux sous-classes d'implémenter certaines méthodes. Elles permettent de créer une hiérarchie de classes dans laquelle la classe de base abstraite fournit une interface partagée et des fonctionnalités communes aux sous-classes.

```typescript
abstract class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract makeSound(): void;
}

class Cat extends Animal {
    makeSound(): void {
        console.log(`${this.name} meows.`);
    }
}

const cat = new Cat('Whiskers');
cat.makeSound(); // Output: Whiskers meows.
```

### Avec des génériques

Les classes avec des génériques permettent de définir des classes réutilisables pouvant fonctionner avec différents types.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }

    setItem(item: T): void {
        this.item = item;
    }
}

const container1 = new Container<number>(42);
console.log(container1.getItem()); //  42

const container2 = new Container<string>('Hello');
container2.setItem('World');
console.log(container2.getItem()); // World
```

### Décorateurs

Les décorateurs fournissent un mécanisme permettant d'ajouter des métadonnées, de modifier le comportement, de valider ou d'étendre les fonctionnalités de l'élément cible. Ces fonctions sont invoquées lors de l'exécution du programme. Plusieurs décorateurs peuvent être appliqués à une déclaration.

Les décorateurs sont des fonctionnalités expérimentales, et les exemples suivants sont uniquement compatibles avec TypeScript version 5 ou ultérieure avec ES6.

Pour les versions de TypeScript antérieures à la version 5, ils doivent être activés à l'aide de la propriété `experimentalDecorators` dans votre fichier `tsconfig.json` ou en utilisant `--experimentalDecorators` dans votre ligne de commande (mais l'exemple suivant ne fonctionnera pas).

Voici quelques cas d'utilisation courants des décorateurs :

* Surveillance des modifications de propriétés.
* Surveillance des appels de méthodes.
* Ajout de propriétés ou de méthodes supplémentaires.
* Validation à l'exécution.
* Sérialisation et désérialisation automatiques.
* Journalisation.
* Autorisation et authentification.
* Protection contre les erreurs.

Remarque : les décorateurs de la version 5 ne permettent pas de décorer les paramètres.

Types de décorateurs :

#### Décorateurs de classe

Les décorateurs de classe sont utiles pour étendre une classe existante, par exemple en ajoutant des propriétés ou des méthodes, ou en collectant des instances d'une classe. Dans l'exemple suivant, nous ajoutons une méthode `toString` qui convertit la classe en une représentation sous forme de chaîne.

```typescript
type Constructor<T = {}> = new (...args: any[]) => T;

function toString<Class extends Constructor>(
    Value: Class,
    context: ClassDecoratorContext<Class>
) {
    return class extends Value {
        constructor(...args: any[]) {
            super(...args);
            console.log(JSON.stringify(this));
            console.log(JSON.stringify(context));
        }
    };
}

@toString
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet() {
        return 'Hello, ' + this.name;
    }
}
const person = new Person('Simon');
/* Logs:
{"name":"Simon"}
{"kind":"class","name":"Person"}
*/
```

#### Décorateur de propriété

Les décorateurs de propriété sont utiles pour modifier le comportement d'une propriété, par exemple en changeant les valeurs d'initialisation. Dans le code suivant, nous avons un script qui définit une propriété pour qu'elle soit toujours en majuscules :

```typescript
function upperCase<T>(
    target: undefined,
    context: ClassFieldDecoratorContext<T, string>
) {
    return function (this: T, value: string) {
        return value.toUpperCase();
    };
}

class MyClass {
    @upperCase
    prop1 = 'hello!';
}

console.log(new MyClass().prop1); // Logs: HELLO!
```

#### Décorateur de méthode

Les décorateurs de méthode permettent de modifier ou d'améliorer le comportement des méthodes. Voici un exemple simple de journalisation :

```typescript
function log<This, Args extends any[], Return>(
    target: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<
        This,
        (this: This, ...args: Args) => Return
    >
) {
    const methodName = String(context.name);

    function replacementMethod(this: This, ...args: Args): Return {
        console.log(`LOG: Entering method '${methodName}'.`);
        const result = target.call(this, ...args);
        console.log(`LOG: Exiting method '${methodName}'.`);
        return result;
    }

    return replacementMethod;
}

class MyClass {
    @log
    sayHello() {
        console.log('Hello!');
    }
}

new MyClass().sayHello();
```

Il affiche :

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Décorateurs d'accesseurs et de mutateurs

Les décorateurs d'accesseurs et de mutateurs permettent de modifier ou d'améliorer le comportement des accesseurs de classe. Ils sont utiles, par exemple, pour valider les affectations de propriétés. Voici un exemple simple de décorateur d'accesseur :

```typescript
function range<This, Return extends number>(min: number, max: number) {
    return function (
        target: (this: This) => Return,
        context: ClassGetterDecoratorContext<This, Return>
    ) {
        return function (this: This): Return {
            const value = target.call(this);
            if (value < min || value > max) {
                throw 'Invalid';
            }
            Object.defineProperty(this, context.name, {
                value,
                enumerable: true,
            });
            return value;
        };
    };
}

class MyClass {
    private _value = 0;

    constructor(value: number) {
        this._value = value;
    }
    @range(1, 100)
    get getValue(): number {
        return this._value;
    }
}

const obj = new MyClass(10);
console.log(obj.getValue); // Valid: 10

const obj2 = new MyClass(999);
console.log(obj2.getValue); // Throw: Invalid!
```

#### Métadonnées des décorateurs

Les métadonnées des décorateurs simplifient le processus permettant aux décorateurs d'appliquer et d'utiliser des métadonnées dans n'importe quelle classe. Ils peuvent accéder à une nouvelle propriété de métadonnées sur l'objet de contexte, qui peut servir de clé aussi bien pour les valeurs primitives que pour les objets.
Les informations de métadonnées sont accessibles sur la classe via `Symbol.metadata`.

Les métadonnées peuvent être utilisées à diverses fins, telles que le débogage, la sérialisation ou l'injection de dépendances avec des décorateurs.

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // Simple polyfill

type Context =
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    | ClassMethodDecoratorContext; // Context contains property metadata: DecoratorMetadata

function setMetadata(_target: any, context: Context) {
    // Set the metadata object with a primitive value
    context.metadata[context.name] = true;
}

class MyClass {
    @setMetadata
    a = 123;

    @setMetadata
    accessor b = 'b';

    @setMetadata
    fn() {}
}

const metadata = MyClass[Symbol.metadata]; // Get metadata information

console.log(JSON.stringify(metadata)); // {"bar":true,"baz":true,"foo":true}
```

### Héritage

L'héritage désigne le mécanisme par lequel une classe peut hériter des propriétés et des méthodes d'une autre classe, appelée classe de base ou superclasse. La classe dérivée, également appelée classe enfant ou sous-classe, peut étendre et spécialiser les fonctionnalités de la classe de base en ajoutant de nouvelles propriétés et méthodes ou en redéfinissant celles qui existent.

```typescript
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    speak(): void {
        console.log('The animal makes a sound');
    }
}

class Dog extends Animal {
    breed: string;

    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }

    speak(): void {
        console.log('Woof! Woof!');
    }
}

// Create an instance of the base class
const animal = new Animal('Generic Animal');
animal.speak(); // The animal makes a sound

// Create an instance of the derived class
const dog = new Dog('Max', 'Labrador');
dog.speak(); // Woof! Woof!"
```

TypeScript ne prend pas en charge l'héritage multiple au sens traditionnel et permet à la place l'héritage à partir d'une seule classe de base.
TypeScript prend en charge plusieurs interfaces. Une interface peut définir un contrat pour la structure d'un objet, et une classe peut implémenter plusieurs interfaces. Cela permet à une classe d'hériter du comportement et de la structure de plusieurs sources.

```typescript
interface Flyable {
    fly(): void;
}

interface Swimmable {
    swim(): void;
}

class FlyingFish implements Flyable, Swimmable {
    fly() {
        console.log('Flying...');
    }

    swim() {
        console.log('Swimming...');
    }
}

const flyingFish = new FlyingFish();
flyingFish.fly();
flyingFish.swim();
```

Le mot-clé `class` en TypeScript, comme en JavaScript, est souvent qualifié de sucre syntaxique. Il a été introduit dans ECMAScript 2015 (ES6) afin d'offrir une syntaxe plus familière pour créer et manipuler des objets selon un modèle fondé sur les classes. Il est toutefois important de noter que TypeScript, étant un sur-ensemble de JavaScript, est finalement compilé en JavaScript, qui reste fondamentalement fondé sur les prototypes.

### Membres statiques

TypeScript possède des membres statiques. Pour accéder aux membres statiques d'une classe, vous pouvez utiliser le nom de la classe suivi d'un point, sans avoir à créer d'objet.

```typescript
class OfficeWorker {
    static memberCount: number = 0;

    constructor(private name: string) {
        OfficeWorker.memberCount++;
    }
}

const w1 = new OfficeWorker('James');
const w2 = new OfficeWorker('Simon');
const total = OfficeWorker.memberCount;
console.log(total); // 2
```

### Initialisation des propriétés

Il existe plusieurs façons d'initialiser les propriétés d'une classe en TypeScript :

En ligne :

Dans l'exemple suivant, ces valeurs initiales seront utilisées lors de la création d'une instance de la classe.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

Dans le constructeur :

```typescript
class MyClass {
    property1: string;
    property2: number;

    constructor() {
        this.property1 = 'default value';
        this.property2 = 42;
    }
}
```

À l'aide des paramètres du constructeur :

```typescript
class MyClass {
    constructor(
        private property1: string = 'default value',
        public property2: number = 42
    ) {
        // There is no need to assign the values to the properties explicitly.
    }
    log() {
        console.log(this.property2);
    }
}
const x = new MyClass();
x.log();
```

### Surcharge de méthodes

La surcharge de méthodes permet à une classe de disposer de plusieurs méthodes portant le même nom, mais avec des types de paramètres différents ou un nombre de paramètres différent. Cela permet d'appeler une méthode de différentes manières selon les arguments transmis.

```typescript
class MyClass {
    add(a: number, b: number): number; // Overload signature 1
    add(a: string, b: string): string; // Overload signature 2

    add(a: number | string, b: number | string): number | string {
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        }
        if (typeof a === 'string' && typeof b === 'string') {
            return a.concat(b);
        }
        throw new Error('Invalid arguments');
    }
}

const r = new MyClass();
console.log(r.add(10, 5)); // Logs 15
```

