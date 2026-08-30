---
title: Wnioskowanie typu infer w typach warunkowych
sidebar:
  order: 42
  label: 42. Wnioskowanie typu infer w typach warunkowych
---


Słowo kluczowe `infer` jest używane w typach warunkowych do wnioskowania (wyodrębniania) typu parametru generycznego z typu, który od niego zależy. Pozwala to pisać bardziej elastyczne definicje typów wielokrotnego użytku.

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never;
type Numbers = ElementType<number[]>; // number
type Strings = ElementType<string[]>; // string
```

