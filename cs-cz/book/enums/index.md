# Výčtové typy



V TypeScriptu je `enum` množina pojmenovaných konstantních hodnot.

```typescript
enum Color {
    Red = '#ff0000',
    Green = '#00ff00',
    Blue = '#0000ff',
}
```

Výčtové typy lze definovat různými způsoby:

### Číselné výčtové typy

Číselný výčtový typ v TypeScriptu je výčtový typ, v němž je každé konstantě přiřazena číselná hodnota, přičemž číslování ve výchozím nastavení začíná od 0.

```typescript
enum Size {
    Small, // value starts from 0
    Medium,
    Large,
}
```

Vlastní hodnoty lze zadat jejich explicitním přiřazením:

```typescript
enum Size {
    Small = 10,
    Medium,
    Large,
}
console.log(Size.Medium); // 11
```

### Řetězcové výčtové typy

Řetězcový výčtový typ v TypeScriptu je výčtový typ, v němž je každé konstantě přiřazena řetězcová hodnota.

```typescript
enum Language {
    English = 'EN',
    Spanish = 'ES',
}
```

Poznámka: TypeScript umožňuje použití heterogenních výčtových typů, v nichž mohou současně existovat řetězcové i číselné členy.

### Konstantní výčtové typy

Konstantní výčtový typ v TypeScriptu je speciální druh výčtového typu, v němž jsou všechny hodnoty známé v době překladu a jsou přímo vloženy všude, kde je výčtový typ použit, což vede k efektivnějšímu kódu.

```typescript
const enum Language {
    English = 'EN',
    Spanish = 'ES',
}
console.log(Language.English);
```

Přeloží se do:

```typescript
console.log('EN' /* Language.English */);
```

Poznámky:
Konstantní výčtové typy mají hodnoty vložené přímo do kódu a samotný výčtový typ je odstraněn, což může být efektivnější v samostatných knihovnách, ale obecně to není žádoucí. Konstantní výčtové typy navíc nemohou mít vypočítávané členy.

### Zpětné mapování

Zpětné mapování u výčtových typů v TypeScriptu označuje možnost získat název členu výčtového typu z jeho hodnoty. Ve výchozím nastavení mají členy výčtového typu dopředné mapování z názvu na hodnotu, ale zpětné mapování lze vytvořit explicitním nastavením hodnot pro každého člena. Zpětné mapování je užitečné, když potřebujete vyhledat člena výčtového typu podle jeho hodnoty nebo procházet všechny členy výčtového typu. Pamatujte, že zpětné mapování se generuje pouze pro číselné členy výčtového typu, zatímco pro řetězcové členy se negeneruje vůbec.

Následující výčtový typ:

```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
```

se přeloží do:

<!-- skip -->
```javascript
'use strict';
var Grade;
(function (Grade) {
    Grade[(Grade['A'] = 90)] = 'A';
    Grade[(Grade['B'] = 80)] = 'B';
    Grade[(Grade['C'] = 70)] = 'C';
    Grade['F'] = 'fail';
})(Grade || (Grade = {}));
```

Mapování hodnot na klíče tedy funguje pro číselné členy výčtového typu, ale ne pro řetězcové členy:

<!-- skip -->
```typescript
enum Grade {
    A = 90,
    B = 80,
    C = 70,
    F = 'fail',
}
const myGrade = Grade.A;
console.log(Grade[myGrade]); // A
console.log(Grade[90]); // A

const failGrade = Grade.F;
console.log(failGrade); // fail
console.log(Grade[failGrade]); // Element implicitly has an 'any' type because index expression is not of type 'number'.
```

### Ambientní výčtové typy

Ambientní výčtový typ v TypeScriptu je druh výčtového typu definovaný v deklaračním souboru (*.d.ts) bez přidružené implementace. Umožňuje definovat množinu pojmenovaných konstant, které lze typově bezpečně používat napříč různými soubory, aniž by bylo nutné do každého souboru importovat detaily implementace.

### Vypočítávané a konstantní členy

V TypeScriptu je vypočítávaný člen členem výčtového typu, jehož hodnota se počítá za běhu, zatímco konstantní člen je člen, jehož hodnota je nastavena v době překladu a za běhu ji nelze změnit. Vypočítávané členy jsou povoleny v běžných výčtových typech, zatímco konstantní členy jsou povoleny v běžných i konstantních výčtových typech.

```typescript
// Constant members
enum Color {
    Red = 1,
    Green = 5,
    Blue = Red + Green,
}
console.log(Color.Blue); // 6 generation at compilation time
```

```typescript
// Computed members
enum Color {
    Red = 1,
    Green = Math.pow(2, 2),
    Blue = Math.floor(Math.random() * 3) + 1,
}
console.log(Color.Blue); // random number generated at run time
```

Výčtové typy jsou vyjádřeny sjednoceními tvořenými typy jejich členů. Hodnoty jednotlivých členů lze určit pomocí konstantních nebo nekonstantních výrazů, přičemž členům s konstantními hodnotami jsou přiřazeny literálové typy. Pro ilustraci zvažte deklaraci typu E a jeho podtypů E.A, E.B a E.C. V tomto případě E představuje sjednocení E.A | E.B | E.C.

```typescript
const identity = (value: number) => value;

enum E {
    A = 2 * 5, // Numeric literal
    B = 'bar', // String literal
    C = identity(42), // Opaque computed
}

console.log(E.C); //42
```

