# Énumérations



Dans TypeScript, un `enum` est un ensemble de valeurs constantes nommées.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Les énumérations peuvent être définies de différentes manières :

### Énumérations numériques

Dans TypeScript, une énumération numérique est une énumération dans laquelle chaque constante reçoit une valeur numérique, en commençant par 0 par défaut.

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

Il est possible de spécifier des valeurs personnalisées en les affectant explicitement :

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Énumérations de chaînes

Dans TypeScript, une énumération de chaînes est une énumération dans laquelle chaque constante reçoit une valeur de type chaîne.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Remarque : TypeScript autorise l’utilisation d’énumérations hétérogènes dans lesquelles des membres de type chaîne et de type numérique peuvent coexister.

### Énumérations constantes

Dans TypeScript, une énumération constante est un type particulier d’énumération dont toutes les valeurs sont connues au moment de la compilation et incorporées partout où l’énumération est utilisée, ce qui produit un code plus efficace.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Sera compilé en :

```typescript
console.log('EN' /* Language.English */);
```

Notes :
Les énumérations constantes ont des valeurs codées en dur, ce qui efface l’énumération. Cela peut être plus efficace dans les bibliothèques autonomes, mais n’est généralement pas souhaitable. En outre, les énumérations constantes ne peuvent pas avoir de membres calculés.

### Mappage inverse

Dans TypeScript, les mappages inverses dans les énumérations désignent la possibilité de récupérer le nom d’un membre de l’énumération à partir de sa valeur. Par défaut, les membres d’une énumération disposent de mappages directs du nom vers la valeur, mais des mappages inverses peuvent être créés en définissant explicitement les valeurs de chaque membre. Les mappages inverses sont utiles lorsque vous devez rechercher un membre d’une énumération par sa valeur ou parcourir tous ses membres. Notez que seuls les membres numériques d’une énumération génèrent des mappages inverses ; les membres de type chaîne n’en génèrent aucun.

L’énumération suivante :

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

Est compilée en :

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

Par conséquent, le mappage des valeurs vers les clés fonctionne pour les membres numériques d’une énumération, mais pas pour les membres de type chaîne :

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
console.log(Grade[failGrade]); // Element implicitly has an 'any' type because index expression is not of type 'number'.
```

### Énumérations ambiantes

Dans TypeScript, une énumération ambiante est un type d’énumération défini dans un fichier de déclaration (*.d.ts) sans implémentation associée. Elle permet de définir un ensemble de constantes nommées pouvant être utilisées de manière sûre du point de vue des types dans différents fichiers, sans avoir à importer les détails d’implémentation dans chaque fichier.

### Membres calculés et constants

Dans TypeScript, un membre calculé est un membre d’une énumération dont la valeur est calculée lors de l’exécution, tandis qu’un membre constant est un membre dont la valeur est définie au moment de la compilation et ne peut pas être modifiée lors de l’exécution. Les membres calculés sont autorisés dans les énumérations classiques, tandis que les membres constants sont autorisés à la fois dans les énumérations classiques et constantes.

```typescript
// Constant members
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 generation at compilation time
```

```typescript
// Computed members
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // random number generated at run time
```

Les énumérations sont représentées par des unions composées des types de leurs membres. La valeur de chaque membre peut être déterminée au moyen d’expressions constantes ou non constantes, les membres possédant des valeurs constantes recevant des types littéraux. Pour illustrer cela, considérons la déclaration du type E et de ses sous-types E.A, E.B et E.C. Dans ce cas, E représente l’union E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

