---
title: Tipo Any
sidebar:
  order: 44
  label: 44. Tipo Any
---


Il tipo `any` è un tipo speciale (supertipo universale) che può essere utilizzato per rappresentare qualsiasi tipo di valore (primitive, oggetti, array, funzioni, errori, simboli). Viene spesso utilizzato in situazioni in cui il tipo di un valore non è noto in fase di compilazione, o quando si lavora con valori provenienti da API o librerie esterne che non dispongono di tipi TypeScript.

Utilizzando il tipo `any`, si indica al compilatore TypeScript che i valori devono essere rappresentati senza alcuna limitazione. Per massimizzare la sicurezza dei tipi nel codice, tieni presente quanto segue:

* Limitare l'utilizzo di `any` a casi specifici in cui il tipo è realmente sconosciuto.
* Non restituire `any` da una funzione, poiché ciò indebolisce la sicurezza del tipo nel codice che lo utilizza.
* Invece di `any`, utilizzare `@ts-ignore` se è necessario silenziare il compilatore.

```typescript
let value: any;
value = true; // Valido
value = 7; // Valido
```

