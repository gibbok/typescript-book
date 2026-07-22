---
title: strictNullChecks
sidebar:
  order: 20
  label: 20. strictNullChecks
---


`strictNullChecks` è un'opzione del compilatore TypeScript che impone un controllo null rigoroso. Quando questa opzione è abilitata, variabili e parametri possono essere assegnati a `null` o `undefined` solo se sono stati dichiarati esplicitamente di quel tipo utilizzando l'unione `null` | `undefined`. Se una variabile o un parametro non viene dichiarato esplicitamente come nullable, TypeScript genererà un errore per prevenire potenziali errori di runtime.

