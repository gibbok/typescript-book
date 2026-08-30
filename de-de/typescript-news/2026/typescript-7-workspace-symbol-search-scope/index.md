# TypeScript 7 fügt einen Suchbereich für Workspace-Symbole hinzu


**Veröffentlicht:** 7. August 2026

Microsoft hat einen Suchbereich für Workspace-Symbole in den nativen Language Service von TypeScript übernommen.

## Was sich geändert hat

Die neue Einstellung `workspaceSymbols.scope` hat zwei Werte. `allOpenProjects` ist der Standardwert und sucht nach Symbolen in allen geöffneten Projekten. `currentProject` beschränkt die Suche auf Projekte, die das angegebene Dokument enthalten.

Die native VS-Code-Erweiterung fügt Anfragen an `workspace/symbol` nun ein unterstütztes TypeScript- oder JavaScript-Dokument hinzu. Dabei wird das aktive Dokument bevorzugt und andernfalls ein geöffnetes unterstütztes Dokument verwendet. Der Language Service verwendet dieses Dokument nur, wenn `workspaceSymbols.scope` auf `currentProject` gesetzt ist. Andernfalls bleibt die Suche über alle geöffneten Projekte bestehen.

## Warum das wichtig ist

In einem Workspace mit mehreren Projekten, die ähnlich benannte Symbole enthalten, kann `currentProject` die Ergebnismenge auf das relevante Projekt beschränken. Der Standardwert behält das bisherige Verhalten bei, sodass die Änderung nur nach ausdrücklicher Aktivierung wirksam wird.

## Verfügbarkeit

Die Änderung wurde nach TypeScript 7.0 in die native TypeScript-Codebasis übernommen. Die Quelle nennt keine stabile npm-Version, in der sie enthalten ist. Prüfen Sie daher die Versionshinweise der installierten Version, bevor Sie sich auf diese Einstellung verlassen.
