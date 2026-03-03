---
title: Skillnader mellan Type och Interface
sidebar:
  order: 53
  label: 53. Skillnader mellan Type och Interface
---


Deklarationssammanslagning (augmentering):

Interface stöder deklarationssammanslagning, vilket innebär att du kan definiera flera interface med samma namn, och TypeScript kommer att slå samman dem till ett enda interface med de kombinerade egenskaperna och metoderna. Å andra sidan stöder typer inte deklarationssammanslagning. Detta kan vara användbart när du vill lägga till extra funktionalitet eller anpassa befintliga typer utan att ändra de ursprungliga definitionerna eller korrigera saknade eller felaktiga typer.

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

Utökning av andra typer/interface:

Både typer och interface kan utöka andra typer/interface, men syntaxen är annorlunda. Med interface använder du nyckelordet `extends` för att ärva egenskaper och metoder från andra interface. Ett interface kan dock inte utöka en komplex typ som en union-typ.

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

För typer använder du operatorn & för att kombinera flera typer till en enda typ (intersection).

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

Union- och Intersection-typer:

Typer är mer flexibla när det gäller att definiera union- och intersection-typer. Med nyckelordet `type` kan du enkelt skapa union-typer med operatorn `|` och intersection-typer med operatorn `&`. Även om interface också kan representera union-typer indirekt, har de inget inbyggt stöd för intersection-typer.

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

Exempel med interface:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

