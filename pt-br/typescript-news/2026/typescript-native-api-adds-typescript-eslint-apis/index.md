# API nativa do TypeScript adiciona APIs necessárias ao typescript-eslint


**Publicado:** 14 de setembro de 2026

A API nativa do TypeScript agora expõe APIs adicionais do verificador e de tipos necessárias ao `typescript-eslint`, reduzindo lacunas de compatibilidade para ferramentas que dependem da API programática do TypeScript.

## O que mudou

A mudança adiciona APIs como `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` e `getExportSymbolOfSymbol`. Tipos de interface e classe também recebem `getThisType()`, e `IndexKind` passa a ser exportado para consultas de tipos de índice.

As superfícies síncrona e assíncrona da API nativa foram atualizadas.

## Por que isso importa

A pull request do TypeScript foi criada especificamente para adicionar APIs identificadas como ausentes pelo `typescript-eslint`. Isso oferece às integrações mais informações do verificador e dos tipos que elas já esperavam da API consolidada do TypeScript.

## Fonte

Leia a pull request oficial do TypeScript: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
