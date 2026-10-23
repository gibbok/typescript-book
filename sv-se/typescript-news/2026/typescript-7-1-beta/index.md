# TypeScript 7.1 Beta introducerar modulära API:er och stöd för ES2026


**Publicerad:** 20 oktober 2026

Microsoft har släppt TypeScript 7.1 Beta med nya inbyggda kompilator-API:er och stöd för JavaScript-funktioner. Prova betaversionen med:

```shell
npm install -D typescript@beta
```

## Vad har ändrats?

* `--target es2026` och `--lib es2026` stöds nu som stabila alternativ, med uppdaterade standardbiblioteksdeklarationer.
* Nya API-ingångar omfattar `typescript/sync`, `typescript/async`, `typescript/fs` och `typescript/ast`. Objekten `API` och `Program` måste frigöras, exempelvis med `using`.
* Källfasimporter (`import source` och `import.source()`) stöder modulkällobjekt, bland annat för WebAssembly, med lämpliga inställningar för `--module` och `esnext`.
* Innehållsmappare kan exponera inbäddad TypeScript i filer som `.vue` och `.svelte`. Körning via kommandoraden kräver `--runExternalCode`.
* Microsofts publicerade benchmarktester visar snabbare byggen och lägre minnesanvändning än TypeScript 7.0.

## Tillgänglighet

Detta är en betaversion, inte en stabil utgåva. Kontrollera kompatibiliteten för ramverk och verktyg innan du uppgraderar. Importattribut i ambient-moduler har behandlats i en separat nyhet.

## Källa

Läs det officiella tillkännagivandet: [Announcing TypeScript 7.1 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-7-1-beta/).
