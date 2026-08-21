---
title: TypeScript 7.0 já está disponível
description: O TypeScript 7.0 apresenta um compilador nativo e um serviço de linguagem baseados em Go, oferecendo grandes melhorias de desempenho para builds e editores.
lastUpdated: 2026-07-08
sidebar:
    order: 6
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-08'
---

**Publicado:** 8 de julho de 2026

A Microsoft lançou o TypeScript 7.0, a primeira versão estável baseada no novo código nativo em Go do projeto.

## O que mudou

O TypeScript 7 usa código nativo, multithreading com memória compartilhada e outras otimizações. Segundo a equipe do TypeScript, nos benchmarks publicados, os builds completos ficaram entre 7,7 e 11,9 vezes mais rápidos que no TypeScript 6.

O lançamento também migra o serviço de linguagem para o Language Server Protocol. Os editores compatíveis podem usar a mesma base nativa para carregar projetos, exibir diagnósticos e conclusões e permitir navegação com mais rapidez.

Instale a versão estável pelo npm:

```shell
npm install --save-dev typescript
```

## Compatibilidade

O TypeScript 7.0 não oferece uma API programática estável. Ferramentas que incorporam o TypeScript, incluindo as versões atuais de Astro, Vue, MDX, Svelte e alguns fluxos de trabalho do Angular, ainda podem exigir o TypeScript 6 até que a nova API esteja disponível.

A equipe do TypeScript espera apresentar a nova API no TypeScript 7.1. Antes da atualização, os projetos devem verificar a compatibilidade de seu framework e de suas ferramentas.

## Fonte

Leia o anúncio oficial: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
