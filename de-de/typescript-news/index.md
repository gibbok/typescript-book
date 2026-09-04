# TypeScript-Neuigkeiten


Verfolgen Sie wichtige TypeScript-Releases und Projektaktualisierungen anhand kompakter Zusammenfassungen, die auf offiziellen TypeScript-Quellen basieren.

## Neueste Nachrichten

### [TypeScript 7.1 fügt Importattribute zu Ambient-Modulen hinzu](./2026/typescript-7-1-import-attributes-ambient-modules/)

**Veröffentlicht:** 1. September 2026

Pattern-Ambient-Module können nun Typen für Importattribute deklarieren, sodass TypeScript Typen anhand der Attribute eines Imports auswählen kann.

### [TypeScript 7 korrigiert die Setter-Zugänglichkeit bei Union- und Intersection-Typen](./2026/typescript-7-fixes-setter-accessibility/)

**Veröffentlicht:** 24. August 2026

Der native Type-Checker berücksichtigt nun bei Eigenschaften von Union- und Intersection-Typen die Zugänglichkeit des Setters getrennt von der Zugänglichkeit des Getters.

### [TypeScript 7 fügt einen Suchbereich für Workspace-Symbole hinzu](./2026/typescript-7-workspace-symbol-search-scope/)

**Veröffentlicht:** 7. August 2026

Der native Language Service bietet eine Einstellung, mit der sich die Suche nach Workspace-Symbolen auf das aktuelle Projekt statt auf alle geöffneten Projekte beschränken lässt.

### [TypeScript 7 verbessert die Speichernutzung von „Go to Implementation“](./2026/typescript-7-go-to-implementation-memory-fix/)

**Veröffentlicht:** 30. Juli 2026

Der native Language Service vermeidet nun quadratisches Speicherwachstum, wenn in großen Projekten mit tief verschachtelten Typen viele Implementierungen gesucht werden.

### [TypeScript 7 aktualisiert Konfigurationsdiagnosen nach Dateiänderungen](./2026/typescript-7-refreshes-config-diagnostics/)

**Veröffentlicht:** 30. Juli 2026

Der native Language Service veröffentlicht Fehler in `tsconfig.json` und `jsconfig.json` nun erneut, nachdem sich überwachte Konfigurationsdateien geändert haben.

### [Die nativen Tools von TypeScript 7 werden zusammengeführt](./2026/typescript-7-native-tooling-consolidates/)

**Veröffentlicht:** 27. Juli 2026

Die Maintainer stellten klar, dass der Name `tsgo` verschwindet, die native Codebasis in das TypeScript-Hauptrepository zurückkehrt und die native VS-Code-Erweiterung gebündelt wird.

### [Die native API von TypeScript 7 erhält Emit-Methoden](./2026/typescript-7-native-api-adds-emit-methods/)

**Veröffentlicht:** 24. Juli 2026

Die native TypeScript-API erhält Methoden für die Ausgabe in das Dateisystem und in den Arbeitsspeicher, sowohl für ganze Programme als auch für ausgewählte JavaScript- oder Deklarationsausgaben.

### [TypeScript 7.0 ist jetzt verfügbar](./2026/typescript-7-released/)

**Veröffentlicht:** 8. Juli 2026

TypeScript 7 führt den neuen, Go-basierten Compiler und Language Service ein und beschleunigt damit Builds und Editoroperationen erheblich.

### [Release Candidate von TypeScript 7.0 angekündigt](./2026/typescript-7-release-candidate/)

**Veröffentlicht:** 18. Juni 2026

Das TypeScript-Team hat die letzte Vorschauversion von TypeScript 7 veröffentlicht, die parallele Typprüfung, Projekt-Builds und erweiterte Editorunterstützung umfasst.
