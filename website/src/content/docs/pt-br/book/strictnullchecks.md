---
title: strictNullChecks
sidebar:
  order: 18
  label: 18. strictNullChecks
---


`strictNullChecks` é uma opção do compilador TypeScript que impõe verificação rigorosa de null. Quando esta opção está habilitada, variáveis e parâmetros só podem receber `null` ou `undefined` se tiverem sido explicitamente declarados como sendo desse tipo usando o tipo union `null` | `undefined`. Se uma variável ou parâmetro não for explicitamente declarado como anulável, o TypeScript gerará um erro para prevenir potenciais erros em tempo de execução.

