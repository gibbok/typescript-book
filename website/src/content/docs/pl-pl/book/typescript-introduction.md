---
title: Wprowadzenie do TypeScript
sidebar:
  order: 8
  label: 8. Wprowadzenie do TypeScript
---


### Czym jest TypeScript?

TypeScript jest językiem programowania z silnym typowaniem, zbudowanym na bazie języka JavaScript. Został pierwotnie zaprojektowany przez Andersa Hejlsberga w 2012 roku, a obecnie jest rozwijany i utrzymywany przez firmę Microsoft jako projekt open source.

TypeScript jest kompilowany do JavaScript i może być wykonywany w dowolnym środowisku uruchomieniowym JavaScript (np. w przeglądarce lub w środowisku Node.js na serwerze).

Obsługuje wiele paradygmatów programowania, takich jak programowanie funkcyjne, generyczne, imperatywne i obiektowe oraz jest językiem kompilowanym (transpilowanym), który przed wykonaniem jest przekształcany w JavaScript.

### Dlaczego TypeScript?

TypeScript jest językiem z silnym typowaniem, który pomaga zapobiegać częstym błędom programistycznym i unikać określonych rodzajów błędów czasu wykonywania przed uruchomieniem programu.

Język z silnym typowaniem pozwala programiście określać różne ograniczenia i zachowania programu w definicjach typów danych, ułatwiając weryfikowanie poprawności oprogramowania i zapobieganie defektom. Jest to szczególnie cenne w aplikacjach o dużej skali.

Niektóre zalety TypeScript:

* Typowanie statyczne, opcjonalnie silne
* Wnioskowanie typów
* Dostęp do funkcji ES6 i ES7
* Zgodność międzyplatformowa i zgodność z różnymi przeglądarkami
* Obsługa narzędziowa z IntelliSense

### TypeScript i JavaScript

Kod TypeScript zapisuje się w plikach `.ts` lub `.tsx`, natomiast kod JavaScript — w plikach `.js` lub `.jsx`.

Pliki z rozszerzeniem `.tsx` lub `.jsx` mogą zawierać rozszerzenie składni JavaScript JSX, używane w React do tworzenia interfejsów użytkownika.

Pod względem składni TypeScript jest typowanym nadzbiorem JavaScript (ECMAScript 2015). Cały kod JavaScript jest poprawnym kodem TypeScript, ale odwrotna zależność nie zawsze zachodzi.

Rozważmy na przykład funkcję w pliku JavaScript z rozszerzeniem `.js`, taką jak poniższa:

<!-- skip -->
```typescript
const sum = (a, b) => a + b;
```

Funkcję można przekonwertować i użyć w TypeScript, zmieniając rozszerzenie pliku na `.ts`. Jeśli jednak ta sama funkcja zostanie opatrzona adnotacjami typów TypeScript, nie można jej wykonać w żadnym środowisku uruchomieniowym JavaScript bez wcześniejszej kompilacji. Poniższy kod TypeScript spowoduje błąd składni, jeśli nie zostanie skompilowany:

<!-- skip -->
```typescript
const sum = (a: number, b: number): number => a + b;
```

TypeScript zaprojektowano tak, aby wykrywał potencjalne błędy czasu wykonywania w czasie kompilacji, umożliwiając programistom wyrażanie intencji za pomocą adnotacji typów. Ponadto dzięki wnioskowaniu typów TypeScript potrafi wykrywać niektóre problemy nawet wtedy, gdy nie podano jawnych adnotacji typów. Na przykład poniższy fragment kodu nie określa żadnych typów TypeScript:

<!-- skip -->
```typescript
const items = [{ x: 1 }, { x: 2 }];
const result = items.filter(item => item.y);
```

W tym przypadku TypeScript wykrywa błąd i zgłasza:

```text
Property 'y' does not exist on type '{ x: number; }'.
```

Na system typów TypeScript duży wpływ ma zachowanie JavaScript w czasie wykonywania. Na przykład operator dodawania (+), który w JavaScript może wykonywać konkatenację ciągów znaków albo dodawanie liczb, jest modelowany w TypeScript w ten sam sposób:

```typescript
const result = '1' + 1; // Result is of type string
```

Zespół TypeScript świadomie zdecydował się oznaczać nietypowe użycie JavaScript jako błędy. Rozważmy na przykład następujący poprawny kod JavaScript:

<!-- skip -->
```typescript
const result = 1 + true; // In JavaScript, the result is equal to 2
```

TypeScript zgłasza jednak błąd:

```text
Operator '+' cannot be applied to types 'number' and 'boolean'.
```

Ten błąd występuje, ponieważ TypeScript ściśle egzekwuje zgodność typów i w tym przypadku rozpoznaje nieprawidłową operację między liczbą a wartością logiczną.

### Generowanie kodu przez TypeScript

Kompilator TypeScript ma dwa główne zadania: sprawdzanie błędów typów i kompilowanie do JavaScript. Te dwa procesy są od siebie niezależne. Typy nie wpływają na wykonywanie kodu w środowisku uruchomieniowym JavaScript, ponieważ są całkowicie usuwane podczas kompilacji. TypeScript może wygenerować kod JavaScript nawet w przypadku wystąpienia błędów typów.
Oto przykład kodu TypeScript z błędem typu:

<!-- skip -->
```typescript
const add = (a: number, b: number): number => a + b;
const result = add('x', 'y'); // Argument of type 'string' is not assignable to parameter of type 'number'.
```

Mimo to może wygenerować wykonywalny kod JavaScript:

<!-- skip -->
```typescript
'use strict';
const add = (a, b) => a + b;
const result = add('x', 'y'); // xy
```

Nie można sprawdzać typów TypeScript w czasie wykonywania. Na przykład:

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

Ponieważ typy są usuwane po kompilacji, nie ma możliwości wykonania tego kodu w JavaScript. Aby rozpoznawać typy w czasie wykonywania, należy użyć innego mechanizmu. TypeScript udostępnia kilka możliwości, z których często stosowaną jest „unia znakowana”. Na przykład:

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

Właściwość „kind” jest wartością, której można użyć w czasie wykonywania do rozróżniania obiektów w JavaScript.

Możliwe jest również, że wartość w czasie wykonywania ma typ inny niż zadeklarowany w deklaracji typu. Może się tak zdarzyć na przykład wtedy, gdy programista błędnie zinterpretował typ interfejsu API i opatrzył go nieprawidłową adnotacją.

TypeScript jest nadzbiorem JavaScript, dlatego słowa kluczowego „class” można używać jako typu oraz wartości w czasie wykonywania.

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

W JavaScript „class” ma właściwość „prototype”, a operatora „instanceof” można użyć do sprawdzenia, czy właściwość prototype konstruktora występuje w dowolnym miejscu łańcucha prototypów obiektu.

TypeScript nie wpływa na wydajność w czasie wykonywania, ponieważ wszystkie typy zostają usunięte. Wprowadza jednak pewien narzut podczas kompilacji.

### Nowoczesny JavaScript już dziś (transpilacja do starszych wersji)

TypeScript może kompilować kod do dowolnej wydanej wersji JavaScript, począwszy od ECMAScript 3 (1999). Oznacza to, że TypeScript może transpilować kod korzystający z najnowszych funkcji JavaScript do starszych wersji — proces ten nazywa się transpilacją do starszych wersji (downleveling). Pozwala to korzystać z nowoczesnego JavaScript przy zachowaniu maksymalnej zgodności ze starszymi środowiskami uruchomieniowymi.

Należy pamiętać, że podczas transpilacji do starszej wersji JavaScript TypeScript może wygenerować kod, który powoduje narzut wydajnościowy w porównaniu z natywnymi implementacjami.

Oto niektóre z nowoczesnych funkcji JavaScript, których można używać w TypeScript:

* Moduły ECMAScript zamiast wywołań zwrotnych „define” w stylu AMD lub instrukcji „require” CommonJS.
* Klasy zamiast prototypów.
* Deklarowanie zmiennych za pomocą „let” lub „const” zamiast „var”.
* Pętla „for-of” lub metoda „.forEach” zamiast tradycyjnej pętli „for”.
* Funkcje strzałkowe zamiast wyrażeń funkcyjnych.
* Przypisanie destrukturyzujące.
* Skrócone nazwy właściwości i metod oraz obliczane nazwy właściwości.
* Domyślne parametry funkcji.

Dzięki wykorzystaniu tych nowoczesnych funkcji JavaScript programiści mogą pisać w TypeScript bardziej ekspresyjny i zwięzły kod.

