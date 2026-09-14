---
title: Rozdíly mezi typem a rozhraním
sidebar:
  order: 54
  label: 54. Rozdíly mezi typem a rozhraním
---


Slučování deklarací (rozšíření):

Rozhraní podporují slučování deklarací, což znamená, že můžete definovat více rozhraní se stejným názvem a TypeScript je sloučí do jediného rozhraní se spojenými vlastnostmi a metodami. Typy naproti tomu slučování deklarací nepodporují. To může být užitečné, když chcete přidat další funkčnost nebo přizpůsobit existující typy bez úpravy původních definic nebo opravování chybějících či nesprávných typů.

```typescript
interface A {
    x: string;
}
interface A {
    y: string;
}
const j: A = {
    x: 'xx',
    y: 'yy',
};
```

Rozšiřování jiných typů/rozhraní:

Typy i rozhraní mohou rozšiřovat jiné typy/rozhraní, ale syntaxe se liší. U rozhraní používáte klíčové slovo `extends` k dědění vlastností a metod z jiných rozhraní. Rozhraní však nemůže rozšiřovat složitý typ, například sjednocení typů.

```typescript
interface A {
    x: string;
    y: number;
}
interface B extends A {
    z: string;
}
const car: B = {
    x: 'x',
    y: 123,
    z: 'z',
};
```

U typů používáte operátor & ke spojení více typů do jediného typu (průniku).

```typescript
interface A {
    x: string;
    y: number;
}

type B = A & {
    j: string;
};

const c: B = {
    x: 'x',
    y: 123,
    j: 'j',
};
```

Sjednocení a průniky typů:

Typy jsou při definování sjednocení a průniků typů flexibilnější. Pomocí klíčového slova `type` můžete snadno vytvářet sjednocení typů operátorem `|` a průniky typů operátorem `&`. Přestože rozhraní mohou také nepřímo reprezentovat sjednocení typů, nemají vestavěnou podporu pro průniky typů.

```typescript
type Department = 'dep-x' | 'dep-y'; // Union

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersection
```

Příklad s rozhraními:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

