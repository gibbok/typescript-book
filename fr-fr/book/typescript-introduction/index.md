# Introduction à TypeScript



### Qu'est-ce que TypeScript ?

TypeScript est un langage de programmation fortement typé qui repose sur JavaScript. Il a été initialement conçu par Anders Hejlsberg en 2012 et est actuellement développé et maintenu par Microsoft en tant que projet open source.

TypeScript est compilé en JavaScript et peut être exécuté dans n'importe quel environnement d'exécution JavaScript (par exemple, un navigateur ou Node.js sur un serveur).

Il prend en charge plusieurs paradigmes de programmation, tels que la programmation fonctionnelle, générique, impérative et orientée objet. Il s'agit d'un langage compilé (transpilé), converti en JavaScript avant son exécution.

### Pourquoi TypeScript ?

TypeScript est un langage fortement typé qui aide à prévenir les erreurs de programmation courantes et à éviter certains types d'erreurs d'exécution avant que le programme ne soit exécuté.

Un langage fortement typé permet au développeur de spécifier diverses contraintes et divers comportements du programme dans les définitions de types de données, ce qui facilite la vérification de la justesse du logiciel et la prévention des défauts. Cela s'avère particulièrement utile dans les applications à grande échelle.

Voici quelques-uns des avantages de TypeScript :

* Typage statique, avec typage fort facultatif
* Inférence de type
* Accès aux fonctionnalités d'ES6 et d'ES7
* Compatibilité multiplateforme et multinavigateur
* Prise en charge par les outils avec IntelliSense

### TypeScript et JavaScript

Le code TypeScript est écrit dans des fichiers `.ts` ou `.tsx`, tandis que les fichiers JavaScript utilisent les extensions `.js` ou `.jsx`.

Les fichiers portant l'extension `.tsx` ou `.jsx` peuvent contenir l'extension de syntaxe JavaScript JSX, utilisée dans React pour le développement d'interfaces utilisateur.

En matière de syntaxe, TypeScript est un sur-ensemble typé de JavaScript (ECMAScript 2015). Tout code JavaScript est un code TypeScript valide, mais l'inverse n'est pas toujours vrai.

Prenons par exemple une fonction dans un fichier JavaScript portant l'extension `.js`, comme celle-ci :

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

La fonction peut être convertie et utilisée dans TypeScript en remplaçant l'extension du fichier par `.ts`. Cependant, si la même fonction est annotée avec des types TypeScript, elle ne peut être exécutée dans aucun environnement d'exécution JavaScript sans compilation. Le code TypeScript suivant produira une erreur de syntaxe s'il n'est pas compilé :

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript a été conçu pour détecter les erreurs d'exécution potentielles au moment de la compilation, en permettant aux développeurs d'exprimer leur intention au moyen d'annotations de type. En outre, grâce à l'inférence de type, TypeScript peut également détecter certains problèmes même lorsqu'aucune annotation de type explicite n'est fournie. Par exemple, l'extrait de code suivant ne spécifie aucun type TypeScript :

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

Dans ce cas, TypeScript détecte une erreur et indique :

```text
Property 'y' does not exist on type '{ x: number; }'.
```

Le système de types de TypeScript est largement influencé par le comportement de JavaScript à l'exécution. Par exemple, l'opérateur d'addition (+), qui peut effectuer une concaténation de chaînes ou une addition numérique en JavaScript, est modélisé de la même manière dans TypeScript :

```typescript
const result = '1' + 1; // Result is of type string
```

L'équipe à l'origine de TypeScript a délibérément choisi de signaler comme erreurs les utilisations inhabituelles de JavaScript. Prenons par exemple le code JavaScript valide suivant :

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

Cependant, TypeScript génère une erreur :

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

Cette erreur se produit parce que TypeScript applique strictement la compatibilité des types et identifie, dans ce cas, une opération non valide entre un nombre et un booléen.

### Génération de code TypeScript

Le compilateur TypeScript assume deux responsabilités principales : rechercher les erreurs de type et compiler le code en JavaScript. Ces deux processus sont indépendants l'un de l'autre. Les types n'affectent pas l'exécution du code dans un environnement d'exécution JavaScript, car ils sont entièrement effacés lors de la compilation. TypeScript peut tout de même générer du JavaScript en présence d'erreurs de type.
Voici un exemple de code TypeScript comportant une erreur de type :

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

Il peut néanmoins produire une sortie JavaScript exécutable :

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

Il n'est pas possible de vérifier les types TypeScript lors de l'exécution. Par exemple :

<!-- skip -->
```typescript
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark: () => void;
}
interface Cat extends Animal {
    meow: () => void;
}
const makeNoise = (animal: Animal) => {
    if (animal instanceof Dog) {
        // 'Dog' only refers to a type, but is being used as a value here.
        // ...
    }
};
```

Puisque les types sont effacés après la compilation, il n'existe aucun moyen d'exécuter ce code en JavaScript. Pour reconnaître les types lors de l'exécution, nous devons utiliser un autre mécanisme. TypeScript propose plusieurs options, dont l'une des plus courantes est l'« union étiquetée ». Par exemple :

```typescript
interface Dog {
    kind: 'dog'; // Tagged union
    bark: () => void;
}
interface Cat {
    kind: 'cat'; // Tagged union
    meow: () => void;
}
type Animal = Dog | Cat;

const makeNoise = (animal: Animal) => {
    if (animal.kind === 'dog') {
        animal.bark();
    } else {
        animal.meow();
    }
};

const dog: Dog = {
    kind: 'dog',
    bark: () => console.log('bark'),
};
makeNoise(dog);
```

La propriété « kind » est une valeur qui peut être utilisée lors de l'exécution pour distinguer les objets en JavaScript.

Il est également possible qu'une valeur possède, lors de l'exécution, un type différent de celui indiqué dans la déclaration de type. Cela peut par exemple se produire si le développeur a mal interprété le type d'une API et l'a annoté de manière incorrecte.

TypeScript étant un sur-ensemble de JavaScript, le mot-clé « class » peut être utilisé comme type et comme valeur lors de l'exécution.

```typescript
class Animal {
    constructor(public name: string) {}
}
class Dog extends Animal {
    constructor(
        public name: string,
        public bark: () => void
    ) {
        super(name);
    }
}
class Cat extends Animal {
    constructor(
        public name: string,
        public meow: () => void
    ) {
        super(name);
    }
}
type Mammal = Dog | Cat;

const makeNoise = (mammal: Mammal) => {
    if (mammal instanceof Dog) {
        mammal.bark();
    } else {
        mammal.meow();
    }
};

const dog = new Dog('Fido', () => console.log('bark'));
makeNoise(dog);
```

En JavaScript, une « class » possède une propriété « prototype », et l'opérateur « instanceof » permet de vérifier si la propriété prototype d'un constructeur apparaît quelque part dans la chaîne de prototypes d'un objet.

TypeScript n'a aucun effet sur les performances lors de l'exécution, car tous les types sont effacés. Cependant, TypeScript introduit un certain surcoût lors de la compilation.

### JavaScript moderne dès maintenant (Downleveling)

TypeScript peut compiler du code vers n'importe quelle version publiée de JavaScript depuis ECMAScript 3 (1999). Cela signifie que TypeScript peut transpiler du code utilisant les dernières fonctionnalités de JavaScript vers des versions antérieures, un processus appelé Downleveling. Il est ainsi possible d'utiliser du JavaScript moderne tout en conservant une compatibilité maximale avec les environnements d'exécution plus anciens.

Il est important de noter que, lors de la transpilation vers une ancienne version de JavaScript, TypeScript peut générer du code susceptible d'entraîner une surcharge de performances par rapport aux implémentations natives.

Voici quelques-unes des fonctionnalités JavaScript modernes qui peuvent être utilisées dans TypeScript :

* Les modules ECMAScript au lieu des callbacks « define » de style AMD ou des instructions « require » de CommonJS.
* Les classes au lieu des prototypes.
* La déclaration de variables avec « let » ou « const » au lieu de « var ».
* La boucle « for-of » ou « .forEach » au lieu de la boucle « for » traditionnelle.
* Les fonctions fléchées au lieu des expressions de fonction.
* L'affectation par déstructuration.
* Les noms abrégés de propriétés et de méthodes ainsi que les noms de propriétés calculés.
* Les paramètres de fonction par défaut.

En exploitant ces fonctionnalités JavaScript modernes, les développeurs peuvent écrire du code TypeScript plus expressif et plus concis.

