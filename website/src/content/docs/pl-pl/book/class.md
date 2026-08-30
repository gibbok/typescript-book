---
title: Klasa
sidebar:
  order: 55
  label: 55. Klasa
---


### Podstawowa składnia klasy

Słowo kluczowe `class` służy w TypeScript do definiowania klasy. Poniżej znajduje się przykład:

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

Słowo kluczowe `class` służy do zdefiniowania klasy o nazwie „Person”.

Klasa ma dwie prywatne właściwości: name typu `string` i age typu `number`.

Konstruktor jest definiowany za pomocą słowa kluczowego `constructor`. Przyjmuje name i age jako parametry i przypisuje je do odpowiadających im właściwości.

Klasa ma metodę `public` o nazwie sayHi, która zapisuje w konsoli wiadomość powitalną.

Aby utworzyć instancję klasy w TypeScript, można użyć słowa kluczowego `new`, po którym następuje nazwa klasy i nawiasy `()`. Na przykład:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Konstruktor

Konstruktory to specjalne metody w klasie, które służą do inicjalizowania właściwości obiektu podczas tworzenia instancji klasy.

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

Konstruktor można przeciążyć przy użyciu następującej składni:

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

W TypeScript można zdefiniować wiele przeciążeń konstruktora, ale tylko jedną implementację, która musi być zgodna ze wszystkimi przeciążeniami. Można to osiągnąć za pomocą parametru opcjonalnego.

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

### Konstruktory prywatne i chronione

W TypeScript konstruktory mogą być oznaczone jako prywatne lub chronione, co ogranicza ich dostępność i użycie.

Konstruktory prywatne:
Mogą być wywoływane wyłącznie wewnątrz samej klasy. Konstruktory prywatne są często używane w sytuacjach, gdy chce się wymusić wzorzec singletonu lub ograniczyć tworzenie instancji do metody wytwórczej wewnątrz klasy.

Konstruktory chronione:
Konstruktory chronione są przydatne, gdy chce się utworzyć klasę bazową, której nie należy bezpośrednio instancjonować, ale którą mogą rozszerzać klasy pochodne.

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

### Modyfikatory dostępu

Modyfikatory dostępu `private`, `protected` i `public` służą do kontrolowania widoczności i dostępności elementów klas TypeScript, takich jak właściwości i metody. Modyfikatory te są niezbędne do wymuszania hermetyzacji oraz wyznaczania granic dostępu do wewnętrznego stanu klasy i jego modyfikacji.

Modyfikator `private` ogranicza dostęp do elementu klasy wyłącznie do klasy, w której się on znajduje.

Modyfikator `protected` umożliwia dostęp do elementu klasy wewnątrz klasy, w której się on znajduje oraz w jej klasach pochodnych.

Modyfikator `public` zapewnia nieograniczony dostęp do elementu klasy, umożliwiając dostęp do niego z dowolnego miejsca.

### Gettery i settery

Gettery i settery to specjalne metody umożliwiające definiowanie niestandardowego sposobu dostępu do właściwości klasy i ich modyfikowania. Pozwalają hermetyzować wewnętrzny stan obiektu oraz dodawać logikę podczas pobierania lub ustawiania wartości właściwości.
W TypeScript gettery i settery definiuje się odpowiednio za pomocą słów kluczowych `get` i `set`. Oto przykład:

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

### Automatyczne akcesory w klasach

TypeScript w wersji 4.9 dodaje obsługę automatycznych akcesorów, nadchodzącej funkcji ECMAScript. Przypominają właściwości klas, ale są deklarowane za pomocą słowa kluczowego `accessor`.

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Automatyczne akcesory są przekształcane w prywatne akcesory `get` i `set`, które operują na niedostępnej właściwości.

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

W TypeScript słowo kluczowe `this` odnosi się do bieżącej instancji klasy wewnątrz jej metod lub konstruktorów. Umożliwia dostęp do właściwości i metod klasy oraz ich modyfikowanie z poziomu jej własnego zakresu.
Zapewnia sposób uzyskiwania dostępu do wewnętrznego stanu obiektu i manipulowania nim wewnątrz jego własnych metod.

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

### Właściwości parametrów

Właściwości parametrów pozwalają deklarować i inicjalizować właściwości klasy bezpośrednio w parametrach konstruktora, eliminując powtarzalny kod. Na przykład:

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

### Klasy abstrakcyjne

Klasy abstrakcyjne są używane w TypeScript głównie do dziedziczenia. Umożliwiają definiowanie wspólnych właściwości i metod, które mogą być dziedziczone przez klasy pochodne.
Jest to przydatne, gdy chce się zdefiniować wspólne zachowanie i wymusić implementację określonych metod przez klasy pochodne. Klasy abstrakcyjne pozwalają tworzyć hierarchię klas, w której abstrakcyjna klasa bazowa zapewnia wspólny interfejs i wspólną funkcjonalność dla klas pochodnych.

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

### Z typami generycznymi

Klasy z typami generycznymi umożliwiają definiowanie klas wielokrotnego użytku, które mogą działać z różnymi typami.

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

### Dekoratory

Dekoratory zapewniają mechanizm dodawania metadanych, modyfikowania zachowania, walidowania lub rozszerzania funkcjonalności elementu docelowego. Są to funkcje wykonywane w czasie działania programu. Do jednej deklaracji można zastosować wiele dekoratorów.

Dekoratory są eksperymentalną funkcjonalnością, a poniższe przykłady są zgodne wyłącznie z TypeScript w wersji 5 lub nowszej przy użyciu ES6.

W wersjach TypeScript starszych niż 5 należy je włączyć za pomocą właściwości `experimentalDecorators` w pliku `tsconfig.json` lub opcji `--experimentalDecorators` w wierszu poleceń (jednak poniższy przykład nie zadziała).

Niektóre z typowych przypadków użycia dekoratorów obejmują:

* Obserwowanie zmian właściwości.
* Obserwowanie wywołań metod.
* Dodawanie dodatkowych właściwości lub metod.
* Walidację w czasie działania programu.
* Automatyczną serializację i deserializację.
* Rejestrowanie zdarzeń.
* Autoryzację i uwierzytelnianie.
* Ochronę przed błędami.

Uwaga: dekoratory w wersji 5 nie pozwalają dekorować parametrów.

Typy dekoratorów:

#### Dekoratory klas

Dekoratory klas są przydatne do rozszerzania istniejącej klasy, na przykład przez dodawanie właściwości lub metod albo gromadzenie instancji klasy. W poniższym przykładzie dodajemy metodę `toString`, która przekształca klasę w reprezentację tekstową.

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

#### Dekorator właściwości

Dekoratory właściwości są przydatne do modyfikowania zachowania właściwości, na przykład przez zmianę wartości początkowych. W poniższym kodzie znajduje się skrypt, który sprawia, że właściwość jest zawsze zapisywana wielkimi literami:

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

#### Dekorator metody

Dekoratory metod umożliwiają zmianę lub rozszerzenie zachowania metod. Poniżej znajduje się przykład prostego rejestratora:

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

Rejestrowane są następujące komunikaty:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Dekoratory getterów i setterów

Dekoratory getterów i setterów umożliwiają zmianę lub rozszerzenie zachowania akcesorów klasy. Są przydatne na przykład do walidowania przypisań właściwości. Oto prosty przykład dekoratora gettera:

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

#### Metadane dekoratorów

Metadane dekoratorów upraszczają proces stosowania i wykorzystywania metadanych przez dekoratory w dowolnej klasie. Dekoratory mogą uzyskać dostęp do nowej właściwości `metadata` w obiekcie kontekstu, która może służyć jako klucz zarówno dla wartości prostych, jak i obiektów.
Dostęp do informacji o metadanych można uzyskać w klasie za pomocą `Symbol.metadata`.

Metadanych można używać do różnych celów, takich jak debugowanie, serializacja lub wstrzykiwanie zależności przy użyciu dekoratorów.

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

### Dziedziczenie

Dziedziczenie odnosi się do mechanizmu, dzięki któremu klasa może dziedziczyć właściwości i metody innej klasy, nazywanej klasą bazową lub nadrzędną. Klasa pochodna, nazywana również klasą potomną lub podklasą, może rozszerzać i specjalizować funkcjonalność klasy bazowej przez dodawanie nowych właściwości i metod albo nadpisywanie już istniejących.

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

TypeScript nie obsługuje dziedziczenia wielokrotnego w tradycyjnym znaczeniu, lecz pozwala na dziedziczenie z jednej klasy bazowej.
TypeScript umożliwia implementowanie wielu interfejsów. Interfejs może definiować kontrakt dotyczący struktury obiektu, a klasa może implementować wiele interfejsów. Dzięki temu klasa może dziedziczyć zachowanie i strukturę z wielu źródeł.

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

Słowo kluczowe `class` w TypeScript, podobnie jak w JavaScript, jest często określane mianem lukru składniowego. Zostało wprowadzone w ECMAScript 2015 (ES6), aby zapewnić bardziej znajomą składnię tworzenia obiektów i pracy z nimi w sposób oparty na klasach. Należy jednak pamiętać, że TypeScript, jako nadzbiór JavaScript, jest ostatecznie kompilowany do JavaScript, który w swojej istocie pozostaje oparty na prototypach.

### Elementy statyczne

TypeScript obsługuje elementy statyczne. Aby uzyskać dostęp do statycznych elementów klasy, można użyć nazwy klasy, po której następuje kropka, bez potrzeby tworzenia obiektu.

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

### Inicjalizacja właściwości

Istnieje kilka sposobów inicjalizowania właściwości klasy w TypeScript:

Bezpośrednio:

W poniższym przykładzie te wartości początkowe zostaną użyte podczas tworzenia instancji klasy.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

W konstruktorze:

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

Za pomocą parametrów konstruktora:

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

### Przeciążanie metod

Przeciążanie metod pozwala klasie mieć wiele metod o tej samej nazwie, ale z różnymi typami parametrów lub różną liczbą parametrów. Dzięki temu można wywoływać metodę na różne sposoby, zależnie od przekazanych argumentów.

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

