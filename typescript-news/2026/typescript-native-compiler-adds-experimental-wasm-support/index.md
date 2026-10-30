# TypeScript native compiler adds experimental WebAssembly support


**Published:** 2026-10-29

Microsoft merged experimental `wasip1/wasm` support for the native TypeScript compiler on October 29, 2026. The change makes the compiler usable in WASI hosts and introduces a browser-capable JavaScript API transport.

## What changed

* The same `tsc.wasm` can run as a WASI command for the CLI or language server, or as a reactor for synchronous and asynchronous JavaScript API calls.
* A new artifact package, `@typescript/typescript-wasip1-wasm`, contains the WebAssembly compiler and library files. The `typescript/wasm` host provides `instantiateWasm` and `instantiateWasmSync`; both packages must use the same exact version.
* The VS Code for Web extension gains an entry point that runs `tsc.wasm --lsp`. The change includes Node.js API tests and Chromium browser smoke tests.

## Availability

This is an experimental merged change, not an announcement of a stable WebAssembly release. The binary, package layout, and `typescript/wasm` host may change without notice.

## Source

[Read the merged TypeScript pull request](https://github.com/microsoft/TypeScript/pull/64174).
