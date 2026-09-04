---
title: TypeScript 7 atualiza os diagnósticos de configuração após alterações nos arquivos
description: O serviço de linguagem nativo agora republica erros de tsconfig.json e jsconfig.json após alterações em arquivos de configuração monitorados.
lastUpdated: 2026-07-30
sidebar:
    order: 5
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Publicado:** 30 de julho de 2026

A Microsoft integrou uma correção que atualiza os diagnósticos dos arquivos de configuração no serviço de linguagem nativo do TypeScript após a alteração de um arquivo `tsconfig.json` ou `jsconfig.json` monitorado.

## O que mudou

Os diagnósticos dos arquivos de configuração são publicados durante uma atualização do snapshot do serviço de linguagem. Antes, a alteração de um arquivo de configuração monitorado agendava uma atualização dos diagnósticos, mas não do snapshot. Assim, novos erros de configuração podiam permanecer desatualizados até que o editor fizesse outra solicitação que atualizasse o snapshot.

Agora, o serviço de linguagem detecta alterações nos arquivos de configuração monitorados e agenda uma atualização do snapshot com debounce. Isso republica os diagnósticos enviados sem depender de uma solicitação posterior do editor.

## Por que isso é importante

Quando um editor ou uma ferramenta externa altera um arquivo `tsconfig.json` ou `jsconfig.json` monitorado, o serviço de linguagem nativo pode informar os erros de configuração atualizados somente a partir do evento do monitor de arquivos. Um teste de regressão verifica esse comportamento com um valor `target` inválido.

## Disponibilidade

A alteração foi integrada à base de código nativa do TypeScript após o lançamento do TypeScript 7.0. A fonte não identifica uma versão estável do npm que inclua a correção, portanto consulte as notas da versão instalada antes de depender dela.

## Fonte

Leia a alteração oficial: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
