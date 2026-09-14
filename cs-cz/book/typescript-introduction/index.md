# Úvod do TypeScriptu



### Co je TypeScript?

TypeScript je silně typovaný programovací jazyk, který vychází z JavaScriptu. Původně jej v roce 2012 navrhl Anders Hejlsberg a v současnosti jej vyvíjí a udržuje Microsoft jako open-source projekt.

TypeScript se kompiluje do JavaScriptu a lze jej spustit v jakémkoli běhovém prostředí JavaScriptu (např. v prohlížeči nebo v Node.js na serveru).

Podporuje několik programovacích paradigmat, jako je funkcionální, generické, imperativní a objektově orientované programování, a jedná se o kompilovaný (transpilovaný) jazyk, který se před spuštěním převádí do JavaScriptu.

### Proč TypeScript?

TypeScript je silně typovaný jazyk, který pomáhá předcházet běžným programátorským chybám a určitým druhům běhových chyb ještě před spuštěním programu.

Silně typovaný jazyk umožňuje vývojáři v definicích datových typů specifikovat různá omezení a chování programu, což usnadňuje ověřování správnosti softwaru a předcházení chybám. To je obzvláště cenné u rozsáhlých aplikací.

Některé výhody TypeScriptu:

* Statické typování, volitelně silné typování
* Odvozování typů
* Přístup k funkcím ES6 a ES7
* Kompatibilita napříč platformami a prohlížeči
* Podpora nástrojů s IntelliSense

### TypeScript a JavaScript

TypeScript se píše do souborů `.ts` nebo `.tsx`, zatímco JavaScript do souborů `.js` nebo `.jsx`.

Soubory s příponou `.tsx` nebo `.jsx` mohou obsahovat rozšíření syntaxe JavaScriptu JSX, které se používá v Reactu pro vývoj uživatelského rozhraní.

TypeScript je z hlediska syntaxe typovanou nadmnožinou JavaScriptu (ECMAScript 2015). Veškerý kód JavaScriptu je platným kódem TypeScriptu, ale opačně to vždy neplatí.

Uvažujme například funkci v souboru JavaScriptu s příponou `.js`, jako je tato:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

Funkci lze převést a používat v TypeScriptu změnou přípony souboru na `.ts`. Pokud je však stejná funkce opatřena typovými anotacemi TypeScriptu, nelze ji bez kompilace spustit v žádném běhovém prostředí JavaScriptu. Následující kód TypeScriptu bez kompilace způsobí syntaktickou chybu:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript byl navržen tak, aby odhaloval potenciální běhové chyby při kompilaci tím, že vývojářům umožňuje vyjádřit záměr pomocí typových anotací. Díky odvozování typů navíc dokáže zachytit určité problémy i tehdy, když nejsou uvedeny žádné explicitní typové anotace. Například následující ukázka kódu nespecifikuje žádné typy TypeScriptu:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

V tomto případě TypeScript odhalí chybu a oznámí:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

Typový systém TypeScriptu je do značné míry ovlivněn chováním JavaScriptu za běhu. Například operátor sčítání (+), který v JavaScriptu může provádět buď spojování řetězců, nebo sčítání čísel, je v TypeScriptu modelován stejným způsobem:

```typescript
const result = '1' + 1; // Result is of type string
```

Tým stojící za TypeScriptem se záměrně rozhodl označovat neobvyklé použití JavaScriptu za chyby. Uvažujme například následující platný kód JavaScriptu:

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

TypeScript však ohlásí chybu:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

Tato chyba nastává, protože TypeScript důsledně vynucuje kompatibilitu typů a v tomto případě identifikuje neplatnou operaci mezi číslem a logickou hodnotou.

### Generování kódu TypeScriptem

Kompilátor TypeScriptu má dva hlavní úkoly: kontrolovat typové chyby a kompilovat do JavaScriptu. Tyto dva procesy jsou na sobě nezávislé. Typy neovlivňují vykonávání kódu v běhovém prostředí JavaScriptu, protože jsou během kompilace zcela odstraněny. TypeScript může vygenerovat JavaScript i za přítomnosti typových chyb.
Zde je příklad kódu TypeScriptu s typovou chybou:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

Přesto může vzniknout spustitelný výstup v JavaScriptu:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

Typy TypeScriptu nelze kontrolovat za běhu. Například:

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
        // 'Dog' only refers to a type, but is being used as a value here.
        // ...
    }
};
```

Protože jsou typy po kompilaci odstraněny, nelze tento kód spustit v JavaScriptu. K rozpoznávání typů za běhu musíme použít jiný mechanismus. TypeScript nabízí několik možností, přičemž běžnou volbou je „označené sjednocení“. Například:

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

Vlastnost „kind“ je hodnota, kterou lze za běhu použít k rozlišení objektů v JavaScriptu.

Je také možné, aby hodnota měla za běhu jiný typ, než jaký byl uveden v deklaraci typu. Například pokud vývojář nesprávně pochopil typ z API a chybně jej anotoval.

TypeScript je nadmnožinou JavaScriptu, takže klíčové slovo „class“ lze použít jako typ i jako hodnotu za běhu.

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

V JavaScriptu má „class“ vlastnost „prototype“ a operátor „instanceof“ lze použít k ověření, zda se vlastnost prototype konstruktoru nachází kdekoli v řetězci prototypů objektu.

TypeScript nemá vliv na výkon za běhu, protože všechny typy jsou odstraněny. Přináší však určitou režii při sestavování.

### Moderní JavaScript už nyní (převod na starší verze)

TypeScript dokáže kompilovat kód do jakékoli vydané verze JavaScriptu od ECMAScriptu 3 (1999). To znamená, že umí převést kód využívající nejnovější funkce JavaScriptu do starších verzí; tento proces se označuje jako downleveling. Díky tomu lze používat moderní JavaScript a zároveň zachovat maximální kompatibilitu se staršími běhovými prostředími.

Je důležité poznamenat, že při transpilaci do starší verze JavaScriptu může TypeScript vygenerovat kód, který má oproti nativním implementacím určitou výkonnostní režii.

Zde jsou některé moderní funkce JavaScriptu, které lze v TypeScriptu používat:

* Moduly ECMAScript namísto callbacků „define“ ve stylu AMD nebo příkazů „require“ z CommonJS.
* Třídy namísto prototypů.
* Deklarace proměnných pomocí „let“ nebo „const“ namísto „var“.
* Cyklus „for-of“ nebo „.forEach“ namísto tradičního cyklu „for“.
* Šipkové funkce namísto funkčních výrazů.
* Destrukturovací přiřazení.
* Zkrácený zápis názvů vlastností a metod a vypočítávané názvy vlastností.
* Výchozí parametry funkcí.

Využitím těchto moderních funkcí JavaScriptu mohou vývojáři v TypeScriptu psát výstižnější a stručnější kód.

