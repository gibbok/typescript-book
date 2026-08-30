---
title: Einführung in TypeScript
sidebar:
  order: 8
  label: 8. Einführung in TypeScript
---


### Was ist TypeScript?

TypeScript ist eine stark typisierte Programmiersprache, die auf JavaScript aufbaut. Sie wurde ursprünglich 2012 von Anders Hejlsberg entworfen und wird derzeit von Microsoft als Open-Source-Projekt entwickelt und gepflegt.

TypeScript wird zu JavaScript kompiliert und kann in jeder JavaScript-Laufzeitumgebung ausgeführt werden (z. B. in einem Browser oder mit Node.js auf einem Server).

TypeScript unterstützt mehrere Programmierparadigmen wie funktionale, generische, imperative und objektorientierte Programmierung und ist eine kompilierte (transpilierte) Sprache, die vor der Ausführung in JavaScript umgewandelt wird.

### Warum TypeScript?

TypeScript ist eine stark typisierte Sprache, die dabei hilft, häufige Programmierfehler zu verhindern und bestimmte Arten von Laufzeitfehlern zu vermeiden, bevor das Programm ausgeführt wird.

Eine stark typisierte Sprache ermöglicht es Entwicklern, verschiedene Einschränkungen und Verhaltensweisen des Programms in den Datentypdefinitionen festzulegen. Dadurch lässt sich die Korrektheit der Software leichter überprüfen und Fehlern vorbeugen. Dies ist besonders bei umfangreichen Anwendungen von großem Wert.

Einige Vorteile von TypeScript:

* Statische Typisierung, optional stark typisiert
* Typinferenz
* Zugriff auf Funktionen von ES6 und ES7
* Plattform- und browserübergreifende Kompatibilität
* Werkzeugunterstützung mit IntelliSense

### TypeScript und JavaScript

TypeScript wird in `.ts`- oder `.tsx`-Dateien geschrieben, während JavaScript-Dateien in `.js` oder `.jsx` geschrieben werden.

Dateien mit der Erweiterung `.tsx` oder `.jsx` können die JavaScript-Syntaxerweiterung JSX enthalten, die in React für die UI-Entwicklung verwendet wird.

TypeScript ist hinsichtlich der Syntax eine typisierte Obermenge von JavaScript (ECMAScript 2015). Jeder JavaScript-Code ist gültiger TypeScript-Code, umgekehrt gilt dies jedoch nicht immer.

Betrachten Sie beispielsweise eine Funktion in einer JavaScript-Datei mit der Erweiterung `.js`, wie die folgende:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

Die Funktion kann durch Ändern der Dateierweiterung in `.ts` konvertiert und in TypeScript verwendet werden. Wird dieselbe Funktion jedoch mit TypeScript-Typen annotiert, kann sie ohne Kompilierung in keiner JavaScript-Laufzeitumgebung ausgeführt werden. Der folgende TypeScript-Code erzeugt einen Syntaxfehler, wenn er nicht kompiliert wird:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript wurde entwickelt, um potenzielle Laufzeitfehler bereits zur Kompilierzeit zu erkennen, indem Entwickler ihre Absicht durch Typannotationen ausdrücken können. Dank der Typinferenz kann TypeScript außerdem bestimmte Probleme auch dann erkennen, wenn keine expliziten Typannotationen angegeben sind. Der folgende Codeausschnitt gibt beispielsweise keine TypeScript-Typen an:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

In diesem Fall erkennt TypeScript einen Fehler und meldet:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

Das Typsystem von TypeScript ist weitgehend vom Laufzeitverhalten von JavaScript geprägt. Der Additionsoperator (+), der in JavaScript entweder Zeichenketten verketten oder Zahlen addieren kann, wird in TypeScript beispielsweise auf dieselbe Weise modelliert:

```typescript
const result = '1' + 1; // Result is of type string
```

Das TypeScript-Team hat sich bewusst dafür entschieden, ungewöhnliche Verwendungen von JavaScript als Fehler zu kennzeichnen. Betrachten Sie beispielsweise den folgenden gültigen JavaScript-Code:

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

TypeScript gibt jedoch einen Fehler aus:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

Dieser Fehler tritt auf, weil TypeScript die Typkompatibilität strikt durchsetzt und in diesem Fall eine ungültige Operation zwischen einer Zahl und einem booleschen Wert erkennt.

### TypeScript-Codegenerierung

Der TypeScript-Compiler hat zwei Hauptaufgaben: die Prüfung auf Typfehler und die Kompilierung zu JavaScript. Diese beiden Prozesse sind voneinander unabhängig. Typen wirken sich nicht auf die Ausführung des Codes in einer JavaScript-Laufzeitumgebung aus, da sie bei der Kompilierung vollständig entfernt werden. TypeScript kann selbst bei vorhandenen Typfehlern JavaScript ausgeben.
Hier ist ein Beispiel für TypeScript-Code mit einem Typfehler:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

Dennoch kann weiterhin ausführbarer JavaScript-Code erzeugt werden:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

TypeScript-Typen können nicht zur Laufzeit geprüft werden. Zum Beispiel:

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

Da die Typen nach der Kompilierung entfernt werden, kann dieser Code nicht in JavaScript ausgeführt werden. Um Typen zur Laufzeit zu erkennen, müssen wir einen anderen Mechanismus verwenden. TypeScript bietet mehrere Möglichkeiten; eine gängige ist die „Tagged Union“. Zum Beispiel:

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

Die Eigenschaft „kind“ ist ein Wert, mit dem sich Objekte in JavaScript zur Laufzeit unterscheiden lassen.

Es ist auch möglich, dass ein Wert zur Laufzeit einen anderen Typ aufweist als in der Typdeklaration angegeben. Dies kann beispielsweise vorkommen, wenn ein Entwickler einen API-Typ falsch interpretiert und entsprechend falsch annotiert hat.

TypeScript ist eine Obermenge von JavaScript, daher kann das Schlüsselwort „class“ zur Laufzeit sowohl als Typ als auch als Wert verwendet werden.

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

In JavaScript besitzt eine „class“ eine „prototype“-Eigenschaft. Mit dem „instanceof“-Operator lässt sich prüfen, ob die Prototype-Eigenschaft eines Konstruktors an einer Stelle in der Prototype-Kette eines Objekts vorkommt.

TypeScript hat keinen Einfluss auf die Laufzeitleistung, da alle Typen entfernt werden. TypeScript verursacht jedoch einen gewissen zusätzlichen Aufwand bei der Build-Zeit.

### Modernes JavaScript jetzt verwenden (Downleveling)

TypeScript kann Code für jede seit ECMAScript 3 (1999) veröffentlichte JavaScript-Version kompilieren. Das bedeutet, dass TypeScript Code mit den neuesten JavaScript-Funktionen in ältere Versionen transpilieren kann. Dieser Vorgang wird als Downleveling bezeichnet. Dadurch lässt sich modernes JavaScript verwenden, während eine maximale Kompatibilität mit älteren Laufzeitumgebungen erhalten bleibt.

Dabei ist zu beachten, dass TypeScript bei der Transpilierung in eine ältere JavaScript-Version Code erzeugen kann, der gegenüber nativen Implementierungen einen zusätzlichen Leistungsaufwand verursacht.

Nachfolgend sind einige moderne JavaScript-Funktionen aufgeführt, die in TypeScript verwendet werden können:

* ECMAScript-Module anstelle von „define“-Callbacks im AMD-Stil oder „require“-Anweisungen von CommonJS.
* Klassen anstelle von Prototypen.
* Variablendeklarationen mit „let“ oder „const“ anstelle von „var“.
* „for-of“-Schleifen oder „.forEach“ anstelle der herkömmlichen „for“-Schleife.
* Pfeilfunktionen anstelle von Funktionsausdrücken.
* Destrukturierende Zuweisung.
* Kurzschreibweisen für Eigenschafts-/Methodennamen und berechnete Eigenschaftsnamen.
* Standardparameter für Funktionen.

Durch die Nutzung dieser modernen JavaScript-Funktionen können Entwickler ausdrucksstärkeren und prägnanteren TypeScript-Code schreiben.

