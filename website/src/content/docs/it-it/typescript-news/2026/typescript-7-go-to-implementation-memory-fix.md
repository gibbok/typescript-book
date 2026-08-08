---
title: TypeScript 7 migliora l'uso della memoria di Vai all'implementazione
description: Una correzione nel language service nativo evita una crescita quadratica della memoria durante la ricerca delle implementazioni in progetti grandi e con tipi complessi.
lastUpdated: 2026-07-30
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Pubblicato:** 30 luglio 2026

Microsoft ha integrato nel language service nativo di TypeScript una correzione relativa all'uso della memoria per Vai all'implementazione.

## Cosa è cambiato

Il language service utilizza una lista di lavoro con visita in ampiezza per trovare le implementazioni. Per un membro di un'interfaccia con molte implementazioni, ricerche ripetute nell'intero programma potevano restituire nuovamente gli stessi riferimenti. I riferimenti conservati, il lavoro in coda e i gruppi di risultati potevano quindi crescere in modo quadratico ed esaurire la memoria nei progetti grandi e con tipi complessi.

La correzione elimina i nodi di riferimento duplicati prima di aggiungerli alla coda di lavoro ed evita di conservare definizioni di simboli duplicate. Un test di regressione verifica che, raddoppiando il numero di implementazioni, la crescita sia approssimativamente lineare anziché quadratica.

## Perché è importante

Vai all'implementazione può ora elaborare questo schema senza conservare ripetutamente gli stessi riferimenti interni. La risposta finale dell'editor era già priva di duplicati, quindi la modifica riguarda la memoria e il lavoro nascosti necessari per produrla.

## Disponibilità

La modifica è stata integrata nel codice nativo di TypeScript dopo il rilascio di TypeScript 7.0. La fonte non indica una versione npm stabile che contenga la correzione, quindi è necessario controllare le note di rilascio della versione installata prima di farvi affidamento.

## Fonte

Leggi la modifica ufficiale: [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
