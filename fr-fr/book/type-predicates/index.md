# Prédicats de type



Dans TypeScript, les prédicats de type sont des fonctions qui renvoient une valeur booléenne et servent à réduire le type d’une variable à un type plus spécifique.

```typescript
const isString = (value: unknown): value is string => typeof value === 'string';

const foo = (bar: unknown) => {
    if (isString(bar)) {
        console.log(bar.toUpperCase());
    } else {
        console.log('not a string');
    }
};
```

TypeScript 5.5 infère automatiquement les prédicats de type (comme `x is T`) dans des fonctions telles que `.filter`. Il sait ainsi quand des valeurs comme undefined sont supprimées, ce qui permet d'obtenir des types plus précis et moins d'erreurs. Cela fonctionne pour les vérifications explicites (par exemple, `x !== undefined`), mais pas pour les vérifications ambiguës comme `!!x`.

```typescript
const nums = [1, null, 2].filter(x => x !== null);
```

