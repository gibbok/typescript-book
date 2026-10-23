# Nativer TypeScript-Compiler senkt Speicherverbrauch durch Optimierungen im Typprüfer


**Veröffentlicht:** 14. Oktober 2026

Microsoft hat mehrere Speicheroptimierungen in den nativen TypeScript-Compiler übernommen. Sie reduzieren den von internen Datenstrukturen des Typprüfers gehaltenen Speicher, ohne die TypeScript-Syntax zu ändern.

## Was sich geändert hat

* Chunks typisierter Arenen zielen jetzt auf etwa 512 Byte statt auf eine feste Anzahl von 256 Objekten. Im VS-Code-Benchmark dieser Änderung sanken der belegte Heap-Speicher um 8.54% und die Garbage-Collector-Scanarbeit um 10.44%, während die Anzahl der Allokationsereignisse um 13.91% stieg.
* Optionale Signaturen, Indexinformationen und Node-Builder-Caches werden aus `StructuredType`-Datensätzen ausgelagert, deren Größe von 144 auf 88 Byte sinkt.
* Aufgelöste Typknoten und Signaturen verwenden seitenweise organisierte Node-Link-Speicher, wenn stabile Knoten-IDs vorhanden sind; für andere IDs bleibt eine Map als Fallback.

## Verfügbarkeit

Die Änderungen wurden am 14. Oktober 2026 zusammengeführt. Die Quell-PRs nennen keine stabile npm-Version, die sie enthält. Die Benchmarkwerte gelten für die jeweils gemessene Änderung und Arbeitslast.

## Quelle

* [Bound arena retention by bytes instead of object count](https://github.com/microsoft/TypeScript/pull/64802)
* [Move optional structured type shape into cold storage](https://github.com/microsoft/TypeScript/pull/64800)
* [Use paged indexes for type-node and signature caches](https://github.com/microsoft/TypeScript/pull/64803)
