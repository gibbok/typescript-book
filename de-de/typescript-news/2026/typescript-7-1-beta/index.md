# TypeScript 7.1 Beta bringt modulare APIs und ES2026-Unterstützung


**Veröffentlicht:** 20. Oktober 2026

Microsoft hat TypeScript 7.1 Beta mit neuen nativen Compiler-APIs und Unterstützung für JavaScript-Funktionen veröffentlicht. Die Beta lässt sich so testen:

```shell
npm install -D typescript@beta
```

## Was ist neu?

* `--target es2026` und `--lib es2026` werden jetzt als stabile Optionen unterstützt, einschließlich aktualisierter Standardbibliotheksdeklarationen.
* Neue API-Einstiegspunkte sind `typescript/sync`, `typescript/async`, `typescript/fs` und `typescript/ast`. `API`- und `Program`-Objekte müssen freigegeben werden, beispielsweise mit `using`.
* Source-Phase-Imports (`import source` und `import.source()`) unterstützen Modulquellobjekte, unter anderem für WebAssembly, mit passenden Einstellungen für `--module` und `esnext`.
* Content-Mapper machen eingebettetes TypeScript in Dateien wie `.vue` und `.svelte` zugänglich. Für die Ausführung über die Kommandozeile ist `--runExternalCode` erforderlich.
* Microsofts veröffentlichte Benchmarks zeigen schnellere Builds und geringeren Speicherverbrauch als bei TypeScript 7.0.

## Verfügbarkeit

Dies ist eine Beta, keine stabile Version. Prüfen Sie vor dem Upgrade die Kompatibilität von Frameworks und Tools. Importattribute in Ambient-Modulen wurden bereits in einer separaten Meldung behandelt.

## Quelle

Offizielle Ankündigung lesen: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
