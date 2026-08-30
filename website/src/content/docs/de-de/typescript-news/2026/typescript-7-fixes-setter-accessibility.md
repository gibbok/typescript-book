---
title: TypeScript 7 korrigiert die Setter-Zugänglichkeit bei Union- und Intersection-Typen
description: Der native Type-Checker berücksichtigt nun bei Eigenschaften von Union- und Intersection-Typen die Zugänglichkeit des Setters getrennt von der Zugänglichkeit des Getters.
lastUpdated: 2026-08-24
sidebar:
    order: 1
head:
    - tag: meta
      attrs:
          property: article:published_time
          content: '2026-08-24'
---

**Veröffentlicht:** 24. August 2026

Microsoft hat eine Korrektur am nativen TypeScript-Type-Checker zusammengeführt, durch die bei Eigenschaften, die aus Union- und Intersection-Typen erzeugt werden, die Zugänglichkeit für Lese- und Schreibzugriffe getrennt bleibt.

## Was sich geändert hat

Zuvor konnte die Zugänglichkeit des Setters bei diesen synthetischen Eigenschaften ignoriert werden, da bei der Prüfung effektiv die Zugänglichkeit des Getters verwendet wurde. Ein öffentlicher Getter in Verbindung mit einem geschützten Setter konnte daher einen ungültigen Schreibzugriff über einen Union- oder Intersection-Typ zulassen.

<!-- skip -->
```typescript
declare class C1 {
    get foo(): number;
    protected set foo(value: number);
}

declare class C2 {
    get foo(): number;
    protected set foo(value: number);
}

declare const c: C1 | C2;
c.foo; // Valid: read access is public
c.foo = 123; // Invalid: write access is protected
```

Der Type-Checker erfasst die Zugänglichkeit für Schreibzugriffe nun separat. Das Lesen von `foo` bleibt gültig, während eine Zuweisung korrekterweise einen Zugriffsfehler meldet.

## Warum das wichtig ist

Klassen können Lesezugriffe bewusst öffentlich erlauben und Schreibzugriffe gleichzeitig einschränken. Die Korrektur erhält diese Grenze, wenn TypeScript Objekttypen zu Union- oder Intersection-Typen kombiniert, statt den Schreibzugriff versehentlich auszuweiten.

## Verfügbarkeit

Die Änderung wurde nach TypeScript 7.0 in die native TypeScript-Codebasis übernommen. Die Quelle nennt keine stabile npm-Version, in der sie enthalten ist. Prüfen Sie daher die Versionshinweise der installierten Version, bevor Sie sich auf dieses Verhalten verlassen.

## Quelle

Lesen Sie den zusammengeführten TypeScript-Pull-Request: [Fix `getDeclarationModifierFlagsFromSymbolEx` for synthetic properties](https://github.com/microsoft/TypeScript/pull/63932).
