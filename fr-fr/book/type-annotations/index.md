# Annotations de type



Pour les variables déclarées avec `var`, `let` et `const`, il est possible d’ajouter facultativement un type :

```typescript
const x: number = 1;
```

TypeScript infère efficacement les types, en particulier les plus simples. Ces déclarations ne sont donc pas nécessaires dans la plupart des cas.

Dans les fonctions, il est possible d’ajouter des annotations de type aux paramètres :

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

Voici un exemple utilisant une fonction anonyme (également appelée fonction lambda) :

```typescript
const sum = (a: number, b: number) => a + b;
```

Ces annotations peuvent être omises lorsqu’une valeur par défaut est fournie pour un paramètre :

```typescript
const sum = (a = 10, b: number) => a + b;
```

Des annotations de type de retour peuvent être ajoutées aux fonctions :

```typescript
const sum = (a = 10, b: number): number => a + b;
```

C’est particulièrement utile pour les fonctions plus complexes, car écrire le type de retour avant l’implémentation peut vous aider à concevoir la fonction.

De manière générale, envisagez d’annoter les signatures de type, mais pas les variables locales au corps, et ajoutez toujours des types aux littéraux d’objet.

