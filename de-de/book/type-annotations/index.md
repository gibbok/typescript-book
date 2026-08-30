# Typannotationen



Bei Variablen, die mit `var`, `let` und `const` deklariert werden, kann optional ein Typ hinzugefügt werden:

```typescript
const x: number = 1;
```

TypeScript kann Typen, insbesondere einfache, gut ableiten, sodass diese Deklarationen in den meisten Fällen nicht erforderlich sind.

Bei Funktionen können Parametern Typannotationen hinzugefügt werden:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

Das folgende Beispiel verwendet eine anonyme Funktion (auch Lambda-Funktion genannt):

```typescript
const sum = (a: number, b: number) => a + b;
```

Diese Annotationen können entfallen, wenn für einen Parameter ein Standardwert vorhanden ist:

```typescript
const sum = (a = 10, b: number) => a + b;
```

Funktionen können mit Rückgabetypannotationen versehen werden:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

Dies ist besonders bei komplexeren Funktionen nützlich, da das Festlegen des Rückgabetyps vor der Implementierung dabei helfen kann, die Funktion zu durchdenken.

Erwägen Sie im Allgemeinen, Typsignaturen zu annotieren, jedoch keine lokalen Variablen im Funktionsrumpf, und fügen Sie Objektliteralen immer Typen hinzu.

