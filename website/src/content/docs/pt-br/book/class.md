---
title: Class
sidebar:
  order: 54
  label: 54. Class
---


Classes em TypeScript fornecem uma forma de criar objetos com propriedades e métodos.

### Sintaxe Comum de Class

```typescript
class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
}

const person = new Person('John', 30);
person.greet(); // Hello, I'm John
```

### Constructor

O construtor é um método especial chamado quando uma instância da classe é criada:

```typescript
class Car {
    brand: string;

    constructor(brand: string) {
        this.brand = brand;
    }
}
```

### Construtores Private e Protected

Construtores podem ser marcados como private ou protected para controlar como classes são instanciadas:

```typescript
class Singleton {
    private static instance: Singleton;

    private constructor() {}

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
```

### Modificadores de Acesso

TypeScript suporta modificadores de acesso: `public`, `private`, e `protected`:

* `public`: Acessível de qualquer lugar (padrão)
* `private`: Acessível apenas dentro da classe
* `protected`: Acessível dentro da classe e subclasses

```typescript
class Person {
    public name: string;
    private age: number;
    protected address: string;

    constructor(name: string, age: number, address: string) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
}
```

### Get e Set

TypeScript suporta getters e setters para controlar acesso às propriedades:

```typescript
class Person {
    private _age: number = 0;

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        if (value < 0) {
            throw new Error('Age cannot be negative');
        }
        this._age = value;
    }
}
```

### Auto-Accessors em Classes

TypeScript 4.9 introduziu auto-accessors, que simplificam a criação de getters e setters:

```typescript
class Person {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

### this

O `this` em classes refere-se à instância da classe:

```typescript
class Counter {
    count = 0;

    increment() {
        this.count++;
    }
}
```

### Propriedades de Parâmetro

TypeScript permite declarar e inicializar propriedades de classe diretamente nos parâmetros do construtor:

<!-- skip -->
```typescript
class Person {
    constructor(
        public name: string,
        private age: number
    ) {}
}

// Equivalente a:
class Person {
    public name: string;
    private age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

### Classes Abstratas

Classes abstratas são classes base das quais outras classes podem derivar. Elas não podem ser instanciadas diretamente:

```typescript
abstract class Animal {
    abstract makeSound(): void;

    move(): void {
        console.log('Moving...');
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log('Woof!');
    }
}
```

### Com Generics

Classes podem ser genéricas:

```typescript
class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }
}

const stringBox = new Box<string>('hello');
const numberBox = new Box<number>(42);
```

### Decorators

Decorators fornecem uma maneira de adicionar anotações e metaprogramação à sintaxe de classes:

#### Class Decorators

<!-- skip -->
```typescript
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class Example {
    property = 'test';
}
```

#### Property Decorator

<!-- skip -->
```typescript
function readonly(target: any, key: string) {
    Object.defineProperty(target, key, {
        writable: false,
    });
}

class Example {
    @readonly
    property = 'test';
}
```

#### Method Decorator

<!-- skip -->
```typescript
function log(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Calling ${key}`);
        return original.apply(this, args);
    };
}

class Example {
    @log
    method() {
        console.log('Method called');
    }
}
```

#### Decorators de Getter e Setter

<!-- skip -->
```typescript
function configurable(value: boolean) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

class Example {
    private _value = 0;

    @configurable(false)
    get value() {
        return this._value;
    }
}
```

#### Metadados de Decorator

Usando a biblioteca `reflect-metadata`, você pode adicionar e ler metadados:

<!-- skip -->
```typescript
import 'reflect-metadata';

function meta(key: string, value: any) {
    return Reflect.metadata(key, value);
}

class Example {
    @meta('role', 'admin')
    method() {}
}
```

### Herança

Classes podem herdar de outras classes usando `extends`:

```typescript
class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof!');
    }
}

const dog = new Dog('Buddy');
dog.bark(); // Woof!
dog.move(10); // Buddy moved 10m.
```

### Statics

Membros estáticos pertencem à própria classe, não às instâncias:

```typescript
class MathUtils {
    static PI = 3.14159;

    static areaCircle(radius: number) {
        return this.PI * radius ** 2;
    }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.areaCircle(5));
```

### Inicialização de propriedade

TypeScript permite inicializar propriedades diretamente na classe:

```typescript
class Person {
    name: string = 'Unknown';
    age: number = 0;
}
```

### Sobrecarga de método

Métodos podem ter múltiplas assinaturas:

```typescript
class Calculator {
    add(a: number, b: number): number;
    add(a: string, b: string): string;
    add(a: any, b: any): any {
        return a + b;
    }
}
```

