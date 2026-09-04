# TypeScript 7.1 aggiunge gli attributi di import ai moduli ambient


**Pubblicato:** 1 settembre 2026

Il compilatore nativo di TypeScript ora supporta tipi per gli attributi di import nelle dichiarazioni di moduli ambient con pattern. Le dichiarazioni possono così distinguere import con attributi come `type: 'css'` o `type: 'text'`.

## Cosa è cambiato

Quando un import contiene attributi, TypeScript può risolverlo verso un modulo ambient con pattern corrispondente. La corrispondenza usa l'assegnabilità e, se più dichiarazioni coincidono, TypeScript sceglie quella con il tipo di attributi più specifico.

Per ora, i tipi degli attributi in queste dichiarazioni sono limitati a proprietà normali con valori di tipo stringa letterale. Le dichiarazioni con lo stesso pattern e tipi di attributi identici possono essere unite; quelle con tipi diversi restano separate.

## Compatibilità

La modifica è stata integrata nel milestone TypeScript 7.1.0 Beta. Non aggiunge dichiarazioni integrate per import CSS o di testo alla libreria standard, quindi progetti e strumenti devono ancora definire i moduli ambient necessari.

## Fonte

Leggi la pull request TypeScript integrata: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
