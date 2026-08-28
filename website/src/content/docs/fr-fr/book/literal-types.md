---
title: Types littéraux
sidebar:
  order: 17
  label: 17. Types littéraux
---


Un type littéral est un ensemble à un seul élément au sein d’un type collectif ; il définit une valeur très précise qui est une primitive JavaScript.

Les types littéraux dans TypeScript sont les nombres, les chaînes et les booléens.

Exemples de littéraux :

```typescript
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

Les types littéraux de chaîne, numériques et booléens sont utilisés dans les unions, les gardes de type et les alias de type.
Dans l’exemple suivant, vous pouvez voir un alias de type union. `O` se compose uniquement des valeurs spécifiées ; aucune autre chaîne n’est valide :

```typescript
type O = 'a' | 'b' | 'c';
```

