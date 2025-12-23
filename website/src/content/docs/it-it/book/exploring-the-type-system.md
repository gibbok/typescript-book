---
title: Esplorazione del sistema di tipi
sidebar:
  order: 9
  label: 9. Esplorazione del sistema di tipi
---


### Il servizio di linguaggio TypeScript

Il servizio di linguaggio TypeScript, noto anche come tsserver, offre diverse funzionalità come la segnalazione degli errori, la diagnostica, la compilazione al salvataggio, la ridenominazione, il passaggio alla definizione, gli elenchi di completamento, la guida alle firme e altro ancora. Viene utilizzato principalmente dagli ambienti di sviluppo integrati (IDE) per fornire supporto IntelliSense. Si integra perfettamente con Visual Studio Code ed è utilizzato da strumenti come Conquer of Completion (Coc).

Gli sviluppatori possono sfruttare un'API dedicata e creare plugin di servizi linguistici personalizzati per migliorare l'esperienza di modifica di TypeScript. Questo può essere particolarmente utile per implementare funzionalità di linting speciali o abilitare il completamento automatico per un linguaggio di template personalizzato.

<!-- markdownlint-disable MD044 -->

Un esempio di plugin personalizzato reale è "TypeScript-styled-plugin", che fornisce la segnalazione degli errori di sintassi e il supporto IntelliSense per le proprietà CSS nei componenti con stile. <!-- markdownlint-enable MD044 -->

Per ulteriori informazioni e guide rapide, è possibile consultare il Wiki ufficiale di TypeScript su GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Tipizzazione Strutturale

TypeScript si basa su un sistema di tipi strutturale. Ciò significa che la compatibilità e l'equivalenza dei tipi sono determinate dalla struttura o definizione effettiva del tipo, piuttosto che dal suo nome o dal punto di dichiarazione, come nei sistemi di tipi nominativi come C# o C.

Il sistema di tipi strutturale di TypeScript è stato progettato sulla base del funzionamento del sistema di tipizzazione dinamica di JavaScript durante l'esecuzione.

L'esempio seguente è codice TypeScript valido. Come si può osservare, "X" e "Y" hanno lo stesso membro "a", anche se hanno nomi di dichiarazione diversi. I tipi sono determinati dalle loro strutture e, in questo caso, poiché le strutture sono le stesse, sono compatibili e validi.

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Valido
```

### Regole fondamentali di confronto di TypeScript

Il processo di confronto di TypeScript è ricorsivo ed è eseguito su tipi annidati a qualsiasi livello.

Un tipo "X" è compatibile con "Y" se "Y" ha almeno gli stessi membri di "X".

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valido, poiché ha almeno gli stessi membri di X
const r: X = y;
```

I parametri delle funzioni vengono confrontati in base al tipo, non al nome:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valido
x = y; // Valido
```

I tipi restituiti dalla funzione devono essere gli stessi:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Non valido
x = y; // Non valido
```

Il tipo di ritorno di una funzione sorgente deve essere un sottotipo del tipo di ritorno di una funzione target:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valido
y = x; // Il membro non valido b è mancante
```

È consentito ignorare i parametri della funzione, come è prassi comune in JavaScript, ad esempio utilizzando "Array.prototype.map()":

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Pertanto, le seguenti dichiarazioni di tipo sono completamente valide:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;

let y: Y = (a: number) => undefined; // Parametro b mancante
y = x; // Valido
```

Tutti i parametri opzionali aggiuntivi del tipo sorgente sono validi:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valido
x = y; //Valido
```

Tutti i parametri opzionali del tipo destinazione senza parametri corrispondenti nel tipo sorgente sono validi e non costituiscono un errore:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valido
x = y; // Valido
```

Il parametro rest viene trattato come una serie infinita di parametri opzionali:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valido
```

Le funzioni con overload sono valide se la firma di overload è compatibile con la firma della sua implementazione:

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Valido
x('a', 1); // Valido

function y(a: string): void; // Non valido, non compatibile con la firma dell'implementazione
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

Il confronto dei parametri della funzione ha esito positivo se i parametri sorgente e destinazione sono assegnabili a supertipi o sottotipi (bivarianza).

```typescript
// Supertipo
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Sottotipo
class Y extends X {}
// Sottotipo
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// La bivarianza accetta supertipi
console.log(getA(new X('x'))); // Valido
console.log(getA(new Y('Y'))); // Valido
console.log(getA(new Z('z'))); // Valido
```

Gli enum sono confrontabili e validi con i numeri e viceversa, ma il confronto di valori Enum di tipi Enum diversi non è valido.

<!-- skip -->
```typescript
enum X {
    A,
    B,
}
enum Y {
    A,
    B,
    C,
}
const xa: number = X.A; // Valido
const ya: Y = 0; // Valido
X.A === Y.A; // Non valido
```

Le istanze di una classe sono soggette a un controllo di compatibilità per i loro membri privati ​​e protetti:

<!-- skip -->
```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}

class Y {
    private a: string;
    constructor(value: string) {
        this.a = value;
    }
}

let x: X = new Y('y'); // Non valido
```

Il controllo di confronto non tiene conto della diversa gerarchia di ereditarietà, ad esempio:

```typescript
class X {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
class Y extends X {
    public a: string;
    constructor(value: string) {
        super(value);
        this.a = value;
    }
}
class Z {
    public a: string;
    constructor(value: string) {
        this.a = value;
    }
}
let x: X = new X('x');
let y: Y = new Y('y');
let z: Z = new Z('z');
x === y; // Valido
x === z; // Valido anche se z proviene da una gerarchia di ereditarietà diversa
```

I generici vengono confrontati utilizzando le loro strutture in base al tipo risultante dopo l'applicazione del parametro generico; solo il risultato finale viene confrontato come tipo non generico.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Non valido poiché l'argomento tipo è utilizzato nella struttura finale
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Valido poiché l'argomento tipo non è utilizzato nella struttura finale
```

Quando i generici non hanno il loro argomento tipo specificato, tutti gli argomenti non specificati vengono trattati come tipi con "any":

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valido
```

Ricorda:

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Valido, tutto è assegnabile a se stesso

let c: any;
c = 1; // Valido, tutti i tipi sono assegnabili a qualsiasi

let d: unknown;
d = 1; // Valido, tutti i tipi sono assegnabili a sconosciuto

let e: unknown;
let e1: unknown = e; // Valido, sconosciuto è assegnabile solo a se stesso e a qualsiasi
let e2: any = e; // Valido
let e3: number = e; // Non valido

let f: never;
f = 1; // Non valido, nulla è assegnabile a never

let g: void;
let g1: any;
g = 1; // Non valido, void non è assegnabile a o da nulla, tranne qualsiasi
g = g1; // Valido
```

Si noti che quando "strictNullChecks" è abilitato, "null" e "undefined" vengono trattati in modo simile a "void"; in caso contrario, sono simili a "never".

### Tipi come insiemi

In TypeScript, un tipo è un insieme di possibili valori. Questo insieme è anche definito dominio del tipo. Ogni valore di un tipo può essere visto come un elemento di un insieme. Un tipo stabilisce i vincoli che ogni elemento dell'insieme deve soddisfare per essere considerato membro di quell'insieme.
Il compito principale di TypeScript è controllare e verificare se un insieme è un sottoinsieme di un altro.

TypeScript supporta vari tipi di insiemi:

| Termine di insieme             | TypeScript                        | Note                                                                                                                                          |
| ------------------------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Insieme vuoto                  | never                             | "never" non contiene nulla                                                                                                   |
| Insieme di un singolo elemento | undefined / null / tipo letterale |                                                                                                                                               |
| Insieme finito                 | boolean / union                   |                                                                                                                                               |
| Insieme infinito               | string / number / object          |                                                                                                                                               |
| Insieme universale             | any / unknown           | Ogni elemento è un membro di "any" e ogni insieme è un suo sottoinsieme / "unknown" è una controparte di tipo sicuro di "any" |

Ecco alcuni esempi:

| TypeScript     | Termine di insieme          | Esempio                                                                           |
| -------------- | --------------------------- | --------------------------------------------------------------------------------- |
| never          | ∅ (insieme vuoto)           | const x: never = 'x'; // Errore: il tipo 'string' non è assegnabile al tipo 'never' |
|                |                             |
| Tipo letterale | Insieme di elementi singoli | type X = 'X';                                                                     |

| | | type Y = 7; |
| | |
| Valore assegnabile a T | Valore ∈ T (membro di) | type XY = 'X' \| 'Y'; |
| | | const x: XY = 'X'; |
| | |
| T1 assegnabile a T2 | T1 ⊆ T2 (sottoinsieme di) | type XY = 'X' \| 'Y'; |
| | | const x: XY = 'X'; |
| | | const j: XY = 'J'; // Il tipo '"J"' non è assegnabile al tipo 'XY'. |
| | | |
| T1 extends T2 | T1 ⊆ T2 (sottoinsieme di) | type X = 'X' extends string ? true : false; |
| | |
| T1 \| T2 | T1 ∪ T2 (unione) | type XY = 'X' \| 'Y'; |
| | | type JK = 1 \| 2; |
| | |
| T1 & T2 | T1 ∩ T2 (intersezione) | type X = \{ a: string \} |
| | | type Y = \{ b: string \} |
| | | type XY = X & Y |
| | | const x: XY = \{ a: 'a', b: 'b' \} |
| | |
| unknown | Insieme universale | const x: unknown = 1 |

Un'unione (T1 | T2) crea un insieme più ampio (entrambi):

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Valido
```

Un'intersezione (T1 e T2) crea un insieme più ristretto (solo condiviso):

<!-- skip -->
```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
    b: string;
};
type XY = X & Y;
const r: XY = { a: 'a' }; // Non valido
const j: XY = { a: 'a', b: 'b' }; // Valido
```

La parola chiave `extends` potrebbe essere considerata un "sottoinsieme di" in questo contesto. Imposta un vincolo per un tipo. L'extends utilizzato con un generico, considera il generico come un insieme infinito e lo vincola a un tipo più specifico. Si noti che ``extends` non ha nulla a che fare con la gerarchia in senso OOP (questo concetto non esiste in TypeScript).
TypeScript funziona con insiemi e non ha una gerarchia rigida; infatti, come nell'esempio seguente, due tipi potrebbero sovrapporsi senza che uno dei due sia un sottotipo dell'altro (TypeScript considera la struttura e la forma degli oggetti).

```typescript
interface X {
    a: string;
}
interface Y extends X {
    b: string;
}
interface Z extends Y {
    c: string;
}
const z: Z = { a: 'a', b: 'b', c: 'c' };
interface X1 {
    a: string;
}

interface Y1 {
    a: string;
    b: string;
}
interface Z1 {
    a: string;
    b: string;
    c: string;
}
const z1: Z1 = { a: 'a', b: 'b', c: 'c' };

const r: Z1 = z; // Valido
```

### Assegnare un tipo: Dichiarazioni di tipo e asserzioni di tipo

Un tipo può essere assegnato in diversi modi in TypeScript:

#### Dichiarazione di tipo

Nell'esempio seguente, utilizziamo x: X (": Type") per dichiarare un tipo per la variabile x.

```typescript
type X = {
    a: string;
};

// Dichiarazione di tipo
const x: X = {
    a: 'a',
};
```

Se la variabile non è nel formato specificato, TypeScript segnalerà un errore. Ad esempio:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Errore: il letterale dell'oggetto può specificare solo proprietà note
};
```

#### Asserzione di tipo

È possibile aggiungere un'asserzione utilizzando la parola chiave `as`. Questo indica al compilatore che lo sviluppatore ha maggiori informazioni su un tipo e silenzia eventuali errori.

Ad esempio:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

Nell'esempio precedente, si asserisce che l'oggetto x abbia il tipo X utilizzando la parola chiave as. Questo informa il compilatore TypeScript che l'oggetto è conforme al tipo specificato, anche se ha una proprietà aggiuntiva b non presente nella definizione del tipo.

Le asserzioni di tipo sono utili in situazioni in cui è necessario specificare un tipo più specifico, soprattutto quando si lavora con il DOM. Ad esempio:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Qui, l'asserzione di tipo come HTMLInputElement viene utilizzata per indicare a TypeScript che il risultato di getElementById deve essere trattato come un HTMLInputElement.
Le asserzioni di tipo possono anche essere utilizzate per rimappare le chiavi, come mostrato nell'esempio seguente con letterali di template:

```typescript
type J<Type> = {
    [Property in keyof Type as `prefix_${string &
        Property}`]: () => Type[Property];
};
type X = {
    a: string;
    b: number;
};
type Y = J<X>;
```

In questo esempio, il tipo `J<Tipo>` utilizza un tipo mappato con un letterale template per rimappare le chiavi di Tipo. Crea nuove proprietà con un "prefisso\_" aggiunto a ciascuna chiave e i valori corrispondenti sono funzioni che restituiscono i valori delle proprietà originali.

È importante notare che quando si utilizza un'asserzione di tipo, TypeScript non eseguirà controlli di proprietà eccessivi. Pertanto, è generalmente preferibile utilizzare una Dichiarazione di Tipo quando la struttura dell'oggetto è nota in anticipo.

#### Dichiarazioni Ambientali

Le dichiarazioni Ambientali sono file che descrivono i tipi per il codice JavaScript e hanno un formato di nome file come `.d.ts.`. Di solito vengono importate e utilizzate per annotare librerie JavaScript esistenti o per aggiungere tipi a file JS esistenti nel progetto.

Molti tipi di librerie comuni sono disponibili all'indirizzo:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

e possono essere installate tramite:

```shell
npm install --save-dev @types/library-name
```

Per le dichiarazioni di ambiente definite, è possibile importarle utilizzando il riferimento "tripla barra":

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

È possibile utilizzare le dichiarazioni di ambiente anche all'interno di file JavaScript utilizzando `// @ts-check`.

La parola chiave `declare` abilita le definizioni di tipo per il codice JavaScript esistente senza importarlo, fungendo da segnaposto per i tipi da un altro file o a livello globale.

### Controllo delle proprietà e controllo delle proprietà in eccesso

TypeScript si basa su un sistema di tipi strutturale, ma il controllo delle proprietà in eccesso è una proprietà di TypeScript che gli consente di verificare se un oggetto possiede esattamente le proprietà specificate nel tipo.

Il controllo delle proprietà in eccesso viene eseguito, ad esempio, quando si assegnano letterali di oggetto a variabili o quando li si passa come argomenti alla proprietà in eccesso di una funzione.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valido perché tipizzazione strutturale
const w: X = { a: 'a', b: 'b' }; // Non valido perché controllo delle proprietà in eccesso
```

### Tipi deboli

Un tipo è considerato debole quando contiene solo un insieme di proprietà completamente opzionali:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript considera un errore assegnare qualsiasi cosa a un tipo debole quando non c'è sovrapposizione, ad esempio, il seguente codice genera un errore:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Non valido
```

Sebbene non sia consigliato, se necessario, è possibile bypassare questo controllo utilizzando l'asserzione di tipo:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valido
```

Oppure aggiungendo `unknown` alla firma dell'indice del tipo debole:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valido
```

### Controllo rigoroso dei letterali di oggetto (freschezza)

Il controllo rigoroso dei letterali di oggetto, a volte chiamato "freschezza", è una funzionalità di TypeScript che aiuta a individuare proprietà in eccesso o con errori di ortografia che altrimenti passerebbero inosservate nei normali controlli di tipo strutturale.

Quando si crea un letterale di oggetto, il compilatore TypeScript lo considera "fresco". Se il letterale di oggetto viene assegnato a una variabile o passato come parametro, TypeScript genererà un errore se il letterale di oggetto specifica proprietà che non esistono nel tipo di destinazione.

Tuttavia, la "freschezza" scompare quando un letterale di oggetto viene ampliato o viene utilizzata un'asserzione di tipo.

Ecco alcuni esempi per illustrare:

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Controllo di freschezza: Assegnazione non valida
var y: Y;
y = { a: 'a', bx: 'bx' }; // Controllo di freschezza: Assegnazione non valida

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Allargamento: Nessun errore, strutturalmente compatibile con il tipo

fn({ a: 'a', bx: 'b' }); // Controllo di aggiornamento: argomento non valido

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Allargamento: nessun controllo di aggiornamento
```

### Inferenza di tipo

TypeScript può inferire i tipi quando non viene fornita alcuna annotazione durante:

* Inizializzazione delle variabili.
* Inizializzazione dei membri.
* Impostazione dei valori predefiniti per i parametri.
* Tipo di ritorno della funzione.

Ad esempio:

```typescript
let x = 'x'; // Il tipo inferito è una stringa
```

Il compilatore TypeScript analizza il valore o l'espressione e ne determina il tipo in base alle informazioni disponibili.

### Inferenze più avanzate

Quando si utilizzano più espressioni nell'inferenza di tipo, TypeScript cerca i "tipi più comuni". Ad esempio:

```typescript
let x = [1, 'x', 1, null]; // Il tipo dedotto è: (string | number | null)[]
```

Se il compilatore non riesce a trovare i tipi comuni migliori, restituisce un tipo unione. Ad esempio:

```typescript
let x = [new RegExp('x'), new Date()]; // Il tipo inferito è: (RegExp | Date)[]
```

TypeScript utilizza la "tipizzazione contestuale" basata sulla posizione della variabile per inferire i tipi. Nell'esempio seguente, il compilatore sa che `e` è di tipo `MouseEvent` grazie al tipo di evento `click` definito nel file lib.d.ts, che contiene dichiarazioni ambientali per vari costrutti JavaScript comuni e il DOM:

```typescript
window.addEventListener('click', function (e) {}); // Il tipo inferito di e è MouseEvent
```

### Allargamento di tipo

L'allargamento di tipo è il processo in cui TypeScript assegna un tipo a una variabile inizializzata quando non è stata fornita alcuna annotazione di tipo. Consente il passaggio da tipi stretti a più ampi, ma non viceversa. Nell'esempio seguente:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript inferisce come stringa, un tipo ampio
let y: 'y' | 'x' = 'y'; // Il tipo y è un'unione di tipi letterali
y = x; // Il tipo non valido 'string' non è assegnabile al tipo '"x" | "y"'.
```

TypeScript assegna `string` a `x` in base al singolo valore fornito durante l'inizializzazione (`x`); questo è un esempio di ampliamento.

TypeScript fornisce modi per controllare il processo di ampliamento, ad esempio utilizzando "const".

### Const

L'utilizzo della parola chiave `const` durante la dichiarazione di una variabile produce un'inferenza di tipo più ristretta in TypeScript.

Ad esempio:

```typescript
const x = 'x'; // TypeScript deduce il tipo di x come 'x', un tipo più ristretto
let y: 'y' | 'x' = 'y';
y = x; // Valido: il tipo di x viene dedotto come 'x'
```

Utilizzando `const` per dichiarare la variabile x, il suo tipo viene ristretto allo specifico valore letterale 'x'. Poiché il tipo di x viene ristretto, può essere assegnato alla variabile y senza errori.
Il motivo per cui il tipo può essere dedotto è che le variabili `const` non possono essere riassegnate, quindi il loro tipo può essere ristretto a un tipo letterale specifico, in questo caso, il tipo letterale 'x'.

#### Modificatore Const sui parametri di tipo

Dalla versione 5.0 di TypeScript, è possibile specificare l'attributo `const` su un parametro di tipo generico. Questo consente di dedurre il tipo più preciso possibile. Vediamo un esempio senza usare `const`:

```typescript
function identity<T>(value: T) {
    // Nessuna costante qui
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Il tipo inferito è: { a: string; b: string; }
```

Come puoi vedere, le proprietà `a` e `b` vengono inferite con un tipo `string`.

Ora, vediamo la differenza con la versione `const`:

```typescript
function identity<const T>(value: T) {
    // Utilizzo del modificatore const sui parametri di tipo
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Il tipo inferito è: { a: "a"; b: "b"; }
```

Ora possiamo vedere che le proprietà `a` e `b` vengono dedotte come `const`, quindi `a` e `b` vengono trattate come stringhe letterali anziché come semplici tipi `string`.

#### Asserzione Const

Questa funzionalità consente di dichiarare una variabile con un tipo letterale più preciso in base al suo valore di inizializzazione, indicando al compilatore che il valore deve essere trattato come un letterale immutabile. Ecco alcuni esempi:

Su una singola proprietà:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

Su un intero oggetto:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

Questo può essere particolarmente utile quando si definisce il tipo per una tupla:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tupla di readonly [1, 2, 3]
```

### Annotazione di tipo esplicita

Possiamo essere specifici e passare un tipo, nell'esempio seguente la proprietà `x` è di tipo `number`:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valido
```

Possiamo rendere l'annotazione di tipo più specifica utilizzando un'unione di tipi letterali:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x è ora un'unione di tipi letterali: 1 | 2 | 3
};
v.x = 3; // Valido
v.x = 100; // Non valido
```

### Restringimento dei tipi

Il restringimento dei tipi è il processo in TypeScript in cui un tipo generico viene ridotto a un tipo più specifico. Ciò si verifica quando TypeScript analizza il codice e determina che determinate condizioni o operazioni possono perfezionare le informazioni sul tipo.

Il restringimento dei tipi può avvenire in diversi modi, tra cui:

#### Condizioni

Utilizzando istruzioni condizionali, come `if` o `switch`, TypeScript può restringere il tipo in base al risultato della condizione. Ad esempio:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // Il tipo è number, che è stato ristretto dalla condizione
}
```

#### Generazione o restituzione

Generare un errore o restituire un'istruzione in anticipo da un branch può essere utilizzato per aiutare TypeScript a restringere un tipo. Ad esempio:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

Altri modi per restringere i tipi in TypeScript includono:

* Operatore `instanceof`: utilizzato per verificare se un oggetto è un'istanza di una classe specifica.
* Operatore `in`: utilizzato per verificare se una proprietà esiste in un oggetto.
* Operatore `typeof`: utilizzato per verificare il tipo di un valore in fase di esecuzione.
* Funzioni integrate come `Array.isArray()`: utilizzate per verificare se un valore è un array.

#### Unione Discriminata

L'utilizzo di una "Unione Discriminata" è un pattern in TypeScript in cui un "tag" esplicito viene aggiunto agli oggetti per distinguere i diversi tipi all'interno di un'unione. Questo pattern è anche definito "unione con tag". Nell'esempio seguente, il "tag" è rappresentato dalla proprietà "type":

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // il tipo è A
        case 'type_b':
            return input.value + 'extra'; // il tipo è B
    }
};
```

#### Protezioni di tipo definite dall'utente

Nei casi in cui TypeScript non sia in grado di determinare un tipo, è possibile scrivere una funzione di supporto nota come "protezione di tipo definita dall'utente". Nell'esempio seguente, utilizzeremo un predicato di tipo per restringere il tipo dopo aver applicato un determinato filtro:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // Il tipo è (string | null)[], TypeScript non è riuscito a dedurre correttamente il tipo

const isValid = (item: string | null): item is string => item !== null; // Protezione personalizzata del tipo

const r2 = data.filter(isValid); // Il tipo ora è corretto string[], utilizzando la protezione del tipo predicato siamo riusciti a restringere il tipo
```

