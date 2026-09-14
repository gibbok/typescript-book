# Jmenné prostory



V TypeScriptu se jmenné prostory používají k uspořádání kódu do logických celků, zabraňují kolizím názvů a poskytují způsob, jak seskupit související kód.
Použití klíčového slova `export` umožňuje přístup ke jmennému prostoru z vnějších modulů.

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

