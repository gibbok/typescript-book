---
title: Native TypeScript-API ergänzt von typescript-eslint benötigte APIs
description: Die native TypeScript-API ergänzt Checker- und Typ-APIs, die typescript-eslint benötigt, und reduziert Kompatibilitätslücken.
lastUpdated: 2026-09-14
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-14'
---

**Veröffentlicht:** 14. September 2026

Die native TypeScript-API stellt jetzt zusätzliche Checker- und Typ-APIs bereit, die `typescript-eslint` benötigt. Dadurch werden Kompatibilitätslücken für Werkzeuge reduziert, die auf TypeScripts programmatische API angewiesen sind.

## Was sich geändert hat

Die Änderung ergänzt unter anderem `getAwaitedType`, `getContextualTypeForArgumentAtIndex`, `getIndexInfoOfType`, `getIndexTypeOfType`, `getTypeOfPropertyOfType` und `getExportSymbolOfSymbol`. Interface- und Klassentypen erhalten außerdem `getThisType()`, und `IndexKind` wird für Index-Typ-Abfragen exportiert.

Sowohl die synchrone als auch die asynchrone native API wurden aktualisiert.

## Warum das wichtig ist

Der TypeScript-Pull-Request wurde speziell erstellt, um APIs hinzuzufügen, die `typescript-eslint` als fehlend identifiziert hatte. Integrationen erhalten damit mehr Checker- und Typinformationen, die sie bereits von der etablierten TypeScript-API erwarten.

## Quelle

Lies den offiziellen TypeScript-Pull-Request: [Add missing APIs needed by typescript-eslint](https://github.com/microsoft/TypeScript/pull/64264).
