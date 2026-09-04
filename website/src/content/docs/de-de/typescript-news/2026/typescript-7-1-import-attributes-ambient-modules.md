---
title: TypeScript 7.1 fügt Importattribute zu Ambient-Modulen hinzu
description: TypeScript 7.1 kann Pattern-Ambient-Moduldeklarationen anhand von Importattributen zuordnen.
lastUpdated: 2026-09-01
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-09-01'
---

**Veröffentlicht:** 1. September 2026

Der native TypeScript-Compiler unterstützt jetzt Typen für Importattribute in Pattern-Ambient-Moduldeklarationen. Dadurch können Deklarationen Imports anhand von Attributen wie `type: 'css'` oder `type: 'text'` unterscheiden.

## Was sich geändert hat

Wenn ein Import Attribute enthält, kann TypeScript ihn gegen ein passendes Pattern-Ambient-Modul auflösen. Die Zuordnung basiert auf Zuweisbarkeit; passen mehrere Deklarationen, wählt TypeScript die mit dem spezifischsten Attributtyp.

Vorerst sind Attributtypen in diesen Deklarationen auf normale Eigenschaften beschränkt, deren Werte String-Literaltypen sind. Deklarationen mit demselben Pattern und identischen Attributtypen können zusammengeführt werden; unterschiedliche Attributtypen bleiben getrennt.

## Kompatibilität

Die Änderung wurde für den Meilenstein TypeScript 7.1.0 Beta zusammengeführt. Sie fügt der Standardbibliothek keine integrierten CSS- oder Text-Importdeklarationen hinzu; Projekte und Tools müssen die benötigten Ambient-Module weiterhin selbst definieren.

## Quelle

Lesen Sie den zusammengeführten TypeScript-Pull-Request: [Support import attributes on ambient modules](https://github.com/microsoft/TypeScript/pull/63931).
