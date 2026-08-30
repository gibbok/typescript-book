# Symbole



Symbole sind ein primitiver Datentyp, der einen unveränderlichen Wert darstellt, dessen globale Eindeutigkeit während der gesamten Laufzeit des Programms garantiert ist.

Symbole können als Schlüssel für Objekteigenschaften verwendet werden und bieten eine Möglichkeit, nicht aufzählbare Eigenschaften zu erstellen.

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

In WeakMaps und WeakSets sind Symbole nun als Schlüssel zulässig.

