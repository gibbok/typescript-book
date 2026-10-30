# Nativní kompilátor TypeScript přidává experimentální podporu WebAssembly


**Publikováno:** 2026-10-29

Microsoft 29. října 2026 sloučil experimentální podporu `wasip1/wasm` do nativního kompilátoru TypeScriptu. Změna umožňuje spouštět kompilátor v prostředí WASI a přidává transport pro JavaScript API použitelný v prohlížeči.

## Co se změnilo

* Stejný `tsc.wasm` může fungovat jako příkaz WASI pro CLI nebo jazykový server, případně jako reactor pro synchronní a asynchronní volání JavaScript API.
* Nový balíček artefaktů `@typescript/typescript-wasip1-wasm` obsahuje kompilátor WebAssembly a soubory knihoven. Hostitel `typescript/wasm` poskytuje `instantiateWasm` a `instantiateWasmSync`; oba balíčky musí mít přesně stejnou verzi.
* Rozšíření VS Code for Web získává vstupní bod spouštějící `tsc.wasm --lsp`. Změna zahrnuje testy API v Node.js a základní testy v prohlížeči Chromium.

## Dostupnost

Jde o sloučenou experimentální změnu, nikoli o oznámení stabilního vydání WebAssembly. Binární soubor, struktura balíčku i hostitel `typescript/wasm` se mohou bez upozornění změnit.

## Zdroj

[Přečíst sloučený pull request TypeScriptu](https://github.com/microsoft/TypeScript/pull/64174).
