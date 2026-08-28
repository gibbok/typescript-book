---
title: API nativa do TypeScript 7 adiciona métodos de emit
description: A API nativa do TypeScript adiciona métodos de emit para sistema de arquivos e memória, cobrindo programas inteiros e saídas JavaScript ou de declarações selecionadas.
lastUpdated: 2026-07-24
sidebar:
    order: 6
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-24'
---

**Publicado:** 24 de julho de 2026

A base de código nativa do TypeScript adicionou APIs programáticas de emit para ferramentas que precisam gerar saída JavaScript ou de declarações.

## O que mudou

A API incorporada oferece quatro caminhos de emit com comportamentos diferentes de saída e seleção de arquivos.

* `program.emit(emitOnly?: EmitOnly)` emite o programa inteiro para o sistema de arquivos, incluindo um sistema de arquivos virtual configurado, e respeita opções que bloqueiam o emit, como `noEmit` e `noEmitOnError`.
* `program.emitToString(emitOnly?: EmitOnly)` emite o programa inteiro como resultados de string em memória e também respeita as opções que bloqueiam o emit.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` retorna em memória a saída JavaScript dos arquivos selecionados e ignora as opções que bloqueiam o emit.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` fornece a saída de declarações correspondente para os arquivos selecionados.

Isso permite que consumidores da API escolham entre o emit normal do programa inteiro e uma saída direcionada em memória.

## Disponibilidade

A mudança foi incorporada à base de código nativa do TypeScript em 24 de julho de 2026. A fonte não identifica uma versão npm estável que contenha essas APIs, portanto as ferramentas devem verificar o suporte na versão de TypeScript utilizada.

## Fonte

Leia a pull request oficial: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
