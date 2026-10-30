# Nativer TypeScript-Compiler erhält experimentelle WebAssembly-Unterstützung


**Veröffentlicht:** 2026-10-29

Microsoft hat am 29. Oktober 2026 experimentelle Unterstützung für `wasip1/wasm` in den nativen TypeScript-Compiler integriert. Damit lässt sich der Compiler in WASI-Umgebungen ausführen; außerdem gibt es einen JavaScript-API-Transport für den Browser.

## Was sich geändert hat

* Dieselbe Datei `tsc.wasm` kann als WASI-Befehl für CLI oder Sprachserver oder als Reactor für synchrone und asynchrone JavaScript-API-Aufrufe verwendet werden.
* Das neue Artefaktpaket `@typescript/typescript-wasip1-wasm` enthält den WebAssembly-Compiler und Bibliotheksdateien. Der Host `typescript/wasm` bietet `instantiateWasm` und `instantiateWasmSync`; beide Pakete müssen exakt dieselbe Version verwenden.
* Die Erweiterung VS Code for Web erhält einen Einstiegspunkt, der `tsc.wasm --lsp` ausführt. Die Änderung umfasst API-Tests unter Node.js und Smoke-Tests im Chromium-Browser.

## Verfügbarkeit

Dies ist eine zusammengeführte experimentelle Änderung, keine Ankündigung einer stabilen WebAssembly-Version. Binärdatei, Paketstruktur und Host `typescript/wasm` können sich ohne Vorankündigung ändern.

## Quelle

[Zusammengeführten TypeScript-Pull-Request lesen](https://github.com/microsoft/TypeScript/pull/64174).
