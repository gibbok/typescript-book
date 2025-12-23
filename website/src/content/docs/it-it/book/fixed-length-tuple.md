---
title: Tupla a lunghezza fissa
sidebar:
  order: 30
  label: 30. Tupla a lunghezza fissa
---


Una tupla a lunghezza fissa è un tipo specifico di tupla che impone un numero fisso di elementi di tipi specifici e non consente alcuna modifica alla lunghezza della tupla una volta definita.

Le tuple a lunghezza fissa sono utili quando è necessario rappresentare una raccolta di valori con un numero specifico di elementi e tipi specifici e si desidera garantire che la lunghezza e i tipi della tupla non possano essere modificati inavvertitamente.

<!-- skip -->
```typescript
const x = [10, 'hello'] as const;
x.push(2); // Errore
```

