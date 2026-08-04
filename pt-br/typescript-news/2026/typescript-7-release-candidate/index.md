# Release candidate do TypeScript 7.0 anunciada


**Publicado:** 18 de junho de 2026

A Microsoft lançou a release candidate do TypeScript 7.0 como a prévia final antes da versão estável do TypeScript 7.

## O que mudou

A release candidate migrou o TypeScript para o novo compilador e serviço de linguagem baseados em Go. Sua lógica de verificação de tipos foi portada do TypeScript 6 para preservar a semântica existente, melhorando o desempenho com código nativo e paralelismo por memória compartilhada.

O TypeScript 7 adicionou verificação de tipos paralela e builds com referências de projeto. A opção `--checkers` controla o número de processos de verificação de tipos, enquanto `--builders` controla o número de processos de build das referências de projeto.

Na época do anúncio, a release candidate podia ser instalada pelo npm:

```shell
npm install --save-dev typescript@rc
```

## Compatibilidade

A release candidate não incluía uma API programática estável. A equipe do TypeScript forneceu o pacote de compatibilidade `@typescript/typescript6` para que ferramentas que exigem a API do TypeScript 6 pudessem ser executadas junto com o novo compilador.

A release candidate também adotou as configurações padrão do TypeScript 6 e passou a tratar como erros as opções descontinuadas no TypeScript 6. A recomendação para as equipes foi migrar primeiro para o TypeScript 6 antes de avaliar o TypeScript 7.

## Fonte

Leia o anúncio oficial: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
