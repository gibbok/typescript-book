---
title: Typové anotace
sidebar:
  order: 12
  label: 12. Typové anotace
---


U proměnných deklarovaných pomocí `var`, `let` a `const` lze volitelně přidat typ:

```typescript
const x: number = 1;
```

TypeScript dobře odvozuje typy, zejména ty jednoduché, takže tyto deklarace nejsou ve většině případů nutné.

U funkcí lze k parametrům přidat typové anotace:

```typescript
function sum(a: number, b: number) {
    return a + b;
}
```

Následuje příklad s anonymní funkcí (nazývanou také lambda funkce):

```typescript
const sum = (a: number, b: number) => a + b;
```

Tyto anotace lze vynechat, pokud má parametr výchozí hodnotu:

```typescript
const sum = (a = 10, b: number) => a + b;
```

K funkcím lze přidat anotace návratového typu:

```typescript
const sum = (a = 10, b: number): number => a + b;
```

To je užitečné zejména u složitějších funkcí, protože zápis návratového typu před implementací vám může pomoci funkci promyslet.

Obecně zvažte anotování typových signatur, ale ne lokálních proměnných v těle funkce, a k objektovým literálům vždy přidávejte typy.

