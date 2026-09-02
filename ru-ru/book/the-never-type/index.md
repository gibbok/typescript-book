# Тип данных never



Когда тип переменной сужается до типа, который не может содержать никаких значений, компилятор TypeScript выводит, что переменная должна иметь тип `never`. Это связано с тем, что тип never представляет значение, которое никогда не может быть получено.

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

