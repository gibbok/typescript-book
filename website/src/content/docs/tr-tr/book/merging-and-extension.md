---
title: Birleştirme ve Genişletme
sidebar:
  order: 53
  label: 53. Birleştirme ve Genişletme
---


Birleştirme ve genişletme, türler ve arayüzlerle çalışmaya ilişkin iki farklı kavramı ifade eder.

Birleştirme, aynı ada sahip birden fazla bildirimi tek bir tanımda bir araya getirmenize olanak tanır. Örneğin, aynı ada sahip bir arayüzü birden fazla kez tanımladığınızda:

```typescript
interface X {
    a: string;
}

interface X {
    b: number;
}

const person: X = {
    a: 'a',
    b: 7,
};
```

Genişletme, yenilerini oluşturmak için mevcut türleri veya arayüzleri genişletme ya da bunlardan kalıtım alma yeteneğini ifade eder. Mevcut bir türün özgün tanımını değiştirmeden ona ek özellikler veya metotlar eklemeye yarayan bir mekanizmadır. Örnek:

```typescript
interface Animal {
    name: string;
    eat(): void;
}

interface Bird extends Animal {
    sing(): void;
}

const dog: Bird = {
    name: 'Bird 1',
    eat() {
        console.log('Eating');
    },
    sing() {
        console.log('Singing');
    },
};
```

