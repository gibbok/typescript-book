# Wymazywane typy strukturalne



W TypeScripcie obiekty nie muszą dokładnie odpowiadać konkretnemu typowi. Jeśli na przykład utworzymy obiekt spełniający wymagania interfejsu, możemy użyć go w miejscach, w których wymagany jest ten interfejs, nawet jeśli nie istnieje między nimi jawne powiązanie.
Przykład:

```typescript
type NameProp1 = {
    prop1: string;
};

function log(x: NameProp1) {
    console.log(x.prop1);
}

const obj = {
    prop2: 123,
    prop1: 'Origin',
};

log(obj); // Valid
```

