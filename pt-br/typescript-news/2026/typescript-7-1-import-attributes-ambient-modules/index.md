# TypeScript 7.1 adiciona atributos de importação a módulos ambient


**Publicado:** 1 de setembro de 2026

O compilador nativo do TypeScript agora aceita tipos de atributos de importação em declarações de módulos ambient com padrão. Assim, as declarações podem diferenciar imports por atributos como `type: 'css'` ou `type: 'text'`.

## O que mudou

Quando um import possui atributos, o TypeScript pode resolvê-lo para um módulo ambient com padrão correspondente. A correspondência usa atribuibilidade e, quando mais de uma declaração combina, o TypeScript escolhe a que possui o tipo de atributos mais específico.

Por enquanto, os tipos de atributos nessas declarações são limitados a propriedades comuns cujos valores são tipos literais de string. Declarações com o mesmo padrão e tipos de atributos idênticos podem ser mescladas; tipos diferentes permanecem separados.

## Compatibilidade

A mudança foi incorporada ao marco TypeScript 7.1.0 Beta. Ela não adiciona declarações integradas de importação de CSS ou texto à biblioteca padrão, portanto projetos e ferramentas ainda precisam definir os módulos ambient necessários.

## Fonte

Leia o pull request do TypeScript que foi incorporado: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
