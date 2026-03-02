---
title: Introduktion till TypeScript
sidebar:
  order: 7
  label: 7. Introduktion till TypeScript
---


### Vad är TypeScript?

TypeScript är ett starkt typat programmeringsspråk som bygger på JavaScript. Det designades ursprungligen av Anders Hejlsberg 2012 och utvecklas och underhålls för närvarande av Microsoft som ett öppen källkod-projekt.

TypeScript kompileras till JavaScript och kan köras i vilken JavaScript-runtime som helst (t.ex. en webbläsare eller Node.js på en server).

Det stöder flera programmeringsparadigm såsom funktionell, generisk, imperativ och objektorienterad programmering, och är ett kompilerat (transpilerat) språk som konverteras till JavaScript före exekvering.

### Varför TypeScript?

TypeScript är ett starkt typat språk som hjälper till att förhindra vanliga programmeringsmisstag och undvika vissa typer av körtidsfel innan programmet körs.

Ett starkt typat språk gör det möjligt för utvecklaren att specificera olika programbegränsningar och beteenden i datatypsdefinitionerna, vilket underlättar möjligheten att verifiera programvarans korrekthet och förhindra defekter. Detta är särskilt värdefullt i storskaliga applikationer.

Några av fördelarna med TypeScript:

* Statisk typning, valfritt starkt typad
* Typinferens
* Tillgång till ES6- och ES7-funktioner
* Plattforms- och webbläsarkompatibilitet
* Verktygsstöd med IntelliSense

### TypeScript och JavaScript

TypeScript skrivs i `.ts`- eller `.tsx`-filer, medan JavaScript-filer skrivs i `.js`- eller `.jsx`-filer.

Filer med tillägget `.tsx` eller `.jsx` kan innehålla JavaScript Syntax Extension JSX, som används i React för UI-utveckling.

TypeScript är en typad supermängd av JavaScript (ECMAScript 2015) vad gäller syntax. All JavaScript-kod är giltig TypeScript-kod, men det omvända är inte alltid sant.

Betrakta till exempel en funktion i en JavaScript-fil med tillägget `.js`, som följande:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

Funktionen kan konverteras och användas i TypeScript genom att ändra filtillägget till `.ts`. Men om samma funktion annoteras med TypeScript-typer kan den inte köras i någon JavaScript-runtime utan kompilering. Följande TypeScript-kod kommer att producera ett syntaxfel om den inte kompileras:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript designades för att upptäcka möjliga undantag som kan uppstå vid körning under kompileringstiden genom att låta utvecklaren definiera avsikten med typannoteringar. Dessutom kan TypeScript också fånga problem om ingen typannotering tillhandahålls. Till exempel specificerar följande kodavsnitt inga TypeScript-typer:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

I detta fall upptäcker TypeScript ett fel och rapporterar:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

TypeScripts typsystem är till stor del influerat av körtidsbeteendet hos JavaScript. Till exempel kan additionsoperatorn (+), som i JavaScript kan utföra antingen strängkonkatenering eller numerisk addition, modelleras på samma sätt i TypeScript:

```typescript
const result = '1' + 1; // Resultatet är av typen string
```

Teamet bakom TypeScript har fattat ett medvetet beslut att flagga ovanlig användning av JavaScript som fel. Betrakta till exempel följande giltiga JavaScript-kod:

<!-- skip -->
```typescript
const result = 1 + true; // I JavaScript är resultatet lika med 2
```

Dock kastar TypeScript ett fel:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

Detta fel uppstår eftersom TypeScript strikt upprätthåller typkompatibilitet, och i detta fall identifierar det en ogiltig operation mellan en number och en boolean.

### TypeScript-kodgenerering

TypeScript-kompilatorn har två huvudansvar: kontrollera typfel och kompilera till JavaScript. Dessa två processer är oberoende av varandra. Typer påverkar inte kodens exekvering i en JavaScript-runtime, eftersom de raderas helt under kompileringen. TypeScript kan fortfarande producera JavaScript även vid typfel.
Här är ett exempel på TypeScript-kod med ett typfel:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument av typen 'string' är inte tilldelningsbart till parameter av typen 'number'.
```

Trots detta kan den fortfarande producera körbar JavaScript-utdata:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

Det är inte möjligt att kontrollera TypeScript-typer vid körning. Till exempel:

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
        // 'Dog' refererar endast till en typ, men används som ett värde här.
        // ...
    }
};
```

Eftersom typerna raderas efter kompilering finns det inget sätt att köra denna kod i JavaScript. För att känna igen typer vid körning behöver vi använda en annan mekanism. TypeScript erbjuder flera alternativ, där ett vanligt är "tagged union". Till exempel:

```typescript
interface Dog {
    kind: 'dog'; // Taggad union
    bark: () => void;
}
interface Cat {
    kind: 'cat'; // Taggad union
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

Egenskapen "kind" är ett värde som kan användas vid körning för att särskilja mellan objekt i JavaScript.

Det är också möjligt att ett värde vid körning har en annan typ än den som deklarerades i typdeklarationen. Till exempel om utvecklaren har misstolkat en API-typ och annoterat den felaktigt.

TypeScript är en supermängd av JavaScript, så nyckelordet "class" kan användas som en typ och ett värde vid körning.

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

I JavaScript har en "class" en "prototype"-egenskap, och "instanceof"-operatorn kan användas för att testa om prototype-egenskapen för en konstruktor förekommer någonstans i prototypkedjan för ett objekt.

TypeScript har ingen effekt på körtidsprestanda, eftersom alla typer raderas. Dock introducerar TypeScript viss overhead vid byggtid.

### Modernt JavaScript nu (Downleveling)

TypeScript kan kompilera kod till vilken utgiven version av JavaScript som helst sedan ECMAScript 3 (1999). Detta innebär att TypeScript kan transpilera kod från de senaste JavaScript-funktionerna till äldre versioner, en process som kallas Downleveling. Detta möjliggör användning av modernt JavaScript samtidigt som maximal kompatibilitet med äldre körtidsmiljöer bibehålls.

Det är viktigt att notera att vid transpilering till en äldre version av JavaScript kan TypeScript generera kod som kan medföra en prestandaoverhead jämfört med nativa implementeringar.

Här är några av de moderna JavaScript-funktioner som kan användas i TypeScript:

* ECMAScript-moduler istället för AMD-style "define"-callbacks eller CommonJS "require"-satser.
* Klasser istället för prototyper.
* Variabeldeklaration med "let" eller "const" istället för "var".
* "for-of"-loop eller ".forEach" istället för den traditionella "for"-loopen.
* Pilfunktioner istället för funktionsuttryck.
* Destruktureringstilldelning.
* Förkortade egenskaps-/metodnamn och beräknade egenskapsnamn.
* Standardparametrar för funktioner.

Genom att utnyttja dessa moderna JavaScript-funktioner kan utvecklare skriva mer uttrycksfull och koncis kod i TypeScript.

