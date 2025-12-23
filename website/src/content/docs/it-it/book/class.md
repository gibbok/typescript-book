---
title: Classe
sidebar:
  order: 54
  label: 54. Classe
---


### Sintassi comune della classe

La parola chiave `class` viene utilizzata in TypeScript per definire una classe. Di seguito è riportato un esempio:

```typescript
class Person {
    private name: string;
    private age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    public sayHi(): void {
        console.log(`Ciao, mi chiamo ${this.name} e ho ${this.age} anni.`);
    }
}
```

La parola chiave `class` viene utilizzata per definire una classe denominata "Person".

La classe ha due proprietà private: name di tipo `string` ed age di tipo `number`.

Il costruttore viene definito utilizzando la parola chiave `constructor`. Accetta name ed age come parametri e li assegna alle proprietà corrispondenti.

La classe ha un metodo `public` denominato sayHi che registra un messaggio di saluto.

Per creare un'istanza di una classe in TypeScript, è possibile utilizzare la parola chiave `new` seguita dal nome della classe, seguito da parentesi `()`. Ad esempio:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Ciao, mi chiamo John Doe e ho 25 anni.
```

### Costruttore

I costruttori sono metodi speciali all'interno di una classe che vengono utilizzati per inizializzare le proprietà dell'oggetto quando viene creata un'istanza della classe.

```typescript
class Person {
    public name: string;
    public age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    sayHello() {
        console.log(`Ciao, mi chiamo ${this.name} e ho ${this.age} anni.`);
    }
}

const john = new Person('Simon', 17);
john.sayHello();
```

È possibile sovraccaricare un costruttore utilizzando la seguente sintassi:

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

In TypeScript, è possibile definire più overload del costruttore, ma è possibile avere una sola implementazione che deve essere compatibile con tutti gli overload; questo si può ottenere utilizzando un parametro opzionale.

```typescript
class Person {
    name: string;
    age: number;

    constructor();
    constructor(name: string);
    constructor(name: string, age: number);
    constructor(name?: string, age?: number) {
        this.name = name ?? 'Sconosciuto';
        this.age = age ?? 0;
    }

    displayInfo() {
        console.log(`Nome: ${this.name}, Età: ${this.age}`);
    }
}

const person1 = new Person();
person1.displayInfo(); // Nome: unknown, Età: 0

const person2 = new Person('John');
person2.displayInfo(); // Nome: John, Età: 0

const person3 = new Person('Jane', 25);
person3.displayInfo(); // Nome: Jane, Età: 25
```

### Costruttori privati ​​e protetti

In TypeScript, i costruttori possono essere contrassegnati come privati ​​o protetti, il che ne limita l'accessibilità e l'utilizzo.

Costruttori privati:
possono essere chiamati solo all'interno della classe stessa. I costruttori privati ​​vengono spesso utilizzati in scenari in cui si desidera applicare un pattern singleton o limitare la creazione di istanze a un metodo factory all'interno della classe.

Costruttori protetti:
I costruttori protetti sono utili quando si desidera creare una classe base che non deve essere istanziata direttamente, ma può essere estesa tramite sottoclassi.

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

// Il tentativo di istanziare direttamente la classe base genererà un errore.
// const baseObj = new BaseClass(); // Errore: il costruttore della classe 'BaseClass' è protetto.

// Crea un'istanza della classe derivata
const derivedObj = new DerivedClass(10);
```

### Modificatori di accesso

I modificatori di accesso `private`, `protected` e `public` vengono utilizzati per controllare la visibilità e l'accessibilità dei membri della classe, come proprietà e metodi, nelle classi TypeScript. Questi modificatori sono essenziali per applicare l'incapsulamento e stabilire limiti per l'accesso e la modifica dello stato interno di una classe.

Il modificatore `private` limita l'accesso al membro della classe solo all'interno della classe contenitore.

Il modificatore `protected` consente l'accesso al membro della classe all'interno della classe contenitore e delle sue classi derivate.

Il modificatore `public` fornisce accesso illimitato al membro della classe, consentendone l'accesso da qualsiasi luogo.

### Get e Set

Getter e setter sono metodi speciali che consentono di definire un comportamento personalizzato di accesso e modifica per le proprietà della classe. Consentono di incapsulare lo stato interno di un oggetto e di fornire logica aggiuntiva durante l'ottenimento o l'impostazione dei valori delle proprietà.
In TypeScript, getter e setter sono definiti utilizzando rispettivamente le parole chiave `get` e `set`. Ecco un esempio:

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

### Accessori automatici nelle classi

TypeScript versione 4.9 aggiunge il supporto per auto-accessor, una funzionalità ECMAScript di prossima uscita. Assomigliano alle proprietà di classe, ma sono dichiarate con la parola chiave "accessor".

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Gli auto-accessor vengono "de-sugared" in accessor privati ​​`get` e `set`, che operano su una proprietà inaccessibile.

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

In TypeScript, la parola chiave `this` si riferisce all'istanza corrente di una classe all'interno dei suoi metodi o costruttori. Permette di accedere e modificare le proprietà e i metodi della classe. dall'interno del proprio ambito.
Fornisce un modo per accedere e manipolare lo stato interno di un oggetto all'interno dei propri metodi.

```typescript
class Person {
    private name: string;
    constructor(name: string) {
        this.name = name;
    }
    public introduce(): void {
        console.log(`Ciao, mi chiamo ${this.name}.`);
    }
}

const person1 = new Person('Alice');
person1.introduce(); // Ciao, mi chiamo Alice.
```

### Proprietà dei parametri

Le proprietà dei parametri consentono di dichiarare e inizializzare le proprietà della classe direttamente all'interno dei parametri del costruttore, evitando codice boilerplate, ad esempio:

```typescript
class Person {
    constructor(
        private name: string,
        public age: number
    ) {
        // Le parole chiave "private" e "public" nel costruttore
        // dichiarano e inizializzano automaticamente le proprietà della classe corrispondenti.
    }
    public introduce(): void {
        console.log(`Ciao, mi chiamo ${this.name} e ho ${this.age} anni.`);
    }
}
const person = new Person('Alice', 25);
person.introduce();
```

### Classi astratte

Le classi astratte sono utilizzate in TypeScript principalmente per l'ereditarietà, poiché forniscono un modo per definire proprietà e metodi comuni che possono essere ereditati dalle sottoclassi.
Questo è utile quando si desidera definire un comportamento comune e imporre alle sottoclassi di implementare determinati metodi. Forniscono un modo per creare una gerarchia di classi in cui la classe base astratta fornisce un'interfaccia condivisa e funzionalità comuni per le sottoclassi.

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
        console.log(`${this.name} miagola.`);
    }
}

const cat = new Cat('Whiskers');
cat.makeSound(); // Output: Whiskers miagola.
```

### Con i generici

Le classi con i generici consentono di definire classi riutilizzabili che possono funzionare con tipi diversi.

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
console.log(container1.getItem()); // 42

const container2 = new Container<string>('Hello');
container2.setItem('World');
console.log(container2.getItem()); // Mondo
```

### Decoratori

I decoratori forniscono un meccanismo per aggiungere metadati, modificare il comportamento, convalidare o estendere la funzionalità dell'elemento di destinazione. Sono funzioni che vengono eseguite in fase di esecuzione. È possibile applicare più decoratori a una dichiarazione.

I decoratori sono funzionalità sperimentali e gli esempi seguenti sono compatibili solo con TypeScript versione 5 o successive che utilizzano ES6.

Per le versioni di TypeScript precedenti alla 5, dovrebbero essere abilitati utilizzando la proprietà `experimentalDecorators` nel file `tsconfig.json` o utilizzando `--experimentalDecorators` nella riga di comando (ma l'esempio seguente non funzionerà).

Alcuni dei casi d'uso comuni per i decoratori includono:

* Monitoraggio delle modifiche delle proprietà.
* Monitoraggio delle chiamate ai metodi.
* Aggiunta di proprietà o metodi aggiuntivi.
* Validazione in fase di esecuzione.
* Serializzazione e deserializzazione automatica.
* Registrazione.
* Autorizzazione e autenticazione.
* Protezione dagli errori.

Nota: i decoratori per la versione 5 non consentono parametri di decorazione.

Tipi di decoratori:

#### Decoratori di classe

I decoratori di classe sono utili per estendere una classe esistente, ad esempio aggiungendo proprietà o metodi o raccogliendo istanze di una classe. Nell'esempio seguente, aggiungiamo un metodo `toString` che converte la classe in una rappresentazione in formato stringa.

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
        return 'Ciao,' + this.name;
    }
}
const person = new Person('Simon');
/* Log:
{"name":"Simon"}
{"kind":"class","name":"Person"}
*/
```

#### Decoratore di proprietà

I decoratori di proprietà sono utili per modificare il comportamento di una proprietà, ad esempio cambiando i valori di inizializzazione. Nel codice seguente, abbiamo uno script che imposta una proprietà in modo che sia sempre in maiuscolo:

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

console.log(new MyClass().prop1); // Log: HELLO!
```

#### Decoratore di metodo

I decoratori di metodo consentono di modificare o migliorare il comportamento dei metodi. Di seguito è riportato un esempio di un semplice logger:

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
        console.log(`LOG: Accesso al metodo '${methodName}'.`);
        const result = target.call(this, ...args);
        console.log(`LOG: Uscita dal metodo '${methodName}'.`);
        return result;
    }

    return replacementMethod;
}

class MyClass {
    @log
    sayHello() {
        console.log('Ciao!');
    }
}

new MyClass().sayHello();
```

Registra:

```shell
LOG: Accesso al metodo 'sayHello'.
Ciao!
LOG: Uscita dal metodo 'sayHello'.
```

#### Decoratori Getter e Setter

I decoratori Getter e Setter consentono di modificare o migliorare il comportamento degli accessor di classe. Sono utili, ad esempio, per convalidare le assegnazioni di proprietà. Ecco un semplice esempio di decoratore getter:

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
console.log(obj.getValue); // Valido: 10

const obj2 = new MyClass(999);
console.log(obj2.getValue); // Throw: Invalid!
```

#### Metadati del decoratore

I metadati del decoratore semplificano il processo per i decoratori di applicare e utilizzare i metadati in qualsiasi classe. Possono accedere a una nuova proprietà metadati sull'oggetto contesto, che può fungere da chiave sia per le primitive che per gli oggetti.
Le informazioni sui metadati sono accessibili sulla classe tramite `Symbol.metadata`.

I metadati possono essere utilizzati per vari scopi, come il debug, la serializzazione o l'iniezione di dipendenze con i decoratori.

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // Simple polyfill

type Context =
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    | ClassMethodDecoratorContext; // Il contesto contiene la proprietà metadati: DecoratorMetadata

function setMetadata(_target: any, context: Context) {
    // Imposta l'oggetto metadati con un valore primitivo
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

const metadata = MyClass[Symbol.metadata]; // Ottieni informazioni sui metadati

console.log(JSON.stringify(metadata)); // {"bar":true,"baz":true,"foo":true}
```

### Ereditarietà

L'ereditarietà si riferisce al meccanismo mediante il quale una classe può ereditare proprietà e metodi da un'altra classe, nota come classe base o superclasse. La classe derivata, chiamata anche classe figlia o sottoclasse, può estendere e specializzare le funzionalità della classe base aggiungendo nuove proprietà e metodi o sovrascrivendo quelli esistenti.

```typescript
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    speak(): void {
        console.log("L'animale emette un suono");
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

// Crea un'istanza della classe base
const animal = new Animal('Animale generico');
animal.speak(); // L'animale emette un suono

// Crea un'istanza della classe derivata
const dog = new Dog('Max', 'Labrador');
dog.speak(); // Woof! Bau!"
```

TypeScript non supporta l'ereditarietà multipla nel senso tradizionale, ma consente invece l'ereditarietà da una singola classe base.
TypeScript supporta più interfacce. Un'interfaccia può definire un contratto per la struttura di un oggetto e una classe può implementare più interfacce. Questo consente a una classe di ereditare comportamento e struttura da più fonti.

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

La parola chiave `class` in TypeScript, simile a JavaScript, è spesso definita "syntactic sugar". È stata introdotta in ECMAScript 2015 (ES6) offre una sintassi più familiare per la creazione e l'utilizzo di oggetti in modalità basata sulle classi. Tuttavia, è importante notare che TypeScript, essendo un superset di JavaScript, alla fine si compila in JavaScript, che rimane fondamentalmente basato sui prototipi.

### Statiche

TypeScript ha membri statici. Per accedere ai membri statici di una classe, è possibile utilizzare il nome della classe seguito da un punto, senza dover creare un oggetto.

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

### Inizializzazione delle proprietà

Esistono diversi modi per Inizializza le proprietà per una classe in TypeScript:

Inline:

Nell'esempio seguente, questi valori iniziali verranno utilizzati quando verrà creata un'istanza della classe.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

Nel costruttore:

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

Utilizzo dei parametri del costruttore:

```typescript
class MyClass {
    constructor(
        private property1: string = 'default value',
        public property2: number = 42
    ) {
        // Non è necessario assegnare esplicitamente i valori alle proprietà.
    }
    log() {
        console.log(this.property2);
    }
}
const x = new MyClass();
x.log();
```

### Sovraccarico dei metodi

Il sovraccarico dei metodi consente a una classe di avere più metodi con lo stesso nome ma tipi di parametri diversi o un numero diverso di parametri. Questo ci permette di chiamare un metodo in modi diversi in base agli argomenti passati.

```typescript
class MyClass {
    add(a: number, b: number): number; // Firma di sovraccarico 1
    add(a: string, b: string): string; // Firma di sovraccarico 2

    add(a: number | string, b: number | string): number | string {
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        }
        if (typeof a === 'string' && typeof b === 'string') {
            return a.concat(b);
        }
        throw new Error('Argomenti non validi');
    }
}

const r = new MyClass();
console.log(r.add(10, 5)); // Log 15
```

