---
title: Release Candidate von TypeScript 7.0 angekündigt
description: Der Release Candidate von TypeScript 7.0 bot eine Vorschau auf den nativen Compiler, parallele Builds, Kompatibilitätsänderungen und erweiterte Editorunterstützung.
lastUpdated: 2026-06-18
sidebar:
    order: 9
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-06-18'
---

**Veröffentlicht:** 18. Juni 2026

Microsoft hat den Release Candidate von TypeScript 7.0 als letzte Vorschauversion vor der stabilen Veröffentlichung von TypeScript 7 herausgegeben.

## Was sich geändert hat

Mit dem Release Candidate wechselte TypeScript zu seinem neuen, Go-basierten Compiler und Language Service. Die Logik der Typprüfung wurde aus TypeScript 6 portiert, um die bestehende Semantik beizubehalten und gleichzeitig die Leistung durch nativen Code und Parallelisierung mit gemeinsamem Speicher zu verbessern.

TypeScript 7 fügte parallele Typprüfung und Builds mit Projektreferenzen hinzu. Die Option `--checkers` steuert die Anzahl der Worker für die Typprüfung, während `--builders` die Anzahl der Builder für Projektreferenzen steuert.

Zum Zeitpunkt der Ankündigung konnte der Release Candidate über npm installiert werden:

```shell
npm install --save-dev typescript@rc
```

## Kompatibilität

Der Release Candidate enthielt keine stabile programmatische API. Das TypeScript-Team stellte das Kompatibilitätspaket `@typescript/typescript6` bereit, damit Tools, die die API von TypeScript 6 benötigen, parallel zum neuen Compiler ausgeführt werden konnten.

Der Release Candidate übernahm außerdem die Standardwerte von TypeScript 6 und behandelte Optionen, die in TypeScript 6 als veraltet markiert wurden, als Fehler. Teams wurde empfohlen, zunächst zu TypeScript 6 zu migrieren, bevor sie TypeScript 7 evaluieren.

## Quelle

Lesen Sie die offizielle Ankündigung: [Announcing TypeScript 7.0 RC](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0-rc/).
