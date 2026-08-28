---
title: TypeScript 7 aggiunge un ambito di ricerca per i simboli dell'area di lavoro
description: Il language service nativo aggiunge un'impostazione che può limitare la ricerca dei simboli dell'area di lavoro al progetto corrente.
lastUpdated: 2026-08-07
sidebar:
    order: 2
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-07'
---

**Pubblicato:** 7 agosto 2026

Microsoft ha integrato un ambito di ricerca dei simboli dell'area di lavoro per il language service nativo di TypeScript.

## Cosa è cambiato

La nuova preferenza `workspaceSymbols.scope` ha due valori. `allOpenProjects` è il valore predefinito e cerca i simboli in tutti i progetti aperti. `currentProject` limita la ricerca ai progetti che contengono il documento fornito.

L'estensione nativa per VS Code aggiunge ora un documento TypeScript o JavaScript supportato alle richieste `workspace/symbol`. Privilegia il documento attivo e, in caso contrario, usa un documento supportato aperto. Il language service usa quel documento solo quando `workspaceSymbols.scope` è `currentProject`; in caso contrario mantiene la ricerca in tutti i progetti aperti.

## Perché è importante

In un'area di lavoro che contiene più progetti con simboli dai nomi simili, `currentProject` può limitare i risultati al progetto pertinente. Il valore predefinito conserva il comportamento esistente, quindi la modifica è facoltativa.

## Disponibilità

La modifica è stata integrata nel codice nativo di TypeScript dopo TypeScript 7.0. La fonte non indica una versione npm stabile che la includa, quindi è necessario controllare le note di rilascio della versione installata prima di usare questa impostazione.
