# Przestrzenie nazw



W TypeScripcie przestrzenie nazw służą do organizowania kodu w logiczne kontenery, co zapobiega konfliktom nazw i umożliwia grupowanie powiązanego kodu.
Użycie słowa kluczowego `export` umożliwia dostęp do przestrzeni nazw spoza modułów.

```typescript
export namespace MyNamespace {
    export interface MyInterface1 {
        prop1: boolean;
    }
    export interface MyInterface2 {
        prop2: string;
    }
}

const a: MyNamespace.MyInterface1 = {
    prop1: true,
};
```

