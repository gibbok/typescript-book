---
title: Klass
sidebar:
  order: 54
  label: 54. Klass
---


### Vanlig klasssyntax

Nyckelordet `class` används i TypeScript för att definiera en klass. Nedan kan du se ett exempel:

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

Nyckelordet `class` används för att definiera en klass som heter "Person".

Klassen har två privata egenskaper: name av typen `string` och age av typen `number`.

Konstruktorn definieras med nyckelordet `constructor`. Den tar name och age som parametrar och tilldelar dem till motsvarande egenskaper.

Klassen har en `public` metod som heter sayHi som loggar ett hälsningsmeddelande.

För att skapa en instans av en klass i TypeScript kan du använda nyckelordet `new` följt av klassnamnet, följt av parenteser `()`. Till exempel:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Konstruktor

Konstruktorer är speciella metoder inom en klass som används för att initiera objektets egenskaper när en instans av klassen skapas.

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

Det är möjligt att överlagra en konstruktor med följande syntax:

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

I TypeScript är det möjligt att definiera flera konstruktoröverlagringar, men du kan bara ha en implementering som måste vara kompatibel med alla överlagringar. Detta kan uppnås genom att använda en valfri parameter.

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

### Privata och skyddade konstruktorer

I TypeScript kan konstruktorer markeras som privata eller skyddade, vilket begränsar deras åtkomlighet och användning.

Privata konstruktorer:
Kan bara anropas inom själva klassen. Privata konstruktorer används ofta i scenarier där du vill upprätthålla ett singleton-mönster eller begränsa skapandet av instanser till en fabriksmetod inom klassen.

Skyddade konstruktorer:
Skyddade konstruktorer är användbara när du vill skapa en basklass som inte ska instansieras direkt men kan utökas av underklasser.

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

### Åtkomstmodifierare

Åtkomstmodifierarna `private`, `protected` och `public` används för att styra synligheten och åtkomsten till klassmedlemmar, såsom egenskaper och metoder, i TypeScript-klasser. Dessa modifierare är viktiga för att upprätthålla inkapsling och för att etablera gränser för åtkomst och modifiering av en klass interna tillstånd.

Modifieraren `private` begränsar åtkomsten till klassmedlemmen enbart inom den innehållande klassen.

Modifieraren `protected` tillåter åtkomst till klassmedlemmen inom den innehållande klassen och dess härledda klasser.

Modifieraren `public` ger obegränsad åtkomst till klassmedlemmen och tillåter att den nås från var som helst.

### Get och Set

Getters och setters är speciella metoder som låter dig definiera anpassat åtkomst- och ändringsbeteende för klassegenskaper. De gör det möjligt att kapsla in det interna tillståndet hos ett objekt och tillhandahålla ytterligare logik vid hämtning eller inställning av egenskapsvärden.
I TypeScript definieras getters och setters med nyckelorden `get` respektive `set`. Här är ett exempel:

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

### Auto-accessorer i klasser

TypeScript version 4.9 lägger till stöd för auto-accessorer, en kommande ECMAScript-funktion. De liknar klassegenskaper men deklareras med nyckelordet "accessor".

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Auto-accessorer "avsockras" till privata `get`- och `set`-accessorer som opererar på en otillgänglig egenskap.

<!-- skip -->
```typescript
class Animal {
    #__name: string;

    get name() {
        return this.#__name;
    }
    set name(value: string) {
        this.#__name = name;
    }

    constructor(name: string) {
        this.name = name;
    }
}
```

### this

I TypeScript refererar nyckelordet `this` till den aktuella instansen av en klass inom dess metoder eller konstruktorer. Det ger dig möjlighet att komma åt och modifiera klassens egenskaper och metoder inifrån dess eget scope.
Det erbjuder ett sätt att komma åt och manipulera det interna tillståndet hos ett objekt inom dess egna metoder.

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

### Parameteregenskaper

Parameteregenskaper gör det möjligt att deklarera och initiera klassegenskaper direkt i konstruktorns parametrar, vilket undviker överflödig kod. Exempel:

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

### Abstrakta klasser

Abstrakta klasser används i TypeScript främst för arv; de erbjuder ett sätt att definiera gemensamma egenskaper och metoder som kan ärvas av underklasser.
Detta är användbart när du vill definiera gemensamt beteende och säkerställa att underklasser implementerar vissa metoder. De ger ett sätt att skapa en hierarki av klasser där den abstrakta basklassen tillhandahåller ett delat gränssnitt och gemensam funktionalitet för underklasserna.

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

### Med generics

Klasser med generics gör det möjligt att definiera återanvändbara klasser som kan arbeta med olika typer.

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

### Dekoratörer

Dekoratörer tillhandahåller en mekanism för att lägga till metadata, ändra beteende, validera eller utöka funktionaliteten hos målelementet. De är funktioner som körs vid körning. Flera dekoratörer kan tillämpas på en deklaration.

Dekoratörer är experimentella funktioner, och följande exempel är bara kompatibla med TypeScript version 5 eller senare med ES6.

För TypeScript-versioner före 5 bör de aktiveras med egenskapen `experimentalDecorators` i din `tsconfig.json` eller genom att använda `--experimentalDecorators` på kommandoraden (men följande exempel kommer inte att fungera).

Några vanliga användningsfall för dekoratörer inkluderar:

* Övervakning av egenskapsändringar.
* Övervakning av metodanrop.
* Tillägg av extra egenskaper eller metoder.
* Validering vid körning.
* Automatisk serialisering och deserialisering.
* Loggning.
* Auktorisering och autentisering.
* Felhantering.

Observera: Dekoratörer för version 5 tillåter inte dekorering av parametrar.

Typer av dekoratörer:

#### Klassdekoratörer

Klassdekoratörer är användbara för att utöka en befintlig klass, till exempel genom att lägga till egenskaper eller metoder, eller samla instanser av en klass. I följande exempel lägger vi till en `toString`-metod som konverterar klassen till en strängrepresentation.

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

#### Egenskapsdekoratör

Egenskapsdekoratörer är användbara för att ändra beteendet hos en egenskap, till exempel genom att ändra initieringsvärden. I följande kod har vi ett skript som ställer in en egenskap till att alltid vara i versaler:

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

#### Metoddekoratör

Metoddekoratörer låter dig ändra eller förbättra beteendet hos metoder. Nedan följer ett exempel på en enkel logger:

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

Det loggar:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Getter- och setter-dekoratörer

Getter- och setter-dekoratörer låter dig ändra eller förbättra beteendet hos klass-accessorer. De är användbara, till exempel, för validering av egenskapstilldelningar. Här är ett enkelt exempel på en getter-dekoratör:

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

#### Dekoratörmetadata

Dekoratörmetadata förenklar processen för dekoratörer att tillämpa och använda metadata i valfri klass. De kan komma åt en ny metadataegenskap på kontextobjektet, som kan fungera som en nyckel för både primitiva värden och objekt.
Metadatainformation kan nås på klassen via `Symbol.metadata`.

Metadata kan användas för olika ändamål, till exempel felsökning, serialisering eller beroendeinjektion med dekoratörer.

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // Simple polify

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

### Arv

Arv avser mekanismen genom vilken en klass kan ärva egenskaper och metoder från en annan klass, känd som basklassen eller superklassen. Den härledda klassen, även kallad barnklassen eller underklassen, kan utöka och specialisera basklassens funktionalitet genom att lägga till nya egenskaper och metoder eller åsidosätta befintliga.

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

TypeScript stöder inte multipelt arv i traditionell bemärkelse utan tillåter istället arv från en enda basklass.
TypeScript stöder flera gränssnitt. Ett gränssnitt kan definiera ett kontrakt för strukturen hos ett objekt, och en klass kan implementera flera gränssnitt. Detta gör det möjligt för en klass att ärva beteende och struktur från flera källor.

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

Nyckelordet `class` i TypeScript, liknande JavaScript, kallas ofta för syntaktiskt socker. Det introducerades i ECMAScript 2015 (ES6) för att erbjuda en mer välbekant syntax för att skapa och arbeta med objekt på ett klassbaserat sätt. Det är dock viktigt att notera att TypeScript, som en utökning av JavaScript, slutligen kompileras ner till JavaScript, som i grunden förblir prototypbaserat.

### Statiska medlemmar

TypeScript har statiska medlemmar. För att komma åt de statiska medlemmarna i en klass kan du använda klassnamnet följt av en punkt, utan att behöva skapa ett objekt.

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

### Egenskapsinitiering

Det finns flera sätt att initiera egenskaper för en klass i TypeScript:

Inline:

I följande exempel kommer dessa initiala värden att användas när en instans av klassen skapas.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

I konstruktorn:

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

Använda konstruktorparametrar:

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

### Metodöverlagring

Metodöverlagring gör det möjligt för en klass att ha flera metoder med samma namn men olika parametertyper eller ett annat antal parametrar. Detta gör att vi kan anropa en metod på olika sätt baserat på de argument som skickas.

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

