# Nativní API TypeScriptu 7 přidává metody pro generování výstupu


**Zveřejněno:** 24. července 2026

Do nativního kódu TypeScriptu byla přidána programová API pro generování výstupu určená nástrojům, které potřebují generovat JavaScript nebo deklarace.

## Co se změnilo

Sloučené API poskytuje čtyři způsoby generování výstupu s odlišným chováním při výstupu a výběru souborů.

* `program.emit(emitOnly?: EmitOnly)` generuje výstup celého programu do souborového systému, včetně nakonfigurovaného virtuálního souborového systému, a respektuje volby blokující generování výstupu, jako jsou `noEmit` a `noEmitOnError`.
* `program.emitToString(emitOnly?: EmitOnly)` generuje výstup celého programu jako řetězce v paměti a také respektuje volby blokující generování výstupu.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` vrací výstup JavaScriptu pro vybrané soubory v paměti a obchází volby blokující generování výstupu.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` poskytuje odpovídající výstup deklarací pro vybrané soubory.

Uživatelé API tak mají samostatné možnosti pro běžné generování výstupu celého programu a cílené generování výstupu v paměti.

## Dostupnost

Změna byla sloučena do nativního kódu TypeScriptu 24. července 2026. Zdroj neuvádí stabilní verzi npm obsahující tato API, proto by nástroje měly ověřit jejich podporu v používané verzi TypeScriptu.

## Zdroj

Přečtěte si oficiální pull request: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
