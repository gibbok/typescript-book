---
title: Annunciata la release candidate di TypeScript 7.0
description: La release candidate di TypeScript 7.0 ha presentato in anteprima il compilatore nativo, le build parallele, le modifiche alla compatibilità e il supporto esteso per gli editor.
lastUpdated: 2026-06-18
sidebar:
    order: 5
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**Pubblicato:** 18 giugno 2026

Microsoft ha pubblicato la release candidate di TypeScript 7.0 come anteprima finale prima della versione stabile di TypeScript 7.

## Cosa è cambiato

La release candidate ha trasferito TypeScript al nuovo compilatore e language service basati su Go. La logica del controllo dei tipi è stata portata da TypeScript 6 per preservare la semantica esistente, migliorando al tempo stesso le prestazioni grazie al codice nativo e al parallelismo con memoria condivisa.

TypeScript 7 ha aggiunto il controllo dei tipi parallelo e le build con riferimenti ai progetti. L'opzione `--checkers` controlla il numero di processi per il controllo dei tipi, mentre `--builders` controlla il numero di processi di build per i riferimenti ai progetti.

Al momento dell'annuncio, la release candidate poteva essere installata da npm:

```shell
npm install --save-dev typescript@rc
```

## Compatibilità

La release candidate non includeva un'API programmatica stabile. Il team di TypeScript ha fornito il pacchetto di compatibilità `@typescript/typescript6`, per consentire agli strumenti che richiedono l'API di TypeScript 6 di funzionare insieme al nuovo compilatore.

La release candidate ha inoltre adottato le impostazioni predefinite di TypeScript 6 e ha considerato errori le opzioni deprecate in TypeScript 6. Ai team è stato consigliato di migrare prima a TypeScript 6 e solo in seguito valutare TypeScript 7.

## Fonte

Leggi l'annuncio ufficiale: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
