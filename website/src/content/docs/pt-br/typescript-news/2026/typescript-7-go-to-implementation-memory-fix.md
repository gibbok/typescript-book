---
title: TypeScript 7 melhora o uso de memória de Ir para Implementação
description: Uma correção no serviço de linguagem nativo evita o crescimento quadrático da memória ao localizar implementações em projetos grandes e com tipos complexos.
lastUpdated: 2026-07-30
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Publicado:** 30 de julho de 2026

A Microsoft incorporou uma correção de escalabilidade de memória para Ir para Implementação no serviço de linguagem nativo do TypeScript.

## O que mudou

O serviço de linguagem usa uma lista de trabalho com busca em largura para localizar implementações. Quando um membro de interface tinha muitas implementações, buscas repetidas em todo o programa podiam retornar novamente as mesmas referências. Assim, as referências mantidas, o trabalho na fila e os grupos de resultados podiam crescer de forma quadrática e esgotar a memória em projetos grandes e com tipos complexos.

A correção elimina nós de referência duplicados antes de adicioná-los à fila de trabalho e evita manter definições de símbolos duplicadas. Um teste de regressão verifica se dobrar o número de implementações produz crescimento aproximadamente linear, em vez de quadrático.

## Por que isso importa

Ir para Implementação agora pode processar esse padrão sem manter repetidamente as mesmas referências internas. A resposta final do editor já era desduplicada, portanto a mudança reduz a memória e o trabalho ocultos necessários para produzi-la.

## Disponibilidade

A mudança foi incorporada à base de código nativa do TypeScript após o lançamento do TypeScript 7.0. A fonte não identifica uma versão npm estável que contenha a correção, portanto verifique as notas de versão da versão instalada antes de depender dela.

## Fonte

Leia a mudança oficial: [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
