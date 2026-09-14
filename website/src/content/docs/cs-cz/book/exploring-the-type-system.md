---
title: Zkoumání typového systému
sidebar:
  order: 10
  label: 10. Zkoumání typového systému
---


### Jazyková služba TypeScriptu

Jazyková služba TypeScriptu, známá také jako tsserver, nabízí různé funkce, například hlášení chyb, diagnostiku, kompilaci při uložení, přejmenování, přechod na definici, seznamy návrhů pro doplňování, nápovědu k signaturám a další. Používají ji především integrovaná vývojová prostředí (IDE) k poskytování podpory IntelliSense. Bezproblémově se integruje s Visual Studio Code a využívají ji nástroje jako Conquer of Completion (Coc).

Vývojáři mohou využít vyhrazené API a vytvářet vlastní pluginy jazykové služby pro zlepšení práce s kódem TypeScriptu. To může být obzvláště užitečné při implementaci speciálních funkcí lintu nebo při zajištění automatického doplňování pro vlastní šablonovací jazyk.

<!-- markdownlint-disable MD044 -->
Příkladem vlastního pluginu používaného v praxi je „typescript-styled-plugin“, který poskytuje hlášení syntaktických chyb a podporu IntelliSense pro vlastnosti CSS ve styled components.
<!-- markdownlint-enable MD044 -->

Další informace a úvodní návody najdete na oficiální wiki TypeScriptu na GitHubu: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/)

### Strukturální typování

TypeScript je založen na strukturálním typovém systému. To znamená, že kompatibilita a ekvivalence typů se určují podle skutečné struktury nebo definice typu, nikoli podle jeho názvu či místa deklarace, jako je tomu v nominálních typových systémech, například v C# nebo C.

Strukturální typový systém TypeScriptu byl navržen podle toho, jak za běhu funguje dynamický systém duck typingu v JavaScriptu.

Následující příklad je platný kód TypeScriptu. Jak vidíte, „X“ a „Y“ mají stejný člen „a“, přestože jsou deklarovány pod různými názvy. Typy se určují podle svých struktur a v tomto případě jsou struktury stejné, takže jsou kompatibilní a kód je platný.

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

### Základní pravidla porovnávání v TypeScriptu

Proces porovnávání v TypeScriptu je rekurzivní a provádí se na typech vnořených na libovolné úrovni.

Typ „X“ je kompatibilní s „Y“, pokud má „Y“ alespoň stejné členy jako „X“.

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

Parametry funkcí se porovnávají podle typů, nikoli podle názvů:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

Návratové typy funkcí musí být stejné:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

Návratový typ zdrojové funkce musí být podtypem návratového typu cílové funkce:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

Vynechání parametrů funkce je povoleno, protože jde o běžnou praxi v JavaScriptu, například při použití „Array.prototype.map()“:

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Proto jsou následující deklarace typů zcela platné:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

Jakékoli další volitelné parametry zdrojového typu jsou platné:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

Jakékoli volitelné parametry cílového typu bez odpovídajících parametrů ve zdrojovém typu jsou platné a nepředstavují chybu:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

Se zbytkovým parametrem se zachází jako s nekonečnou řadou volitelných parametrů:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

Funkce s přetížením jsou platné, pokud je signatura přetížení kompatibilní se signaturou implementace:

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

Porovnání parametrů funkcí uspěje, pokud jsou zdrojové a cílové parametry přiřaditelné nadtypům nebo podtypům (bivariance).

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

Výčtové typy lze porovnávat s čísly a naopak a takové porovnání je platné, ale porovnání hodnot různých výčtových typů je neplatné.

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

U instancí třídy se kontroluje kompatibilita jejich soukromých a chráněných členů:

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

Kontrola při porovnávání nezohledňuje odlišnou hierarchii dědičnosti, například:

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

Generické typy se porovnávají podle struktury výsledného typu po uplatnění generického parametru; porovnává se pouze konečný výsledek jako negenerický typ.

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

Pokud generické typy nemají určený typový argument, se všemi neurčenými argumenty se zachází jako s typem „any“:

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

Pamatujte:

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
g = 1; // Invalid, void is not assignable to or from anything except any
g = g1; // Valid
```

Poznamenejme, že při zapnuté volbě „strictNullChecks“ se s „null“ a „undefined“ zachází podobně jako s „void“; jinak jsou podobné typu „never“.

### Typy jako množiny

V TypeScriptu je typ množinou možných hodnot. Tato množina se také označuje jako obor hodnot typu. Každou hodnotu typu lze chápat jako prvek množiny. Typ stanovuje omezení, která musí každý prvek množiny splňovat, aby byl považován za jejího člena.
Hlavním úkolem TypeScriptu je kontrolovat a ověřovat, zda je jedna množina podmnožinou druhé.

TypeScript podporuje různé druhy množin:

| Pojem z teorie množin | TypeScript                      | Poznámky                                                                                                              |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Prázdná množina     | never                           | „never“ obsahuje cokoli kromě sebe sama                                                                         |
| Jednoprvková množina | undefined / null / literálový typ |                                                                                                                    |
| Konečná množina     | boolean / sjednocení            |                                                                                                                    |
| Nekonečná množina   | string / number / object        |                                                                                                                    |
| Univerzální množina | any / unknown                   | Každý prvek je členem „any“ a každá množina je jeho podmnožinou / „unknown“ je typově bezpečným protějškem „any“ |

Zde je několik příkladů:

| TypeScript            | Pojem z teorie množin | Příklad                                                                         |
| --------------------- | ---------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (prázdná množina)    | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                        |
| Literálový typ        | Jednoprvková množina   | type X = 'X';                                                                   |
|                       |                        | type Y = 7;                                                                     |
|                       |                        |
| Hodnota přiřaditelná T | Hodnota ∈ T (je prvkem) | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        |
| T1 přiřaditelný T2    | T1 ⊆ T2 (je podmnožinou) | type XY = 'X' \| 'Y';                                                           |
|                       |                        | const x: XY = 'X';                                                              |
|                       |                        | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                        |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (je podmnožinou) | type X = 'X' extends string ? true : false;                                     |
|                       |                        |
| T1 \| T2              | T1 ∪ T2 (sjednocení)    | type XY = 'X' \| 'Y';                                                           |
|                       |                        | type JK = 1 \| 2;                                                               |
|                       |                        |
| T1 & T2               | T1 ∩ T2 (průnik)       | type X = \{ a: string \}                                                          |
|                       |                        | type Y = \{ b: string \}                                                          |
|                       |                        | type XY = X & Y                                                                 |
|                       |                        | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                        |
| unknown               | Univerzální množina   | const x: unknown = 1                                                            |

Sjednocení (T1 | T2) vytváří širší množinu (obě množiny):

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

Průnik (T1 & T2) vytváří užší množinu (pouze společné prvky):

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

Klíčové slovo `extends` lze v tomto kontextu chápat jako „je podmnožinou“. Nastavuje omezení pro typ. Při použití s generickým typem omezuje `extends` generický typový parametr na konkrétnější typ.

Poznamenejme, že `extends` zde nijak nesouvisí s dědičností tříd ve smyslu OOP.

TypeScript pracuje se strukturálními typy a nemá přísnou nominální hierarchii. Ve skutečnosti se, stejně jako v příkladu níže, mohou dva typy překrývat, aniž by byl jeden podtypem druhého, protože TypeScript zohledňuje strukturu neboli tvar objektů.

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

### Přiřazení typu: deklarace typů a přetypování

V TypeScriptu lze typ přiřadit různými způsoby:

#### Deklarace typu

V následujícím příkladu používáme x: X („: Type“) k deklaraci typu proměnné x.

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

Pokud proměnná neodpovídá určenému formátu, TypeScript ohlásí chybu. Například:

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

#### Přetypování

Přetypování lze přidat pomocí klíčového slova `as`. Tím sdělujeme kompilátoru, že vývojář má o typu více informací, a potlačujeme případné chyby.

Například:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

V uvedeném příkladu je objekt x pomocí klíčového slova as přetypován na typ X. To kompilátoru TypeScriptu sděluje, že objekt odpovídá určenému typu, přestože má navíc vlastnost b, která v definici typu není.

Přetypování je užitečné v situacích, kdy je nutné určit konkrétnější typ, zejména při práci s DOM. Například:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

Zde přetypování as HTMLInputElement sděluje TypeScriptu, že s výsledkem getElementById se má zacházet jako s HTMLInputElement.
Přetypování lze použít také k přemapování klíčů, jak ukazuje příklad níže se šablonovými literály:

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

V tomto příkladu používá typ `J<Type>` mapovaný typ se šablonovým literálem k přemapování klíčů Type. Vytváří nové vlastnosti s „prefix_“ přidaným ke každému klíči a jejich odpovídajícími hodnotami jsou funkce vracející původní hodnoty vlastností.

Při použití přetypování TypeScript neprovádí kontrolu nadbytečných vlastností. Proto je obecně vhodnější použít deklaraci typu, pokud je struktura objektu známa předem.

#### Ambientní deklarace

Ambientní deklarace jsou soubory popisující typy kódu JavaScriptu a jejich názvy mají formát `.d.ts.`. Obvykle se importují a používají k anotaci existujících knihoven JavaScriptu nebo k přidání typů do stávajících souborů JS ve vašem projektu.

Typy mnoha běžných knihoven najdete na:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

a lze je nainstalovat pomocí:

```shell
npm install --save-dev @types/library-name
```

Vámi definované ambientní deklarace můžete importovat pomocí odkazu se třemi lomítky:

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Ambientní deklarace můžete používat i v souborech JavaScriptu pomocí `// @ts-check`.

Klíčové slovo `declare` umožňuje definovat typy pro existující kód JavaScriptu bez jeho importu a slouží jako zástupný zápis pro typy z jiného souboru nebo z globálního prostoru.

### Kontrola vlastností a kontrola nadbytečných vlastností

TypeScript je založen na strukturálním typovém systému, ale kontrola nadbytečných vlastností je jeho funkcí, která umožňuje ověřit, zda má objekt přesně ty vlastnosti, které jsou uvedeny v typu.

Kontrola nadbytečných vlastností se provádí například při přiřazování objektových literálů proměnným nebo při jejich předávání jako argumentů funkci s nadbytečnou vlastností.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### Slabé typy

Typ je považován za slabý, pokud obsahuje pouze sadu vlastností, z nichž jsou všechny volitelné:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript považuje za chybu přiřazení čehokoli slabému typu, pokud neexistuje žádný překryv; například následující kód ohlásí chybu:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

Ačkoli se to nedoporučuje, v případě potřeby lze tuto kontrolu obejít pomocí přetypování:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

Nebo přidáním `unknown` do indexové signatury slabého typu:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### Přísná kontrola objektových literálů (čerstvost)

Přísná kontrola objektových literálů, někdy označovaná jako „čerstvost“, je funkce TypeScriptu, která pomáhá zachytit nadbytečné vlastnosti nebo překlepy v jejich názvech, jež by při běžných kontrolách strukturálních typů zůstaly nepovšimnuty.

Při vytvoření objektového literálu jej kompilátor TypeScriptu považuje za „čerstvý“. Pokud je objektový literál přiřazen proměnné nebo předán jako parametr, TypeScript ohlásí chybu, jestliže objektový literál uvádí vlastnosti, které v cílovém typu neexistují.

„Čerstvost“ však zaniká, když je objektový literál rozšířen nebo je použito přetypování.

Zde je několik příkladů pro ilustraci:

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

### Odvozování typů

Pokud není uvedena anotace, TypeScript dokáže odvodit typy při:

* Inicializaci proměnných.
* Inicializaci členů.
* Nastavování výchozích hodnot parametrů.
* Určování návratového typu funkce.

Například:

```typescript
let x = 'x'; // The type inferred is string
```

Kompilátor TypeScriptu analyzuje hodnotu nebo výraz a určuje jejich typ na základě dostupných informací.

### Pokročilejší odvozování typů

Pokud se při odvozování typů používá více výrazů, TypeScript hledá „nejlepší společné typy“. Například:

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

Pokud kompilátor nemůže najít nejlepší společné typy, vrátí sjednocení typů. Například:

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript k odvozování typů využívá „kontextové typování“ podle umístění proměnné. V následujícím příkladu kompilátor ví, že `e` je typu `MouseEvent`, díky typu události `click` definovanému v souboru lib.d.ts, který obsahuje ambientní deklarace různých běžných konstrukcí JavaScriptu a DOM:

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### Rozšiřování typů

Rozšiřování typů je proces, při kterém TypeScript přiřazuje typ proměnné inicializované bez typové anotace. Umožňuje přechod od užších typů k širším, ale nikoli naopak.
V následujícím příkladu:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript přiřazuje `string` proměnné `x` na základě jediné hodnoty uvedené při inicializaci (`x`); jde o příklad rozšiřování.

TypeScript nabízí způsoby, jak proces rozšiřování řídit, například pomocí „const“.

### Const

Použití klíčového slova `const` při deklaraci proměnné vede v TypeScriptu k odvození užšího typu.

Například:

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

Použitím `const` k deklaraci proměnné x se její typ zúží na konkrétní literálovou hodnotu 'x'. Protože je typ x zúžen, lze ji bez chyby přiřadit proměnné y.
Typ lze odvodit proto, že proměnným `const` nelze znovu přiřazovat hodnoty, takže jejich typ lze zúžit na konkrétní literálový typ, v tomto případě na literálový typ 'x'.

#### Modifikátor const u typových parametrů

Od verze TypeScriptu 5.0 lze u generického typového parametru uvést atribut `const`. To umožňuje odvodit nejpřesnější možný typ. Podívejme se na příklad bez použití `const`:

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

Jak vidíte, u vlastností `a` a `b` je odvozen typ `string`.

Nyní se podívejme na rozdíl oproti verzi s `const`:

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
```

Nyní vidíme, že vlastnosti `a` a `b` jsou odvozeny jako řetězcové literály, nikoli pouze jako typy `string`.

#### Přetypování const

Tato funkce umožňuje deklarovat proměnnou s přesnějším literálovým typem na základě její inicializační hodnoty a sdělit tak kompilátoru, že s hodnotou má zacházet jako s neměnným literálem. Zde je několik příkladů:

U jedné vlastnosti:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

U celého objektu:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

To může být obzvláště užitečné při definování typu n-tice:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### Explicitní typová anotace

Můžeme být konkrétní a uvést typ. V následujícím příkladu je vlastnost `x` typu `number`:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

Typovou anotaci můžeme zpřesnit pomocí sjednocení literálových typů:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### Zužování typů

Zužování typů je proces v TypeScriptu, při kterém se obecný typ zužuje na konkrétnější. Dochází k tomu, když TypeScript analyzuje kód a určí, že určité podmínky nebo operace mohou zpřesnit informace o typu.

K zužování typů může docházet různými způsoby, mezi něž patří:

#### Podmínky

Pomocí podmíněných příkazů, jako je `if` nebo `switch`, může TypeScript zúžit typ na základě výsledku podmínky. Například:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### Vyhození chyby nebo návrat

Vyhození chyby nebo předčasný návrat z větve lze využít k tomu, aby TypeScript snáze zúžil typ. Například:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

Mezi další způsoby zužování typů v TypeScriptu patří:

* Operátor `instanceof`: Slouží ke kontrole, zda je objekt instancí konkrétní třídy.
* Operátor `in`: Slouží ke kontrole, zda v objektu existuje vlastnost.
* Operátor `typeof`: Slouží ke kontrole typu hodnoty za běhu.
* Vestavěné funkce jako `Array.isArray()`: Slouží ke kontrole, zda je hodnota pole.

#### Diskriminované sjednocení

„Diskriminované sjednocení“ je vzor v TypeScriptu, při kterém se k objektům přidává explicitní „značka“ pro rozlišení jednotlivých typů ve sjednocení. Tento vzor se také označuje jako „označené sjednocení“. V následujícím příkladu je „značka“ reprezentována vlastností „type“:

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

#### Uživatelsky definovaní typoví strážci

V případech, kdy TypeScript nedokáže určit typ, lze napsat pomocnou funkci známou jako „uživatelsky definovaný typový strážce“. V následujícím příkladu použijeme typový predikát ke zúžení typu po provedení určitého filtrování:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

#### Zužování pomocí switch-true

TypeScript 5.3 přidává zužování pomocí switch-true, které umožňuje nahradit nepřehledné řetězce if/else konstrukcí switch (true) s logickými podmínkami. Zlepšuje čitelnost a přitom stále zužuje typy. Podobá se porovnávání vzorů, ale je jednodušší.

```typescript
function classify(x: unknown) {
    switch (true) {
        case typeof x === 'string':
            return `"${x.toUpperCase()}"`;
        case typeof x === 'number':
            return x > 0 ? 'positive' : 'negative';
        case Array.isArray(x):
            return `[${x.length} items]`;
        default:
            return 'something else';
    }
}
```

