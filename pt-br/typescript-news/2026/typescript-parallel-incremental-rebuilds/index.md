# TypeScript acelera recompilações incrementais com verificações paralelas


Uma alteração incorporada ao compilador paraleliza a verificação de assinaturas dos arquivos afetados por mudanças em módulos muito importados. Antes, essa etapa era sequencial.

## O que mudou

No teste do autor, uma recompilação após editar apenas um comentário caiu de **3,4 para 1,5 segundos** em Linux com 32 núcleos. Em um pacote do n8n, um caso semelhante caiu de **5,4 para 4,5 segundos**. São resultados específicos, não garantias gerais.

## Desempenho e limites

O trabalho é limitado por `GOMAXPROCS`; os ganhos dependem dos verificadores disponíveis e das dependências. Não beneficia compilações com `isolatedModules`, que não percorrem arquivos dependentes.

## Fonte

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
