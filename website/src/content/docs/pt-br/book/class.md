---
title: Class
sidebar:
  order: 54
  label: 54. Class
---


### Sintaxe Comum de Class

A palavra-chave `class` é usada em TypeScript para definir uma classe. Abaixo, você pode ver um exemplo:

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

A palavra-chave `class` é usada para definir uma classe chamada "Person".

A classe tem duas propriedades privadas: name do tipo `string` e age do tipo `number`.

O constructor é definido usando a palavra-chave `constructor`. Ele recebe name e age como parâmetros e os atribui às propriedades correspondentes.

A classe tem um método `public` chamado sayHi que registra uma mensagem de saudação.

Para criar uma instância de uma classe em TypeScript, você pode usar a palavra-chave `new` seguida pelo nome da classe, seguida por parênteses `()`. Por exemplo:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Constructor

Construtores são métodos especiais dentro de uma classe que são usados para inicializar as propriedades do objeto quando uma instância da classe é criada.

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

É possível sobrecarregar um constructor usando a seguinte sintaxe:

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

Em TypeScript, é possível definir múltiplas sobrecargas de constructor, mas você pode ter apenas uma implementação que deve ser compatível com todas as sobrecargas, isso pode ser alcançado usando um parâmetro opcional.

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

### Constructors Private e Protected

Em TypeScript, construtores podem ser marcados como private ou protected, o que restringe sua acessibilidade e uso.

Constructors Private:
Podem ser chamados apenas dentro da própria classe. Construtores privados são frequentemente usados em cenários onde você deseja impor um padrão singleton ou restringir a criação de instâncias a um método factory dentro da classe.

Constructors Protected:
Construtores protegidos são úteis quando você deseja criar uma classe base que não deve ser instanciada diretamente, mas pode ser estendida por subclasses.

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

// Tentar instanciar a classe base diretamente resultará em um erro
// const baseObj = new BaseClass(); // Error: Constructor of class 'BaseClass' is protected.

// Criar uma instância da classe derivada
const derivedObj = new DerivedClass(10);
```

### Modificadores de Acesso

Os modificadores de acesso `private`, `protected` e `public` são usados para controlar a visibilidade e acessibilidade dos membros da classe, como propriedades e métodos, em classes TypeScript. Esses modificadores são essenciais para impor encapsulamento e estabelecer limites para acessar e modificar o estado interno de uma classe.

O modificador `private` restringe o acesso ao membro da classe apenas dentro da classe que o contém.

O modificador `protected` permite o acesso ao membro da classe dentro da classe que o contém e suas classes derivadas.

O modificador `public` fornece acesso irrestrito ao membro da classe, permitindo que seja acessado de qualquer lugar.

### Get e Set

Getters e setters são métodos especiais que permitem definir comportamento de acesso e modificação personalizados para propriedades de classe. Eles permitem encapsular o estado interno de um objeto e fornecer lógica adicional ao obter ou definir os valores das propriedades.
Em TypeScript, getters e setters são definidos usando as palavras-chave `get` e `set` respectivamente. Aqui está um exemplo:

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

### Auto-Accessors em Classes

TypeScript versão 4.9 adiciona suporte para auto-accessors, um recurso futuro do ECMAScript. Eles se assemelham às propriedades de classe, mas são declarados com a palavra-chave "accessor".

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Auto-accessors são "desugados" em accessors privados `get` e `set`, operando em uma propriedade inacessível.

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

Em TypeScript, a palavra-chave `this` refere-se à instância atual de uma classe dentro de seus métodos ou construtores. Ela permite que você acesse e modifique as propriedades e métodos da classe de dentro de seu próprio escopo.
Ela fornece uma maneira de acessar e manipular o estado interno de um objeto dentro de seus próprios métodos.

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

### Propriedades de Parâmetro

Propriedades de parâmetro permitem que você declare e inicialize propriedades de classe diretamente dentro dos parâmetros do constructor, evitando código boilerplate, exemplo:

```typescript
class Person {
    constructor(
        private name: string,
        public age: number
    ) {
        // As palavras-chave "private" e "public" no constructor
        // automaticamente declaram e inicializam as propriedades de classe correspondentes.
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

### Classes Abstratas

Classes Abstratas são usadas em TypeScript principalmente para herança, elas fornecem uma maneira de definir propriedades e métodos comuns que podem ser herdados por subclasses.
Isso é útil quando você deseja definir comportamento comum e impor que as subclasses implementem certos métodos. Elas fornecem uma maneira de criar uma hierarquia de classes onde a classe base abstrata fornece uma interface compartilhada e funcionalidade comum para as subclasses.

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

### Com Generics

Classes com generics permitem que você defina classes reutilizáveis que podem trabalhar com diferentes tipos.

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

Decorators fornecem um mecanismo para adicionar metadados, modificar comportamento, validar ou estender a funcionalidade do elemento alvo. Eles são funções que executam em tempo de execução. Múltiplos decorators podem ser aplicados a uma declaração.

Decorators são recursos experimentais, e os exemplos a seguir são compatíveis apenas com TypeScript versão 5 ou superior usando ES6.

Para versões do TypeScript anteriores à 5, eles devem ser habilitados usando a propriedade `experimentalDecorators` no seu `tsconfig.json` ou usando `--experimentalDecorators` na sua linha de comando (mas o exemplo a seguir não funcionará).

Alguns dos casos de uso comuns para decorators incluem:

* Observar mudanças de propriedade.
* Observar chamadas de método.
* Adicionar propriedades ou métodos extras.
* Validação em tempo de execução.
* Serialização e desserialização automática.
* Logging.
* Autorização e autenticação.
* Proteção contra erros.

Nota: Decorators para versão 5 não permitem decorar parâmetros.

Tipos de decorators:

#### Class Decorators

Class Decorators são úteis para estender uma classe existente, como adicionar propriedades ou métodos, ou coletar instâncias de uma classe. No exemplo a seguir, adicionamos um método `toString` que converte a classe em uma representação string.

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

#### Property Decorator

Property decorators são úteis para modificar o comportamento de uma propriedade, como alterar os valores de inicialização. No código a seguir, temos um script que define uma propriedade para sempre estar em maiúsculas:

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

#### Method Decorator

Method decorators permitem que você altere ou aprimore o comportamento de métodos. Abaixo está um exemplo de um logger simples:

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

Ele registra:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Decorators de Getter e Setter

Decorators de getter e setter permitem que você altere ou aprimore o comportamento dos accessors de classe. Eles são úteis, por exemplo, para validar atribuições de propriedade. Aqui está um exemplo simples para um decorator de getter:

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

#### Metadata de Decorator

Metadata de Decorator simplifica o processo para decorators aplicarem e utilizarem metadados em qualquer classe. Eles podem acessar uma nova propriedade metadata no objeto de contexto, que pode servir como uma chave tanto para primitivos quanto para objetos.
Informações de metadata podem ser acessadas na classe via `Symbol.metadata`.

Metadata pode ser usada para vários propósitos, como debugging, serialização ou injeção de dependência com decorators.

```typescript
//@ts-ignore
Symbol.metadata ??= Symbol('Symbol.metadata'); // Polyfill simples

type Context =
    | ClassFieldDecoratorContext
    | ClassAccessorDecoratorContext
    | ClassMethodDecoratorContext; // Context contém a propriedade metadata: DecoratorMetadata

function setMetadata(_target: any, context: Context) {
    // Define o objeto metadata com um valor primitivo
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

const metadata = MyClass[Symbol.metadata]; // Obtém informações de metadata

console.log(JSON.stringify(metadata)); // {"bar":true,"baz":true,"foo":true}
```

### Herança

Herança refere-se ao mecanismo pelo qual uma classe pode herdar propriedades e métodos de outra classe, conhecida como classe base ou superclasse. A classe derivada, também chamada de classe filha ou subclasse, pode estender e especializar a funcionalidade da classe base adicionando novas propriedades e métodos ou sobrescrevendo os existentes.

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

// Criar uma instância da classe base
const animal = new Animal('Generic Animal');
animal.speak(); // The animal makes a sound

// Criar uma instância da classe derivada
const dog = new Dog('Max', 'Labrador');
dog.speak(); // Woof! Woof!"
```

TypeScript não suporta herança múltipla no sentido tradicional e, em vez disso, permite herança de uma única classe base.
TypeScript suporta múltiplas interfaces. Uma interface pode definir um contrato para a estrutura de um objeto, e uma classe pode implementar múltiplas interfaces. Isso permite que uma classe herde comportamento e estrutura de múltiplas fontes.

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

A palavra-chave `class` em TypeScript, semelhante ao JavaScript, é frequentemente referida como açúcar sintático. Foi introduzida no ECMAScript 2015 (ES6) para oferecer uma sintaxe mais familiar para criar e trabalhar com objetos de maneira baseada em classe. No entanto, é importante notar que TypeScript, sendo um superconjunto de JavaScript, no final compila para JavaScript, que permanece baseado em protótipo em seu núcleo.

### Statics

TypeScript tem membros estáticos. Para acessar os membros estáticos de uma classe, você pode usar o nome da classe seguido por um ponto, sem a necessidade de criar um objeto.

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

### Inicialização de Propriedade

Existem várias maneiras de como você pode inicializar propriedades para uma classe em TypeScript:

Inline:

No exemplo a seguir, esses valores iniciais serão usados quando uma instância da classe for criada.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

No constructor:

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

Usando parâmetros do constructor:

```typescript
class MyClass {
    constructor(
        private property1: string = 'default value',
        public property2: number = 42
    ) {
        // Não há necessidade de atribuir os valores às propriedades explicitamente.
    }
    log() {
        console.log(this.property2);
    }
}
const x = new MyClass();
x.log();
```

### Sobrecarga de Método

Sobrecarga de método permite que uma classe tenha múltiplos métodos com o mesmo nome, mas tipos de parâmetros diferentes ou um número diferente de parâmetros. Isso nos permite chamar um método de diferentes maneiras com base nos argumentos passados.

```typescript
class MyClass {
    add(a: number, b: number): number; // Assinatura de sobrecarga 1
    add(a: string, b: string): string; // Assinatura de sobrecarga 2

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
