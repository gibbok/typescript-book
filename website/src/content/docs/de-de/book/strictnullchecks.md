---
title: strictNullChecks
sidebar:
  order: 19
  label: 19. strictNullChecks
---


`strictNullChecks` ist eine TypeScript-Compileroption, die eine strikte Nullprüfung erzwingt. Wenn diese Option aktiviert ist, können `null` oder `undefined` Variablen und Parametern nur dann zugewiesen werden, wenn diese ausdrücklich mit dem Union-Typ `null` | `undefined` deklariert wurden. Wenn eine Variable oder ein Parameter nicht ausdrücklich als nullable deklariert ist, erzeugt TypeScript einen Fehler, um potenzielle Laufzeitfehler zu verhindern.

