# Symboly



Symboly jsou primitivním datovým typem, který představuje neměnnou hodnotu se zaručenou globální jedinečností po celou dobu běhu programu.

Symboly lze použít jako klíče vlastností objektů a poskytují způsob, jak vytvářet neenumerovatelné vlastnosti.

```typescript
const key1: symbol = Symbol('key1');
const key2: symbol = Symbol('key2');

const obj = {
    [key1]: 'value 1',
    [key2]: 'value 2',
};

console.log(obj[key1]); // value 1
console.log(obj[key2]); // value 2
```

Ve WeakMaps a WeakSets lze nyní jako klíče používat symboly.

