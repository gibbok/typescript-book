---
title: Differenze tra tipo e interfaccia
sidebar:
  order: 53
  label: 53. Differenze tra tipo e interfaccia
---


Unione delle dichiarazioni (aumento):

Le interfacce supportano l'unione delle dichiarazioni, il che significa che è possibile definire più interfacce con lo stesso nome e TypeScript le unirà in un'unica interfaccia con le proprietà e i metodi combinati. D'altra parte, i tipi non supportano l'unione delle dichiarazioni. Questo può essere utile quando si desidera aggiungere funzionalità extra o personalizzare i tipi esistenti senza modificare le definizioni originali o correggere tipi mancanti o errati.

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

Estensione di altri tipi/interfacce:

Sia i tipi che le interfacce possono estendere altri tipi/interfacce, ma la sintassi è diversa. Con le interfacce, si utilizza la parola chiave `extends` per ereditare proprietà e metodi da altre interfacce. Tuttavia, un'interfaccia non può estendere un tipo complesso come un tipo unione.

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

Per i tipi, si utilizza l'operatore & per combinare più tipi in un unico tipo (intersezione).

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

Tipi di unione e intersezione:

I tipi sono più flessibili quando si tratta di definire tipi di unione e intersezione. Con la parola chiave `type`, è possibile creare facilmente tipi di unione utilizzando l'operatore `|` e tipi di intersezione utilizzando l'operatore `&`. Sebbene le interfacce possano anche rappresentare tipi di unione indirettamente, non dispongono di supporto integrato per i tipi di intersezione.

```typescript
type Department = 'dep-x' | 'dep-y'; // Unione

type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    department: Department;
};

type EmployeeInfo = Person & Employee; // Intersezione
```

Esempio con interfacce:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Unione di interfacce
```

