---
title: Primitivní typy
sidebar:
  order: 11
  label: 11. Primitivní typy
---


TypeScript podporuje 7 primitivních typů. Primitivní datový typ označuje typ, který není objektem a nemá žádné přidružené metody. V TypeScriptu jsou všechny primitivní typy neměnné, což znamená, že jejich hodnoty nelze po přiřazení změnit.

### string

Primitivní typ `string` uchovává textová data a jeho hodnota je vždy uzavřena do dvojitých nebo jednoduchých uvozovek.

```typescript
const x: string = 'x';
const y: string = 'y';
```

Řetězce mohou zabírat více řádků, pokud jsou ohraničeny znakem zpětného apostrofu (`):

```typescript
let sentence: string = `xxx,
   yyy`;
```

### boolean

Datový typ `boolean` v TypeScriptu uchovává binární hodnotu, buď `true`, nebo `false`.

```typescript
const isReady: boolean = true;
```

### number

Datový typ `number` v TypeScriptu je reprezentován 64bitovou hodnotou s plovoucí desetinnou čárkou. Typ `number` může představovat celá čísla i zlomky.
TypeScript podporuje také šestnáctkový, dvojkový a osmičkový zápis, například:

```typescript
const decimal: number = 10;
const hexadecimal: number = 0xa00d; // Hexadecimal starts with 0x
const binary: number = 0b1010; // Binary starts with 0b
const octal: number = 0o633; // Octal starts with 0o
```

### bigint

Typ `bigint` představuje celočíselné hodnoty, které mohou být větší než nejvyšší bezpečné celé číslo podporované typem `number`, tedy 2^53 - 1.

Hodnotu `bigint` lze vytvořit voláním vestavěné funkce `BigInt()` nebo přidáním `n` na konec libovolného celočíselného literálu:

```typescript
const x: bigint = BigInt(9007199254740991);
const y: bigint = 9007199254740991n;
```

Poznámky:

* Hodnoty `bigint` nelze kombinovat s hodnotami `number` ani používat s vestavěným objektem `Math`; je nutné je převést na stejný typ.
* Hodnoty `bigint` jsou dostupné pouze tehdy, pokud je cílová konfigurace ES2020 nebo vyšší.

### Symbol

Symboly jsou jedinečné identifikátory, které lze použít jako klíče vlastností v objektech, aby se předešlo kolizím názvů.

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

### null a undefined

Typy `null` a `undefined` představují chybějící hodnotu nebo nepřítomnost jakékoli hodnoty.

Typ `undefined` znamená, že hodnota není přiřazena nebo inicializována, případně označuje neúmyslnou nepřítomnost hodnoty.

Typ `null` znamená, že víme, že daná položka nemá hodnotu, takže hodnota není dostupná, a označuje úmyslnou nepřítomnost hodnoty.

### Pole

Typ `array` je datový typ, který může uchovávat více hodnot stejného i různého typu. Lze jej definovat následující syntaxí:

```typescript
const x: string[] = ['a', 'b'];
const y: Array<string> = ['a', 'b'];
const j: Array<string | number> = ['a', 1, 'b', 2]; // Union
```

TypeScript podporuje pole pouze pro čtení pomocí následující syntaxe:

<!-- skip -->
```typescript
const x: readonly string[] = ['a', 'b']; // Readonly modifier
const y: ReadonlyArray<string> = ['a', 'b'];
const j: ReadonlyArray<string | number> = ['a', 1, 'b', 2];
j.push('x'); // Invalid
```

TypeScript podporuje n-tice a n-tice pouze pro čtení:

```typescript
const x: [string, number] = ['a', 1];
const y: readonly [string, number] = ['a', 1];
```

### any

Datový typ `any` představuje doslova „jakoukoli“ hodnotu a je výchozí, pokud TypeScript nedokáže typ odvodit nebo pokud typ není uveden.

Při použití `any` překladač TypeScriptu vynechává kontrolu typů, takže použití `any` neposkytuje typovou bezpečnost. Obecně nepoužívejte `any` k umlčení překladače při výskytu chyby; místo toho se zaměřte na její opravu, protože použití `any` umožňuje porušit kontrakty a přijít o výhody automatického doplňování v TypeScriptu.

Typ `any` může být užitečný při postupné migraci z JavaScriptu na TypeScript, protože dokáže umlčet překladač.

U nových projektů používejte konfiguraci TypeScriptu `noImplicitAny`, která umožňuje TypeScriptu hlásit chyby tam, kde je `any` použit nebo odvozen.

Typ `any` je obvykle zdrojem chyb, které mohou skrývat skutečné problémy s vašimi typy. Vyhýbejte se jeho použití, jak jen to je možné.

