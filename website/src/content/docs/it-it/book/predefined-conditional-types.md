---
title: Tipi Condizionali Predefiniti
sidebar:
  order: 42
  label: 42. Tipi Condizionali Predefiniti
---


In TypeScript, i Tipi Condizionali Predefiniti sono tipi condizionali integrati forniti dal linguaggio. Sono progettati per eseguire trasformazioni di tipo comuni in base alle caratteristiche di un dato tipo.

`Exclude<UnionType, ExcludedType>`: questo tipo rimuove da Type tutti i tipi assegnabili a ExcludedType.

`Extract<Type, Union>`: questo tipo estrae da Union tutti i tipi assegnabili a Type.

`NonNullable<Type>`: questo tipo rimuove null e undefined da Type.

`ReturnType<Type>`: questo tipo estrae il tipo di ritorno di un Type di funzione.

`Parameters<Type>`: questo tipo estrae i tipi di parametro di un Type di funzione.

`Required<Type>`: Questo tipo rende obbligatorie tutte le proprietà in Type.

`Partial<Type>`: Questo tipo rende facoltative tutte le proprietà in Type.

`Readonly<Type>`: Questo tipo rende di sola lettura tutte le proprietà in Type.

