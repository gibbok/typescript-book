---
title: "TypeScript beschleunigt inkrementelle Builds durch parallele Prüfungen"
description: "TypeScript prüft Signaturen abhängiger Dateien bei inkrementellen Builds jetzt parallel."
lastUpdated: 2026-11-03
sidebar:
    hidden: true
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-11-03'
---

Eine übernommene Compiler-Änderung parallelisiert die Signaturprüfung von Dateien, die von Änderungen an häufig importierten Modulen betroffen sind. Zuvor lief diese Phase sequenziell.

## Was sich ändert

Im Benchmark des Autors sank die Buildzeit nach einer reinen Kommentaränderung auf einem Linux-System mit 32 Kernen von **3,4 auf 1,5 Sekunden**. In einem n8n-Paket sank sie in einem ähnlichen Fall von **5,4 auf 4,5 Sekunden**. Das sind keine allgemeinen Leistungsversprechen.

## Leistung und Grenzen

Die Parallelität wird durch `GOMAXPROCS` begrenzt; der Nutzen hängt von verfügbaren Checkern und Abhängigkeiten ab. Für `isolatedModules` ergibt sich kein Vorteil, da referenzierende Dateien nicht durchlaufen werden.

## Quelle

* [Compute signatures of dependent files in parallel on incremental rebuilds](https://github.com/microsoft/TypeScript/pull/64659) (merged 2026-11-03).
