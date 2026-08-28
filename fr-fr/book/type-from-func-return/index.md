# Type à partir de la valeur de retour d'une fonction



Le type à partir de la valeur de retour d'une fonction désigne la possibilité d'inférer automatiquement le type de retour d'une fonction en fonction de son implémentation. TypeScript peut ainsi déterminer le type de la valeur renvoyée par la fonction sans annotation de type explicite.

```typescript
const add = (x: number, y: number) => x + y; // TypeScript can infer that the return type of the function is a number
```

