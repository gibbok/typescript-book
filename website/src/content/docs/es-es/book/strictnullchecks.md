---
title: strictNullChecks
sidebar:
  order: 18
  label: 18. strictNullChecks
---


`strictNullChecks` es una opción del compilador de TypeScript que aplica una comprobación estricta de valores nulos. Cuando está activada, solo se puede asignar `null` o `undefined` a variables y parámetros declarados explícitamente con ese tipo mediante la unión `null` | `undefined`. Si una variable o parámetro no se declara explícitamente como anulable, TypeScript genera un error para evitar posibles errores en tiempo de ejecución.

