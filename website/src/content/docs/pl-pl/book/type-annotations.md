---
title: Adnotacje typów
sidebar:
  order: 12
  label: 12. Adnotacje typów
---


Do zmiennych zadeklarowanych za pomocą `var`, `let` i `const` można opcjonalnie dodać typ:

```typescript
const x: number = 1;
```

TypeScript dobrze radzi sobie z wnioskowaniem typów, zwłaszcza tych prostych, dlatego w większości przypadków takie deklaracje nie są konieczne.

Do parametrów funkcji można dodać adnotacje typów:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

Poniżej znajduje się przykład użycia funkcji anonimowej (nazywanej również funkcją lambda):

```typescript
const sum = (a: number, b: number) => a + b;
```

Tych adnotacji można uniknąć, gdy parametr ma wartość domyślną:

```typescript
const sum = (a = 10, b: number) => a + b;
```

Do funkcji można dodać adnotacje typu zwracanego:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

Jest to szczególnie przydatne w przypadku bardziej złożonych funkcji, ponieważ zapisanie typu zwracanego przed implementacją może pomóc w przemyśleniu funkcji.

Zasadniczo warto dodawać adnotacje do sygnatur typów, ale nie do zmiennych lokalnych w ciele funkcji, oraz zawsze dodawać typy do literałów obiektowych.

