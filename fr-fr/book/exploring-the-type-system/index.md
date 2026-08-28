# Exploration du système de types



### Le service de langage TypeScript

Le service de langage TypeScript, également appelé tsserver, offre diverses fonctionnalités telles que le signalement des erreurs, les diagnostics, la compilation lors de l'enregistrement, le renommage, l'accès à la définition, les listes de complétion, l'aide sur les signatures et bien plus encore. Il est principalement utilisé par les environnements de développement intégrés (IDE) pour assurer la prise en charge d'IntelliSense. Il s'intègre parfaitement à Visual Studio Code et est utilisé par des outils tels que Conquer of Completion (Coc).

Les développeurs peuvent exploiter une API dédiée et créer leurs propres plugins personnalisés pour le service de langage afin d'améliorer l'expérience d'édition de TypeScript. Cela peut être particulièrement utile pour mettre en œuvre des fonctionnalités spécifiques de linting ou activer l'autocomplétion pour un langage de gabarits personnalisé.

<!-- markdownlint-disable MD044 -->
« typescript-styled-plugin » est un exemple concret de plugin personnalisé : il signale les erreurs de syntaxe et prend en charge IntelliSense pour les propriétés CSS dans les composants stylisés.
<!-- markdownlint-enable MD044 -->

Pour obtenir davantage d'informations et consulter des guides de démarrage rapide, vous pouvez vous référer au wiki officiel de TypeScript sur GitHub : [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Typage structurel

TypeScript repose sur un système de types structurel. Cela signifie que la compatibilité et l'équivalence des types sont déterminées par leur structure ou leur définition réelle, plutôt que par leur nom ou leur lieu de déclaration, comme c'est le cas dans les systèmes de types nominaux tels que ceux de C# ou C.

Le système de types structurel de TypeScript a été conçu d'après le fonctionnement du typage canard dynamique de JavaScript lors de l'exécution.

L'exemple suivant est du code TypeScript valide. Comme vous pouvez le constater, « X » et « Y » possèdent le même membre « a », bien qu'ils aient des noms de déclaration distincts. Les types sont déterminés par leurs structures et, dans ce cas, puisque celles-ci sont identiques, ils sont compatibles et valides.

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Valid
```

### Règles fondamentales de comparaison de TypeScript

Le processus de comparaison de TypeScript est récursif et s'applique aux types imbriqués à n'importe quel niveau.

Un type « X » est compatible avec « Y » si « Y » possède au moins les mêmes membres que « X ».

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

Les paramètres de fonction sont comparés selon leur type, et non selon leur nom :

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

Les types de retour des fonctions doivent être identiques :

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

Le type de retour d'une fonction source doit être un sous-type du type de retour d'une fonction cible :

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

L'omission de paramètres de fonction est autorisée, car il s'agit d'une pratique courante en JavaScript, par exemple avec « Array.prototype.map() » :

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Par conséquent, les déclarations de type suivantes sont tout à fait valides :

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

Tous les paramètres facultatifs supplémentaires du type source sont valides :

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

Tous les paramètres facultatifs du type cible sans paramètres correspondants dans le type source sont valides et ne constituent pas une erreur :

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

Le paramètre rest est traité comme une série infinie de paramètres facultatifs :

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

Les fonctions avec des surcharges sont valides si la signature de surcharge est compatible avec leur signature d'implémentation :

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Valid
x('a', 1); // Valid

function y(a: string): void; // Invalid, not compatible with implementation signature
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

La comparaison des paramètres de fonction réussit si les paramètres source et cible peuvent être affectés à des supertypes ou des sous-types (bivariance).

```typescript
// Supertype
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Subtype
class Y extends X {}
// Subtype
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Bivariance does accept supertypes
console.log(getA(new X('x'))); // Valid
console.log(getA(new Y('Y'))); // Valid
console.log(getA(new Z('z'))); // Valid
```

Les énumérations sont comparables et compatibles avec les nombres, et inversement, mais la comparaison de valeurs d'énumération provenant de types d'énumération différents est invalide.

<!-- skip -->
```typescript
enum X {
    A,
    B,
}
enum Y {
    A,
    B,
    C,
}
const xa: number = X.A; // Valid
const ya: Y = 0; // Valid
X.A === Y.A; // Invalid
```

Les instances d'une classe sont soumises à une vérification de compatibilité de leurs membres privés et protégés :

<!-- skip -->
```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}

class Y {
    private a: string;
    constructor(value: string) {
        this.a = value;
    }
}

let x: X = new Y('y'); // Invalid
```

La comparaison ne tient pas compte des différences dans la hiérarchie d'héritage, par exemple :

```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
class Y extends X {
    public a: string;
    constructor(value: string) {
        super(value);
        this.a = value;
    }
}
class Z {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
let x: X = new X('x');
let y: Y = new Y('y');
let z: Z = new Z('z');
x === y; // Valid
x === z; // Valid even if z is from a different inheritance hierarchy
```

Les génériques sont comparés d'après leurs structures, en fonction du type obtenu après application du paramètre générique ; seul le résultat final est comparé comme un type non générique.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Invalid as the type argument is used in the final structure
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Valid as the type argument is not used in the final structure
```

Lorsque les arguments de type des génériques ne sont pas spécifiés, tous les arguments non spécifiés sont traités comme des types « any » :

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

À retenir :

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Valid, everything is assignable to itself

let c: any;
c = 1; // Valid, all types are assignable to any

let d: unknown;
d = 1; // Valid, all types are assignable to unknown

let e: unknown;
let e1: unknown = e; // Valid, unknown is only assignable to itself and any
let e2: any = e; // Valid
let e3: number = e; // Invalid

let f: never;
f = 1; // Invalid, nothing is assignable to never

let g: void;
let g1: any;
g = 1; // Invalid, void is not assignable to or from anything except any
g = g1; // Valid
```

Veuillez noter que lorsque « strictNullChecks » est activé, « null » et « undefined » sont traités de la même manière que « void » ; dans le cas contraire, ils sont semblables à « never ».

### Les types comme ensembles

Dans TypeScript, un type est un ensemble de valeurs possibles. Cet ensemble est également appelé le domaine du type. Chaque valeur d'un type peut être considérée comme un élément d'un ensemble. Un type établit les contraintes que chaque élément de l'ensemble doit respecter pour être considéré comme un membre de cet ensemble.
La tâche principale de TypeScript consiste à contrôler et à vérifier si un ensemble est un sous-ensemble d'un autre.

TypeScript prend en charge différents types d'ensembles :

| Terme ensembliste    | TypeScript                      | Remarques                                                                                                           |
| ------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Ensemble vide       | never                           | « never » ne contient rien en dehors de lui-même                                                                    |
| Ensemble singleton  | undefined / null / literal type |                                                                                                                     |
| Ensemble fini       | boolean / union                 |                                                                                                                     |
| Ensemble infini     | string / number / object        |                                                                                                                     |
| Ensemble universel  | any / unknown                   | Chaque élément appartient à « any » et chaque ensemble en est un sous-ensemble / « unknown » est l'équivalent de « any » qui préserve la sécurité du typage |

Voici quelques exemples :

| TypeScript            | Terme ensembliste        | Exemple                                                                         |
| --------------------- | ------------------------ | ------------------------------------------------------------------------------- |
| never                 | ∅ (ensemble vide)        | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                          |
| Literal type          | Ensemble singleton      | type X = 'X';                                                                   |
|                       |                          | type Y = 7;                                                                     |
|                       |                          |
| Valeur affectable à T | Valeur ∈ T (membre de)   | type XY = 'X' \| 'Y';                                                           |
|                       |                          | const x: XY = 'X';                                                              |
|                       |                          |
| T1 affectable à T2    | T1 ⊆ T2 (sous-ensemble de) | type XY = 'X' \| 'Y';                                                         |
|                       |                          | const x: XY = 'X';                                                              |
|                       |                          | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                          |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (sous-ensemble de) | type X = 'X' extends string ? true : false;                                   |
|                       |                          |
| T1 \| T2              | T1 ∪ T2 (union)          | type XY = 'X' \| 'Y';                                                           |
|                       |                          | type JK = 1 \| 2;                                                               |
|                       |                          |
| T1 & T2               | T1 ∩ T2 (intersection)   | type X = \{ a: string \}                                                          |
|                       |                          | type Y = \{ b: string \}                                                          |
|                       |                          | type XY = X & Y                                                                 |
|                       |                        | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                        |
| unknown               | Ensemble universel     | const x: unknown = 1                                                            |

Une union (T1 | T2) crée un ensemble plus large (les deux) :

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Valid
```

Une intersection (T1 & T2) crée un ensemble plus restreint (uniquement ce qui est partagé) :

<!-- skip -->
```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
    b: string;
};
type XY = X & Y;
const r: XY = { a: 'a' }; // Invalid
const j: XY = { a: 'a', b: 'b' }; // Valid
```

Dans ce contexte, le mot-clé `extends` peut être considéré comme signifiant « sous-ensemble de ». Il établit une contrainte pour un type. Lorsque `extends` est utilisé avec un générique, il limite le paramètre de type générique à un type plus spécifique.

Veuillez noter qu'ici, `extends` n'a rien à voir avec l'héritage de classes au sens de la POO.

TypeScript utilise des types structurels et ne possède pas de hiérarchie nominale stricte. En réalité, comme dans l'exemple ci-dessous, deux types peuvent se chevaucher sans que l'un soit un sous-type de l'autre, car TypeScript prend en compte la structure, ou forme, des objets.

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
interface Z extends Y {
    c: string;
}
const z: Z = { a: 'a', b: 'b', c: 'c' };
interface X1 {
    a: string;
}
interface Y1 {
    a: string;
    b: string;
}
interface Z1 {
    a: string;
    b: string;
    c: string;
}
const z1: Z1 = { a: 'a', b: 'b', c: 'c' };

const r: Z1 = z; // Valid
```

### Attribuer un type : déclarations et assertions de type

Dans TypeScript, un type peut être attribué de différentes manières :

#### Déclaration de type

Dans l'exemple suivant, nous utilisons x: X (« : Type ») pour déclarer un type pour la variable x.

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

Si la variable ne respecte pas le format spécifié, TypeScript signale une erreur. Par exemple :

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Error: Object literal may only specify known properties
};
```

#### Assertion de type

Il est possible d'ajouter une assertion à l'aide du mot-clé `as`. Cela indique au compilateur que le développeur dispose de plus d'informations sur un type et supprime toutes les erreurs susceptibles de se produire.

Par exemple :

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

Dans l'exemple ci-dessus, l'objet x fait l'objet d'une assertion de type X à l'aide du mot-clé as. Cela indique au compilateur TypeScript que l'objet est conforme au type spécifié, même s'il possède une propriété supplémentaire b absente de la définition du type.

Les assertions de type sont utiles lorsqu'un type plus spécifique doit être indiqué, notamment lors de l'utilisation du DOM. Par exemple :

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Ici, l'assertion de type as HTMLInputElement sert à indiquer à TypeScript que le résultat de getElementById doit être traité comme un HTMLInputElement.
Les assertions de type peuvent également être utilisées pour remapper des clés, comme le montre l'exemple ci-dessous avec les littéraux de gabarit :

```typescript
type J<Type> = {
    [Property in keyof Type as `prefix_${string &
        Property}`]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

Dans cet exemple, le type `J<Type>` utilise un type mappé avec un littéral de gabarit pour remapper les clés de Type. Il crée de nouvelles propriétés en ajoutant « prefix_ » à chaque clé, et leurs valeurs correspondantes sont des fonctions qui renvoient les valeurs des propriétés d'origine.

Il convient de noter que lors de l'utilisation d'une assertion de type, TypeScript n'effectue pas de vérification des propriétés excédentaires. Il est donc généralement préférable d'utiliser une déclaration de type lorsque la structure de l'objet est connue à l'avance.

#### Déclarations ambiantes

Les déclarations ambiantes sont des fichiers qui décrivent les types du code JavaScript ; leur nom de fichier respecte le format `.d.ts.`. Elles sont généralement importées et utilisées pour annoter des bibliothèques JavaScript existantes ou pour ajouter des types aux fichiers JS existants de votre projet.

Les types de nombreuses bibliothèques courantes sont disponibles à l'adresse :
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

et peuvent être installés à l'aide de :

```shell
npm install --save-dev @types/library-name
```

Pour vos propres déclarations ambiantes, vous pouvez effectuer un import à l'aide de la référence « triple-slash » :

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Vous pouvez utiliser des déclarations ambiantes même dans des fichiers JavaScript à l'aide de `// @ts-check`.

Le mot-clé `declare` permet de définir des types pour du code JavaScript existant sans l'importer, en servant d'espace réservé aux types provenant d'un autre fichier ou disponibles globalement.

### Vérification des propriétés et des propriétés excédentaires

TypeScript repose sur un système de types structurel, mais la vérification des propriétés excédentaires est une fonctionnalité de TypeScript qui lui permet de vérifier si un objet possède exactement les propriétés spécifiées dans le type.

La vérification des propriétés excédentaires est effectuée lors de l'affectation de littéraux d'objet à des variables ou lorsqu'ils sont passés comme arguments à un paramètre de fonction, par exemple.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### Types faibles

Un type est considéré comme faible lorsqu'il ne contient qu'un ensemble de propriétés toutes facultatives :

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript considère comme une erreur l'affectation d'une valeur à un type faible lorsqu'il n'existe aucun chevauchement ; par exemple, le code suivant génère une erreur :

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

Bien que cela ne soit pas recommandé, il est possible, si nécessaire, de contourner cette vérification à l'aide d'une assertion de type :

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

Ou en ajoutant `unknown` à la signature d'index du type faible :

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### Vérification stricte des littéraux d'objet (fraîcheur)

La vérification stricte des littéraux d'objet, parfois appelée « fraîcheur », est une fonctionnalité de TypeScript qui permet de détecter les propriétés excédentaires ou mal orthographiées qui passeraient autrement inaperçues lors des vérifications structurelles normales des types.

Lors de la création d’un littéral d’objet, le compilateur TypeScript le considère comme « frais ». Si le littéral d’objet est affecté à une variable ou passé en tant que paramètre, TypeScript génère une erreur si le littéral d’objet spécifie des propriétés qui n’existent pas dans le type cible.

Cependant, cette « fraîcheur » disparaît lorsqu’un littéral d’objet est élargi ou qu’une assertion de type est utilisée.

Voici quelques exemples pour illustrer ce comportement :

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Freshness check: Invalid assignment
var y: Y;
y = { a: 'a', bx: 'bx' }; // Freshness check: Invalid assignment

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Widening: No errors, structurally type compatible

fn({ a: 'a', bx: 'b' }); // Freshness check: Invalid argument

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Widening: No Freshness check
```

### Inférence de type

TypeScript peut inférer les types lorsqu’aucune annotation n’est fournie lors de :

* L’initialisation d’une variable.
* L’initialisation d’un membre.
* La définition de valeurs par défaut pour les paramètres.
* La détermination du type de retour d’une fonction.

Par exemple :

```typescript
let x = 'x'; // The type inferred is string
```

Le compilateur TypeScript analyse la valeur ou l’expression et détermine son type à partir des informations disponibles.

### Inférences plus avancées

Lorsque plusieurs expressions interviennent dans l’inférence de type, TypeScript recherche le « meilleur type commun ». Par exemple :

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

Si le compilateur ne peut pas trouver le meilleur type commun, il renvoie un type union. Par exemple :

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript utilise le « typage contextuel » en fonction de l’emplacement de la variable pour inférer les types. Dans l’exemple suivant, le compilateur sait que `e` est de type `MouseEvent` grâce au type de l’événement `click` défini dans le fichier lib.d.ts, qui contient des déclarations ambiantes pour diverses constructions JavaScript courantes et le DOM :

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### Élargissement des types

L’élargissement de type est le processus par lequel TypeScript attribue un type à une variable initialisée sans annotation de type. Il permet de passer de types étroits à des types plus larges, mais pas l’inverse.
Dans l’exemple suivant :

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript attribue `string` à `x` à partir de l’unique valeur fournie lors de l’initialisation (`x`) ; il s’agit d’un exemple d’élargissement.

TypeScript permet de contrôler le processus d’élargissement, par exemple en utilisant « const ».

### Const

L’utilisation du mot-clé `const` lors de la déclaration d’une variable entraîne une inférence de type plus étroite dans TypeScript.

Par exemple :

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

En déclarant la variable x avec `const`, son type est restreint à la valeur littérale spécifique 'x'. Comme le type de x est plus étroit, il peut être affecté à la variable y sans erreur.
Le type peut être inféré ainsi, car les variables `const` ne peuvent pas être réaffectées. Leur type peut donc être restreint à un type littéral spécifique, ici le type littéral 'x'.

#### Modificateur Const sur les paramètres de type

Depuis la version 5.0 de TypeScript, il est possible de spécifier l’attribut `const` sur un paramètre de type générique. Cela permet d’inférer le type le plus précis possible. Voyons un exemple sans utiliser `const` :

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

Comme vous pouvez le constater, les propriétés `a` et `b` sont inférées avec un type `string`.

Voyons maintenant la différence avec la version utilisant `const` :

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
```

Nous pouvons maintenant constater que les propriétés `a` et `b` sont inférées comme des littéraux de chaîne plutôt que comme de simples types `string`.

#### Assertion Const

Cette fonctionnalité permet de déclarer une variable avec un type littéral plus précis à partir de sa valeur d’initialisation, ce qui indique au compilateur que la valeur doit être traitée comme un littéral immuable. Voici quelques exemples :

Sur une seule propriété :

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

Sur un objet entier :

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

Cela peut être particulièrement utile lors de la définition du type d’un tuple :

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### Annotation de type explicite

Nous pouvons être explicites et fournir un type. Dans l’exemple suivant, la propriété `x` est de type `number` :

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

Nous pouvons rendre l’annotation de type plus précise en utilisant une union de types littéraux :

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### Réduction

La réduction de type est le processus par lequel TypeScript réduit un type général à un type plus spécifique. Cela se produit lorsque TypeScript analyse le code et détermine que certaines conditions ou opérations permettent d’affiner les informations de type.

La réduction des types peut se produire de différentes manières, notamment avec :

#### Conditions

En utilisant des instructions conditionnelles, telles que `if` ou `switch`, TypeScript peut réduire le type en fonction du résultat de la condition. Par exemple :

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### Lever une exception ou retourner une valeur

Lever une exception ou effectuer un retour anticipé depuis une branche peut aider TypeScript à réduire un type. Par exemple :

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

Parmi les autres façons de réduire les types dans TypeScript figurent :

* L’opérateur `instanceof` : utilisé pour vérifier si un objet est une instance d’une classe spécifique.
* L’opérateur `in` : utilisé pour vérifier si une propriété existe dans un objet.
* L’opérateur `typeof` : utilisé pour vérifier le type d’une valeur lors de l’exécution.
* Les fonctions intégrées telles que `Array.isArray()` : utilisées pour vérifier si une valeur est un tableau.

#### Union discriminée

L’utilisation d’une « union discriminée » est un modèle dans TypeScript où une « étiquette » explicite est ajoutée aux objets afin de distinguer les différents types d’une union. Ce modèle est également appelé « union étiquetée ». Dans l’exemple suivant, l’« étiquette » est représentée par la propriété « type » :

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // type is A
        case 'type_b':
            return input.value + 'extra'; // type is B
    }
};
```

#### Gardes de type définies par l'utilisateur

Lorsque TypeScript ne parvient pas à déterminer un type, il est possible d’écrire une fonction auxiliaire appelée « garde de type définie par l’utilisateur ». Dans l’exemple suivant, nous utiliserons un prédicat de type pour réduire le type après l’application d’un filtrage :

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

#### Réduction avec switch-true

TypeScript 5.3 ajoute la réduction avec switch-true, qui permet de remplacer des chaînes if/else peu lisibles par switch (true) utilisant des conditions booléennes. Elle améliore la lisibilité tout en continuant à réduire les types. Elle s’apparente à la correspondance de motifs, mais en plus simple.

```typescript
function classify(x: unknown) {
    switch (true) {
        case typeof x === 'string':
            return `"${x.toUpperCase()}"`;
        case typeof x === 'number':
            return x > 0 ? 'positive' : 'negative';
        case Array.isArray(x):
            return `[${x.length} items]`;
        default:
            return 'something else';
    }
}
```

