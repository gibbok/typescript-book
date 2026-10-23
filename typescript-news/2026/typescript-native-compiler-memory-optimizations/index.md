# TypeScript native compiler reduces memory use with checker optimizations


**Published:** October 14, 2026

Microsoft merged several memory optimizations into TypeScript's native compiler. They reduce memory retained by internal type-checker data structures without changing TypeScript syntax.

## What changed

* Typed arena chunks now target about 512 bytes instead of a fixed 256 objects. In the change's VS Code benchmark, retained heap fell 8.54% and garbage-collector scanning fell 10.44%, while allocation events rose 13.91%.
* Optional signatures, index information, and node-builder caches move out of `StructuredType` records, reducing their size from 144 to 88 bytes.
* Resolved type nodes and signatures use paged node-link stores when stable node IDs are available, with a map fallback for other IDs.

## Availability

These changes merged on October 14, 2026. The source pull requests do not identify a stable npm version containing them. The benchmark results are specific to the measured change and workload.

## Source

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
