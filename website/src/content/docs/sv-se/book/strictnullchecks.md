---
title: strictNullChecks
sidebar:
  order: 18
  label: 18. strictNullChecks
---


`strictNullChecks` är ett TypeScript-kompilatoralternativ som framtvingar strikt null-kontroll. När detta alternativ är aktiverat kan variabler och parametrar bara tilldelas `null` eller `undefined` om de uttryckligen har deklarerats att vara av den typen med hjälp av unionstypen `null` | `undefined`. Om en variabel eller parameter inte uttryckligen deklareras som nullable kommer TypeScript att generera ett fel för att förhindra potentiella körtidsfel.

