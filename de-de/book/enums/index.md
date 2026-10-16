# Enums



In TypeScript ist ein `enum` eine Menge benannter konstanter Werte.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Enums können auf verschiedene Arten definiert werden:

### Numerische Enums

In TypeScript ist ein numerisches Enum ein Enum, bei dem jeder Konstanten ein numerischer Wert zugewiesen wird, der standardmäßig bei 0 beginnt.

```typescript
enum Size {
    Small, // Wert beginnt bei 0
    Medium,
    Large,
}
```

Durch eine explizite Zuweisung können benutzerdefinierte Werte angegeben werden:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### String-Enums

In TypeScript ist ein String-Enum ein Enum, bei dem jeder Konstanten ein Stringwert zugewiesen wird.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Hinweis: TypeScript erlaubt die Verwendung heterogener Enums, in denen String- und numerische Member nebeneinander vorhanden sein können.

### Konstante Enums

Ein konstantes Enum ist in TypeScript ein besonderer Enum-Typ, bei dem alle Werte zur Kompilierzeit bekannt sind und überall dort inline eingefügt werden, wo das Enum verwendet wird, was zu effizienterem Code führt.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Wird kompiliert zu:

```typescript
console.log('EN' /* Language.English */);
```

Hinweise:
Const-Enums besitzen fest codierte Werte, wodurch das Enum entfernt wird. Dies kann in eigenständigen Bibliotheken effizienter sein, ist im Allgemeinen jedoch nicht wünschenswert. Außerdem können Const-Enums keine berechneten Member enthalten.

### Reverse Mapping

In TypeScript bezeichnen Reverse Mappings in Enums die Möglichkeit, den Namen eines Enum-Members anhand seines Werts abzurufen. Standardmäßig besitzen Enum-Member Vorwärtszuordnungen vom Namen zum Wert. Reverse Mappings können jedoch erstellt werden, indem für jeden Member explizit Werte festgelegt werden. Reverse Mappings sind nützlich, wenn Sie einen Enum-Member anhand seines Werts nachschlagen oder über alle Enum-Member iterieren müssen. Beachten Sie, dass nur numerische Enum-Member Reverse Mappings erzeugen, während für String-Enum-Member überhaupt kein Reverse Mapping erzeugt wird.

Das folgende Enum:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

Wird kompiliert zu:

<!-- skip -->
```javascript
'use strict';
var Grade;
(function (Grade) {
    Grade[(Grade['A'] = 90)] = 'A';
    Grade[(Grade['B'] = 80)] = 'B';
    Grade[(Grade['C'] = 70)] = 'C';
    Grade['F'] = 'fail';
})(Grade || (Grade = {}));
```

Daher funktioniert die Zuordnung von Werten zu Schlüsseln für numerische Enum-Member, nicht jedoch für String-Enum-Member:

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // Das Element hat implizit den Typ 'any', da der Indexausdruck nicht vom Typ 'number' ist.
```

### Ambient Enums

Ein Ambient Enum ist in TypeScript ein Enum-Typ, der in einer Deklarationsdatei (*.d.ts) ohne zugehörige Implementierung definiert wird. Damit können Sie eine Menge benannter Konstanten definieren, die typsicher in verschiedenen Dateien verwendet werden können, ohne die Implementierungsdetails in jede Datei importieren zu müssen.

### Berechnete und konstante Member

In TypeScript ist ein berechneter Member ein Member eines Enums, dessen Wert zur Laufzeit berechnet wird. Ein konstanter Member ist dagegen ein Member, dessen Wert zur Kompilierzeit festgelegt wird und zur Laufzeit nicht geändert werden kann. Berechnete Member sind in regulären Enums zulässig, während konstante Member sowohl in regulären als auch in Const-Enums zulässig sind.

```typescript
// Konstante Member
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6, bei der Kompilierung erzeugt
```

```typescript
// Berechnete Member
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // Zur Laufzeit erzeugte Zufallszahl
```

Enums werden durch Unions dargestellt, die aus den Typen ihrer Member bestehen. Die Werte der einzelnen Member können durch konstante oder nicht konstante Ausdrücke bestimmt werden, wobei Membern mit konstanten Werten Literaltypen zugewiesen werden. Betrachten Sie zur Veranschaulichung die Deklaration des Typs E und seiner Untertypen E.A, E.B und E.C. In diesem Fall stellt E die Union E.A | E.B | E.C dar.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numerisches Literal
    B = 'bar', // String-Literal
    C = identity(42), // Opaker berechneter Wert
}

console.log(E.C); //42
```

