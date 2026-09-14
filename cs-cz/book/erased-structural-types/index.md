# Vymazané strukturální typy



V TypeScriptu nemusejí objekty odpovídat konkrétnímu, přesně určenému typu. Pokud například vytvoříme objekt, který splňuje požadavky rozhraní, můžeme jej použít na místech, kde je toto rozhraní vyžadováno, i když mezi nimi neexistuje žádná explicitní vazba.
Příklad:

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

