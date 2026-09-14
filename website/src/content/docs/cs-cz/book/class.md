---
title: Třída
sidebar:
  order: 55
  label: 55. Třída
---


### Obvyklá syntaxe třídy

Klíčové slovo `class` se v TypeScriptu používá k definování třídy. Níže vidíte příklad:

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

Klíčové slovo `class` se používá k definování třídy s názvem „Person“.

Třída má dvě soukromé vlastnosti: name typu `string` a age typu `number`.

Konstruktor je definován pomocí klíčového slova `constructor`. Přijímá name a age jako parametry a přiřazuje je odpovídajícím vlastnostem.

Třída má veřejnou metodu (`public`) s názvem sayHi, která vypisuje pozdrav.

K vytvoření instance třídy v TypeScriptu můžete použít klíčové slovo `new`, za nímž následuje název třídy a závorky `()`. Například:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Konstruktor

Konstruktory jsou speciální metody uvnitř třídy, které se používají k inicializaci vlastností objektu při vytváření instance třídy.

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

Konstruktor je možné přetížit pomocí následující syntaxe:

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

V TypeScriptu je možné definovat více přetížení konstruktoru, ale můžete mít pouze jednu implementaci, která musí být kompatibilní se všemi přetíženími; toho lze dosáhnout použitím volitelného parametru.

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

### Soukromé a chráněné konstruktory

V TypeScriptu lze konstruktory označit jako soukromé nebo chráněné, čímž se omezuje jejich přístupnost a použití.

Soukromé konstruktory:
Lze je volat pouze uvnitř samotné třídy. Soukromé konstruktory se často používají v situacích, kdy chcete vynutit návrhový vzor singleton nebo omezit vytváření instancí na tovární metodu uvnitř třídy.

Chráněné konstruktory:
Chráněné konstruktory jsou užitečné, když chcete vytvořit základní třídu, jejíž instance by se neměly vytvářet přímo, ale kterou lze rozšiřovat podtřídami.

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

### Modifikátory přístupu

Modifikátory přístupu `private`, `protected` a `public` slouží v TypeScriptu k řízení viditelnosti a přístupnosti členů tříd, jako jsou vlastnosti a metody. Tyto modifikátory jsou zásadní pro vynucení zapouzdření a stanovení hranic pro přístup k vnitřnímu stavu třídy a jeho úpravu.

Modifikátor `private` omezuje přístup ke členu třídy pouze na třídu, která jej obsahuje.

Modifikátor `protected` umožňuje přístup ke členu třídy uvnitř třídy, která jej obsahuje, a jejích odvozených tříd.

Modifikátor `public` poskytuje neomezený přístup ke členu třídy a umožňuje k němu přistupovat odkudkoli.

### Get a Set

Gettery a settery jsou speciální metody, které umožňují definovat vlastní chování při přístupu k vlastnostem třídy a jejich úpravách. Umožňují zapouzdřit vnitřní stav objektu a přidat další logiku při získávání nebo nastavování hodnot vlastností.
V TypeScriptu se gettery a settery definují pomocí klíčových slov `get` a `set`. Zde je příklad:

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

### Automatické přístupové metody ve třídách

TypeScript ve verzi 4.9 přidává podporu automatických přístupových metod, což je připravovaná funkce ECMAScriptu. Podobají se vlastnostem třídy, ale deklarují se klíčovým slovem „accessor“.

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Automatické přístupové metody se převádějí ze „syntaktického cukru“ na soukromé přístupové metody `get` a `set`, které pracují s nepřístupnou vlastností.

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

V TypeScriptu odkazuje klíčové slovo `this` uvnitř metod nebo konstruktorů na aktuální instanci třídy. Umožňuje přistupovat k vlastnostem a metodám třídy a upravovat je v rámci jejího vlastního rozsahu platnosti.
Poskytuje způsob, jak přistupovat k vnitřnímu stavu objektu a manipulovat s ním uvnitř jeho vlastních metod.

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

### Vlastnosti deklarované v parametrech

Vlastnosti deklarované v parametrech umožňují deklarovat a inicializovat vlastnosti třídy přímo v parametrech konstruktoru, čímž se vyhnete opakujícímu se kódu. Například:

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

### Abstraktní třídy

Abstraktní třídy se v TypeScriptu používají především pro dědičnost. Poskytují způsob, jak definovat společné vlastnosti a metody, které mohou podtřídy zdědit.
To je užitečné, když chcete definovat společné chování a vynutit, aby podtřídy implementovaly určité metody. Umožňují vytvořit hierarchii tříd, v níž abstraktní základní třída poskytuje podtřídám sdílené rozhraní a společnou funkčnost.

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

### S generiky

Třídy s generiky umožňují definovat znovupoužitelné třídy, které mohou pracovat s různými typy.

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

### Dekorátory

Dekorátory poskytují mechanismus pro přidávání metadat, úpravu chování, validaci nebo rozšiřování funkčnosti cílového prvku. Jsou to funkce, které se vykonávají za běhu. Na deklaraci lze použít více dekorátorů.

Dekorátory jsou experimentální funkce a následující příklady jsou kompatibilní pouze s TypeScriptem verze 5 nebo vyšší při použití ES6.

Ve verzích TypeScriptu před verzí 5 je třeba je povolit pomocí vlastnosti `experimentalDecorators` v souboru `tsconfig.json` nebo pomocí `--experimentalDecorators` na příkazovém řádku (následující příklad však nebude fungovat).

Mezi běžné případy použití dekorátorů patří:

* Sledování změn vlastností.
* Sledování volání metod.
* Přidávání dalších vlastností nebo metod.
* Validace za běhu.
* Automatická serializace a deserializace.
* Logování.
* Autorizace a autentizace.
* Ochrana před chybami.

Poznámka: Dekorátory pro verzi 5 neumožňují dekorovat parametry.

Typy dekorátorů:

#### Dekorátory tříd

Dekorátory tříd jsou užitečné pro rozšíření existující třídy, například přidáním vlastností či metod nebo shromažďováním instancí třídy. V následujícím příkladu přidáme metodu `toString`, která převádí třídu na řetězcovou reprezentaci.

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

#### Dekorátor vlastnosti

Dekorátory vlastností jsou užitečné pro úpravu chování vlastnosti, například změnu inicializačních hodnot. V následujícím kódu máme skript, který nastavuje vlastnost tak, aby vždy obsahovala velká písmena:

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

#### Dekorátor metody

Dekorátory metod umožňují změnit nebo rozšířit chování metod. Níže je příklad jednoduchého loggeru:

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

Vypíše:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Dekorátory getterů a setterů

Dekorátory getterů a setterů umožňují změnit nebo rozšířit chování přístupových metod třídy. Jsou užitečné například pro validaci přiřazování hodnot vlastnostem. Zde je jednoduchý příklad dekorátoru getteru:

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

#### Metadata dekorátorů

Metadata dekorátorů zjednodušují dekorátorům přidávání a využívání metadat v libovolné třídě. Mohou přistupovat k nové vlastnosti metadata na objektu kontextu, která může sloužit jako klíč pro primitivní hodnoty i objekty.
K metadatům lze na třídě přistupovat prostřednictvím `Symbol.metadata`.

Metadata lze využít k různým účelům, například k ladění, serializaci nebo vkládání závislostí pomocí dekorátorů.

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

### Dědičnost

Dědičnost označuje mechanismus, kterým může třída zdědit vlastnosti a metody z jiné třídy, označované jako základní třída nebo nadtřída. Odvozená třída, nazývaná také dceřiná třída nebo podtřída, může rozšířit a specializovat funkčnost základní třídy přidáním nových vlastností a metod nebo přepsáním těch stávajících.

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

TypeScript nepodporuje vícenásobnou dědičnost v tradičním smyslu a místo toho umožňuje dědit z jediné základní třídy.
TypeScript podporuje více rozhraní. Rozhraní může definovat kontrakt pro strukturu objektu a třída může implementovat více rozhraní. To třídě umožňuje dědit chování a strukturu z více zdrojů.

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

Klíčové slovo `class` v TypeScriptu, podobně jako v JavaScriptu, bývá označováno jako syntaktický cukr. Bylo zavedeno v ECMAScriptu 2015 (ES6), aby nabídlo známější syntaxi pro vytváření objektů a práci s nimi způsobem založeným na třídách. Je však důležité zmínit, že TypeScript jako nadmnožina JavaScriptu se nakonec kompiluje do JavaScriptu, který zůstává ve své podstatě založen na prototypech.

### Statické členy

TypeScript má statické členy. Ke statickým členům třídy můžete přistupovat pomocí názvu třídy následovaného tečkou, aniž byste museli vytvořit objekt.

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

### Inicializace vlastností

V TypeScriptu existuje několik způsobů, jak inicializovat vlastnosti třídy:

Přímo v deklaraci:

V následujícím příkladu se tyto počáteční hodnoty použijí při vytvoření instance třídy.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

V konstruktoru:

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

Pomocí parametrů konstruktoru:

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

### Přetěžování metod

Přetěžování metod umožňuje třídě mít více metod se stejným názvem, ale s různými typy parametrů nebo s různým počtem parametrů. To nám umožňuje volat metodu různými způsoby podle předaných argumentů.

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

