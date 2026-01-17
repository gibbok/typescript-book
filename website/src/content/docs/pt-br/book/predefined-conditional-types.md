---
title: Tipos Condicionais Predefinidos
sidebar:
  order: 42
  label: 42. Tipos Condicionais Predefinidos
---


No TypeScript, Tipos Condicionais Predefinidos são tipos condicionais integrados fornecidos pela linguagem. Eles são projetados para realizar transformações de tipo comuns com base nas características de um determinado tipo.

`Exclude<UnionType, ExcludedType>`: Este tipo remove todos os tipos de Type que são atribuíveis a ExcludedType.

`Extract<Type, Union>`: Este tipo extrai todos os tipos de Union que são atribuíveis a Type.

`NonNullable<Type>`: Este tipo remove null e undefined de Type.

`ReturnType<Type>`: Este tipo extrai o tipo de retorno de uma função Type.

`Parameters<Type>`: Este tipo extrai os tipos de parâmetro de uma função Type.

`Required<Type>`: Este tipo torna todas as propriedades em Type obrigatórias.

`Partial<Type>`: Este tipo torna todas as propriedades em Type opcionais.

`Readonly<Type>`: Este tipo torna todas as propriedades em Type somente leitura.

