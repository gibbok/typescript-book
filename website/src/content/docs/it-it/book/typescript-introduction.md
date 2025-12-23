---
title: Introduzione a TypeScript
sidebar:
  order: 7
  label: 7. Introduzione a TypeScript
---


### Cos'è TypeScript?

TypeScript è un linguaggio di programmazione fortemente tipizzato basato su JavaScript. È stato originariamente progettato da Anders Hejlsberg nel 2012 ed è attualmente sviluppato e gestito da Microsoft come progetto open source.

TypeScript compila in JavaScript e può essere eseguito in qualsiasi runtime JavaScript (ad esempio, un browser o un server Node.js).

TypeScript supporta diversi paradigmi di programmazione, come funzionale, generico, imperativo e orientato agli oggetti. TypeScript non è un linguaggio interpretato né compilato.

### Perché TypeScript?

TypeScript è un linguaggio fortemente tipizzato che aiuta a prevenire errori di programmazione comuni ed evitare determinati tipi di errori di runtime prima dell'esecuzione del programma.

Un linguaggio fortemente tipizzato consente allo sviluppatore di specificare vari vincoli e comportamenti del programma nelle definizioni dei tipi di dati, facilitando la verifica della correttezza del software e la prevenzione dei difetti. Questo è particolarmente utile nelle applicazioni su larga scala.

Alcuni dei vantaggi di TypeScript:

* Tipizzazione statica, facoltativamente fortemente tipizzata
* Inferenza di tipo
* Accesso alle funzionalità di ES6 ed ES7
* Compatibilità multipiattaforma e multibrowser
* Supporto degli strumenti con IntelliSense

### TypeScript e JavaScript

TypeScript è scritto in file `.ts` o `.tsx`, mentre i file JavaScript sono scritti in file `.js` o `.jsx`.

I file con estensione `.tsx` o `.jsx` possono contenere l'estensione di sintassi JavaScript JSX, utilizzata in React per lo sviluppo dell'interfaccia utente.

TypeScript è un superset tipizzato di JavaScript (ECMAScript 2015) in termini di sintassi. Tutto il codice JavaScript è codice TypeScript valido, ma il contrario non è sempre vero.

Ad esempio, si consideri una funzione in un file JavaScript con estensione `.js`, come la seguente:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

La funzione può essere convertita e utilizzata in TypeScript modificando l'estensione del file in `.ts`. Tuttavia, se la stessa funzione è annotata con tipi TypeScript, non può essere eseguita in alcun runtime JavaScript senza compilazione. Il seguente codice TypeScript genererà un errore di sintassi se non compilato:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript è stato progettato per rilevare possibili eccezioni che possono verificarsi in fase di runtime durante la compilazione, consentendo allo sviluppatore di definire l'intento con annotazioni di tipo. Inoltre, TypeScript può anche rilevare problemi se non viene fornita alcuna annotazione di tipo. Ad esempio, il seguente frammento di codice non specifica alcun tipo TypeScript:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

In questo caso, TypeScript rileva un errore e segnala:

```text
La proprietà 'y' non esiste sul tipo '{ x: number; }'.
```

Il sistema di tipi di TypeScript è ampiamente influenzato dal comportamento runtime di JavaScript. Ad esempio, l'operatore di addizione (+), che in JavaScript può eseguire sia la concatenazione di stringhe che l'addizione numerica, è modellato allo stesso modo in TypeScript:

```typescript
const result = '1' + 1; // Il risultato è di tipo stringa
```

Il team di TypeScript ha deliberatamente deciso di segnalare come errori l'utilizzo insolito di JavaScript. Ad esempio, si consideri il seguente codice JavaScript valido:

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, il risultato è uguale a 2
```

Tuttavia, TypeScript genera un errore:

```text
L'operatore '+' non può essere applicato ai tipi 'number' e 'boolean'.
```

Questo errore si verifica perché TypeScript applica rigorosamente la compatibilità di tipo e, in questo caso, identifica un'operazione non valida tra un numero e un valore booleano.

### Generazione di codice TypeScript

Il compilatore TypeScript ha due responsabilità principali: il controllo degli errori di tipo e la compilazione in JavaScript. Questi due processi sono indipendenti l'uno dall'altro. I tipi non influenzano l'esecuzione del codice in un runtime JavaScript, poiché vengono completamente cancellati durante la compilazione. TypeScript può comunque generare codice JavaScript anche in presenza di errori di tipo.
Ecco un esempio di codice TypeScript con un errore di tipo:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // L'argomento di tipo 'string' non è assegnabile al parametro di tipo 'number'.
```

Tuttavia, può comunque produrre un output JavaScript eseguibile:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

Non è possibile controllare i tipi TypeScript in fase di esecuzione. Ad esempio:

<!-- skip -->
```typescript
interface Animal {
    name: string;
}
interface Dog extends Animal {
    bark: () => void;
}
interface Cat extends Animal {
    meow: () => void;
}
const makeNoise = (animal: Animal) => {
    if (animal instanceof Dog) {
        // 'Dog' si riferisce solo a un tipo, ma qui viene utilizzato come valore.
        // ...
    }
};
```

Poiché i tipi vengono cancellati dopo la compilazione, non è possibile eseguire questo codice in JavaScript. Per riconoscere i tipi a runtime, dobbiamo usare un altro meccanismo. TypeScript offre diverse opzioni, una delle quali è la "tagged union". Ad esempio:

```typescript
interface Dog {
    kind: 'dog'; // Tagged union
    bark: () => void;
}
interface Cat {
    kind: 'cat'; // Tagged union
    meow: () => void;
}
type Animal = Dog | Cat;

const makeNoise = (animal: Animal) => {
    if (animal.kind === 'dog') {
        animal.bark();
    } else {
        animal.meow();
    }
};

const dog: Dog = {
    kind: 'dog',
    bark: () => console.log('bark'),
};
makeNoise(dog);
```

La proprietà "kind" è un valore che può essere utilizzato in fase di esecuzione per distinguere gli oggetti in JavaScript.

È anche possibile che un valore in fase di esecuzione abbia un tipo diverso da quello dichiarato nella dichiarazione di tipo. Ad esempio, se lo sviluppatore ha interpretato erroneamente un tipo API e lo ha annotato in modo errato.

TypeScript è un superset di JavaScript, quindi la parola chiave "class" può essere utilizzata come tipo e valore in fase di esecuzione.

```typescript
class Animal {
    constructor(public name: string) {}
}
class Dog extends Animal {
    constructor(
        public name: string,
        public bark: () => void
    ) {
        super(name);
    }
}
class Cat extends Animal {
    constructor(
        public name: string,
        public meow: () => void
    ) {
        super(name);
    }
}
type Mammal = Dog | Cat;

const makeNoise = (mammal: Mammal) => {
    if (mammal instanceof Dog) {
        mammal.bark();
    } else {
        mammal.meow();
    }
};

const dog = new Dog('Fido', () => console.log('bark'));
makeNoise(dog);
```

In JavaScript, una "classe" ha una proprietà "prototype" e l'operatore "instanceof" può essere utilizzato per verificare se la proprietà prototype di un costruttore appare in qualsiasi punto della catena di prototipi di un oggetto.

TypeScript non ha alcun effetto sulle prestazioni di runtime, poiché tutti i tipi verranno cancellati. Tuttavia, TypeScript introduce un certo overhead in fase di compilazione.

### JavaScript moderno ora (Downleveling)

TypeScript può compilare codice per qualsiasi versione rilasciata di JavaScript a partire da ECMAScript 3 (1999). Ciò significa che TypeScript può transpilare codice dalle funzionalità JavaScript più recenti a versioni precedenti, un processo noto come Downleveling. Questo consente l'utilizzo di JavaScript moderno mantenendo la massima compatibilità con gli ambienti di runtime più vecchi.

È importante notare che durante la transpilazione a una versione precedente di JavaScript, TypeScript potrebbe generare codice che potrebbe comportare un sovraccarico di prestazioni rispetto alle implementazioni native.

Ecco alcune delle funzionalità di JavaScript moderno che possono essere utilizzate in TypeScript:

* Moduli ECMAScript al posto delle callback "define" in stile AMD o delle istruzioni "require" di CommonJS.
* Classi al posto dei prototipi.
* Dichiarazione di variabili utilizzando "let" o "const" al posto di "var".
* Ciclo "for-of" o ".forEach" al posto del tradizionale ciclo "for".
* Funzioni freccia al posto delle espressioni di funzione.
* Assegnazione destrutturata. \* Nomi abbreviati di proprietà/metodi e nomi di proprietà calcolate.
* Parametri di funzione predefiniti.

Sfruttando queste moderne funzionalità di JavaScript, gli sviluppatori possono scrivere codice più espressivo e conciso in TypeScript.

