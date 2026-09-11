---
title: Die native TypeScript-API erhält geschichtete virtuelle Dateisysteme
description: Die native TypeScript-API kann Snapshots mit speicherinternen oder geschichteten virtuellen Dateisystemen aktualisieren, einschließlich Hinzufügen, Ändern, Entfernen und Fallback auf den Host.
lastUpdated: 2026-09-09
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-09'
---

**Veröffentlicht:** 9. September 2026

Die native TypeScript-API kann Snapshots nun mit expliziten Daten eines virtuellen Dateisystems erstellen und aktualisieren. Werkzeuge können damit hinzugefügte, geänderte und entfernte Dateien abbilden, ohne die gesamte Dateisystemeingabe neu aufzubauen.

## Was sich geändert hat

Die neuen Hilfsfunktionen `createFileSystem`, `createFileSystemWithLib` und `createFileSystemLayer` erzeugen VFS-Objekte, die von den Snapshot-APIs akzeptiert werden. `Snapshot.update` kann eine neue Cache-Schicht auf einen vorhandenen Snapshot anwenden.

Ein `full`-VFS bleibt vollständig im Speicher und fällt nicht auf Dateisystem-Callbacks des Hosts oder der Sitzung zurück. Ein `layer`-VFS greift bei Cache-Misses auf den Host zurück und kann mit `removedPaths` Dateien oder Verzeichnisse ausblenden, die auf dem Host vorhanden sind. Beide Formen unterstützen symbolische Links innerhalb des virtuellen Dateisystems und zu Host-Pfaden.

## Aktuelle Einschränkung

VFS-gestützte Snapshots zählen weiterhin als echte Snapshots. Daher behält die native API die aktuelle Einschränkung auf jeweils einen echten Snapshot bei, und Snapshot-Operationen bleiben vorerst seriell.

## Quelle

Lies den zusammengeführten TypeScript-Pull-Request: [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
