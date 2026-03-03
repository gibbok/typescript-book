---
title: Raderade strukturella typer
sidebar:
  order: 56
  label: 56. Raderade strukturella typer
---


I TypeScript behöver objekt inte matcha en specifik, exakt typ. Till exempel, om vi skapar ett objekt som uppfyller ett gränssnitts krav, kan vi använda det objektet på platser där det gränssnittet krävs, även om det inte finns någon explicit koppling mellan dem.
Exempel:

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

