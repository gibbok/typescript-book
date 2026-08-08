# TypeScript 7 adiciona um escopo de busca para símbolos do espaço de trabalho


**Publicado:** 7 de agosto de 2026

A Microsoft incorporou um escopo de busca de símbolos do espaço de trabalho ao serviço de linguagem nativo do TypeScript.

## O que mudou

A nova preferência `workspaceSymbols.scope` tem dois valores. `allOpenProjects` é o padrão e busca símbolos em todos os projetos abertos. `currentProject` limita a busca aos projetos que contêm o documento fornecido.

A extensão nativa do VS Code agora adiciona um documento TypeScript ou JavaScript compatível às solicitações `workspace/symbol`. Ela prioriza o documento ativo e, caso contrário, usa um documento compatível aberto. O serviço de linguagem usa esse documento somente quando `workspaceSymbols.scope` é `currentProject`; caso contrário, mantém a busca em todos os projetos abertos.

## Por que isso importa

Em um espaço de trabalho que contém vários projetos com símbolos de nomes semelhantes, `currentProject` pode restringir os resultados ao projeto relevante. O padrão preserva o comportamento existente, portanto a mudança é opcional.

## Disponibilidade

A mudança foi incorporada à base de código nativa do TypeScript após o TypeScript 7.0. A fonte não identifica uma versão estável do npm que a inclua, portanto verifique as notas de versão da versão instalada antes de depender da configuração.
