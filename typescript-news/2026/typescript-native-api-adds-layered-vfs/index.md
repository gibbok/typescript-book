# TypeScript native API adds layered virtual file systems


**Published:** September 9, 2026

The native TypeScript API can now build and update snapshots with explicit virtual file system data. This lets tools model file additions, edits, and removals without rebuilding the entire file system input.

## What changed

New helpers `createFileSystem`, `createFileSystemWithLib`, and `createFileSystemLayer` create VFS objects accepted by the snapshot APIs. `Snapshot.update` can apply a new cache layer over an existing snapshot.

A `full` VFS stays entirely in memory and does not fall back to host or session file system callbacks. A `layer` VFS falls back on cache misses and can use `removedPaths` to hide files or directories that exist on the host. Both forms support symlinks within the virtual file system and to host paths.

## Current limitation

VFS-backed snapshots still count as real snapshots, so the native API keeps its current restriction of one real snapshot at a time. Snapshot operations therefore remain serial for now.

## Source

Read the merged TypeScript pull request: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
