# Never-typen



När en variabel avsmalnas till en typ som inte kan innehålla några värden, kommer TypeScript-kompilatorn att härleda att variabeln måste vara av typen `never`. Detta beror på att never-typen representerar ett värde som aldrig kan produceras.

```typescript
const printValue = (val: string | number) => {
    if (typeof val === 'string') {
        console.log(val.toUpperCase());
    } else if (typeof val === 'number') {
        console.log(val.toFixed(2));
    } else {
        // val har typen never här eftersom det aldrig kan vara något annat än en sträng eller ett tal
        const neverVal: never = val;
        console.log(`Unexpected value: ${neverVal}`);
    }
};
```

