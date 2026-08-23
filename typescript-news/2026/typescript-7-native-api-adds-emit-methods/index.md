# TypeScript 7 native API adds emit methods


**Published:** July 24, 2026

The native TypeScript codebase has added programmatic emit APIs for tools that need to generate JavaScript or declaration output.

## What changed

The merged API provides four emit paths with different output and selection behavior.

* `program.emit(emitOnly?: EmitOnly)` emits the whole program to the file system, including a configured virtual file system, and respects emit-blocking options such as `noEmit` and `noEmitOnError`.
* `program.emitToString(emitOnly?: EmitOnly)` emits the whole program to in-memory string results and also respects emit-blocking options.
* `program.getJavaScriptEmit(files?: readonly DocumentIdentifier[])` returns in-memory JavaScript output for selected files and bypasses emit-blocking options.
* `program.getDeclarationEmit(files?: readonly DocumentIdentifier[])` provides the corresponding selected-file declaration output.

This gives API consumers separate choices for normal whole-program emit and targeted in-memory output.

## Availability

The change was merged into the native TypeScript codebase on July 24, 2026. The source does not identify a stable npm version containing these APIs, so tools should verify support in the TypeScript version they use.

## Source

Read the official pull request: [API emit](https://github.com/microsoft/typescript-go/pull/4699).
