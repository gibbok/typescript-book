# TypeScript 7.0 ist jetzt verfügbar


**Veröffentlicht:** 8. Juli 2026

Microsoft hat TypeScript 7.0 veröffentlicht, die erste stabile Version, die auf der neuen nativen Go-Codebasis des Projekts aufbaut.

## Was sich geändert hat

TypeScript 7 verwendet nativen Code, Shared-Memory-Multithreading und weitere Optimierungen. Nach Angaben des TypeScript-Teams waren vollständige Builds in den veröffentlichten Benchmarks 7,7- bis 11,9-mal schneller als mit TypeScript 6.

Mit der Veröffentlichung wechselt auch der Language Service zum Language Server Protocol. Unterstützte Editoren können dieselbe native Grundlage nutzen, um Projekte schneller zu laden und Diagnosen, Vervollständigungen sowie Navigation zu beschleunigen.

Installieren Sie die stabile Version über npm:

```shell
npm install --save-dev typescript
```

## Kompatibilität

TypeScript 7.0 bietet keine stabile programmatische API. Tools, die TypeScript einbetten, darunter aktuelle Astro-, Vue-, MDX- und Svelte-Workflows sowie einige Angular-Workflows, benötigen möglicherweise weiterhin TypeScript 6, bis die neue API verfügbar ist.

Das TypeScript-Team rechnet damit, die neue API mit TypeScript 7.1 einzuführen. Projekte sollten vor dem Upgrade prüfen, ob ihre Frameworks und Tools TypeScript 7 unterstützen.

## Quelle

Lesen Sie die offizielle Ankündigung: [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/).
