# Poznawanie systemu typów



### Usługa językowa TypeScript

Usługa językowa TypeScript, znana również jako tsserver, oferuje różne funkcje, takie jak raportowanie błędów, diagnostyka, kompilacja przy zapisie, zmiana nazw, przechodzenie do definicji, listy uzupełnień, podpowiedzi dotyczące sygnatur i inne. Jest używana przede wszystkim przez zintegrowane środowiska programistyczne (IDE) do obsługi IntelliSense. Płynnie integruje się z Visual Studio Code i jest wykorzystywana przez narzędzia takie jak Conquer of Completion (Coc).

Programiści mogą korzystać ze specjalnego API i tworzyć własne wtyczki usługi językowej, aby usprawnić pracę z TypeScript podczas edycji kodu. Może to być szczególnie przydatne do implementowania specjalnych funkcji lintowania lub włączania automatycznego uzupełniania dla niestandardowego języka szablonów.

<!-- markdownlint-disable MD044 -->
Przykładem niestandardowej wtyczki używanej w rzeczywistych projektach jest „typescript-styled-plugin”, która zapewnia raportowanie błędów składniowych oraz obsługę IntelliSense dla właściwości CSS w komponentach stylizowanych.
<!-- markdownlint-enable MD044 -->

Więcej informacji i przewodniki szybkiego startu można znaleźć w oficjalnej witrynie Wiki TypeScript w serwisie GitHub: [https://github.com/microsoft/TypeScript/wiki/](https://github.com/microsoft/TypeScript/wiki/).

### Typowanie strukturalne

TypeScript opiera się na strukturalnym systemie typów. Oznacza to, że zgodność i równoważność typów są określane na podstawie rzeczywistej struktury lub definicji typu, a nie jego nazwy czy miejsca deklaracji, jak w nominalnych systemach typów, takich jak C# lub C.

Strukturalny system typów TypeScript został zaprojektowany na podstawie sposobu, w jaki działa dynamiczne kacze typowanie w JavaScript w czasie wykonywania.

Poniższy przykład jest poprawnym kodem TypeScript. Jak widać, „X” i „Y” mają ten sam element składowy „a”, mimo że ich deklaracje mają różne nazwy. Typy są określane na podstawie ich struktur, a ponieważ w tym przypadku struktury są takie same, typy są zgodne i poprawne.

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

### Podstawowe reguły porównywania w TypeScript

Proces porównywania w TypeScript jest rekurencyjny i wykonywany dla typów zagnieżdżonych na dowolnym poziomie.

Typ „X” jest zgodny z typem „Y”, jeśli „Y” ma co najmniej te same elementy składowe co „X”.

```typescript
type X = {
    a: string;
};
const y = { a: 'A', b: 'B' }; // Valid, as it has at least the same members as X
const r: X = y;
```

Parametry funkcji są porównywane według typów, a nie według ich nazw:

```typescript
type X = (a: number) => void;
type Y = (a: number) => void;
let x: X = (j: number) => undefined;
let y: Y = (k: number) => undefined;
y = x; // Valid
x = y; // Valid
```

Typy zwracane przez funkcje muszą być takie same:

<!-- skip -->
```typescript
type X = (a: number) => undefined;
type Y = (a: number) => number;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => 1;
y = x; // Invalid
x = y; // Invalid
```

Typ zwracany przez funkcję źródłową musi być podtypem typu zwracanego przez funkcję docelową:

<!-- skip -->
```typescript
let x = () => ({ a: 'A' });
let y = () => ({ a: 'A', b: 'B' });
x = y; // Valid
y = x; // Invalid member b is missing
```

Pomijanie parametrów funkcji jest dozwolone, ponieważ jest to powszechna praktyka w JavaScript, na przykład podczas używania „Array.prototype.map()”:

```typescript
[1, 2, 3].map((element, _index, _array) => element + 'x');
```

Dlatego poniższe deklaracje typów są całkowicie poprawne:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b: number) => undefined;
let x: X = (a: number) => undefined;
let y: Y = (a: number) => undefined; // Missing b parameter
y = x; // Valid
```

Wszelkie dodatkowe parametry opcjonalne typu źródłowego są poprawne:

```typescript
type X = (a: number, b?: number, c?: number) => undefined;
type Y = (a: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; //Valid
```

Wszelkie parametry opcjonalne typu docelowego, którym nie odpowiadają parametry w typie źródłowym, są poprawne i nie powodują błędu:

```typescript
type X = (a: number) => undefined;
type Y = (a: number, b?: number) => undefined;
let x: X = a => undefined;
let y: Y = a => undefined;
y = x; // Valid
x = y; // Valid
```

Parametr resztowy jest traktowany jako nieskończona seria parametrów opcjonalnych:

```typescript
type X = (a: number, ...rest: number[]) => undefined;
let x: X = a => undefined; //valid
```

Funkcje z przeciążeniami są poprawne, jeśli sygnatura przeciążenia jest zgodna z sygnaturą implementacji:

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

Porównanie parametrów funkcji kończy się powodzeniem, jeśli parametry źródłowe i docelowe można przypisać do nadtypów lub podtypów (biwariancja).

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

Typy wyliczeniowe są porównywalne i zgodne z liczbami, a liczby z typami wyliczeniowymi, ale porównywanie wartości pochodzących z różnych typów wyliczeniowych jest niepoprawne.

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

Instancje klasy podlegają kontroli zgodności swoich prywatnych i chronionych elementów składowych:

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

Kontrola porównawcza nie uwzględnia różnic w hierarchii dziedziczenia, na przykład:

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

Typy generyczne są porównywane na podstawie swoich struktur, z uwzględnieniem typu wynikowego otrzymanego po zastosowaniu parametru typu. Porównywany jest wyłącznie końcowy wynik jako typ niegeneryczny.

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

Jeśli argument typu generycznego nie został określony, wszystkie nieokreślone argumenty są traktowane jako typy `any`:

```typescript
type X = <T>(x: T) => T;
type Y = <K>(y: K) => K;
let x: X = x => x;
let y: Y = y => y;
x = y; // Valid
```

Zapamiętaj:

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

Należy pamiętać, że gdy opcja „strictNullChecks” jest włączona, wartości „null” i „undefined” są traktowane podobnie do „void”; w przeciwnym razie są traktowane podobnie do „never”.

### Typy jako zbiory

W TypeScript typ jest zbiorem możliwych wartości. Zbiór ten jest również nazywany dziedziną typu. Każdą wartość danego typu można postrzegać jako element zbioru. Typ określa ograniczenia, które musi spełniać każdy element zbioru, aby można go było uznać za należący do tego zbioru.
Podstawowym zadaniem TypeScript jest sprawdzanie i weryfikowanie, czy jeden zbiór jest podzbiorem innego.

TypeScript obsługuje różne rodzaje zbiorów:

| Pojęcie z teorii zbiorów | TypeScript                      | Uwagi                                                                                                                       |
| ----------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Zbiór pusty             | never                           | „never” nie zawiera niczego poza samym sobą                                                                                 |
| Zbiór jednoelementowy   | undefined / null / typ literałowy |                                                                                                                           |
| Zbiór skończony         | boolean / unia                 |                                                                                                                             |
| Zbiór nieskończony      | string / number / object        |                                                                                                                             |
| Zbiór uniwersalny       | any / unknown                   | Każdy element należy do „any” i każdy zbiór jest jego podzbiorem / „unknown” jest bezpiecznym typowo odpowiednikiem „any” |

Oto kilka przykładów:

| TypeScript            | Pojęcie z teorii zbiorów      | Przykład                                                                        |
| --------------------- | ----------------------------- | ------------------------------------------------------------------------------- |
| never                 | ∅ (zbiór pusty)               | const x: never = 'x'; // Error: Type 'string' is not assignable to type 'never' |
|                       |                               |
| Typ literałowy        | Zbiór jednoelementowy         | type X = 'X';                                                                   |
|                       |                               | type Y = 7;                                                                     |
|                       |                               |
| Wartość przypisywalna do T | Wartość ∈ T (należy do)  | type XY = 'X' \| 'Y';                                                           |
|                       |                               | const x: XY = 'X';                                                              |
|                       |                               |
| T1 przypisywalny do T2 | T1 ⊆ T2 (podzbiór)           | type XY = 'X' \| 'Y';                                                           |
|                       |                               | const x: XY = 'X';                                                              |
|                       |                               | const j: XY = 'J'; // Type '"J"' is not assignable to type 'XY'.                |
|                       |                               |                                                                                 |
| T1 extends T2         | T1 ⊆ T2 (podzbiór)             | type X = 'X' extends string ? true : false;                                     |
|                       |                               |
| T1 \| T2              | T1 ∪ T2 (unia)                 | type XY = 'X' \| 'Y';                                                           |
|                       |                               | type JK = 1 \| 2;                                                               |
|                       |                               |
| T1 & T2               | T1 ∩ T2 (przecięcie)           | type X = \{ a: string \}                                                          |
|                       |                               | type Y = \{ b: string \}                                                          |
|                       |                               | type XY = X & Y                                                                 |
|                       |                               | const x: XY = \{ a: 'a', b: 'b' \}                                                |
|                       |                               |
| unknown               | Zbiór uniwersalny              | const x: unknown = 1                                                            |

Unia (T1 | T2) tworzy szerszy zbiór (obejmujący oba typy):

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

Przecięcie (T1 & T2) tworzy węższy zbiór (tylko część wspólną):

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

Słowo kluczowe `extends` można w tym kontekście rozumieć jako „jest podzbiorem”. Nakłada ono ograniczenie na typ. Gdy `extends` jest używane z typem generycznym, ogranicza parametr typu generycznego do bardziej szczegółowego typu.

Należy pamiętać, że `extends` nie ma tutaj nic wspólnego z dziedziczeniem klas w rozumieniu programowania obiektowego.

TypeScript korzysta z typów strukturalnych i nie ma ścisłej hierarchii nominalnej. Jak pokazuje poniższy przykład, dwa typy mogą się nakładać, mimo że żaden z nich nie jest podtypem drugiego, ponieważ TypeScript bierze pod uwagę strukturę, czyli kształt obiektów.

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

### Przypisywanie typu: deklaracje typów i asercje typów

W TypeScript typ można przypisać na różne sposoby:

#### Deklaracja typu

W poniższym przykładzie używamy x: X („: Type”), aby zadeklarować typ zmiennej x.

```typescript
type X = {
    a: string;
};

// Type declaration
const x: X = {
    a: 'a',
};
```

Jeśli zmienna nie ma określonego formatu, TypeScript zgłosi błąd. Na przykład:

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

#### Asercja typu

Asercję można dodać za pomocą słowa kluczowego `as`. Informuje to kompilator, że programista ma więcej informacji o typie i wycisza wszelkie błędy, które mogą wystąpić.

Na przykład:

```typescript
type X = {
    a: string;
};
const x = {
    a: 'a',
    b: 'b',
} as X;
```

W powyższym przykładzie za pomocą słowa kluczowego as określono, że obiekt x ma typ X. Informuje to kompilator TypeScript, że obiekt jest zgodny z określonym typem, mimo że ma dodatkową właściwość b, której nie ma w definicji typu.

Asercje typów są przydatne w sytuacjach, w których trzeba określić bardziej szczegółowy typ, zwłaszcza podczas pracy z DOM. Na przykład:

```typescript
const myInput = document.getElementById('my_input') as HTMLInputElement;
```

W tym przypadku asercja typu as HTMLInputElement informuje TypeScript, że wynik getElementById należy traktować jako HTMLInputElement.
Asercji typów można również używać do zmiany mapowania kluczy, jak pokazano w poniższym przykładzie z literałami szablonowymi:

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

W tym przykładzie typ `J<Type>` używa typu mapowanego z literałem szablonowym, aby ponownie zmapować klucze typu Type. Tworzy nowe właściwości z prefiksem „prefix_” dodanym do każdego klucza, a odpowiadające im wartości są funkcjami zwracającymi oryginalne wartości właściwości.

Warto zauważyć, że podczas używania asercji typu TypeScript nie przeprowadza kontroli nadmiarowych właściwości. Dlatego gdy struktura obiektu jest znana z wyprzedzeniem, zasadniczo lepiej jest użyć deklaracji typu.

#### Deklaracje otoczenia

Deklaracje otoczenia to pliki opisujące typy kodu JavaScript; ich nazwy mają format `.d.ts`. Zazwyczaj są importowane i używane do opisywania typami istniejących bibliotek JavaScript lub do dodawania typów do istniejących plików JS w projekcie.

Typy dla wielu popularnych bibliotek można znaleźć pod adresem:
[https://github.com/DefinitelyTyped/DefinitelyTyped/](https://github.com/DefinitelyTyped/DefinitelyTyped/)

i zainstalować za pomocą polecenia:

```shell
npm install --save-dev @types/library-name
```

Własne deklaracje otoczenia można importować za pomocą odwołania z potrójnym ukośnikiem:

<!-- skip -->
```typescript
/// <reference path="./library-types.d.ts" />
```

Deklaracji otoczenia można używać nawet w plikach JavaScript za pomocą `// @ts-check`.

Słowo kluczowe `declare` umożliwia definiowanie typów dla istniejącego kodu JavaScript bez jego importowania, pełniąc funkcję symbolu zastępczego dla typów pochodzących z innego pliku lub dostępnych globalnie.

### Kontrola właściwości i kontrola nadmiarowych właściwości

TypeScript opiera się na strukturalnym systemie typów, ale kontrola nadmiarowych właściwości jest funkcją TypeScript, która pozwala sprawdzić, czy obiekt ma dokładnie właściwości określone w typie.

Kontrola nadmiarowych właściwości jest przeprowadzana na przykład podczas przypisywania literałów obiektowych do zmiennych lub przekazywania ich jako argumentów do nadmiarowej właściwości funkcji.

<!-- skip -->
```typescript
type X = {
    a: string;
};
const y = { a: 'a', b: 'b' };
const x: X = y; // Valid because structural typing
const w: X = { a: 'a', b: 'b' }; // Invalid because excess property checking
```

### Typy słabe

Typ uznaje się za słaby, gdy zawiera wyłącznie zestaw właściwości opcjonalnych:

```typescript
type X = {
    a?: string;
    b?: string;
};
```

TypeScript uznaje przypisanie czegokolwiek do typu słabego za błąd, jeśli nie występują żadne wspólne właściwości. Na przykład poniższy kod zgłasza błąd:

<!-- skip -->
```typescript
type Options = {
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;

fn({ c: 'c' }); // Invalid
```

Choć nie jest to zalecane, w razie potrzeby można pominąć tę kontrolę za pomocą asercji typu:

```typescript
type Options = {
    a?: string;
    b?: string;
};
const fn = (options: Options) => undefined;
fn({ c: 'c' } as Options); // Valid
```

Można też dodać `unknown` do sygnatury indeksowej typu słabego:

```typescript
type Options = {
    [prop: string]: unknown;
    a?: string;
    b?: string;
};

const fn = (options: Options) => undefined;
fn({ c: 'c' }); // Valid
```

### Ścisła kontrola literałów obiektowych (świeżość)

Ścisła kontrola literałów obiektowych, czasami nazywana „świeżością”, jest funkcją TypeScript, która pomaga wykrywać nadmiarowe lub błędnie zapisane właściwości, które w przeciwnym razie pozostałyby niezauważone podczas zwykłej kontroli typów strukturalnych.

Podczas tworzenia literału obiektowego kompilator TypeScript uznaje go za „świeży”. Jeśli literał obiektowy zostanie przypisany do zmiennej lub przekazany jako parametr, TypeScript zgłosi błąd, jeśli literał ten określa właściwości, które nie istnieją w typie docelowym.

„Świeżość” znika jednak, gdy literał obiektowy zostanie poszerzony lub zostanie użyta asercja typu.

Oto kilka przykładów ilustrujących tę funkcję:

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

### Wnioskowanie typów

TypeScript może wnioskować typy, jeśli adnotacji nie podano podczas:

* Inicjalizacji zmiennej.
* Inicjalizacji elementu składowego.
* Ustawiania wartości domyślnych parametrów.
* Określania typu zwracanego przez funkcję.

Na przykład:

```typescript
let x = 'x'; // The type inferred is string
```

Kompilator TypeScript analizuje wartość lub wyrażenie i określa jego typ na podstawie dostępnych informacji.

### Bardziej zaawansowane wnioskowanie

Gdy we wnioskowaniu typu używanych jest wiele wyrażeń, TypeScript szuka „najlepszego wspólnego typu”. Na przykład:

```typescript
let x = [1, 'x', 1, null]; // The type inferred is: (string | number | null)[]
```

Jeśli kompilator nie może znaleźć najlepszego wspólnego typu, zwraca typ unii. Na przykład:

```typescript
let x = [new RegExp('x'), new Date()]; // Type inferred is: (RegExp | Date)[]
```

TypeScript wykorzystuje „typowanie kontekstowe” oparte na miejscu występowania zmiennej, aby wnioskować typy. W poniższym przykładzie kompilator wie, że `e` jest typu `MouseEvent`, ze względu na typ zdarzenia `click` zdefiniowany w pliku lib.d.ts, który zawiera deklaracje otoczenia dla różnych typowych konstrukcji JavaScript i DOM:

```typescript
window.addEventListener('click', function (e) {}); // The inferred type of e is MouseEvent
```

### Poszerzanie typów

Poszerzanie typów jest procesem, w którym TypeScript przypisuje typ do zmiennej zainicjalizowanej bez adnotacji typu. Pozwala przechodzić od węższych typów do szerszych, ale nie odwrotnie.
W poniższym przykładzie:

<!-- skip -->
```typescript
let x = 'x'; // TypeScript infers as string, a wide type
let y: 'y' | 'x' = 'y'; // y types is a union of literal types
y = x; // Invalid Type 'string' is not assignable to type '"x" | "y"'.
```

TypeScript przypisuje typ `string` do `x` na podstawie pojedynczej wartości podanej podczas inicjalizacji (`x`). Jest to przykład poszerzania.

TypeScript zapewnia sposoby kontrolowania procesu poszerzania, na przykład przez użycie „const”.

### Const

Użycie słowa kluczowego `const` podczas deklarowania zmiennej powoduje, że TypeScript wnioskuje węższy typ.

Na przykład:

```typescript
const x = 'x'; // TypeScript infers the type of x as 'x', a narrower type
let y: 'y' | 'x' = 'y';
y = x; // Valid: The type of x is inferred as 'x'
```

Dzięki użyciu `const` do zadeklarowania zmiennej x jej typ zostaje zawężony do konkretnej wartości literałowej 'x'. Ponieważ typ x jest zawężony, można przypisać go do zmiennej y bez żadnego błędu.
Typ może zostać wywnioskowany w ten sposób, ponieważ zmiennym `const` nie można ponownie przypisać wartości, a więc ich typ można zawęzić do konkretnego typu literałowego, w tym przypadku do typu literałowego 'x'.

#### Modyfikator Const parametrów typu

Od wersji 5.0 w TypeScript można określić atrybut `const` dla parametru typu generycznego. Pozwala to wywnioskować możliwie najbardziej precyzyjny typ. Spójrzmy na przykład bez użycia `const`:

```typescript
function identity<T>(value: T) {
    // No const here
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: string; b: string; }
```

Jak widać, właściwości `a` i `b` mają wywnioskowany typ `string`.

Zobaczmy teraz różnicę w wersji z `const`:

```typescript
function identity<const T>(value: T) {
    // Using const modifier on type parameters
    return value;
}
const values = identity({ a: 'a', b: 'b' }); // Type inferred is: { a: "a"; b: "b"; }
```

Teraz widać, że właściwości `a` i `b` są wnioskowane jako literały łańcuchowe, a nie tylko jako typy `string`.

#### Asercja Const

Ta funkcja pozwala zadeklarować zmienną z bardziej precyzyjnym typem literałowym na podstawie jej wartości inicjalizacyjnej, wskazując kompilatorowi, że wartość powinna być traktowana jako niemutowalny literał. Oto kilka przykładów:

Dla pojedynczej właściwości:

```typescript
const v = {
    x: 3 as const,
};
v.x = 3;
```

Dla całego obiektu:

```typescript
const v = {
    x: 1,
    y: 2,
} as const;
```

Może to być szczególnie przydatne podczas definiowania typu krotki:

```typescript
const x = [1, 2, 3]; // number[]
const y = [1, 2, 3] as const; // Tuple of readonly [1, 2, 3]
```

### Jawna adnotacja typu

Możemy jawnie przekazać konkretny typ. W poniższym przykładzie właściwość `x` ma typ `number`:

```typescript
const v = {
    x: 1, // Inferred type: number (widening)
};
v.x = 3; // Valid
```

Adnotację typu można doprecyzować za pomocą unii typów literałowych:

<!-- skip -->
```typescript
const v: { x: 1 | 2 | 3 } = {
    x: 1, // x is now a union of literal types: 1 | 2 | 3
};
v.x = 3; // Valid
v.x = 100; // Invalid
```

### Zawężanie typów

Zawężanie typów jest w TypeScript procesem, w którym typ ogólny zostaje zawężony do bardziej szczegółowego typu. Dzieje się tak, gdy TypeScript analizuje kod i ustala, że określone warunki lub operacje mogą doprecyzować informacje o typie.

Typy można zawężać na różne sposoby, w tym przez:

#### Warunki

Za pomocą instrukcji warunkowych, takich jak `if` lub `switch`, TypeScript może zawęzić typ na podstawie wyniku warunku. Na przykład:

```typescript
let x: number | undefined = 10;

if (x !== undefined) {
    x += 100; // The type is number, which had been narrowed by the condition
}
```

#### Zgłoszenie wyjątku lub zwrócenie wartości

Zgłoszenie błędu lub wcześniejsze zwrócenie wartości z gałęzi może sprawić, że TypeScript zawęzi typ. Na przykład:

```typescript
let x: number | undefined = 10;

if (x === undefined) {
    throw 'error';
}
x += 100;
```

Inne sposoby zawężania typów w TypeScript obejmują:

* Operator `instanceof`: służy do sprawdzania, czy obiekt jest instancją określonej klasy.
* Operator `in`: służy do sprawdzania, czy właściwość istnieje w obiekcie.
* Operator `typeof`: służy do sprawdzania typu wartości w czasie wykonywania.
* Wbudowane funkcje, takie jak `Array.isArray()`: służą do sprawdzania, czy wartość jest tablicą.

#### Unia dyskryminowana

Użycie „unii dyskryminowanej” jest w TypeScript wzorcem, w którym do obiektów dodaje się jawny „znacznik”, aby rozróżnić różne typy w obrębie unii. Wzorzec ten jest również nazywany „unią znakowaną”. W poniższym przykładzie „znacznik” jest reprezentowany przez właściwość „type”:

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

#### Typy strażnicze zdefiniowane przez użytkownika

W przypadkach, gdy TypeScript nie jest w stanie określić typu, można napisać funkcję pomocniczą znaną jako „typ strażniczy zdefiniowany przez użytkownika”. W poniższym przykładzie użyjemy predykatu typu, aby zawęzić typ po zastosowaniu określonego filtrowania:

```typescript
const data = ['a', null, 'c', 'd', null, 'f'];

const r1 = data.filter(x => x != null); // The type is (string | null)[], TypeScript was not able to infer the type properly

const isValid = (item: string | null): item is string => item !== null; // Custom type guard

const r2 = data.filter(isValid); // The type is fine now string[], by using the predicate type guard we were able to narrow the type
```

#### Zawężanie za pomocą switch-true

TypeScript 5.3 dodaje zawężanie za pomocą switch-true, które umożliwia zastąpienie nieczytelnych łańcuchów if/else konstrukcją switch (true) wykorzystującą warunki logiczne. Poprawia to czytelność, a jednocześnie nadal zawęża typy. Przypomina dopasowywanie wzorców, ale jest prostsze.

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

