---
title: Sınıf
sidebar:
  order: 55
  label: 55. Sınıf
---


### Sınıfın Yaygın Sözdizimi

TypeScript'te bir sınıf tanımlamak için `class` anahtar sözcüğü kullanılır. Aşağıda bir örnek görebilirsiniz:

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

`class` anahtar sözcüğü, "Person" adlı bir sınıf tanımlamak için kullanılır.

Sınıfın iki özel özelliği vardır: `string` türünde name ve `number` türünde age.

Oluşturucu, `constructor` anahtar sözcüğü kullanılarak tanımlanır. name ve age parametrelerini alır ve bunları karşılık gelen özelliklere atar.

Sınıf, bir karşılama mesajını günlüğe yazan sayHi adlı `public` bir metoda sahiptir.

TypeScript'te bir sınıf örneği oluşturmak için `new` anahtar sözcüğünü, ardından sınıf adını ve parantezleri `()` kullanabilirsiniz. Örneğin:

<!-- skip -->
```typescript
const myObject = new Person('John Doe', 25);
myObject.sayHi(); // Output: Hello, my name is John Doe and I am 25 years old.
```

### Oluşturucu

Oluşturucular, bir sınıf örneği oluşturulduğunda nesnenin özelliklerini başlatmak için kullanılan özel metotlardır.

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

Aşağıdaki sözdizimini kullanarak bir oluşturucuyu aşırı yüklemek mümkündür:

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

TypeScript'te birden fazla oluşturucu aşırı yüklemesi tanımlamak mümkündür, ancak tüm aşırı yüklemelerle uyumlu olması gereken yalnızca tek bir uygulamanız olabilir; bu, isteğe bağlı bir parametre kullanılarak gerçekleştirilebilir.

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

### Özel ve Korumalı Oluşturucular

TypeScript'te oluşturucular, erişilebilirliklerini ve kullanımlarını kısıtlayan private veya protected olarak işaretlenebilir.

Özel Oluşturucular:
Yalnızca sınıfın kendi içinden çağrılabilir. Özel oluşturucular genellikle tekil nesne kalıbını zorunlu kılmak veya örneklerin oluşturulmasını sınıf içindeki bir fabrika metoduyla sınırlandırmak istediğiniz senaryolarda kullanılır.

Korumalı Oluşturucular:
Korumalı oluşturucular, doğrudan örneklenmemesi ancak alt sınıflar tarafından genişletilebilmesi gereken bir temel sınıf oluşturmak istediğinizde kullanışlıdır.

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

### Erişim Belirleyicileri

Erişim Belirleyicileri `private`, `protected` ve `public`, TypeScript sınıflarında özellikler ve metotlar gibi sınıf üyelerinin görünürlüğünü ve erişilebilirliğini denetlemek için kullanılır. Bu belirleyiciler, kapsüllemeyi zorunlu kılmak ve bir sınıfın iç durumuna erişme ve onu değiştirme sınırlarını belirlemek açısından çok önemlidir.

`private` belirleyicisi, sınıf üyesine erişimi yalnızca onu içeren sınıfla sınırlar.

`protected` belirleyicisi, sınıf üyesine onu içeren sınıf ve bu sınıftan türetilen sınıflar içinden erişilmesine izin verir.

`public` belirleyicisi, sınıf üyesine kısıtlanmamış erişim sağlar ve her yerden erişilmesine olanak tanır.

### Get ve Set

Getter ve setter'lar, sınıf özellikleri için özel erişim ve değiştirme davranışı tanımlamanıza olanak tanıyan özel metotlardır. Bir nesnenin iç durumunu kapsüllemenize ve özelliklerin değerlerini alırken veya ayarlarken ek mantık sağlamanıza imkân verirler.
TypeScript'te getter ve setter'lar sırasıyla `get` ve `set` anahtar sözcükleri kullanılarak tanımlanır. İşte bir örnek:

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

### Sınıflarda Otomatik Erişimciler

TypeScript 4.9 sürümü, yakında sunulacak bir ECMAScript özelliği olan otomatik erişimciler için destek ekler. Bunlar sınıf özelliklerine benzer, ancak "accessor" anahtar sözcüğüyle bildirilir.

```typescript
class Animal {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Otomatik erişimcilerin sözdizimsel şekeri kaldırılarak, erişilemeyen bir özellik üzerinde çalışan özel `get` ve `set` erişimcilerine dönüştürülürler.

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

TypeScript'te `this` anahtar sözcüğü, bir sınıfın metotları veya oluşturucuları içindeki geçerli örneğini ifade eder. Sınıfın özelliklerine ve metotlarına kendi kapsamı içinden erişmenize ve bunları değiştirmenize olanak tanır.
Bir nesnenin iç durumuna kendi metotları içinden erişmek ve bu durumu işlemek için bir yol sağlar.

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

### Parametre Özellikleri

Parametre özellikleri, sınıf özelliklerini doğrudan oluşturucu parametreleri içinde bildirip başlatmanıza ve böylece tekrarlanan koddan kaçınmanıza olanak tanır. Örneğin:

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

### Soyut Sınıflar

Soyut Sınıflar, TypeScript'te temel olarak kalıtım için kullanılır. Alt sınıfların devralabileceği ortak özellikleri ve metotları tanımlamanın bir yolunu sağlarlar.
Bu, ortak davranış tanımlamak ve alt sınıfların belirli metotları uygulamasını zorunlu kılmak istediğinizde yararlıdır. Ayrıca soyut temel sınıfın, alt sınıflar için paylaşılan bir arayüz ve ortak işlevsellik sağladığı bir sınıf hiyerarşisi oluşturmanıza olanak tanırlar.

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

### Jeneriklerle

Jeneriklere sahip sınıflar, farklı türlerle çalışabilen yeniden kullanılabilir sınıflar tanımlamanıza olanak tanır.

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

### Dekoratörler

Dekoratörler; meta veri eklemek, davranışı değiştirmek, doğrulamak veya hedef öğenin işlevselliğini genişletmek için bir mekanizma sağlar. Bunlar çalışma zamanında yürütülen fonksiyonlardır. Bir bildirime birden fazla dekoratör uygulanabilir.

Dekoratörler deneysel özelliklerdir ve aşağıdaki örnekler yalnızca ES6 kullanan TypeScript 5 veya üzeri sürümlerle uyumludur.

TypeScript'in 5'ten önceki sürümlerinde, `experimentalDecorators` özelliğinin `tsconfig.json` dosyanızda ayarlanması veya komut satırınızda `--experimentalDecorators` kullanılmasıyla etkinleştirilmeleri gerekir (ancak aşağıdaki örnek çalışmaz).

Dekoratörlerin yaygın kullanım alanlarından bazıları şunlardır:

* Özellik değişikliklerini izleme.
* Metot çağrılarını izleme.
* Ek özellikler veya metotlar ekleme.
* Çalışma zamanı doğrulaması.
* Otomatik serileştirme ve seriden çıkarma.
* Günlüğe kaydetme.
* Yetkilendirme ve kimlik doğrulama.
* Hatalara karşı koruma.

Not: 5. sürüm dekoratörleri parametrelerin dekore edilmesine izin vermez.

Dekoratör türleri:

#### Sınıf Dekoratörleri

Sınıf Dekoratörleri, özellikler veya metotlar eklemek ya da bir sınıfın örneklerini toplamak gibi yollarla mevcut bir sınıfı genişletmek için kullanışlıdır. Aşağıdaki örnekte, sınıfı metinsel bir gösterime dönüştüren bir `toString` metodu ekliyoruz.

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

#### Özellik Dekoratörü

Özellik dekoratörleri, başlangıç değerlerini değiştirmek gibi bir özelliğin davranışını değiştirmek için kullanışlıdır. Aşağıdaki kodda, bir özelliği her zaman büyük harfli olacak şekilde ayarlayan bir betik bulunur:

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

#### Metot Dekoratörü

Metot dekoratörleri, metotların davranışını değiştirmenize veya geliştirmenize olanak tanır. Aşağıda basit bir günlükleme örneği verilmiştir:

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

Şunları günlüğe kaydeder:

```shell
LOG: Entering method 'sayHello'.
Hello!
LOG: Exiting method 'sayHello'.
```

#### Getter ve Setter Dekoratörleri

Getter ve setter dekoratörleri, sınıf erişimcilerinin davranışını değiştirmenize veya geliştirmenize olanak tanır. Örneğin, özellik atamalarını doğrulamak için kullanışlıdırlar. İşte basit bir getter dekoratörü örneği:

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

#### Dekoratör Meta Verisi

Dekoratör Meta Verisi, dekoratörlerin herhangi bir sınıfa meta veri uygulama ve bu meta veriyi kullanma sürecini basitleştirir. Dekoratörler, bağlam nesnesindeki hem ilkel değerler hem de nesneler için anahtar görevi görebilen yeni bir meta veri özelliğine erişebilir.
Meta veri bilgilerine sınıfta `Symbol.metadata` aracılığıyla erişilebilir.

Meta veri, hata ayıklama, serileştirme veya dekoratörlerle bağımlılık enjeksiyonu gibi çeşitli amaçlarla kullanılabilir.

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

### Kalıtım

Kalıtım, bir sınıfın temel sınıf veya üst sınıf olarak bilinen başka bir sınıftan özellikleri ve metotları devralabildiği mekanizmayı ifade eder. Alt sınıf olarak da adlandırılan türetilmiş sınıf, yeni özellikler ve metotlar ekleyerek veya mevcut olanları geçersiz kılarak temel sınıfın işlevselliğini genişletebilir ve özelleştirebilir.

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

TypeScript geleneksel anlamda çoklu kalıtımı desteklemez ve bunun yerine tek bir temel sınıftan kalıtıma izin verir.
TypeScript birden fazla arayüzü destekler. Bir arayüz, bir nesnenin yapısı için bir sözleşme tanımlayabilir ve bir sınıf birden fazla arayüzü uygulayabilir. Bu, bir sınıfın birden fazla kaynaktan davranış ve yapı devralmasına olanak tanır.

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

TypeScript'teki `class` anahtar sözcüğü, JavaScript'te olduğu gibi genellikle sözdizimsel şeker olarak adlandırılır. Sınıf tabanlı bir şekilde nesne oluşturmak ve nesnelerle çalışmak için daha alışıldık bir sözdizimi sunmak amacıyla ECMAScript 2015'te (ES6) kullanıma sunulmuştur. Ancak JavaScript'in bir üst kümesi olan TypeScript'in nihayetinde, temelinde prototip tabanlı kalmaya devam eden JavaScript'e derlendiğini unutmamak önemlidir.

### Statik Üyeler

TypeScript statik üyelere sahiptir. Bir sınıfın statik üyelerine erişmek için nesne oluşturmaya gerek kalmadan sınıf adını ve ardından bir nokta kullanabilirsiniz.

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

### Özellik Başlatma

TypeScript'te bir sınıfın özelliklerini başlatmanın birkaç yolu vardır:

Satır içinde:

Aşağıdaki örnekte, bir sınıf örneği oluşturulduğunda bu başlangıç değerleri kullanılır.

```typescript
class MyClass {
    property1: string = 'default value';
    property2: number = 42;
}
```

Oluşturucuda:

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

Oluşturucu parametrelerini kullanarak:

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

### Metot Aşırı Yükleme

Metot aşırı yükleme, bir sınıfın aynı ada ancak farklı parametre türlerine veya farklı sayıda parametreye sahip birden fazla metoda sahip olmasını sağlar. Bu, bir metodu iletilen argümanlara göre farklı şekillerde çağırmamıza olanak tanır.

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

