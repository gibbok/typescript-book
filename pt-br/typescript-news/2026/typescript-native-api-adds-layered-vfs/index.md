# API nativa do TypeScript adiciona sistemas de arquivos virtuais em camadas


**Publicado:** 9 de setembro de 2026

A API nativa do TypeScript agora pode criar e atualizar snapshots com dados explícitos de sistema de arquivos virtual. Isso permite que ferramentas representem adições, edições e remoções de arquivos sem reconstruir toda a entrada do sistema de arquivos.

## O que mudou

Os novos helpers `createFileSystem`, `createFileSystemWithLib` e `createFileSystemLayer` criam objetos VFS aceitos pelas APIs de snapshot. `Snapshot.update` pode aplicar uma nova camada de cache sobre um snapshot existente.

Um VFS `full` permanece totalmente em memória e não recorre aos callbacks do sistema de arquivos do host ou da sessão. Um VFS `layer` recorre ao host em falhas de cache e pode usar `removedPaths` para ocultar arquivos ou diretórios existentes no host. As duas formas oferecem suporte a links simbólicos dentro do sistema de arquivos virtual e para caminhos do host.

## Limitação atual

Snapshots baseados em VFS ainda contam como snapshots reais, portanto a API nativa mantém a restrição atual de apenas um snapshot real por vez. Assim, as operações de snapshot continuam seriais por enquanto.

## Fonte

Leia a pull request mesclada do TypeScript: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
