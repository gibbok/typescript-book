# Affectations



Dans TypeScript, la réduction de type à l’aide d’affectations permet de réduire le type d’une variable à partir de la valeur qui lui est affectée. Lorsqu’une valeur est affectée à une variable, TypeScript infère son type à partir de cette valeur et réduit le type de la variable pour qu’il corresponde au type inféré.

```typescript
let value: string | number;
value = 'hello';
if (typeof value === 'string') {
    console.log(value.toUpperCase());
}
value = 42;
if (typeof value === 'number') {
    console.log(value.toFixed(2));
}
```

