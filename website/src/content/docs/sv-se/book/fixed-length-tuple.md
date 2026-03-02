---
title: Tuppel med fast längd
sidebar:
  order: 30
  label: 30. Tuppel med fast längd
---


En tuppel med fast längd är en specifik typ av tuppel som tvingar fram ett fast antal element av specifika typer, och tillåter inte några ändringar av tuppelns längd efter att den har definierats.

Tupplar med fast längd är användbara när du behöver representera en samling värden med ett specifikt antal element och specifika typer, och du vill säkerställa att längden och typerna av tuppeln inte kan ändras oavsiktligt.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Fel
```

