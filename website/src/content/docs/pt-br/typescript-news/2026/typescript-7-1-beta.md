---
title: "TypeScript 7.1 Beta apresenta APIs modulares e suporte ao ES2026"
description: "TypeScript 7.1 Beta traz APIs nativas modulares, ES2026, importações de origem, mapeadores de conteúdo e melhorias de desempenho."
lastUpdated: 2026-10-20
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-10-20'
---

**Publicado:** 20 de outubro de 2026

A Microsoft lançou o TypeScript 7.1 Beta, com novas APIs nativas do compilador e suporte a recursos de JavaScript. Para testar a versão beta:

```shell
npm install -D typescript@beta
```

## O que mudou

* `--target es2026` e `--lib es2026` agora são opções estáveis, com declarações atualizadas da biblioteca padrão.
* As novas entradas da API incluem `typescript/sync`, `typescript/async`, `typescript/fs` e `typescript/ast`. Objetos `API` e `Program` precisam ser descartados, por exemplo com `using`.
* Importações na fase de origem (`import source` e `import.source()`) permitem obter objetos de origem de módulos, inclusive para WebAssembly, com configurações adequadas de `--module` e `esnext`.
* Mapeadores de conteúdo expõem TypeScript incorporado em arquivos como `.vue` e `.svelte`. O uso pela linha de comando exige `--runExternalCode`.
* Nos benchmarks publicados pela Microsoft, as compilações ficaram mais rápidas e consumiram menos memória que no TypeScript 7.0.

## Disponibilidade

Esta é uma versão beta, não estável. Verifique a compatibilidade dos frameworks e das ferramentas antes de atualizar. O suporte a atributos de importação em módulos ambientes foi abordado em outra notícia.

## Fonte

Leia o anúncio oficial: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
