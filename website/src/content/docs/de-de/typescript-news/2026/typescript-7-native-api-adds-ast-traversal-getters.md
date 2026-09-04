---
title: Die native API von TypeScript 7 erhält AST-Kind- und Token-Getter
description: Die native TypeScript-API ergänzt Node-Methoden zum Durchlaufen von Kindknoten und Tokens und schließt damit eine Lücke zur JavaScript-API für Syntaxbaum-Werkzeuge.
lastUpdated: 2026-09-03
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-03'
---

**Veröffentlicht:** 3. September 2026

Die native TypeScript-API stellt jetzt fünf `Node`-Hilfsmethoden zum Durchlaufen von Kindknoten und Tokens bereit: `getChildren()`, `getChildCount()`, `getChildAt()`, `getFirstToken()` und `getLastToken()`.

## Was sich geändert hat

PR #63893 fügt die verbleibenden Getter für Kindknoten und Tokens hinzu, die in der JavaScript-basierten TypeScript-API bereits vorhanden sind. Damit wird dieser Teil der nativen `Node`-API ergänzt, nachdem Positions- und Text-Getter bereits hinzugefügt worden waren.

## Warum das wichtig ist

Diese Methoden sind für API-Nutzer hilfreich, die den Syntaxbaum durchlaufen, einschließlich Werkzeugen, die sowohl Tokens als auch Kindknoten untersuchen müssen. Die native API kann dafür nun dieselben `Node`-Hilfsmethoden verwenden.

## Quelle

Siehe [PR #63893: API: add getChildren and token getters to Node](https://github.com/microsoft/TypeScript/pull/63893) und das [Tracking-Issue](https://github.com/microsoft/TypeScript/issues/63892).
