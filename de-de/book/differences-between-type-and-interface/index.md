# Unterschiede zwischen Typ und Interface



Deklarationszusammenführung (Augmentation):

Interfaces unterstützen die Deklarationszusammenführung. Das bedeutet, dass Sie mehrere Interfaces mit demselben Namen definieren können und TypeScript sie zu einem einzigen Interface mit den kombinierten Eigenschaften und Methoden zusammenführt. Typen hingegen unterstützen keine Deklarationszusammenführung. Dies kann hilfreich sein, wenn Sie zusätzliche Funktionalität hinzufügen oder bestehende Typen anpassen möchten, ohne die ursprünglichen Definitionen zu ändern oder fehlende beziehungsweise fehlerhafte Typen zu korrigieren.

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

Erweitern anderer Typen/Interfaces:

Sowohl Typen als auch Interfaces können andere Typen/Interfaces erweitern, die Syntax ist jedoch unterschiedlich. Bei Interfaces verwenden Sie das Schlüsselwort `extends`, um Eigenschaften und Methoden von anderen Interfaces zu erben. Ein Interface kann jedoch keinen komplexen Typ wie einen Union-Typ erweitern.

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

Bei Typen verwenden Sie den Operator &, um mehrere Typen zu einem einzigen Typ zu kombinieren (Intersection).

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

Union- und Intersection-Typen:

Typen sind bei der Definition von Union- und Intersection-Typen flexibler. Mit dem Schlüsselwort `type` können Sie Union-Typen einfach mithilfe des Operators `|` und Intersection-Typen mithilfe des Operators `&` erstellen. Interfaces können Union-Typen zwar ebenfalls indirekt darstellen, verfügen jedoch nicht über eine integrierte Unterstützung für Intersection-Typen.

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

Beispiel mit Interfaces:

```typescript
interface A {
    x: 'x';
}
interface B {
    y: 'y';
}

type C = A | B; // Union of interfaces
```

