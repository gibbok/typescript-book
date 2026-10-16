# Kontrollflussanalyse



Die Kontrollflussanalyse ist in TypeScript eine Möglichkeit, den Codefluss statisch zu analysieren, um die Typen von Variablen abzuleiten. Dadurch kann der Compiler die Typen dieser Variablen anhand der Analyseergebnisse nach Bedarf eingrenzen.

Vor TypeScript 4.4 wurde die Kontrollflussanalyse nur auf Code innerhalb einer if-Anweisung angewendet. Seit TypeScript 4.4 kann sie auch auf bedingte Ausdrücke und Zugriffe auf Diskriminanteigenschaften angewendet werden, auf die indirekt über const-Variablen verwiesen wird.

Zum Beispiel:

```typescript
const f1 = (x: unknown) => {
    const isString = typeof x === 'string';
    if (isString) {
        x.length;
    }
};

const f2 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    if (isFoo) {
        obj.foo;
    } else {
        obj.bar;
    }
};
```

Einige Beispiele, in denen kein Narrowing erfolgt:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Fehler, keine Eingrenzung, da isString nicht const ist
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Fehler, keine Eingrenzung, da obj im Funktionsrumpf zugewiesen wird
    }
};
```

Hinweise: In bedingten Ausdrücken werden bis zu fünf Indirektionsebenen analysiert.

