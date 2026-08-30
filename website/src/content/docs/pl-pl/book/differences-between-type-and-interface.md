---
title: Różnice między typem a interfejsem
sidebar:
  order: 54
  label: 54. Różnice między typem a interfejsem
---


Scalanie deklaracji (rozszerzanie):

Interfejsy obsługują scalanie deklaracji, co oznacza, że można zdefiniować wiele interfejsów o tej samej nazwie, a TypeScript scali je w jeden interfejs zawierający połączone właściwości i metody. Typy natomiast nie obsługują scalania deklaracji. Może to być przydatne, gdy chce się dodać funkcjonalność lub dostosować istniejące typy bez modyfikowania pierwotnych definicji albo poprawić brakujące lub nieprawidłowe typy.

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

Rozszerzanie innych typów/interfejsów:

Zarówno typy, jak i interfejsy mogą rozszerzać inne typy/interfejsy, ale składnia jest inna. W przypadku interfejsów słowo kluczowe `extends` służy do dziedziczenia właściwości i metod z innych interfejsów. Interfejs nie może jednak rozszerzać typu złożonego, takiego jak typ sumy.

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

W przypadku typów operator `&` służy do łączenia wielu typów w jeden typ (przecięcie).

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

Typy sumy i przecięcia:

Typy są bardziej elastyczne podczas definiowania typów sumy i przecięcia. Za pomocą słowa kluczowego `type` można łatwo tworzyć typy sumy przy użyciu operatora `|` oraz typy przecięcia przy użyciu operatora `&`. Interfejsy mogą wprawdzie pośrednio reprezentować typy sumy, ale nie mają wbudowanej obsługi typów przecięcia.

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

Przykład z interfejsami:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

