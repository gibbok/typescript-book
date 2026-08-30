# Der Typ never



Wenn eine Variable auf einen Typ eingegrenzt wird, der keine Werte enthalten kann, leitet der TypeScript-Compiler ab, dass die Variable vom Typ `never` sein muss. Dies liegt daran, dass der Typ never einen Wert darstellt, der niemals erzeugt werden kann.

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val has type never here because it can never be anything other than a string or a number
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

