---
title: Literaltypen
sidebar:
  order: 17
  label: 17. Literaltypen
---


Ein Literaltyp ist eine einelementige Menge innerhalb eines umfassenden Typs; er definiert einen sehr genauen Wert, der ein JavaScript-Primitivwert ist.

Literaltypen in TypeScript sind Zahlen, Strings und boolesche Werte.

Beispiel für Literale:

```typescript
const a = 'a'; // String literal type
const b = 1; // Numeric literal type
const c = true; // Boolean literal type
```

String-, numerische und boolesche Literaltypen werden in Unions, Type Guards und Typaliasen verwendet.
Im folgenden Beispiel sehen Sie einen Union-Typalias. `O` besteht nur aus den angegebenen Werten; kein anderer String ist gültig:

```typescript
type O = 'a' | 'b' | 'c';
```

