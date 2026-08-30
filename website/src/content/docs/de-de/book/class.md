---
title: Klasse
sidebar:
  order: 55
  label: 55. Klasse
---


### Allgemeine Syntax einer Klasse

Das Schlüsselwort `class` wird in TypeScript verwendet, um eine Klasse zu definieren. Unten sehen Sie ein Beispiel:

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

Das Schlüsselwort `class` wird verwendet, um eine Klasse namens "Person" zu definieren.

Die Klasse besitzt zwei private Eigenschaften: name vom Typ `string` und age vom Typ `number`.

Der Konstruktor wird mit dem Schlüsselwort `constructor` definiert. Er nimmt name und age als Parameter entgegen und weist sie den entsprechenden Eigenschaften zu.

Die Klasse besitzt eine `public`-Methode namens sayHi, die eine Begrüßungsnachricht protokolliert.

Um in TypeScript eine Instanz einer Klasse zu erstellen, können Sie das Schlüsselwort `new` verwenden, gefolgt vom Klassennamen und den Klammern `()`. Zum Beispiel:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Konstruktor

Konstruktoren sind spezielle Methoden innerhalb einer Klasse, mit denen die Eigenschaften des Objekts initialisiert werden, wenn eine Instanz der Klasse erstellt wird.

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

Ein Konstruktor kann mit der folgenden Syntax überladen werden:

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

In TypeScript können mehrere Konstruktorüberladungen definiert werden, es kann jedoch nur eine Implementierung geben, die mit allen Überladungen kompatibel sein muss. Dies lässt sich durch die Verwendung eines optionalen Parameters erreichen.

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

### Private und geschützte Konstruktoren

In TypeScript können Konstruktoren mit private oder protected gekennzeichnet werden, wodurch ihre Zugänglichkeit und Verwendung eingeschränkt wird.

Private Konstruktoren:
Sie können nur innerhalb der Klasse selbst aufgerufen werden. Private Konstruktoren werden häufig in Szenarien verwendet, in denen ein Singleton-Muster erzwungen oder die Erstellung von Instanzen auf eine Factory-Methode innerhalb der Klasse beschränkt werden soll.

Geschützte Konstruktoren:
Geschützte Konstruktoren sind nützlich, wenn Sie eine Basisklasse erstellen möchten, die nicht direkt instanziiert werden soll, aber von Unterklassen erweitert werden kann.

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

### Zugriffsmodifikatoren

Die Zugriffsmodifikatoren `private`, `protected` und `public` werden verwendet, um die Sichtbarkeit und Zugänglichkeit von Klassenmitgliedern wie Eigenschaften und Methoden in TypeScript-Klassen zu steuern. Diese Modifikatoren sind entscheidend, um Kapselung durchzusetzen und Grenzen für den Zugriff auf den internen Zustand einer Klasse sowie dessen Änderung festzulegen.

Der Modifikator `private` beschränkt den Zugriff auf das Klassenmitglied auf die enthaltende Klasse.

Der Modifikator `protected` erlaubt den Zugriff auf das Klassenmitglied innerhalb der enthaltenden Klasse und ihrer abgeleiteten Klassen.

Der Modifikator `public` ermöglicht uneingeschränkten Zugriff auf das Klassenmitglied, sodass von überall darauf zugegriffen werden kann.

### Get und Set

Getter und Setter sind spezielle Methoden, mit denen Sie benutzerdefiniertes Verhalten für den Zugriff auf Klasseneigenschaften und deren Änderung definieren können. Sie ermöglichen es Ihnen, den internen Zustand eines Objekts zu kapseln und beim Abrufen oder Festlegen von Eigenschaftswerten zusätzliche Logik bereitzustellen.
In TypeScript werden Getter beziehungsweise Setter mit den Schlüsselwörtern `get` und `set` definiert. Hier ist ein Beispiel:

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

### Auto-Accessors in Klassen

TypeScript-Version 4.9 fügt Unterstützung für Auto-Accessors hinzu, eine kommende ECMAScript-Funktion. Sie ähneln Klasseneigenschaften, werden jedoch mit dem Schlüsselwort "accessor" deklariert.

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Auto-Accessors werden in private `get`- und `set`-Accessors aufgelöst, die mit einer unzugänglichen Eigenschaft arbeiten.

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

In TypeScript bezieht sich das Schlüsselwort `this` innerhalb der Methoden oder Konstruktoren einer Klasse auf deren aktuelle Instanz. Es ermöglicht Ihnen, innerhalb des eigenen Gültigkeitsbereichs der Klasse auf deren Eigenschaften und Methoden zuzugreifen und sie zu ändern.
Es bietet eine Möglichkeit, innerhalb der eigenen Methoden eines Objekts auf dessen internen Zustand zuzugreifen und ihn zu bearbeiten.

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

### Parametereigenschaften

Mit Parametereigenschaften können Sie Klasseneigenschaften direkt in den Konstruktorparametern deklarieren und initialisieren und so Boilerplate-Code vermeiden. Zum Beispiel:

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

### Abstrakte Klassen

Abstrakte Klassen werden in TypeScript hauptsächlich für Vererbung verwendet. Sie bieten eine Möglichkeit, gemeinsame Eigenschaften und Methoden zu definieren, die von Unterklassen geerbt werden können.
Dies ist nützlich, wenn Sie gemeinsames Verhalten definieren und erzwingen möchten, dass Unterklassen bestimmte Methoden implementieren. Sie ermöglichen es, eine Klassenhierarchie zu erstellen, in der die abstrakte Basisklasse ein gemeinsames Interface und gemeinsame Funktionalität für die Unterklassen bereitstellt.

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

### Mit Generics

Klassen mit Generics ermöglichen es Ihnen, wiederverwendbare Klassen zu definieren, die mit verschiedenen Typen arbeiten können.

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

### Decorators

Decorators bieten einen Mechanismus, um Metadaten hinzuzufügen, Verhalten zu ändern, Validierungen durchzuführen oder die Funktionalität des Zielelements zu erweitern. Sie sind Funktionen, die zur Laufzeit ausgeführt werden. Auf eine Deklaration können mehrere Decorators angewendet werden.

Decorators sind experimentelle Funktionen, und die folgenden Beispiele sind nur mit TypeScript-Version 5 oder höher unter Verwendung von ES6 kompatibel.

Für TypeScript-Versionen vor 5 sollten sie über die Eigenschaft `experimentalDecorators` in Ihrer `tsconfig.json` oder durch die Verwendung von `--experimentalDecorators` in Ihrer Befehlszeile aktiviert werden (das folgende Beispiel funktioniert jedoch nicht).

Zu den häufigen Anwendungsfällen für Decorators gehören:

* Überwachen von Eigenschaftsänderungen.
* Überwachen von Methodenaufrufen.
* Hinzufügen zusätzlicher Eigenschaften oder Methoden.
* Validierung zur Laufzeit.
* Automatische Serialisierung und Deserialisierung.
* Protokollierung.
* Autorisierung und Authentifizierung.
* Absicherung gegen Fehler.

Hinweis: Decorators für Version 5 erlauben es nicht, Parameter zu dekorieren.

Arten von Decorators:

#### Klassen-Decorators

Klassen-Decorators sind nützlich, um eine bestehende Klasse zu erweitern, etwa durch das Hinzufügen von Eigenschaften oder Methoden oder das Sammeln von Instanzen einer Klasse. Im folgenden Beispiel fügen wir eine `toString`-Methode hinzu, die die Klasse in eine Zeichenfolgendarstellung umwandelt.

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

#### Eigenschafts-Decorator

Eigenschafts-Decorators sind nützlich, um das Verhalten einer Eigenschaft zu ändern, beispielsweise deren Initialisierungswerte. Im folgenden Code haben wir ein Skript, das eine Eigenschaft so festlegt, dass sie immer in Großbuchstaben vorliegt:

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

#### Methoden-Decorator

Mit Methoden-Decorators können Sie das Verhalten von Methoden ändern oder erweitern. Unten sehen Sie ein Beispiel für einen einfachen Logger:

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

Die Ausgabe lautet:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Getter- und Setter-Decorators

Mit Getter- und Setter-Decorators können Sie das Verhalten von Klassen-Accessors ändern oder erweitern. Sie sind beispielsweise nützlich, um Zuweisungen an Eigenschaften zu validieren. Hier ist ein einfaches Beispiel für einen Getter-Decorator:

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

#### Decorator-Metadaten

Decorator-Metadaten erleichtern es Decorators, Metadaten in einer beliebigen Klasse anzuwenden und zu verwenden. Decorators können auf eine neue Metadateneigenschaft des Kontextobjekts zugreifen, die sowohl für primitive Werte als auch für Objekte als Schlüssel dienen kann.
Auf Metadateninformationen kann in der Klasse über `Symbol.metadata` zugegriffen werden.

Metadaten können für verschiedene Zwecke verwendet werden, etwa für Debugging, Serialisierung oder Dependency Injection mit Decorators.

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

### Vererbung

Vererbung bezeichnet den Mechanismus, durch den eine Klasse Eigenschaften und Methoden von einer anderen Klasse erben kann, die als Basisklasse oder Oberklasse bezeichnet wird. Die abgeleitete Klasse, auch Kindklasse oder Unterklasse genannt, kann die Funktionalität der Basisklasse erweitern und spezialisieren, indem sie neue Eigenschaften und Methoden hinzufügt oder bestehende überschreibt.

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

TypeScript unterstützt keine Mehrfachvererbung im traditionellen Sinn, sondern erlaubt stattdessen die Vererbung von einer einzigen Basisklasse.
TypeScript unterstützt mehrere Interfaces. Ein Interface kann einen Vertrag für die Struktur eines Objekts definieren, und eine Klasse kann mehrere Interfaces implementieren. Dadurch kann eine Klasse Verhalten und Struktur aus mehreren Quellen erben.

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

Das Schlüsselwort `class` in TypeScript wird, ähnlich wie in JavaScript, häufig als syntaktischer Zucker bezeichnet. Es wurde in ECMAScript 2015 (ES6) eingeführt, um eine vertrautere Syntax für das klassenbasierte Erstellen und Verwenden von Objekten bereitzustellen. Dabei ist jedoch zu beachten, dass TypeScript als Obermenge von JavaScript letztlich zu JavaScript kompiliert wird, das im Kern weiterhin prototypbasiert ist.

### Statische Member

TypeScript verfügt über statische Member. Um auf die statischen Member einer Klasse zuzugreifen, können Sie den Klassennamen gefolgt von einem Punkt verwenden, ohne ein Objekt erstellen zu müssen.

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

### Initialisierung von Eigenschaften

Es gibt mehrere Möglichkeiten, Eigenschaften einer Klasse in TypeScript zu initialisieren:

Inline:

Im folgenden Beispiel werden diese Anfangswerte verwendet, wenn eine Instanz der Klasse erstellt wird.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

Im Konstruktor:

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

Mit Konstruktorparametern:

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

### Methodenüberladung

Die Methodenüberladung ermöglicht es einer Klasse, mehrere Methoden mit demselben Namen, aber unterschiedlichen Parametertypen oder einer unterschiedlichen Anzahl von Parametern zu besitzen. Dadurch können wir eine Methode abhängig von den übergebenen Argumenten auf unterschiedliche Weise aufrufen.

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

