---
title: Zusammenführung und Erweiterung
sidebar:
  order: 53
  label: 53. Zusammenführung und Erweiterung
---


Zusammenführung und Erweiterung beziehen sich auf zwei unterschiedliche Konzepte bei der Arbeit mit Typen und Interfaces.

Durch Zusammenführung können Sie mehrere Deklarationen mit demselben Namen zu einer einzigen Definition kombinieren, beispielsweise wenn Sie ein Interface mit demselben Namen mehrfach definieren:

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

Erweiterung bezeichnet die Möglichkeit, bestehende Typen oder Interfaces zu erweitern oder von ihnen zu erben, um neue zu erstellen. Sie ist ein Mechanismus, mit dem zusätzliche Eigenschaften oder Methoden zu einem bestehenden Typ hinzugefügt werden, ohne dessen ursprüngliche Definition zu ändern. Beispiel:

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

