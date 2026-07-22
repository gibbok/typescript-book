---
title: Clase
sidebar:
  order: 55
  label: 55. Clase
---


### Sintaxis habitual de las clases

La palabra clave `class` se utiliza para definir una clase. A continuación se muestra un ejemplo:

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

La palabra clave `class` define una clase denominada "Person".

La clase tiene dos propiedades privadas: name de tipo `string` y age de tipo `number`.

El constructor se define mediante la palabra clave `constructor`. Recibe name y age como parámetros y los asigna a las propiedades correspondientes.

La clase tiene un método `public` denominado sayHi que registra un saludo.

Para crear una instancia de una clase en TypeScript puede utilizarse la palabra clave `new`, seguida del nombre de la clase y de paréntesis `()`. Por ejemplo:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Constructor

Los constructores son métodos especiales de una clase que inicializan las propiedades del objeto al crear una instancia.

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

Es posible sobrecargar un constructor mediante la siguiente sintaxis:

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

En TypeScript es posible definir varias sobrecargas de constructor, pero solo puede haber una implementación compatible con todas ellas; esto puede lograrse mediante un parámetro opcional.

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

### Constructores privados y protegidos

En TypeScript, los constructores pueden marcarse como privados o protegidos, lo que restringe su accesibilidad y uso.

Constructores privados:
Solo pueden llamarse desde la propia clase. Suelen utilizarse para imponer un patrón singleton o restringir la creación de instancias a un método factoría de la clase.

Constructores protegidos:
Resultan útiles para crear una clase base que no debe instanciarse directamente, pero que puede ser extendida por subclases.

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

### Modificadores de acceso

Los modificadores de acceso `private`, `protected` y `public` controlan la visibilidad y accesibilidad de los miembros de una clase, como propiedades y métodos. Son esenciales para aplicar la encapsulación y establecer límites al acceso y modificación del estado interno.

El modificador `private` restringe el acceso al miembro a la clase que lo contiene.

El modificador `protected` permite acceder al miembro desde la clase que lo contiene y sus clases derivadas.

El modificador `public` permite acceder al miembro sin restricciones desde cualquier lugar.

### Get y set

Los getters y setters son métodos especiales que permiten definir un comportamiento personalizado de acceso y modificación para las propiedades de una clase. Permiten encapsular el estado interno de un objeto y añadir lógica al obtener o establecer valores.
En TypeScript se definen mediante las palabras clave `get` y `set`, respectivamente. Este es un ejemplo:

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

### Autoaccesores en clases

TypeScript 4.9 añade compatibilidad con los autoaccesores, una característica futura de ECMAScript. Se parecen a las propiedades de clase, pero se declaran mediante la palabra clave "accessor".

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Los autoaccesores se transforman en accesores privados `get` y `set` que operan sobre una propiedad inaccesible.

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

En TypeScript, la palabra clave `this` hace referencia a la instancia actual de una clase dentro de sus métodos o constructores. Permite acceder y modificar las propiedades y métodos de la clase desde su propio ámbito.
Proporciona una forma de acceder y manipular el estado interno de un objeto desde sus métodos.

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

### Propiedades de parámetros

Las propiedades de parámetros permiten declarar e inicializar propiedades de clase directamente en los parámetros del constructor, evitando código repetitivo. Por ejemplo:

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

### Clases abstractas

Las clases abstractas se utilizan principalmente para la herencia. Permiten definir propiedades y métodos comunes que pueden heredar las subclases.
Resultan útiles para definir un comportamiento común y exigir que las subclases implementen determinados métodos. Permiten crear una jerarquía en la que la clase base abstracta proporciona una interfaz compartida y funcionalidad común.

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

### Con genéricos

Las clases con genéricos permiten definir clases reutilizables que funcionan con tipos distintos.

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

### Decoradores

Los decoradores proporcionan un mecanismo para añadir metadatos, modificar comportamientos, validar o ampliar la funcionalidad del elemento de destino. Son funciones que se ejecutan en tiempo de ejecución y pueden aplicarse varios decoradores a una declaración.

Los decoradores son una característica experimental y los siguientes ejemplos solo son compatibles con TypeScript 5 o superior con ES6.

En versiones anteriores a TypeScript 5 deben activarse mediante la propiedad `experimentalDecorators` de `tsconfig.json` o con `--experimentalDecorators` en la línea de comandos (aunque el siguiente ejemplo no funcionará).

Algunos usos habituales de los decoradores son:

* Observar cambios en propiedades.
* Observar llamadas a métodos.
* Añadir propiedades o métodos.
* Validar en tiempo de ejecución.
* Serializar y deserializar automáticamente.
* Registrar eventos.
* Autorizar y autenticar.
* Proteger frente a errores.

Nota: los decoradores de la versión 5 no permiten decorar parámetros.

Tipos de decoradores:

#### Decoradores de clase

Los decoradores de clase resultan útiles para extender una clase existente, por ejemplo añadiendo propiedades o métodos, o recopilando instancias. En el siguiente ejemplo añadimos un método `toString` que convierte la clase en una representación de cadena.

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

#### Decorador de propiedades

Los decoradores de propiedades sirven para modificar el comportamiento de una propiedad, como sus valores de inicialización. El siguiente código establece que una propiedad esté siempre en mayúsculas:

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

#### Decorador de métodos

Los decoradores de métodos permiten cambiar o mejorar el comportamiento de los métodos. A continuación se muestra un registrador sencillo:

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

Registra:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Decoradores de getters y setters

Los decoradores de getters y setters permiten cambiar o mejorar el comportamiento de los accesores de clase. Resultan útiles, por ejemplo, para validar asignaciones de propiedades. Este es un ejemplo sencillo de decorador de getter:

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

#### Metadatos de decoradores

Los metadatos de decoradores simplifican la aplicación y el uso de metadatos en cualquier clase. Los decoradores pueden acceder a una nueva propiedad metadata del objeto de contexto, que puede servir como clave tanto para primitivos como para objetos.
La información de metadatos puede consultarse en la clase mediante `Symbol.metadata`.

Los metadatos pueden utilizarse para depuración, serialización o inyección de dependencias mediante decoradores, entre otros fines.

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

### Herencia

La herencia es el mecanismo por el que una clase hereda propiedades y métodos de otra, denominada clase base o superclase. La clase derivada, también llamada clase hija o subclase, puede ampliar y especializar su funcionalidad añadiendo propiedades y métodos o sobrescribiendo los existentes.

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

TypeScript no admite herencia múltiple en el sentido tradicional, sino que permite heredar de una única clase base.
TypeScript admite varias interfaces. Una interfaz puede definir un contrato para la estructura de un objeto y una clase puede implementar varias interfaces, lo que le permite heredar comportamiento y estructura de varias fuentes.

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

La palabra clave `class` de TypeScript, al igual que en JavaScript, suele considerarse azúcar sintáctico. Se introdujo en ECMAScript 2015 (ES6) para ofrecer una sintaxis más familiar al crear y utilizar objetos basados en clases. Sin embargo, TypeScript se compila finalmente a JavaScript, que sigue basándose en prototipos.

### Miembros estáticos

TypeScript dispone de miembros estáticos. Para acceder a ellos puede utilizarse el nombre de la clase seguido de un punto, sin crear ningún objeto.

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

### Inicialización de propiedades

Existen varias formas de inicializar las propiedades de una clase en TypeScript:

En línea:

En el siguiente ejemplo se utilizan estos valores iniciales al crear una instancia de la clase.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

En el constructor:

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

Mediante parámetros del constructor:

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

### Sobrecarga de métodos

La sobrecarga de métodos permite que una clase tenga varios métodos con el mismo nombre, pero con tipos o cantidades de parámetros distintos. Esto permite llamar a un método de formas diferentes según los argumentos proporcionados.

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

