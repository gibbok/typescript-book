---
title: strictNullChecks
sidebar:
  order: 18
  label: 18. strictNullChecks
---


`strictNullChecks` é uma opção do compilador TypeScript que impõe a verificação estrita de nulos. Quando esta opção está habilitada, variáveis e parâmetros só podem receber `null` | `undefined` se tiverem sido explicitamente declarados como sendo desse tipo usando o tipo de união `null` | `undefined`. Se uma variável ou parâmetro não for explicitamente declarado como anulável, o TypeScript gerará um erro para evitar possíveis erros de tempo de execução.

