# Die native API von TypeScript 7 erhält Emit-Methoden


**Veröffentlicht:** 24. Juli 2026

Die native TypeScript-Codebasis wurde um programmatische Emit-APIs für Tools erweitert, die JavaScript- oder Deklarationsausgaben erzeugen müssen.

## Was sich geändert hat

Die zusammengeführte API bietet vier Emit-Wege mit unterschiedlichem Ausgabe- und Auswahlverhalten.

* `program.emit(emitOnly?: EmitOnly)` gibt das gesamte Programm in das Dateisystem aus, einschließlich eines konfigurierten virtuellen Dateisystems, und berücksichtigt Optionen wie `noEmit` und `noEmitOnError`, die die Ausgabe verhindern.
* `program.emitToString(emitOnly?: EmitOnly)` gibt das gesamte Programm als String-Ergebnisse im Arbeitsspeicher aus und berücksichtigt ebenfalls Optionen, die die Ausgabe verhindern.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` gibt die JavaScript-Ausgabe für ausgewählte Dateien im Arbeitsspeicher zurück und umgeht Optionen, die die Ausgabe verhindern.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` stellt die entsprechende Deklarationsausgabe für ausgewählte Dateien bereit.

Damit stehen API-Nutzern getrennte Möglichkeiten für die reguläre Ausgabe des gesamten Programms und für eine gezielte Ausgabe im Arbeitsspeicher zur Verfügung.

## Verfügbarkeit

Die Änderung wurde am 24. Juli 2026 in die native TypeScript-Codebasis übernommen. Die Quelle nennt keine stabile npm-Version, in der diese APIs enthalten sind. Tools sollten daher prüfen, ob die verwendete TypeScript-Version sie unterstützt.

## Quelle

Lesen Sie den offiziellen Pull-Request: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
