---
title: Generici
sidebar:
  order: 55
  label: 55. Generici
---


I generici consentono di creare componenti e funzioni riutilizzabili che possono funzionare con più tipi. Con i generici, è possibile parametrizzare tipi, funzioni e interfacce, consentendo loro di operare su tipi diversi senza doverli specificare esplicitamente in anticipo.

I generici consentono di rendere il codice più flessibile e riutilizzabile.

### Tipo generico

Per definire un tipo generico, si utilizzano le parentesi angolari (`<>`) per specificare i parametri di tipo, ad esempio:

```typescript
function identity<T>(arg: T): T {
    return arg;
}
const a = identity('x');
const b = identity(123);

const getLen = <T,>(data: ReadonlyArray<T>) => data.length;
const len = getLen([1, 2, 3]);
```

### Classi generiche

I generici possono essere applicati anche alle classi, in questo modo possono lavorare con più tipi utilizzando parametri di tipo. Questo è utile per creare definizioni di classe riutilizzabili che possono operare su diversi tipi di dati mantenendo la sicurezza dei tipi.

```typescript
class Container<T> {
    private item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const numberContainer = new Container<number>(123);
console.log(numberContainer.getItem()); // 123

const stringContainer = new Container<string>('hello');
console.log(stringContainer.getItem()); // ciao
```

### Vincoli generici

I parametri generici possono essere vincolati utilizzando la parola chiave `extends` seguita da un tipo o un'interfaccia che il parametro di tipo deve soddisfare.

Nell'esempio seguente, T deve contenere una `length` appropriata per essere valido:

<!-- skip -->
```typescript
const printLen = <T extends { length: number }>(value: T): void => {
    console.log(value.length);
};

printLen('Ciao'); // 5
printLen([1, 2, 3]); // 3
printLen({ length: 10 }); // 10
printLen(123); // Non valido
```

Una caratteristica interessante di generic introdotta nella versione 3.4 RC è l'inferenza di tipo di funzione di ordine superiore, che ha introdotto argomenti di tipo generico propagati:

```typescript
declare function pipe<A extends any[], B, C>(
    ab: (...args: A) => B,
    bc: (b: B) => C
): (...args: A) => C;

declare function list<T>(a: T): T[];
declare function box<V>(x: V): { value: V };

const listBox = pipe(list, box); // <T>(a: T) => { value: T[] }
const boxList = pipe(box, list); // <V>(x: V) => { value: V }[]
```

Questa funzionalità consente una programmazione più semplice, sicura e senza punti, comune nella programmazione funzionale.

### Restringimento contestuale generico

Il restringimento contestuale per i generici è il meccanismo di TypeScript che consente al compilatore di restringere il tipo di un parametro generico in base al contesto in cui viene utilizzato. È utile quando si lavora con tipi generici in istruzioni condizionali:

```typescript
function process<T>(value: T): void {
    if (typeof value === 'string') {
        // Il valore viene ristretto al tipo 'string'
        console.log(value.length);
    } else if (typeof value === 'number') {
        // Il valore viene ristretto al tipo 'number'
        console.log(value.toFixed(2));
    }
}

process('hello'); // 5
process(3.14159); // 3.14
```

