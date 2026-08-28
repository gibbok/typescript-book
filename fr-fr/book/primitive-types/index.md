# Types primitifs



TypeScript prend en charge 7 types primitifs. Un type de données primitif désigne un type qui n’est pas un objet et auquel aucune méthode n’est associée. Dans TypeScript, tous les types primitifs sont immuables, ce qui signifie que leurs valeurs ne peuvent plus être modifiées une fois affectées.

### string

Le type primitif `string` stocke des données textuelles, et sa valeur est toujours entourée de guillemets simples ou doubles.

```typescript
const x: string = 'x';
const y: string = 'y';
```

Les chaînes peuvent s’étendre sur plusieurs lignes lorsqu’elles sont entourées du caractère accent grave (`) :

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

Le type de données `boolean` dans TypeScript stocke une valeur binaire, soit `true`, soit `false`.

```typescript
const isReady: boolean = true;
```

### number

Dans TypeScript, un type de données `number` est représenté par une valeur à virgule flottante sur 64 bits. Un type `number` peut représenter des nombres entiers et des nombres fractionnaires.
TypeScript prend également en charge les notations hexadécimale, binaire et octale, par exemple :

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigint

Un `bigint` représente des valeurs entières qui peuvent être supérieures à l’entier maximal sûr pris en charge par `number`, à savoir 2^53 - 1.

Un `bigint` peut être créé en appelant la fonction intégrée `BigInt()` ou en ajoutant `n` à la fin de n’importe quel littéral numérique entier :

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Notes :

* Les valeurs `bigint` ne peuvent pas être mélangées avec `number` ni être utilisées avec l’objet intégré `Math` ; elles doivent être converties dans le même type.
* Les valeurs `bigint` ne sont disponibles que si la configuration de la cible est ES2020 ou une version ultérieure.

### Symbol

Les symboles sont des identifiants uniques qui peuvent être utilisés comme clés de propriété dans les objets afin d’éviter les conflits de noms.

```typescript
type Obj = {
    [sym: symbol]: number;
};

const a = Symbol('a');
const b = Symbol('b');
let obj: Obj = {};
obj[a] = 123;
obj[b] = 456;

console.log(obj[a]); // 123
console.log(obj[b]); // 456
```

### null et undefined

Les types `null` et `undefined` représentent tous deux l’absence de valeur.

Le type `undefined` signifie que la valeur n’est ni affectée ni initialisée, ou indique une absence involontaire de valeur.

Le type `null` signifie que nous savons que le champ n’a pas de valeur, que la valeur est donc indisponible, et indique une absence intentionnelle de valeur.

### Array

Un `array` est un type de données pouvant stocker plusieurs valeurs, de même type ou non. Il peut être défini à l’aide de la syntaxe suivante :

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript prend en charge les tableaux en lecture seule avec la syntaxe suivante :

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript prend en charge les tuples et les tuples en lecture seule :

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

Le type de données `any` représente littéralement « n’importe quelle » valeur et constitue le type par défaut lorsque TypeScript ne peut pas inférer le type ou que celui-ci n’est pas spécifié.

Lors de l’utilisation de `any`, le compilateur TypeScript ignore la vérification des types. Il n’y a donc aucune sécurité des types lorsque `any` est utilisé. En règle générale, n’utilisez pas `any` pour faire taire le compilateur lorsqu’une erreur se produit ; concentrez-vous plutôt sur sa correction, car l’utilisation de `any` permet de rompre les contrats et de perdre les avantages de l’autocomplétion de TypeScript.

Le type `any` peut être utile lors d’une migration progressive de JavaScript vers TypeScript, car il permet de faire taire le compilateur.

Pour les nouveaux projets, utilisez l’option de configuration TypeScript `noImplicitAny`, qui permet à TypeScript de signaler les erreurs aux endroits où `any` est utilisé ou inféré.

Le type `any` est généralement une source d’erreurs susceptible de masquer de véritables problèmes dans vos types. Évitez autant que possible de l’utiliser.

