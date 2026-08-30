# Typy pierwotne



TypeScript obsługuje 7 typów pierwotnych. Pierwotny typ danych to typ, który nie jest obiektem i nie ma powiązanych z nim żadnych metod. W TypeScript wszystkie typy pierwotne są niezmienne, co oznacza, że po przypisaniu ich wartości nie można ich zmienić.

### string

Typ pierwotny `string` przechowuje dane tekstowe, a jego wartość jest zawsze ujęta w cudzysłowy podwójne lub pojedyncze.

```typescript
const x: string = 'x';
const y: string = 'y';
```

Ciągi znaków mogą obejmować wiele wierszy, jeśli są otoczone znakiem grawisu (`):

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

Typ danych `boolean` w TypeScript przechowuje wartość binarną: `true` albo `false`.

```typescript
const isReady: boolean = true;
```

### number

Typ danych `number` w TypeScript jest reprezentowany przez 64-bitową wartość zmiennoprzecinkową. Typ `number` może reprezentować liczby całkowite i ułamkowe.
TypeScript obsługuje również liczby szesnastkowe, binarne i ósemkowe, na przykład:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigint

Typ `bigint` reprezentuje wartości całkowite, które mogą być większe niż maksymalna bezpieczna liczba całkowita obsługiwana przez `number`, czyli 2^53 - 1.

Wartość `bigint` można utworzyć, wywołując wbudowaną funkcję `BigInt()` lub dodając `n` na końcu dowolnego literału liczby całkowitej:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Uwagi:

* Wartości `bigint` nie można mieszać z wartościami `number` ani używać ich z wbudowanym obiektem `Math`; należy je przekonwertować do tego samego typu.
* Wartości `bigint` są dostępne tylko wtedy, gdy konfiguracja elementu docelowego to ES2020 lub nowsza wersja.

### Symbol

Symbole są unikatowymi identyfikatorami, których można używać jako kluczy właściwości w obiektach, aby zapobiegać konfliktom nazw.

```typescript
type Obj = {
    [sym: symbol]: number;
};

const a = Symbol('a');
const b = Symbol('b');
let obj: Obj = {};
obj[a] = 123;
obj[b] = 456;

console.log(obj[a]); // 123
console.log(obj[b]); // 456
```

### null i undefined

Typy `null` i `undefined` reprezentują brak wartości.

Typ `undefined` oznacza, że wartość nie została przypisana ani zainicjalizowana lub wskazuje na niezamierzony brak wartości.

Typ `null` oznacza, że wiemy, iż pole nie ma wartości, więc wartość jest niedostępna i wskazuje na zamierzony brak wartości.

### Tablica

Tablica (`array`) to typ danych, który może przechowywać wiele wartości tego samego typu lub różnych typów. Można ją zdefiniować przy użyciu następującej składni:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript obsługuje tablice tylko do odczytu przy użyciu następującej składni:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript obsługuje krotki i krotki tylko do odczytu:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

Typ danych `any` reprezentuje dosłownie „dowolną” wartość i jest typem domyślnym, gdy TypeScript nie może wywnioskować typu lub gdy typ nie został określony.

Podczas używania `any` kompilator TypeScript pomija sprawdzanie typów, dlatego użycie `any` nie zapewnia bezpieczeństwa typów. Zasadniczo nie należy używać `any` do wyciszania kompilatora, gdy wystąpi błąd. Zamiast tego należy skupić się na naprawieniu błędu, ponieważ użycie `any` umożliwia naruszanie kontraktów i utratę korzyści z autouzupełniania w TypeScript.

Typ `any` może być przydatny podczas stopniowej migracji z JavaScript do TypeScript, ponieważ pozwala wyciszyć kompilator.

W nowych projektach należy używać opcji konfiguracji TypeScript `noImplicitAny`, dzięki której TypeScript zgłasza błędy w miejscach, gdzie użyto lub wywnioskowano `any`.

Typ `any` jest zwykle źródłem błędów, które mogą maskować rzeczywiste problemy z typami. Należy unikać jego używania, gdy tylko jest to możliwe.

