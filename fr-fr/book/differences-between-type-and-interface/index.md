# Différences entre type et interface



Fusion de déclarations (augmentation) :

Les interfaces prennent en charge la fusion de déclarations, ce qui signifie que vous pouvez définir plusieurs interfaces portant le même nom et que TypeScript les fusionnera en une seule interface regroupant leurs propriétés et méthodes. En revanche, les types ne prennent pas en charge la fusion de déclarations. Cela peut être utile lorsque vous souhaitez ajouter des fonctionnalités ou personnaliser des types existants sans modifier les définitions d'origine, ou encore corriger des types manquants ou incorrects.

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

Extension d'autres types/interfaces :

Les types comme les interfaces peuvent étendre d'autres types/interfaces, mais la syntaxe diffère. Avec les interfaces, vous utilisez le mot-clé `extends` pour hériter des propriétés et des méthodes d'autres interfaces. Toutefois, une interface ne peut pas étendre un type complexe tel qu'un type union.

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

Pour les types, vous utilisez l'opérateur & afin de combiner plusieurs types en un seul type (intersection).

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

Types union et intersection :

Les types offrent davantage de souplesse pour définir des types union et intersection. Avec le mot-clé `type`, vous pouvez facilement créer des types union à l'aide de l'opérateur `|` et des types intersection à l'aide de l'opérateur `&`. Bien que les interfaces puissent également représenter indirectement des types union, elles ne prennent pas en charge nativement les types intersection.

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

Exemple avec des interfaces :

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

