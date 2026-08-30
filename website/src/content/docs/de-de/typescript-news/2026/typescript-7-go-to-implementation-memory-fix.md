---
title: TypeScript 7 verbessert die Speichernutzung von „Go to Implementation“
description: Eine Korrektur im nativen Language Service verhindert quadratisches Speicherwachstum bei der Suche nach Implementierungen in großen Projekten mit tief verschachtelten Typen.
lastUpdated: 2026-07-30
sidebar:
    order: 3
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-07-30'
---

**Veröffentlicht:** 30. Juli 2026

Microsoft hat eine Korrektur an der Speicherskalierung von „Go to Implementation“ im nativen Language Service von TypeScript zusammengeführt.

## Was sich geändert hat

Der Language Service verwendet eine Breitensuche mit einer Arbeitsliste, um Implementierungen zu finden. Bei einem Interface-Member mit vielen Implementierungen konnten wiederholte projektweite Suchen dieselben Referenzen erneut zurückgeben. Beibehaltene Referenzen, eingereihte Aufgaben und Ergebnisgruppen konnten daher quadratisch anwachsen und in großen Projekten mit tief verschachtelten Typen den verfügbaren Arbeitsspeicher erschöpfen.

Die Korrektur entfernt doppelte Referenzknoten, bevor sie der Arbeitswarteschlange hinzugefügt werden, und verhindert, dass doppelte Symboldefinitionen beibehalten werden. Ein Regressionstest prüft, dass eine Verdoppelung der Anzahl der Implementierungen zu einem annähernd linearen statt quadratischen Wachstum führt.

## Warum das wichtig ist

„Go to Implementation“ kann dieses Muster nun verarbeiten, ohne dieselben internen Referenzen wiederholt im Speicher zu behalten. Die endgültige Antwort an den Editor war bereits dedupliziert. Die Änderung betrifft daher den verborgenen Speicherbedarf und Arbeitsaufwand, die zum Erzeugen dieser Antwort erforderlich sind.

## Verfügbarkeit

Die Änderung wurde nach der Veröffentlichung von TypeScript 7.0 in die native TypeScript-Codebasis übernommen. Die Quelle nennt keine stabile npm-Version, in der die Korrektur enthalten ist. Benutzer sollten daher die Versionshinweise ihrer installierten Version prüfen, bevor sie sich darauf verlassen.

## Quelle

Lesen Sie die offizielle Änderung: [Fix O(K^2) OOM issue in go-to-implementation](https://github.com/microsoft/typescript-go/commit/0f29c771a2f417de99888084cdefcf60f63a5fe0).
