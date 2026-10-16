---
title: Analýza toku řízení
sidebar:
  order: 23
  label: 23. Analýza toku řízení
---


Analýza toku řízení v TypeScriptu je způsob statické analýzy toku kódu za účelem odvození typů proměnných, který umožňuje kompilátoru podle potřeby zužovat typy těchto proměnných na základě výsledků analýzy.

Před TypeScriptem 4.4 se analýza toku kódu vztahovala pouze na kód uvnitř příkazu if, ale od TypeScriptu 4.4 ji lze použít také na podmíněné výrazy a přístupy k diskriminačním vlastnostem, na které se nepřímo odkazuje prostřednictvím proměnných const.

Například:

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

Několik příkladů, kdy k zužování nedochází:

<!-- skip -->
```typescript
const f1 = (x: unknown) => {
    let isString = typeof x === 'string';
    if (isString) {
        x.length; // Chyba, bez zúžení, protože isString není const
    }
};

const f6 = (
    obj: { kind: 'foo'; foo: string } | { kind: 'bar'; bar: number }
) => {
    const isFoo = obj.kind === 'foo';
    obj = obj;
    if (isFoo) {
        obj.foo; // Chyba, bez zúžení, protože obj se přiřazuje v těle funkce
    }
};
```

Poznámky: V podmíněných výrazech se analyzuje až pět úrovní nepřímých odkazů.

