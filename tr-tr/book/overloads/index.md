# Aşırı Yüklemeler



TypeScript'te fonksiyon aşırı yüklemeleri, tek bir fonksiyon adı için birden fazla fonksiyon imzası tanımlamanıza ve böylece birden fazla şekilde çağrılabilen fonksiyonlar oluşturmanıza olanak tanır. İşte bir örnek:

```typescript
// Aşırı yüklemeler
function sayHi(name: string): string;
function sayHi(names: string[]): string[];

// Uygulama
function sayHi(name: unknown): unknown {
    if (typeof name === 'string') {
        return `Hi, ${name}!`;
    } else if (Array.isArray(name)) {
        return name.map(name => `Hi, ${name}!`);
    }
    throw new Error('Invalid value');
}

sayHi('xx'); // Geçerli
sayHi(['aa', 'bb']); // Geçerli
```

Bir `class` içinde fonksiyon aşırı yüklemelerinin kullanımına ilişkin başka bir örnek:

```typescript
class Greeter {
    message: string;

    constructor(message: string) {
        this.message = message;
    }

    // aşırı yükleme
    sayHi(name: string): string;
    sayHi(names: string[]): ReadonlyArray<string>;

    // uygulama
    sayHi(name: unknown): unknown {
        if (typeof name === 'string') {
            return `${this.message}, ${name}!`;
        } else if (Array.isArray(name)) {
            return name.map(name => `${this.message}, ${name}!`);
        }
        throw new Error('value is invalid');
    }
}
console.log(new Greeter('Hello').sayHi('Simon'));
```

