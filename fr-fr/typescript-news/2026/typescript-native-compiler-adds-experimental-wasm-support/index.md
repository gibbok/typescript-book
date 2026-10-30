# Le compilateur natif TypeScript ajoute un support expérimental de WebAssembly


**Publié le:** 2026-10-29

Le 29 octobre 2026, Microsoft a fusionné la prise en charge expérimentale de `wasip1/wasm` dans le compilateur natif TypeScript. Cette modification permet son exécution dans des environnements WASI et ajoute un transport pour l'API JavaScript utilisable dans le navigateur.

## Ce qui change

* Le même `tsc.wasm` peut fonctionner comme commande WASI pour la CLI ou le serveur de langage, ou comme reactor pour les appels synchrones et asynchrones à l'API JavaScript.
* Le nouveau paquet d'artefacts `@typescript/typescript-wasip1-wasm` contient le compilateur WebAssembly et les fichiers de bibliothèque. L'hôte `typescript/wasm` fournit `instantiateWasm` et `instantiateWasmSync` ; les deux paquets doivent utiliser exactement la même version.
* L'extension VS Code for Web dispose d'un point d'entrée qui exécute `tsc.wasm --lsp`. La modification inclut des tests d'API sous Node.js et des tests de fumée dans Chromium.

## Disponibilité

Il s'agit d'une modification expérimentale fusionnée, et non de l'annonce d'une version WebAssembly stable. Le binaire, la structure du paquet et l'hôte `typescript/wasm` peuvent changer sans préavis.

## Source

[Lire la pull request TypeScript fusionnée](https://github.com/microsoft/TypeScript/pull/64174).
