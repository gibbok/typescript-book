---
title: Utforska typsystemet
sidebar:
  order: 9
  label: 9. Utforska typsystemet
---


### TypeScript-språktjänsten

TypeScript-språktjänsten, även känd som tsserver, erbjuder olika funktioner såsom felrapportering, diagnostik, kompilera-vid-sparning, namnbyte, gå till definition, kompletteringslistor, signaturhjälp och mer. Den används främst av integrerade utvecklingsmiljöer (IDE:er) för att ge IntelliSense-stöd. Den integreras sömlöst med Visual Studio Code och används av verktyg som Conquer of Completion (Coc).

Utvecklare kan utnyttja ett dedikerat API och skapa sina egna anpassade språktjänstplugin för att förbättra TypeScript-redigeringsupplevelsen. Detta kan vara särskilt användbart för att implementera speciella linting-funktioner eller möjliggöra automatisk komplettering för ett anpassat mallspråk.

<!-- markdownlint-disable MD044 -->
Ett exempel på ett verkligt anpassat plugin är "typescript-styled-plugin", som tillhandahåller syntaxfelrapportering och IntelliSense-stöd för CSS-egenskaper i styled components.
<!-- markdownlint-enable MD044 -->

För mer information och snabbstartsguider kan du hänvisa till den officiella TypeScript-wikin på GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Strukturell typning

TypeScript är baserat på ett strukturellt typsystem. Detta innebär att kompatibiliteten och ekvivalensen hos typer bestäms av typens faktiska struktur eller definition, snarare än dess namn eller plats för deklaration, som i nominativa typsystem som C# eller C.

TypeScripts strukturella typsystem designades baserat på hur JavaScripts dynamiska duck typing-system fungerar vid körning.

Följande exempel är giltig TypeScript-kod. Som du kan observera har "X" och "Y" samma medlem "a", även om de har olika deklarationsnamn. Typerna bestäms av deras strukturer, och i detta fall, eftersom strukturerna är desamma, är de kompatibla och giltiga.

```typescript
type X = {
    a: string;
};
type Y = {
    a: string;
};
const x: X = { a: 'a' };
const y: Y = x; // Valid
```

### Grundläggande jämförelseregler i TypeScript

TypeScripts jämförelseprocess är rekursiv och utförs på typer som är nästlade på valfri nivå.

En typ "X" är kompatibel med "Y" om "Y" har åtminstone samma medlemmar som "X".

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

Funktionsparametrar jämförs efter typer, inte efter deras namn:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

Funktionens returtyper måste vara desamma:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

Returtypen för en källfunktion måste vara en undertyp av returtypen för en målfunktion:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

Att utelämna funktionsparametrar är tillåtet, eftersom det är vanlig praxis i JavaScript, till exempel vid användning av "Array.prototype.map()":

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Därför är följande typdeklarationer helt giltiga:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

Eventuella ytterligare valfria parametrar i källtypen är giltiga:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

Eventuella valfria parametrar i måltypen utan motsvarande parametrar i källtypen är giltiga och utgör inte ett fel:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

Rest-parametern behandlas som en oändlig serie av valfria parametrar:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

Funktioner med överlagringar är giltiga om överlagringssignaturen är kompatibel med dess implementeringssignatur:

<!-- skip -->
```typescript
function x(a: string): void;
function x(a: string, b: number): void;
function x(a: string, b?: number): void {
    console.log(a, b);
}
x('a'); // Valid
x('a', 1); // Valid

function y(a: string): void; // Invalid, not compatible with implementation signature
function y(a: string, b: number): void;
function y(a: string, b: number): void {
    console.log(a, b);
}
y('a');
y('a', 1);
```

Jämförelse av funktionsparametrar lyckas om käll- och målparametrarna kan tilldelas supertyper eller undertyper (bivarians).

```typescript
// Supertype
class X {
    a: string;
    constructor(value: string) {
        this.a = value;
    }
}
// Subtype
class Y extends X {}
// Subtype
class Z extends X {}

type GetA = (x: X) => string;
const getA: GetA = x => x.a;

// Bivariance does accept supertypes
console.log(getA(new X('x'))); // Valid
console.log(getA(new Y('Y'))); // Valid
console.log(getA(new Z('z'))); // Valid
```

Enums är jämförbara och giltiga med tal och vice versa, men att jämföra Enum-värden från olika Enum-typer är ogiltigt.

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
const xa: number = X.A; // Valid
const ya: Y = 0; // Valid
X.A === Y.A; // Invalid
```

Instanser av en klass genomgår en kompatibilitetskontroll för sina privata och skyddade medlemmar:

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

let x: X = new Y('y'); // Invalid
```

Jämförelsekontrollen tar inte hänsyn till den olika arvshierarkin, till exempel:

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
x === y; // Valid
x === z; // Valid even if z is from a different inheritance hierarchy
```

Generics jämförs med hjälp av deras strukturer baserat på den resulterande typen efter tillämpning av den generiska parametern. Bara slutresultatet jämförs som en icke-generisk typ.

<!-- skip -->
```typescript
interface X<T> {
    a: T;
}
let x: X<number> = { a: 1 };
let y: X<string> = { a: 'a' };
x === y; // Invalid as the type argument is used in the final structure
```

```typescript
interface X<T> {}
const x: X<number> = 1;
const y: X<string> = 'a';
x === y; // Valid as the type argument is not used in the final structure
```

När generics inte har sitt typargument specificerat behandlas alla ospecificerade argument som typer med "any":

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

Kom ihåg:

<!-- skip -->
```typescript
let a: number = 1;
let b: number = 2;
a = b; // Valid, everything is assignable to itself

let c: any;
c = 1; // Valid, all types are assignable to any

let d: unknown;
d = 1; // Valid, all types are assignable to unknown

let e: unknown;
let e1: unknown = e; // Valid, unknown is only assignable to itself and any
let e2: any = e; // Valid
let e3: number = e; // Invalid

let f: never;
f = 1; // Invalid, nothing is assignable to never

let g: void;
let g1: any;
g = 1; // Invalid, void is not assignable to or from anything expect any
g = g1; // Valid
```

Observera att när "strictNullChecks" är aktiverat behandlas "null" och "undefined" på liknande sätt som "void"; annars liknar de "never".

### Typer som mängder

I TypeScript är en typ en mängd av möjliga värden. Denna mängd kallas även typens domän. Varje värde av en typ kan ses som ett element i en mängd. En typ fastställer de begränsningar som varje element i mängden måste uppfylla för att betraktas som en medlem av den mängden.
TypeScripts primära uppgift är att kontrollera och verifiera om en mängd är en delmängd av en annan.

TypeScript stöder olika typer av mängder:

| Mängdterm              | TypeScript                      | Anteckningar                                                                                                       |
| ---------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Tom mängd              | never                           | "never" innehåller ingenting förutom sig själv                                                                     |
| Enelement-mängd        | undefined / null / literal type |                                                                                                                    |
| Ändlig mängd           | boolean / union                 |                                                                                                                    |
| Oändlig mängd          | string / number / object        |                                                                                                                    |
| Universell mängd       | any / unknown                   | Varje element är medlem i "any" och varje mängd är en delmängd av den / "unknown" är en typsäker motsvarighet till "any" |

Här är några exempel:

| TypeScript            | Mängdterm              | Exempel                                                                         |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (tom mängd)          | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                        |
| Literal type          | Enelement-mängd        | type X = 'X';                                                                   |
|                       |                        | type Y = 7;                                                                     |
|                       |                        |
| Värde tilldelbart till T | Värde ∈ T (medlem av)  | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        |
| T1 tilldelbart till T2   | T1 ⊆ T2 (delmängd av)  | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                        |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (delmängd av)  | type X = 'X' extends string ? true : false;                                     |
|                       |                        |
| T1 \| T2              | T1 ∪ T2 (union)        | type XY = 'X' \| 'Y';                                                           |
|                       |                        | type JK = 1 \| 2;                                                               |
|                       |                        |
| T1 & T2               | T1 ∩ T2 (snitt)        | type X = \{ a: string \}                                                          |
|                       |                        | type Y = \{ b: string \}                                                          |
|                       |                        | type XY = X & Y                                                                 |
|                       |                        | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                        |
| unknown               | Universell mängd       | const x: unknown = 1                                                            |

En union, (T1 | T2) skapar en bredare mängd (båda):

```typescript
type X = {
    a: string;
};
type Y = {
    b: string;
};
type XY = X | Y;
const r: XY = { a: 'a', b: 'x' }; // Valid
```

En intersektion, (T1 & T2) skapar en smalare mängd (endast delade):

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
const r: XY = { a: 'a' }; // Invalid
const j: XY = { a: 'a', b: 'b' }; // Valid
```

Nyckelordet `extends` kan betraktas som "delmängd av" i detta sammanhang. Det sätter en begränsning för en typ. När extends används med en generisk typ, behandlas den generiska typen som en oändlig mängd och begränsas till en mer specifik typ.
Observera att `extends` inte har något att göra med hierarki i OOP-bemärkelse (det finns inget sådant koncept i TypeScript).
TypeScript arbetar med mängder och har ingen strikt hierarki. Faktum är att, som i exemplet nedan, två typer kan överlappa utan att någon av dem är en undertyp av den andra (TypeScript betraktar strukturen, formen på objekten).

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

const r: Z1 = z; // Valid
```

### Tilldela en typ: Typdeklarationer och Typpåståenden

En typ kan tilldelas på olika sätt i TypeScript:

#### Typdeklaration

I följande exempel använder vi x: X (": Type") för att deklarera en typ för variabeln x.

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

Om variabeln inte har det angivna formatet kommer TypeScript att rapportera ett fel. Till exempel:

<!-- skip -->
```typescript
type X = {
    a: string;
};

const x: X = {
    a: 'a',
    b: 'b', // Error: Object literal may only specify known properties
};
```

#### Typpåstående

Det är möjligt att lägga till ett påstående genom att använda nyckelordet `as`. Detta talar om för kompilatorn att utvecklaren har mer information om en typ och tystar eventuella fel som kan uppstå.

Till exempel:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

I exemplet ovan påstås objektet x ha typen X med hjälp av nyckelordet as. Detta informerar TypeScript-kompilatorn om att objektet överensstämmer med den angivna typen, även om det har en extra egenskap b som inte finns i typdefinitionen.

Typpåståenden är användbara i situationer där en mer specifik typ behöver anges, särskilt vid arbete med DOM:en. Till exempel:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Här används typpåståendet as HTMLInputElement för att tala om för TypeScript att resultatet av getElementById ska behandlas som ett HTMLInputElement.
Typpåståenden kan också användas för att mappa om nycklar, som visas i exemplet nedan med malliteraler:

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

I detta exempel använder typen `J<Type>` en mappad typ med en malliteral för att mappa om nycklarna i Type. Den skapar nya egenskaper med ett "prefix_" tillagt till varje nyckel, och deras motsvarande värden är funktioner som returnerar de ursprungliga egenskapsvärdena.

Det är värt att notera att när man använder ett typpåstående kommer TypeScript inte att utföra kontroll av överskottsegenskaper. Därför är det generellt att föredra att använda en typdeklaration när objektets struktur är känd i förväg.

#### Omgivande deklarationer

Omgivande deklarationer är filer som beskriver typer för JavaScript-kod. De har filnamnsformatet `.d.ts`. De importeras vanligtvis och används för att annotera befintliga JavaScript-bibliotek eller för att lägga till typer till befintliga JS-filer i ditt projekt.

Många vanliga bibliotekstyper finns på:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

och kan installeras med:

```shell
npm install --save-dev @types/library-name
```

För dina egna omgivande deklarationer kan du importera dem med "triple-slash"-referensen:

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Du kan använda omgivande deklarationer även i JavaScript-filer med `// @ts-check`.

Nyckelordet `declare` möjliggör typdefinitioner för befintlig JavaScript-kod utan att importera den, och fungerar som en platshållare för typer från en annan fil eller globalt.

### Egenskapskontroll och kontroll av överskottsegenskaper

TypeScript bygger på ett strukturellt typsystem, men kontroll av överskottsegenskaper är en egenskap hos TypeScript som gör det möjligt att kontrollera om ett objekt har exakt de egenskaper som anges i typen.

Kontroll av överskottsegenskaper utförs vid tilldelning av objektliteraler till variabler eller när de skickas som argument till funktionens överskottsegenskap, till exempel.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### Svaga typer

En typ anses vara svag när den inte innehåller annat än en uppsättning helt valfria egenskaper:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript betraktar det som ett fel att tilldela något till en svag typ när det inte finns någon överlappning. Till exempel ger följande ett fel:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

Även om det inte rekommenderas, är det möjligt att kringgå denna kontroll genom att använda typpåstående om det behövs:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

Eller genom att lägga till `unknown` i indexsignaturen till den svaga typen:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### Strikt kontroll av objektliteraler (Freshness)

Strikt kontroll av objektliteraler, ibland kallad "freshness", är en funktion i TypeScript som hjälper till att fånga överskotts- eller felstavade egenskaper som annars skulle gå obemärkta vid normala strukturella typkontroller.

När man skapar en objektliteral betraktar TypeScript-kompilatorn den som "fresh". Om objektliteralen tilldelas till en variabel eller skickas som parameter kommer TypeScript att ge ett fel om objektliteralen anger egenskaper som inte finns i måltypen.

Dock försvinner "freshness" när en objektliteral breddas eller ett typpåstående används.

Här är några exempel för att illustrera:

<!-- skip -->
```typescript
type X = { a: string };
type Y = { a: string; b: string };

let x: X;
x = { a: 'a', b: 'b' }; // Freshness check: Invalid assignment
var y: Y;
y = { a: 'a', bx: 'bx' }; // Freshness check: Invalid assignment

const fn = (x: X) => console.log(x.a);

fn(x);
fn(y); // Widening: No errors, structurally type compatible

fn({ a: 'a', bx: 'b' }); // Freshness check: Invalid argument

let c: X = { a: 'a' };
let d: Y = { a: 'a', b: '' };
c = d; // Widening: No Freshness check
```

### Typinferens

TypeScript kan härleda typer när ingen annotering tillhandahålls vid:

* Variabelinitiering.
* Medlemsinitiering.
* Inställning av standardvärden för parametrar.
* Funktionens returtyp.

Till exempel:

```typescript
let x = 'x'; // The type inferred is string
```

TypeScript-kompilatorn analyserar värdet eller uttrycket och bestämmer dess typ baserat på tillgänglig information.

### Mer avancerade inferenser

När flera uttryck används vid typinferens letar TypeScript efter de "bästa gemensamma typerna". Till exempel:

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

Om kompilatorn inte kan hitta de bästa gemensamma typerna returnerar den en unionstyp. Till exempel:

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript använder "kontextuell typning" baserat på variabelns placering för att härleda typer. I följande exempel vet kompilatorn att `e` är av typen `MouseEvent` på grund av händelsetypen `click` som definieras i filen lib.d.ts, vilken innehåller omgivande deklarationer för olika vanliga JavaScript-konstruktioner och DOM:en:

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### Typbreddning

Typbreddning är den process där TypeScript tilldelar en typ till en variabel som initierats utan att en typannotering angavs. Den tillåter övergång från smal till bredare typ men inte tvärtom.
I följande exempel:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript tilldelar `string` till `x` baserat på det enda värde som angavs vid initieringen (`x`), detta är ett exempel på breddning.

TypeScript tillhandahåller sätt att kontrollera breddningsprocessen, till exempel genom att använda "const".

### Const

Att använda nyckelordet `const` vid deklaration av en variabel resulterar i en smalare typinferens i TypeScript.

Till exempel:

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

Genom att använda `const` för att deklarera variabeln x, smalnas dess typ av till det specifika literalvärdet 'x'. Eftersom typen av x är avsmalnad kan den tilldelas till variabeln y utan något fel.
Anledningen till att typen kan härledas är att `const`-variabler inte kan omtilldelas, så deras typ kan smalnas av till en specifik literaltyp, i detta fall literaltypen 'x'.

#### Const-modifierare på typparametrar

Från version 5.0 av TypeScript är det möjligt att ange attributet `const` på en generisk typparameter. Detta möjliggör härledning av den mest precisa typen möjligt. Låt oss se ett exempel utan att använda `const`:

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type infered is: { a: string; b: string; }
```

Som du kan se härleddes egenskaperna `a` och `b` med typen `string`.

Låt oss nu se skillnaden med `const`-versionen:

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type infered is: { a: "a"; b: "b"; }
```

Nu kan vi se att egenskaperna `a` och `b` härleddes som `const`, så `a` och `b` behandlas som strängliteraler snarare än bara `string`-typer.

#### Const-påstående

Denna funktion låter dig deklarera en variabel med en mer precis literaltyp baserat på dess initieringsvärde, och signalerar till kompilatorn att värdet ska behandlas som en oföränderlig literal. Här är några exempel:

På en enskild egenskap:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

På ett helt objekt:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

Detta kan vara särskilt användbart vid definition av typen för en tupel:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### Explicit typannotering

Vi kan vara specifika och ange en typ. I följande exempel är egenskapen `x` av typen `number`:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

Vi kan göra typannoteringen mer specifik genom att använda en union av literaltyper:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### Typavsmalnande

Typavsmalnande är den process i TypeScript där en generell typ smalnas av till en mer specifik typ. Detta sker när TypeScript analyserar koden och avgör att vissa villkor eller operationer kan förfina typinformationen.

Avsmalnande av typer kan ske på olika sätt, bland annat:

#### Villkor

Genom att använda villkorssatser, som `if` eller `switch`, kan TypeScript smalna av typen baserat på utfallet av villkoret. Till exempel:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### Kasta eller returnera

Att kasta ett fel eller returnera tidigt från en gren kan användas för att hjälpa TypeScript smalna av en typ. Till exempel:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

Andra sätt att smalna av typer i TypeScript inkluderar:

* `instanceof`-operatorn: Används för att kontrollera om ett objekt är en instans av en specifik klass.
* `in`-operatorn: Används för att kontrollera om en egenskap finns i ett objekt.
* `typeof`-operatorn: Används för att kontrollera typen av ett värde vid körning.
* Inbyggda funktioner som `Array.isArray()`: Används för att kontrollera om ett värde är en array.

#### Diskriminerad union

Att använda en "diskriminerad union" är ett mönster i TypeScript där en explicit "tagg" läggs till objekt för att skilja mellan olika typer inom en union. Detta mönster kallas också en "taggad union". I följande exempel representeras "taggen" av egenskapen "type":

```typescript
type A = { type: 'type_a'; value: number };
type B = { type: 'type_b'; value: string };

const x = (input: A | B): string | number => {
    switch (input.type) {
        case 'type_a':
            return input.value + 100; // type is A
        case 'type_b':
            return input.value + 'extra'; // type is B
    }
};
```

#### Användardefinierade typvakter

I fall där TypeScript inte kan avgöra en typ är det möjligt att skriva en hjälpfunktion känd som en "användardefinierad typvakt". I följande exempel kommer vi att använda ett typpredikat för att smalna av typen efter att viss filtrering har tillämpats:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

