# TypeScript 7 aktualisiert Konfigurationsdiagnosen nach Dateiänderungen


**Veröffentlicht:** 30. Juli 2026

Microsoft hat eine Korrektur zusammengeführt, durch die der native Language Service von TypeScript die Diagnosen für Konfigurationsdateien aktualisiert, nachdem sich eine überwachte Datei `tsconfig.json` oder `jsconfig.json` geändert hat.

## Was sich geändert hat

Diagnosen für Konfigurationsdateien werden während einer Snapshot-Aktualisierung des Language Service veröffentlicht. Zuvor plante eine Änderung an einer überwachten Konfigurationsdatei zwar eine Aktualisierung der Diagnosen, aber keine Snapshot-Aktualisierung. Neue Konfigurationsfehler konnten daher veraltet bleiben, bis eine weitere Editoranfrage den Snapshot aktualisierte.

Der Language Service erkennt nun Änderungen an überwachten Konfigurationsdateien und plant per Debouncing eine verzögerte Snapshot-Aktualisierung. Dadurch werden übermittelte Diagnosen erneut veröffentlicht, ohne dass eine Folgeanfrage des Editors erforderlich ist.

## Warum das wichtig ist

Wenn ein Editor oder ein externes Tool eine überwachte Datei `tsconfig.json` oder `jsconfig.json` ändert, kann der native Language Service die aktualisierten Konfigurationsfehler allein aufgrund des Ereignisses der Dateiüberwachung melden. Ein Regressionstest verifiziert dieses Verhalten mit einem ungültigen Wert für `target`.

## Verfügbarkeit

Die Änderung wurde nach der Veröffentlichung von TypeScript 7.0 in die native TypeScript-Codebasis übernommen. Die Quelle nennt keine stabile npm-Version, in der sie enthalten ist. Prüfen Sie daher die Versionshinweise der installierten Version, bevor Sie sich auf die Korrektur verlassen.

## Quelle

Lesen Sie die offizielle Änderung: [Refresh tsconfig/jsconfig diagnostics without relying on the client to re-pull](https://github.com/microsoft/typescript-go/pull/4799).
